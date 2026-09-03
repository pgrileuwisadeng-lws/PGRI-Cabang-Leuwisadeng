import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Search, 
  Clock, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { Aspiration } from '../types';
import { StorageService } from '../services/storage';

interface AspirationSectionProps {
  aspirations: Aspiration[];
  onAspirationSubmitted: () => void;
}

export const AspirationSection: React.FC<AspirationSectionProps> = ({
  aspirations,
  onAspirationSubmitted,
}) => {
  const [formData, setFormData] = useState({
    senderName: '',
    isAnonymous: false,
    schoolOrigin: '',
    phone: '',
    email: '',
    category: 'Kesejahteraan & Tunjangan' as Aspiration['category'],
    subject: '',
    message: '',
  });

  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedAspiration, setTrackedAspiration] = useState<Aspiration | null>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject.trim() || !formData.message.trim()) return;

    const newAsp = StorageService.addAspiration({
      senderName: formData.isAnonymous ? 'Anonim (Guru Leuwisadeng)' : (formData.senderName || 'Anggota PGRI'),
      isAnonymous: formData.isAnonymous,
      schoolOrigin: formData.schoolOrigin || 'Kec. Leuwisadeng',
      phone: formData.phone || '-',
      email: formData.email,
      category: formData.category,
      subject: formData.subject,
      message: formData.message,
    });

    setSubmittedTicket(newAsp.ticketNumber);
    onAspirationSubmitted();
    setFormData({
      senderName: '',
      isAnonymous: false,
      schoolOrigin: '',
      phone: '',
      email: '',
      category: 'Kesejahteraan & Tunjangan',
      subject: '',
      message: '',
    });
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;
    const found = aspirations.find(a => 
      a.ticketNumber.toLowerCase() === trackQuery.trim().toLowerCase()
    );
    setTrackedAspiration(found || null);
    setTrackSearched(true);
  };

  return (
    <section id="aspirasi" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2 border border-red-200 dark:border-red-900">
          <MessageSquare className="w-4 h-4" />
          <span>Saluran Komunikasi Anggota</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Aspirasi & Advokasi Guru
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Sampaikan kritik, saran, permohonan advokasi hukum, atau kendala kesejahteraan. Setiap aspirasi ditelaah langsung oleh Pengurus Cabang Leuwisadeng.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
            Kirim Aspirasi / Pengaduan
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Data Anda terjamin kerahasiaannya. Anda juga dapat memilih opsi anonim jika dikehendaki.
          </p>

          {submittedTicket && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-red-700 dark:text-red-400" />
                <span>Aspirasi Anda Berhasil Terkirim!</span>
              </div>
              <p className="text-xs">
                Nomor Tiket Pelacakan Anda: <strong className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">{submittedTicket}</strong>
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Simpan nomor tiket ini untuk memantau tanggapan resmi pengurus pada kolom pelacakan di samping.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Nama Anda {!formData.isAnonymous && '*'}
                </label>
                <input
                  type="text"
                  disabled={formData.isAnonymous}
                  placeholder={formData.isAnonymous ? 'Mengirim sebagai Anonim' : 'Nama Lengkap'}
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Asal Sekolah / Satuan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: SDN Leuwisadeng 01"
                  value={formData.schoolOrigin}
                  onChange={(e) => setFormData({ ...formData, schoolOrigin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Nomor WhatsApp (Untuk Notifikasi Balasan)
                </label>
                <input
                  type="tel"
                  placeholder="0812..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Kategori Aspirasi *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                >
                  <option value="Kesejahteraan & Tunjangan">Kesejahteraan & Tunjangan</option>
                  <option value="Advokasi Hukum Guru">Advokasi Hukum Guru</option>
                  <option value="Kurikulum & Pembelajaran">Kurikulum & Pembelajaran</option>
                  <option value="Sarana Prasarana">Sarana Prasarana Sekolah</option>
                  <option value="Layanan Organisasi">Layanan Organisasi Cabang</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="anonimCheck"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="w-4 h-4 rounded accent-red-700"
              />
              <label htmlFor="anonimCheck" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                Sembunyikan identitas saya (Kirim secara Anonim)
              </label>
            </div>

            <div>
              <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Judul Aspirasi / Masalah *
              </label>
              <input
                type="text"
                required
                placeholder="Ringkasan inti aspirasi"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-900 dark:text-slate-100 mb-1">
                Uraian Lengkap Pesan / Usulan *
              </label>
              <textarea
                rows={4}
                required
                placeholder="Jelaskan secara runtut fakta, kendala, atau usulan solusi..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-red-700 hover:bg-red-800 active:scale-95 text-white font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-red-700/20"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Aspirasi Sekarang</span>
            </button>
          </form>
        </div>

        {/* Tracking & Public Transparency Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Tracking Box */}
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-red-700 dark:text-red-400" />
              <span>Lacak Status Tiket Aspirasi</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Masukkan nomor tiket (contoh: <code>ASP-2026-0012</code>) untuk melihat perkembangan tindak lanjut.
            </p>

            <form onSubmit={handleTrack} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Nomor Tiket..."
                value={trackQuery}
                onChange={(e) => setTrackQuery(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-semibold cursor-pointer transition"
              >
                Cek
              </button>
            </form>

            {/* Track Result */}
            {trackSearched && (
              trackedAspiration ? (
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-red-700 dark:text-red-400">
                      {trackedAspiration.ticketNumber}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      trackedAspiration.status === 'Selesai Ditanggapi'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {trackedAspiration.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-slate-100">
                    {trackedAspiration.subject}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {trackedAspiration.message}
                  </p>

                  {trackedAspiration.officialResponse ? (
                    <div className="mt-3 p-3 bg-red-50/50 dark:bg-slate-700/50 border-l-2 border-red-700 rounded-r-lg space-y-1">
                      <div className="font-bold text-red-800 dark:text-red-300 text-[11px]">
                        Tanggapan Resmi Pengurus ({trackedAspiration.responseDate}):
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 italic">
                        "{trackedAspiration.officialResponse}"
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 text-amber-600 dark:text-amber-400 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      <span>Sedang dalam antrean telaah pengurus bidang terkait.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 text-center text-xs text-rose-600 bg-rose-50 dark:bg-rose-950/30 rounded-xl">
                  Nomor tiket tidak ditemukan. Mohon periksa kembali penulisan tiket.
                </div>
              )
            )}
          </div>

          {/* Example Aspirations Transparency Feed */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-red-700 dark:text-red-400" />
              <span>Transparansi Advokasi Terbaru</span>
            </h4>

            <div className="space-y-3">
              {aspirations.slice(0, 2).map(a => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-400">{a.ticketNumber}</span>
                    <span className="text-red-700 dark:text-red-400 font-semibold">{a.status}</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {a.subject}
                  </div>
                  {a.officialResponse && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 bg-white/70 dark:bg-slate-800 p-2 rounded border border-slate-200 dark:border-slate-700">
                      <strong>Tanggapan:</strong> {a.officialResponse}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
