import { Suspense } from "react";
import TrackOrderContent from "./TrackOrderContent";

export const metadata = {
  title: "Track Your Order",
  description: "Enter your order ID to see real-time delivery status.",
};

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
