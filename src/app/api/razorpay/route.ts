import { NextResponse } from 'next/server';
import { createRazorpayOrder, verifyRazorpaySignature } from '@/lib/razorpay';

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
    }

    const order = await createRazorpayOrder(amount, currency);

    return NextResponse.json({
      id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (err: any) {
    console.error('Razorpay Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// Optional: Webhook or signature verification
export async function PUT(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (isValid) {
      return NextResponse.json({ status: 'ok' });
    } else {
      return NextResponse.json({ status: 'failed' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
