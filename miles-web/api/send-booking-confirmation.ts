// api/send-booking-confirmation.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');
const FROM = process.env.RESEND_FROM || '';
const TO = process.env.RESEND_TO || '';

export default async function handler(req: any, res: any) {
  // CORS（同一オリジンだけど念のため）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  // 動作確認用（GET叩いたときに 200 返す）
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true, route: '/api/send-booking-confirmation' });
  }

  try {
    const body =
      typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    // 受信データ（未設定でも落ちないようデフォルト）
    const {
      customerName = '',
      customerEmail = '',
      experienceTitle = '',
      experienceLocation = '',
      bookingDate = '',
      numberOfGuests = 1,
      totalPrice = '',
      specialRequests = '',
      bookingId = `MILES-${Date.now()}`,
    } = body;

    // ---- サンドボックス回避（resend.dev の from のときは運用者宛にだけ送る）----
    const recipients: string[] = [];
    recipients.push(TO); // 運用者宛は常に送る（到達確認用）
    if (!FROM.endsWith('@resend.dev') && customerEmail) {
      // 送信ドメインを認証済みになったらお客さまにも送る
      recipients.push(customerEmail);
    }

    if (!process.env.RESEND_API_KEY || !FROM || recipients.length === 0) {
      return res.status(500).json({
        success: false,
        reason: 'Missing RESEND config',
        details: {
          hasKey: !!process.env.RESEND_API_KEY,
          from: FROM,
          to: recipients,
        },
      });
    }

    const html = `
      <div>
        <h2>Booking Confirmation</h2>
        <p>Thank you, <strong>${customerName || 'Guest'}</strong>!</p>
        <p>Your booking has been received.</p>
        <ul>
          <li><b>Booking ID:</b> ${bookingId}</li>
          <li><b>Experience:</b> ${experienceTitle}</li>
          <li><b>Location:</b> ${experienceLocation}</li>
          <li><b>Date:</b> ${bookingDate}</li>
          <li><b>Guests:</b> ${numberOfGuests}</li>
          <li><b>Total:</b> ${totalPrice}</li>
        </ul>
        ${specialRequests ? `<p><b>Requests:</b> ${specialRequests}</p>` : ''}
      </div>
    `;

    const result = await resend.emails.send({
      from: FROM,
      to: recipients,
      subject: `Booking Confirmation: ${experienceTitle} (${bookingId})`,
      html,
      reply_to: customerEmail || undefined,
    });

    return res.status(200).json({ success: true, result });
  } catch (err: any) {
    // 失敗理由を JSON で返す（Network → Response で見える）
    return res.status(500).json({
      success: false,
      message: 'send-booking-confirmation failed',
      error: err?.message || String(err),
      stack: err?.stack,
    });
  }
}
