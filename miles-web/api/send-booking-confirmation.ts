// api/send-booking-confirmation.ts
import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req: Request) {
  // Preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: true, message: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  try {
    const body = await req.json();

    // 必須ENVチェック
    const API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.RESEND_FROM;
    const TO = process.env.RESEND_TO;
    if (!API_KEY || !FROM || !TO) {
      return new Response(
        JSON.stringify({
          success: false,
          status: 500,
          detail: 'Missing RESEND_API_KEY / RESEND_FROM / RESEND_TO',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    const resend = new Resend(API_KEY);

    // Sandbox 対応：from が resend.dev の場合は運用者宛だけ送信
    // 本番（独自ドメイン認証後）は必要に応じて body.customerEmail へも送付してOK
    const toList = [TO];

    const subject = `[Miles] New booking: ${body.experienceTitle ?? 'Experience'}`;
    const lines = [
      `Booking ID: ${body.bookingId}`,
      `When: ${body.bookingDate} (${body.bookingTime})`,
      `Experience: ${body.experienceTitle} @ ${body.experienceLocation}`,
      `Guests: ${body.numberOfGuests}`,
      `Total: $${body.totalPrice}`,
      `Customer: ${body.customerName} <${body.customerEmail}>`,
      `Special Requests: ${body.specialRequests || '-'}`,
    ];
    const text = lines.join('\n');
    const html = `<pre style="font-size:14px;line-height:1.6">${text}</pre>`;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: toList,
      subject,
      text,
      html,
      reply_to: body.customerEmail || undefined,
    });

    if (error) {
      return new Response(
        JSON.stringify({ success: false, status: 502, detail: error.message || String(error) }),
        { status: 502, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  } catch (e: any) {
    return new Response(
      JSON.stringify({ success: false, status: 500, detail: e?.message || String(e) }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }
}
