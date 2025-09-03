// 例：BookingPage.tsx 内
const sendBookingConfirmation = async () => {
  try {
    const bookingDetails = {
      customerName: `${bookingData.firstName} ${bookingData.lastName}`,
      customerEmail: bookingData.email,
      experienceTitle: experience.title,
      experienceLocation: experience.location,
      bookingDate: bookingData.date,
      numberOfGuests: bookingData.guests,
      totalPrice: totalPrice, // サーバー側でも再計算が望ましい
      specialRequests: bookingData.specialRequests,
      bookingId: `MILES-${Date.now()}`,
    };

    const r = await fetch('/api/send-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingDetails),
    });

    const data = await r.json();
    console.log('booking api result:', data);

    if (data.ok) {
      alert(
        data.mode === 'sandbox'
          ? '管理者に通知を送りました（sandbox）。ドメイン検証後はお客様にも自動送信されます。'
          : '予約が確定しました！確認メールをお送りしました。'
      );
    } else {
      alert('予約は保存されましたが、メール送信に失敗しました。サポートへご連絡ください。');
    }
  } catch (e) {
    console.error(e);
    alert('通信エラーが発生しました。時間をおいて再度お試しください。');
  }
};
