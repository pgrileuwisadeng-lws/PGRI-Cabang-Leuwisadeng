import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  X, 
  AlertCircle, 
  ArrowRight 
} from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('adminpgri');
  const [password, setPassword] = useState('320139');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (username.trim().toLowerCase() === 'adminpgri' && password === '320139') {
      onLoginSuccess();
      onClose();
    } else {
      setErrorMsg('Kredensial tidak valid. Silakan gunakan username: adminpgri & password: 320139');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-700 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-red-200 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-xs border border-white/20">
              <ShieldCheck className="w-6 h-6 text-red-200" />
            </div>
            <div>
              <h3 className="text-base font-bold">Portal Administrasi PGRI</h3>
              <p className="text-xs text-red-100">
                Akses Khusus Pengurus Cabang Leuwisadeng
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl border border-red-200 dark:border-red-900 text-[11px] text-red-800 dark:text-red-300">
              <strong>Akses Resmi Pengurus Cabang:</strong>
              <div className="mt-1 font-mono">
                Username: <strong>adminpgri</strong> | Sandi: <strong>320139</strong>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Nama Pengguna (Username)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="adminpgri"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Kata Sandi
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="320139"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-700/20"
            >
              <span>Masuk Dashboard Admin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
