// api/send-booking-confirmation.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function setCors(res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' });

  try {
    const {
      customerName,
      customerEmail,
      experienceTitle,
      experienceLocation,
      bookingDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
      bookingId,
      bookingTime,
    } = (req.body || {}) as Record<string, any>;

    if (!experienceTitle || !bookingDate || !numberOfGuests) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const FROM = process.env.RESEND_FROM || 'onboarding@resend.dev';
    const TO_OWNER = process.env.RESEND_TO;

    if (!process.env.RESEND_API_KEY || !FROM || !TO_OWNER) {
      return res.status(500).json({ success: false, error: 'Server email config missing' });
    }

    const subject = `New Booking: ${experienceTitle} (${bookingDate})`;
    const text = [
      `A new booking has been placed.`,
      ``,
      `Booking ID: ${bookingId}`,
      `Time: ${bookingTime}`,
      `Name: ${customerName || '-'}`,
      `Email: ${customerEmail || '-'}`,
      `Experience: ${experienceTitle}`,
      `Location: ${experienceLocation || '-'}`,
      `Date: ${bookingDate}`,
      `Guests: ${numberOfGuests}`,
      `Total: ${totalPrice}`,
      `Requests: ${specialRequests || '-'}`,
    ].join('\n');

    const { error } = await resend.emails.send({
      from: FROM,
      to: [TO_OWNER],
      subject,
      text,
    });

    if (error) {
      return res.status(500).json({ success: false, detail: JSON.stringify(error) });
    }

    // ※ テスト環境ではお客様宛て送信は行わない（Resendの制限対策）
    return res.status(200).json({ success: true });
  } catch (e: any) {
    return res.status(500).json({ success: false, detail: String(e?.message || e) });
  }
}
