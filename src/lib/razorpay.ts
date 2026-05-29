import Razorpay from "razorpay";
import crypto from "crypto";

// Only instantiate on server — Razorpay SDK is server-only
let _razorpay: Razorpay | null = null;

function getRazorpay(): Razorpay {
  if (!_razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }
    _razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return _razorpay;
}

/**
 * Create a Razorpay order.
 * @param amountINR  Amount in Indian Rupees (will be converted to paisa)
 */
export async function createRazorpayOrder(amountINR: number) {
  const razorpay = getRazorpay();
  const order = await razorpay.orders.create({
    amount: Math.round(amountINR * 100), // INR → paisa
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  });
  return order;
}

/**
 * Verify Razorpay payment signature using HMAC-SHA256.
 * Returns true if the signature is valid.
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) throw new Error("RAZORPAY_KEY_SECRET not set");

  const body = `${orderId}|${paymentId}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return expected === signature;
}
