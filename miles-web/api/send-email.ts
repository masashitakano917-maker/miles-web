import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, subject, message } = body;

    const apiKey = process.env.RESEND_API_KEY;
    const from   = process.env.RESEND_FROM;  // 例: 'Miles <noreply@yourdomain.com>'
    const to     = process.env.RESEND_TO;    // 受信先（あなたの通知用）

    if (apiKey && from && to) {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from, to: [to], reply_to: email,
          subject: subject || 'Contact Form',
          html: `
            <h3>New Contact Message</h3>
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <p><b>Subject:</b> ${subject}</p>
            <p><b>Message:</b><br/>${(message || '').replace(/\n/g,'<br/>')}</p>
          `,
        }),
      });
      if (!r.ok) return res.status(502).json({ success: false, error: await r.text() });
      const data = await r.json();
      return res.status(200).json({ success: true, id: data.id });
    }

    // まだ FROM/TO 未設定なら開発用のダミー成功を返す
    return res.status(200).json({ success: true, note: 'Email provider not configured.' });
  } catch (e:any) {
    return res.status(500).json({ success: false, error: e?.message || String(e) });
  }
}
