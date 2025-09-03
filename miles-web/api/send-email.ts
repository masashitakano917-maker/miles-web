// miles-web/api/send-email.ts
export default async function handler(req: any, res: any) {
  try {
    // CORS（不要なら消してOK）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // GETは疎通確認用（ブラウザで直接開くと200を返す）
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, route: '/api/send-email' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    // リクエストボディ
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const name    = body?.name || '';
    const email   = body?.email || '';
    const subject = body?.subject || 'Contact Form';
    const message = (body?.message || '').toString();

    // 環境変数
    const apiKey = process.env.RESEND_API_KEY;
    const from   = process.env.RESEND_FROM;  // いまは: Miles <onboarding@resend.dev>
    const to     = process.env.RESEND_TO;    // 受信先（あなたのメール）

    if (!apiKey || !from || !to) {
      return res.status(500).json({ success: false, error: 'Missing env: RESEND_API_KEY / RESEND_FROM / RESEND_TO' });
    }

    // Resend API 呼び出し
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email || undefined,
        subject,
        html: `
          <h3>New Contact Message</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Subject:</b> ${subject}</p>
          <p><b>Message:</b><br/>${message.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return res.status(502).json({ success: false, error: 'Resend error', detail });
    }

    const data = await r.json();
    return res.status(200).json({ success: true, id: data?.id });
  } catch (e: any) {
    console.error('send-email error:', e);
    return res.status(500).json({ success: false, error: e?.message || String(e) });
  }
}
