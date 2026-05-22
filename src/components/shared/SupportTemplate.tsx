import React from "react";

export default function SupportPage({ title }: { title: string }) {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold font-outfit mb-8">{title}</h1>
        <div className="prose prose-neutral max-w-none space-y-6 text-neutral-600">
          <p>
            At HoneyPremium, we are committed to providing you with the best experience and highest quality organic honey. 
            This page provides detailed information regarding our {title.toLowerCase()} guidelines.
          </p>
          <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
            <h3 className="text-xl font-bold text-neutral-900 mb-4 tracking-tight">Important Information</h3>
            <p>We update our policies regularly to ensure transparency and safety for all our customers.</p>
          </div>
          <p>
            If you have any specific questions that are not addressed here, please feel free to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
