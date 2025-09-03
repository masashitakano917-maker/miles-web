import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { LogIn, UserPlus } from "lucide-react";

const AuthForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { full_name: name } },
        });
        if (error) throw error;
        // すぐログイン状態になる or メール確認が必要（Supabase設定に依存）
        setMsg("Welcome! You are signed up.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        setMsg("Logged in!");
      }
      onSuccess();
    } catch (err: any) {
      setMsg(err?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 max-w-md mx-auto">
      <div className="flex gap-2 mb-6">
        <button
          className={`flex-1 py-2 rounded-lg font-semibold ${mode === "login" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-700"}`}
          onClick={() => setMode("login")}
          type="button"
        >
          <span className="inline-flex items-center gap-2 justify-center"><LogIn className="w-4 h-4" /> Log in</span>
        </button>
        <button
          className={`flex-1 py-2 rounded-lg font-semibold ${mode === "signup" ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-700"}`}
          onClick={() => setMode("signup")}
          type="button"
        >
          <span className="inline-flex items-center gap-2 justify-center"><UserPlus className="w-4 h-4" /> Sign up</span>
        </button>
      </div>

      <form onSubmit={submit} className="space-y-4">
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input className="w-full border rounded-lg px-3 py-2" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="w-full border rounded-lg px-3 py-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input className="w-full border rounded-lg px-3 py-2" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
        </div>

        <button
          className={`w-full py-3 rounded-lg font-semibold text-white ${busy ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"}`}
          type="submit"
          disabled={busy}
        >
          {busy ? "Please wait..." : (mode === "signup" ? "Create account" : "Log in")}
        </button>

        {msg && <p className="text-center text-sm text-slate-700 mt-2">{msg}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
