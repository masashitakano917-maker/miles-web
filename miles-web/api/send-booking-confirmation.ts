import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { customerName, customerEmail, experienceTitle, experienceLocation,
            bookingDate, numberOfGuests, totalPrice, specialRequests, bookingId, bookingTime } = body;

    const apiKey = process.env.RESEND_API_KEY;
    const from   = process.env.RESEND_FROM;
    const admin  = process.env.RESEND_TO;

    if (apiKey && from && admin) {
      const html = `
        <h3>Booking Confirmation</h3>
        <p><b>Booking ID:</b> ${bookingId}</p>
        <p><b>Name:</b> ${customerName}</p>
        <p><b>Email:</b> ${customerEmail}</p>
        <p><b>Experience:</b> ${experienceTitle}</p>
        <p><b>Location:</b> ${experienceLocation}</p>
        <p><b>Date:</b> ${bookingDate}</p>
        <p><b>Guests:</b> ${numberOfGuests}</p>
        <p><b>Total:</b> $${totalPrice}</p>
        <p><b>Requests:</b> ${specialRequests || '-'}</p>
        <p><small>Created at ${bookingTime}</small></p>`;

      const adminReq = fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [admin], subject: `New Booking: ${experienceTitle}`, html })
      });

      const userReq = customerEmail ? fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to: [customerEmail], subject: `Your booking is confirmed - ${experienceTitle}`, html })
      }) : Promise.resolve({ ok: true } as any);

      const [a,u]: any = await Promise.all([adminReq, userReq]);
      if (!a.ok || (customerEmail && !u.ok)) return res.status(502).json({ success: false });

      return res.status(200).json({ success: true });
    }

    return res.status(200).json({ success: true, note: 'Email provider not configured.' });
  } catch (e:any) {
    return res.status(500).json({ success: false, error: e?.message || String(e) });
  }
}
