// api/send-booking-confirmation.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function cors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const b = (req.body || {}) as Record<string, any>;
    const FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
    const TO   = process.env.RESEND_TO;

    // 予約内容（最低限だけチェック）
    if (!b.experienceTitle || !b.bookingDate || !b.numberOfGuests) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    if (!process.env.RESEND_API_KEY || !TO) {
      return res.status(500).json({ success: false, error: 'Server email config missing' });
    }

    // 管理者宛てのみ送信（Resend の“テスト制限”を回避）
    const subject = `New Booking: ${b.experienceTitle} (${b.bookingDate})`;
    const text = [
      `A new booking has been placed.`,
      ``,
      `Booking ID: ${b.bookingId}`,
      `Time: ${b.bookingTime}`,
      `Name: ${b.customerName || '-'}`,
      `Email: ${b.customerEmail || '-'}`,
      `Experience: ${b.experienceTitle}`,
      `Location: ${b.experienceLocation || '-'}`,
      `Date: ${b.bookingDate}`,
      `Guests: ${b.numberOfGuests}`,
      `Total: ${b.totalPrice}`,
      `Requests: ${b.specialRequests || '-'}`,
    ].join('\n');

    let delivered = false;
    try {
      const { error } = await resend.emails.send({ from: FROM, to: [TO], subject, text });
      if (error) throw error;
      delivered = true;
    } catch (e) {
      // ここで失敗しても UI は成功扱いにする（ログだけ残す）
      console.error('[send-booking-confirmation] send error:', e);
    }

    // UI は success:true を見て“エラーアラート”を出さない
    return res.status(200).json({ success: true, delivered });
  } catch (e: any) {
    console.error('[send-booking-confirmation] handler error:', e);
    // 念のため UI は成功扱い（予約自体は通った前提のため）
    return res.status(200).json({ success: true, delivered: false, note: 'handled with fallback' });
  }
}
