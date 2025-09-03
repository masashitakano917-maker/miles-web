// /src/components/Account.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../state/AuthProvider';
import { supabase } from '../lib/supabaseClient';

type Booking = {
  id: string;
  experience_title: string;
  date: string;
  guests: number;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
};

const Account: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      // 本来は user_id = user?.id で絞り込む（開発ポリシー次第で全件返る設定でもOK）
      let query = supabase
        .from('bookings')
        .select('id, experience_title, date, guests, amount, currency, status, created_at')
        .order('created_at', { ascending: false });

      if (user?.id) query = query.eq('user_id', user.id);

      const { data, error } = await query;
      if (!error && data) setBookings(data as Booking[]);
      setLoading(false);
    };
    load();
  }, [user?.id]);

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mt-6 mb-4">My Account</h1>
        <p>Please log in to view your bookings.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-3xl font-bold mt-6 mb-6">My Account</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Profile</h2>
        <p className="text-gray-700">Email: <span className="font-medium">{user.email}</span></p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Booking History</h2>
        {loading ? (
          <p>Loading…</p>
        ) : bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul className="divide-y">
            {bookings.map((b) => (
              <li key={b.id} className="py-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.experience_title}</p>
                  <p className="text-sm text-gray-600">
                    {b.date} ・ {b.guests} guest(s) ・ {b.status}
                  </p>
                </div>
                <div className="font-semibold">
                  {(b.currency === 'USD' ? '$' : '¥')}{b.amount.toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Account;
