// /src/components/AuthForm.tsx
import React, { useState } from 'react';
import { useAuth } from '../state/AuthProvider';

const AuthForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        const { error } = await signIn(email, password);
        if (error) setMsg(error);
        else onSuccess?.();
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) setMsg(error);
        else {
          setMsg('Signed up! Please check your inbox if email confirmation is required.');
          onSuccess?.();
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 rounded ${mode==='login'?'bg-orange-500 text-white':'bg-gray-100'}`}
          onClick={() => setMode('login')}
        >
          Log in
        </button>
        <button
          className={`flex-1 py-2 rounded ${mode==='signup'?'bg-orange-500 text-white':'bg-gray-100'}`}
          onClick={() => setMode('signup')}
        >
          Sign up
        </button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'}`}
        >
          {loading ? 'Please wait…' : (mode === 'login' ? 'Log in' : 'Create account')}
        </button>

        {msg && <p className="text-sm text-red-600 text-center mt-2">{msg}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
