import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    const supabase = getAdminClient();

    // Check for duplicate
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (existing) {
      return NextResponse.json({ message: "Already subscribed!" }, { status: 200 });
    }

    const { error } = await supabase.from("subscribers").insert({
      email: email.toLowerCase().trim(),
      subscribed_at: new Date().toISOString(),
    });

    if (error) throw error;

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (err: any) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
