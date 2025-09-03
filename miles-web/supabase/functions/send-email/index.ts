// deno-lint-ignore-file no-explicit-any
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-client-info, apikey",
  "Access-Control-Max-Age": "86400",
};

const json = (body: any, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const isDomainNotVerified = (s = "") => {
  s = s.toLowerCase();
  return s.includes("domain not verified")
      || s.includes("not a verified domain")
      || s.includes("add and verify a domain");
};

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") return new Response(null, { status: 200, headers: corsHeaders });

  // Health
  if (req.method === "GET") return json({ ok: true, message: "Miles send-email is running" });

  if (req.method !== "POST") return json({ success: false, error: "Method not allowed" }, 405);

  const API_KEY = Deno.env.get("RESEND_API_KEY") || "";
  const ENV_FROM = Deno.env.get("RESEND_FROM") || "Miles Contact <noreply@miles.travel>";
  const ENV_TO   = Deno.env.get("RESEND_TO")   || "of@thisismerci.com";

  if (!API_KEY) return json({ success: false, error: "RESEND_API_KEY is not set" }, 500);

  // Body parse（必ず JSON で返すため、ここで 400 を制御）
  let body: any = {};
  try { body = await req.json(); } catch { return json({ success: false, error: "Invalid JSON body" }, 400); }

  const { name, email, subject, message } = body || {};
  const missing: string[] = [];
  if (!name) missing.push("name");
  if (!email) missing.push("email");
  if (!subject) missing.push("subject");
  if (!message) missing.push("message");
  if (missing.length) return json({ success: false, error: `Missing fields: ${missing.join(", ")}` }, 400);

  const nowIso = new Date().toISOString();
  const safeMsg = String(message || "");
  const basePayload = {
    to: [ENV_TO],
    subject: `Miles Contact Form: ${subject}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#f97316;border-bottom:2px solid #f97316;padding-bottom:10px">New Contact Form Submission</h2>
        <div style="margin:20px 0">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div style="margin:20px 0">
          <h3 style="color:#374151">Message:</h3>
          <div style="background:#f9fafb;padding:15px;border-radius:8px;border-left:4px solid #f97316">
            ${safeMsg.replace(/\n/g, "<br>")}
          </div>
        </div>
        <div style="margin-top:30px;padding-top:20px;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px">
          <p>This email was sent from the Miles travel website contact form.</p>
          <p>Timestamp: ${nowIso}</p>
        </div>
      </div>`.trim(),
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${safeMsg}

---
This email was sent from the Miles travel website contact form.
Timestamp: ${nowIso}`.trim(),
    reply_to: email,
  };

  const callResend = async (payload: Record<string, unknown>) => {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await r.text(); // 失敗時も文字列で確実に回収
    let parsed: any = null; try { parsed = JSON.parse(text); } catch {}
    return { ok: r.ok, status: r.status, text, json: parsed };
  };

  // 1st: 認証済みドメイン想定の FROM
  const primary = await callResend({ from: ENV_FROM, ...basePayload });
  if (primary.ok) return json({ success: true, message: "Email sent (primary)", id: primary.json?.id });

  // 2nd: ドメイン未認証っぽければ Resend サンドボックス FROM に自動フォールバック
  if (isDomainNotVerified(primary.text) || primary.status === 403 || primary.status === 422) {
    const fallback = await callResend({ from: "Miles Contact <onboarding@resend.dev>", ...basePayload });
    if (fallback.ok) return json({ success: true, message: "Email sent (fallback: onboarding@resend.dev)", id: fallback.json?.id });
    return json({ success: false, error: "Resend rejected (fallback also failed)", details: { primary: primary.text, fallback: fallback.text } }, 502);
  }

  // その他の失敗
  return json({ success: false, error: "Resend rejected", details: { status: primary.status, body: primary.text } }, 502);
});
