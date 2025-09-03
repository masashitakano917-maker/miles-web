// miles-web/api/send-email.js
export default async function handler(req, res) {
  try {
    // CORS（必要なければ消してOK）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // 疎通確認（ブラウザで /api/send-email を開くと 200）
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, route: '/api/send-email' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const name = body.name || '';
    const email = body.email || '';
    const subject = body.subject || 'Contact Form';
    const message = (body.message || '').toString();

    const { RESEND_API_KEY, RESEND_FROM, RESEND_TO } = process.env;
    if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
      return res.status(500).json({ success: false, error: 'Missing env: RESEND_API_KEY / RESEND_FROM / RESEND_TO' });
    }

    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: RESEND_FROM,
        to: [RESEND_TO],
        reply_to: email || undefined,
        subject,
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b><br/>${message.replace(/\n/g,'<br/>')}</p>
        `,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ success: false, error: 'Resend error', detail });
    }

    const data = await r.json();
    return res.status(200).json({ success: true, id: data.id });
  } catch (e) {
    console.error('send-email error:', e);
    return res.status(500).json({ success: false, error: e?.message || String(e) });
  }
}
