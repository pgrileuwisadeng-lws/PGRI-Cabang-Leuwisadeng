import React, { useState } from 'react';
import { 
  Database, 
  Check, 
  Copy, 
  ExternalLink, 
  RefreshCw, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  X,
  Code2,
  Sparkles
} from 'lucide-react';
import { GoogleSheetsService, GOOGLE_APPS_SCRIPT_CODE } from '../services/googleSheets';
import { StorageService } from '../services/storage';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSyncComplete?: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  onSyncComplete
}) => {
  const [activeTab, setActiveTab] = useState<'koneksi' | 'kode' | 'panduan'>('koneksi');
  const [webAppUrl, setWebAppUrl] = useState<string>(GoogleSheetsService.getWebAppUrl());
  const [testing, setTesting] = useState(false);
  const [writingTest, setWritingTest] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTestPing = async () => {
    GoogleSheetsService.setWebAppUrl(webAppUrl);
    setTesting(true);
    setTestResult(null);
    const result = await GoogleSheetsService.ping();
    setTesting(false);
    setTestResult(result);
  };

  const handleTestWrite = async () => {
    GoogleSheetsService.setWebAppUrl(webAppUrl);
    setWritingTest(true);
    setTestResult(null);
    const testPayload = {
      id: 'test-' + Date.now(),
      ticketNumber: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
      senderName: 'Uji Coba Pengurus PGRI',
      schoolOrigin: 'Sekretariat Cabang Leuwisadeng',
      phone: '081234567890',
      category: 'Uji Coba Sistem',
      subject: 'Uji Input Data Google Sheets',
      message: 'Data uji coba dari portal web untuk memverifikasi penyimpanan baris spreadsheet.',
      status: 'Diterima',
      date: new Date().toISOString().split('T')[0],
    };
    const success = await GoogleSheetsService.postData('addAspiration', testPayload);
    setWritingTest(false);
    if (success) {
      setTestResult({
        success: true,
        message: 'Data uji coba berhasil dikirim! Silakan buka Google Sheets Anda pada sheet "Aspirasi" untuk memeriksa baris data yang baru saja masuk.',
      });
    } else {
      setTestResult({
        success: false,
        message: 'Gagal mengirim data. Pastikan pengaturan "Who has access" diatur ke "Anyone" saat deploy Web App.',
      });
    }
  };

  const handleSaveAndSync = async () => {
    GoogleSheetsService.setWebAppUrl(webAppUrl);
    setSyncing(true);
    setSyncSuccess(false);
    
    // Test connection first
    const pingRes = await GoogleSheetsService.ping();
    if (!pingRes.success) {
      setTestResult(pingRes);
      setSyncing(false);
      return;
    }

    // Sync data
    const syncRes = await StorageService.syncWithGoogleSheets();
    setSyncing(false);
    if (syncRes) {
      setSyncSuccess(true);
      if (onSyncComplete) onSyncComplete();
      setTimeout(() => {
        setSyncSuccess(false);
      }, 3000);
    } else {
      setTestResult({
        success: true,
        message: 'Tersambung ke Google Apps Script, database siap menerima data baru!'
      });
    }
  };

  const isConnected = GoogleSheetsService.isConnected();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-red-900/10 via-transparent to-amber-900/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-800 text-white shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Integrasi Database Google Spreadsheet
                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                  isConnected 
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300/40' 
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300/40'
                }`}>
                  {isConnected ? '🟢 Cloud Aktif' : '⚪ Mode Lokal'}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hubungkan web app ke Google Sheets via Google Apps Script (Code.gs)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-950/50">
          <button
            onClick={() => setActiveTab('koneksi')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'koneksi'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            Koneksi Web App
          </button>
          <button
            onClick={() => setActiveTab('kode')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'kode'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Kode Code.gs
            <span className="px-1.5 py-0.2 text-[9px] rounded bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 font-bold">
              Siap Pakai
            </span>
          </button>
          <button
            onClick={() => setActiveTab('panduan')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'panduan'
                ? 'border-red-600 text-red-600 dark:text-red-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Panduan Deploy 5 Menit
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* TAB 1: KONEKSI */}
          {activeTab === 'koneksi' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  URL Web App Google Apps Script
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webAppUrl}
                    onChange={(e) => setWebAppUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    onClick={handleTestPing}
                    disabled={testing || writingTest || !webAppUrl}
                    className="px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    title="Cek apakah URL Google Apps Script merespons"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
                    Uji Ping
                  </button>
                  <button
                    onClick={handleTestWrite}
                    disabled={testing || writingTest || !webAppUrl}
                    className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/80 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800 transition disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
                    title="Kirim 1 baris aspirasi uji coba langsung ke sheet Aspirasi"
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${writingTest ? 'animate-spin' : ''}`} />
                    Uji Tulis Baris
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  Didapatkan dari menu <span className="font-semibold text-red-600">Deploy &gt; New deployment &gt; Web app</span> pada Google Sheets Anda.
                </p>
              </div>

              {testResult && (
                <div className={`p-3 rounded-xl flex items-start gap-2.5 text-xs ${
                  testResult.success 
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                }`}>
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold">{testResult.success ? 'Berhasil Terhubung!' : 'Gagal Menghubungkan:'} </span>
                    {testResult.message}
                  </div>
                </div>
              )}

              {syncSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Sinkronisasi data cloud Google Spreadsheet selesai dengan sukses!</span>
                </div>
              )}

              {/* Data Modules Stored Online */}
              <div className="pt-2">
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Struktur Data yang Disimpan Otomatis ke Spreadsheet:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { name: 'Aspirasi Guru', desc: '13 Kolom + Tiket & Respon' },
                    { name: 'Berita & Artikel', desc: '12 Kolom + Tags & Views' },
                    { name: 'Pengumuman / Agenda', desc: '9 Kolom + Lampiran' },
                    { name: 'Laporan Keuangan', desc: '12 Kolom + Rekapitulasi Kas' },
                    { name: 'Data Anggota', desc: '9 Kolom + KTA & Ranting' },
                  ].map((s, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-left">
                      <div className="font-bold text-xs text-red-800 dark:text-red-400">Sheet: {s.name}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('kode')}
                  className="text-xs font-semibold text-red-700 dark:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Lihat & Salin Kode Code.gs
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndSync}
                  disabled={syncing || !webAppUrl}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-red-800 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
                  {syncing ? 'Menyinkronkan...' : 'Simpan & Sinkronkan Data'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: KODE CODE.GS */}
          {activeTab === 'kode' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    File: Code.gs (Google Apps Script)
                  </span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Otomatis membuat 5 sheet & format header merah marun saat dijalankan.
                  </p>
                </div>
                <button
                  onClick={handleCopyCode}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                    copied 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-red-800 hover:bg-red-700 text-white'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Tersalin!' : 'Salin Kode Code.gs'}
                </button>
              </div>

              {/* Code viewer */}
              <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 font-mono text-[11px] text-slate-300">
                <pre className="p-4 overflow-x-auto max-h-80 leading-relaxed select-all">
                  {GOOGLE_APPS_SCRIPT_CODE}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: PANDUAN DEPLOY */}
          {activeTab === 'panduan' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 text-amber-900 dark:text-amber-200 text-xs">
                <span className="font-bold">Langkah Praktis 5 Menit:</span> Ikuti panduan di bawah ini untuk membuat backend spreadsheet Google Anda sendiri secara gratis tanpa biaya server.
              </div>

              <div className="space-y-3">
                {[
                  {
                    step: '1',
                    title: 'Buka Google Spreadsheet Baru',
                    desc: 'Kunjungi sheets.new di browser Anda dan beri nama dokumen, misalnya "Database PGRI Cabang Leuwisadeng".',
                  },
                  {
                    step: '2',
                    title: 'Buka Editor Apps Script',
                    desc: 'Di menu atas Google Sheets, klik menu Ekstensi (Extensions) > Apps Script.',
                  },
                  {
                    step: '3',
                    title: 'Tempel Kode Code.gs',
                    desc: 'Hapus kode bawaan myFunction(), lalu tempel kode lengkap yang dapat Anda salin dari tab "Kode Code.gs". Klik tombol Simpan (ikon disket).',
                  },
                  {
                    step: '4',
                    title: 'Jalankan setupDatabase() Sekali',
                    desc: 'Pilih fungsi setupDatabase pada dropdown atas lalu klik Jalankan (Run). Izinkan izin akses (Review Permissions > Advanced > Go to Untitled project > Allow). 5 Sheet (Aspirasi, Berita, Pengumuman, LaporanKeuangan, Anggota) beserta header akan langsung terbentuk otomatis!',
                  },
                  {
                    step: '5',
                    title: 'Deploy sebagai Web App',
                    desc: 'Klik tombol biru Terapkan (Deploy) > Deployment baru (New deployment). Klik roda gigi kiri, pilih Aplikasi Web (Web app). Atur "Jalankan sebagai: Saya (Execute as: Me)" dan "Yang memiliki akses: Siapa saja (Who has access: Anyone)". Salin URL Web App dan tempelkan pada tab "Koneksi Web App" di modal ini.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="w-6 h-6 rounded-full bg-red-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Troubleshooting Tips */}
              <div className="p-4 rounded-xl bg-red-50/80 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 space-y-2 text-xs">
                <div className="font-bold text-red-800 dark:text-red-300 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Troubleshooting: Mengapa data belum masuk ke Spreadsheet?</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300 list-disc list-inside">
                  <li>
                    <span className="font-bold text-red-700 dark:text-red-400">Paling Sering Terjadi:</span> Saat deploy, pastikan opsi <span className="font-semibold">"Who has access"</span> dipilih <span className="font-bold text-red-600 dark:text-red-300">"Anyone" (Siapa saja)</span>. Jika memilih "Only myself", Google akan memblokir data dari web.
                  </li>
                  <li>
                    <span className="font-bold text-red-700 dark:text-red-400">Update Kode:</span> Jika Anda memperbarui kode di Code.gs, wajib klik <span className="font-semibold">Deploy &gt; Manage deployments &gt; Edit (ikon pensil) &gt; Versi: New version &gt; Deploy</span>.
                  </li>
                  <li>
                    <span className="font-bold text-red-700 dark:text-red-400">Verifikasi Langsung:</span> Buka tab <span className="font-semibold">"Koneksi Web App"</span> lalu klik tombol <span className="font-bold text-red-700">"Uji Tulis Baris"</span> untuk melihat baris data langsung masuk ke sheet Aspirasi.
                  </li>
                </ul>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setActiveTab('koneksi')}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-red-800 text-white hover:bg-red-700 transition cursor-pointer"
                >
                  Sudah Mendapatkan URL? Tempel Sekarang
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
