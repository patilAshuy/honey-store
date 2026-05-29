import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/razorpay";
import crypto from "crypto";

// Service-role client — bypasses RLS for server-side writes
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// ── POST /api/orders — create Razorpay order + save pending order ─────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cart, formData, subtotal, shipping, total } = body;

    // Basic validation
    if (!cart?.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }
    if (!formData?.name || !formData?.email || !formData?.phone || !formData?.address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!total || total <= 0) {
      return NextResponse.json({ error: "Invalid total amount" }, { status: 400 });
    }

    // Validate pincode
    if (!/^\d{6}$/.test(formData.pincode)) {
      return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(total);

    // Build order items
    const items = cart.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || null,
    }));

    // Save pending order to Supabase
    const supabase = getAdminClient();
    const orderId = razorpayOrder.id; // use Razorpay order ID as our order ID

    const { error: insertError } = await supabase.from("orders").insert({
      id: orderId,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone,
      shipping_address: {
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      },
      items,
      subtotal: subtotal,
      shipping_fee: shipping,
      total_amount: total,
      status: "pending",
      razorpay_order_id: razorpayOrder.id,
    });

    if (insertError) {
      console.error("Order insert error:", insertError);
      // Don't block payment if DB insert fails — log and continue
    }

    return NextResponse.json({
      orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount, // in paisa
      currency: razorpayOrder.currency,
    });
  } catch (err: any) {
    console.error("Create order error:", err);
    return NextResponse.json({ error: err.message || "Failed to create order" }, { status: 500 });
  }
}

// ── PUT /api/orders — verify payment + update order status ───────────────
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Missing payment verification fields" }, { status: 400 });
    }

    // Verify HMAC signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // Update order status to paid
    const supabase = getAdminClient();
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        payment_id: razorpay_payment_id,
      })
      .eq("id", razorpay_order_id);

    if (updateError) {
      console.error("Order update error:", updateError);
    }

    return NextResponse.json({ success: true, orderId: razorpay_order_id });
  } catch (err: any) {
    console.error("Verify payment error:", err);
    return NextResponse.json({ error: err.message || "Verification failed" }, { status: 500 });
  }
}
