// miles-web/api/send-booking-confirmation.js
export default async function handler(req, res) {
  // --- CORS（ブラウザPOST用） ---
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // --- 動作確認用（GETで叩くとOK返す）---
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, route: '/api/send-booking-confirmation' });
  }

  try {
    const API_KEY = process.env.RESEND_API_KEY || '';
    const FROM = process.env.RESEND_FROM || '';
    const TO = process.env.RESEND_TO || '';

    if (!API_KEY || !FROM || !TO) {
      return res.status(500).json({
        success: false,
        error: 'Missing environment variables: RESEND_API_KEY / RESEND_FROM / RESEND_TO'
      });
    }

    // VercelのNodeランタイムではreq.bodyが文字列のことがある
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    const body = JSON.parse(raw || '{}');

    // BookingPage から送っている想定キー
    const {
      customerName = '',
      customerEmail = '',
      experienceTitle = '',
      experienceLocation = '',
      bookingDate = '',
      numberOfGuests = '',
      totalPrice = '',
      specialRequests = '',
      bookingId = '',
      bookingTime = ''
    } = body;

    const subject = `Booking Confirmed: ${experienceTitle || 'Your Experience'} (${bookingDate || 'TBD'})`;

    // onboarding@resend.dev のままなら外部宛は拒否されるため、内部宛てのみに送る
    const recipients = [TO];
    if (!FROM.endsWith('@resend.dev') && customerEmail) {
      recipients.push(customerEmail); // ドメイン検証後はお客さまにも同報OK
    }

    // シンプルなHTML
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6">
        <h2>Thank you for your booking!</h2>
        <p>Hi ${customerName || 'Guest'},</p>
        <p>Your booking has been confirmed.</p>
        <table style="border-collapse:collapse">
          <tr><td style="padding:4px 8px"><b>Booking ID</b></td><td style="padding:4px 8px">${bookingId}</td></tr>
          <tr><td style="padding:4px 8px"><b>Experience</b></td><td style="padding:4px 8px">${experienceTitle}</td></tr>
          <tr><td style="padding:4px 8px"><b>Location</b></td><td style="padding:4px 8px">${experienceLocation}</td></tr>
          <tr><td style="padding:4px 8px"><b>Date</b></td><td style="padding:4px 8px">${bookingDate}</td></tr>
          <tr><td style="padding:4px 8px"><b>Guests</b></td><td style="padding:4px 8px">${numberOfGuests}</td></tr>
          <tr><td style="padding:4px 8px"><b>Total</b></td><td style="padding:4px 8px">$${totalPrice}</td></tr>
        </table>
        ${specialRequests ? `<p><b>Special Requests:</b> ${specialRequests}</p>` : ''}
        <p style="margin-top:12px;font-size:12px;color:#666">Booked at: ${bookingTime}</p>
      </div>
    `;

    // SDKなしでResend REST APIに直接POST（依存追加不要）
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM,       // 例: "Miles <onboarding@resend.dev>"
        to: recipients,   // 検証前は内部宛のみ
        subject,
        html
      })
    });

    const text = await resp.text();
    let json;
    try { json = JSON.parse(text); } catch { json = { raw: text }; }

    if (!resp.ok) {
      return res.status(resp.status).json({ success: false, detail: json });
    }
    return res.status(200).json({ success: true, result: json });
  } catch (err) {
    return res.status(500).json({ success: false, error: String(err) });
  }
}
