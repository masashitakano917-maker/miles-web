// miles-web/api/send-booking-confirmation.js
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const {
      customerName,
      customerEmail,
      experienceTitle,
      experienceLocation,
      bookingDate,
      numberOfGuests,
      totalPrice,
      specialRequests
    } = req.body || {};

    // 環境変数
    const API_KEY = process.env.RESEND_API_KEY;
    const FROM = process.env.RESEND_FROM; // 例: "Miles <onboarding@resend.dev>"
    const ADMIN_TO = process.env.RESEND_TO; // 例: あなたの受信先

    if (!API_KEY || !FROM || !ADMIN_TO) {
      return res.status(500).json({
        success: false,
        error: 'Missing RESEND_* environment variables'
      });
    }

    // メール本文（管理者宛て）
    const adminSubject = `New booking: ${experienceTitle} (${bookingDate})`;
    const adminHtml = `
      <h2>New Booking Received</h2>
      <ul>
        <li><b>Name:</b> ${customerName || '-'}</li>
        <li><b>Email:</b> ${customerEmail || '-'}</li>
        <li><b>Experience:</b> ${experienceTitle}</li>
        <li><b>Location:</b> ${experienceLocation}</li>
        <li><b>Date:</b> ${bookingDate}</li>
        <li><b>Guests:</b> ${numberOfGuests}</li>
        <li><b>Total:</b> $${totalPrice}</li>
        <li><b>Requests:</b> ${specialRequests || '-'}</li>
      </ul>
      <p>Time: ${new Date().toISOString()}</p>
    `;

    // 1) 管理者宛ては必ず送る
    const adminResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: ADMIN_TO,
        subject: adminSubject,
        html: adminHtml,
        text: adminHtml.replace(/<[^>]+>/g, ' '),
      }),
    });

    const adminText = await adminResp.text();
    const adminOk = adminResp.ok;

    // 2) お客さま宛て（開発モードで 403 になっても無視して成功扱い）
    let customerOk = false;
    let customerDetail = null;

    if (customerEmail) {
      const customerSubject = `Your booking is confirmed: ${experienceTitle}`;
      const customerHtml = `
        <h2>Thank you for your booking!</h2>
        <p>Hi ${customerName || ''},</p>
        <p>Your booking details are below.</p>
        <ul>
          <li><b>Experience:</b> ${experienceTitle}</li>
          <li><b>Location:</b> ${experienceLocation}</li>
          <li><b>Date:</b> ${bookingDate}</li>
          <li><b>Guests:</b> ${numberOfGuests}</li>
          <li><b>Total:</b> $${totalPrice}</li>
        </ul>
        <p>We look forward to seeing you!</p>
      `;

      try {
        const custResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM,
            to: customerEmail, // ドメイン未認証だと 403 になる可能性あり
            subject: customerSubject,
            html: customerHtml,
            text: customerHtml.replace(/<[^>]+>/g, ' '),
          }),
        });

        customerDetail = await custResp.text();
        customerOk = custResp.ok;

        // 403（未認証ドメインの制限）はエラーにしない
        if (!custResp.ok && custResp.status !== 403) {
          return res.status(502).json({
            success: false,
            detail: customerDetail || 'customer email failed',
          });
        }
      } catch (e) {
        // 送信試行で例外 → ただし管理者宛てが送れたら成功扱い
        customerDetail = String(e);
      }
    }

    if (!adminOk) {
      return res.status(502).json({
        success: false,
        detail: adminText || 'admin email failed',
      });
    }

    // ここまで来たら「少なくとも管理者宛て」は成功
    return res.status(200).json({
      success: true,
      adminEmailSent: true,
      customerEmailSent: customerOk,
      note:
        customerOk
          ? 'Admin and customer emails sent.'
          : 'Admin email sent. Customer email skipped or restricted (dev domain).',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Unhandled error',
      detail: String(err),
    });
  }
}
