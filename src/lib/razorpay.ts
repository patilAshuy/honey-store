import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const createRazorpayOrder = async (amount: number, currency: string = "INR") => {
  const options = {
    amount: Math.round(amount * 100), // convert to paisa
    currency,
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    throw error;
  }
};

export const verifyRazorpaySignature = (
  orderId: string,
  paymentId: string,
  signature: string
) => {
  const crypto = require("crypto");
  const text = `${orderId}|${paymentId}`;
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(text)
    .digest("hex");

  return generated_signature === signature;
};
