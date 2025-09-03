import React, { useEffect, useState } from "react";
import { useAuth } from "../state/AuthProvider";
import { supabase } from "../lib/supabase";
import { LogOut } from "lucide-react";

type Booking = {
  id: string;
  user_id: string;
  experience_title: string;
  date: string;     // ISO
  guests: number;
  amount: number;   // cents or JPY integer
  currency: string; // "JPY" etc
  status: string;   // "confirmed" | "pending" | ...
  created_at: string;
};

const Account: React.FC = () => {
  const { user, signOut } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setBookings(data as any);
      setLoading(false);
    })();
  }, [user]);

  if (!user) return <p className="text-center text-slate-600">Please log in.</p>;

  return (
    <section id="account" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900">My Account</h2>
          <button onClick={signOut} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-slate-100">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile card */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-slate-900 mb-2">Profile</h3>
            <p className="text-slate-700"><span className="font-medium">Email:</span> {user.email}</p>
          </div>

          {/* Bookings list (wide) */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Bookings</h3>
            {loading ? (
              <p className="text-slate-600">Loading...</p>
            ) : bookings.length === 0 ? (
              <p className="text-slate-600">No bookings yet.</p>
            ) : (
              <div className="divide-y">
                {bookings.map(b => (
                  <div key={b.id} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{b.experience_title}</p>
                      <p className="text-sm text-slate-600">
                        {new Date(b.date).toLocaleDateString()} ・ {b.guests} guest(s) ・ {b.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {b.currency} {b.amount}
                      </p>
                      <p className="text-xs text-slate-500">{new Date(b.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
