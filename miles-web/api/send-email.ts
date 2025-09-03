// miles-web/api/send-email.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // CORS (必要なら)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') return res.status(200).end();

    // GET は疎通確認用に 200 を返す（あとで外してOK）
    if (req.method === 'GET') {
      return res.status(200).json({ ok: true, route: '/api/send-email', note: 'function is alive' });
    }

    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    // ここから先は一旦ダミー成功（疎通確認）
    let body: any = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    return res.status(200).json({ success: true, received: body });
  } catch (e: any) {
    console.error('send-email error:', e);
    return res.status(500).json({ success: false, error: e?.message || String(e) });
  }
}
