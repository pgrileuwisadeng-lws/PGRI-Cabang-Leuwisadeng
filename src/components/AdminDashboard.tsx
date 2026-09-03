import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  MessageSquare, 
  PlusCircle, 
  FileSpreadsheet, 
  Download, 
  Trash2, 
  ShieldCheck, 
  TrendingUp, 
  Wallet, 
  LogOut, 
  ExternalLink,
  Database,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { 
  Member, 
  Article, 
  Announcement, 
  Aspiration, 
  MonthlyBudgetReport 
} from '../types';
import { StorageService } from '../services/storage';
import { GoogleSheetsService } from '../services/googleSheets';
import { RANTING_LIST } from '../data/initialData';

interface AdminDashboardProps {
  members: Member[];
  monthlyReports: MonthlyBudgetReport[];
  articles: Article[];
  announcements: Announcement[];
  aspirations: Aspiration[];
  onRefreshData: () => void;
  onLogout: () => void;
  onOpenGoogleSheetsModal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  members = [],
  monthlyReports = [],
  articles = [],
  announcements = [],
  aspirations = [],
  onRefreshData,
  onLogout,
  onOpenGoogleSheetsModal,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'ringkasan' | 'anggota' | 'laporan-keuangan' | 'artikel' | 'pengumuman' | 'aspirasi'>('ringkasan');

  // Form states
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Berita' as Article['category'],
    author: 'Pengurus Cabang',
    authorRole: 'Humas PGRI Leuwisadeng',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    excerpt: '',
    content: '',
    tags: 'PGRI, Leuwisadeng, Guru',
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    category: 'Kegiatan Organisasi' as Announcement['category'],
    eventDate: '',
    location: '',
    isUrgent: false,
    content: '',
    attachmentName: 'Surat_Edaran_Cabang.pdf',
  });

  const [reportForm, setReportForm] = useState({
    monthYear: '',
    periodCode: '',
    startingBalance: 0,
    totalIncome: 0,
    totalExpense: 0,
    notes: 'Laporan kas bulanan disahkan bendahara & ketua PGRI Cabang Leuwisadeng.',
    verifiedBy: 'Bendahara PGRI Cabang Leuwisadeng',
  });

  const [responseModalAspiration, setResponseModalAspiration] = useState<Aspiration | null>(null);
  const [officialResponseText, setOfficialResponseText] = useState('');
  const [newAspStatus, setNewAspStatus] = useState<Aspiration['status']>('Selesai Ditanggapi');

  // Anggota Search/Filter
  const [memberSearch, setMemberSearch] = useState('');
  const [selectedRantingFilter, setSelectedRantingFilter] = useState('Semua');

  const filteredMembers = (members || []).filter(m => {
    const matchRanting = selectedRantingFilter === 'Semua' || m.branchUnit === selectedRantingFilter;
    const matchQuery = !memberSearch || 
      m.fullName.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.schoolOrigin.toLowerCase().includes(memberSearch.toLowerCase()) ||
      (m.ktaNumber && m.ktaNumber.includes(memberSearch));
    return matchRanting && matchQuery;
  });

  // Handlers for Articles
  const handlePostArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.content.trim()) return;

    StorageService.addArticle({
      title: articleForm.title,
      slug: articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: articleForm.category,
      author: articleForm.author,
      authorRole: articleForm.authorRole,
      date: new Date().toISOString().split('T')[0],
      coverImage: articleForm.coverImage,
      excerpt: articleForm.excerpt || articleForm.content.substring(0, 150) + '...',
      content: articleForm.content,
      tags: articleForm.tags.split(',').map(t => t.trim()),
    });

    onRefreshData();
    setArticleForm({
      title: '',
      category: 'Berita',
      author: 'Pengurus Cabang',
      authorRole: 'Humas PGRI Leuwisadeng',
      coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
      excerpt: '',
      content: '',
      tags: 'PGRI, Leuwisadeng, Guru',
    });
    alert('Berita berhasil diterbitkan!');
  };

  const handleDeleteArticle = (id: string) => {
    if (window.confirm('Yakin ingin menghapus artikel berita ini?')) {
      StorageService.deleteArticle(id);
      onRefreshData();
    }
  };

  // Handlers for Announcements
  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementForm.title.trim() || !announcementForm.content.trim()) return;

    StorageService.addAnnouncement({
      title: announcementForm.title,
      category: announcementForm.category,
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      eventDate: announcementForm.eventDate,
      location: announcementForm.location,
      isUrgent: announcementForm.isUrgent,
      content: announcementForm.content,
      attachmentName: announcementForm.attachmentName,
    });

    onRefreshData();
    setAnnouncementForm({
      title: '',
      category: 'Kegiatan Organisasi',
      eventDate: '',
      location: '',
      isUrgent: false,
      content: '',
      attachmentName: 'Surat_Edaran_Cabang.pdf',
    });
    alert('Pengumuman kegiatan berhasil dipublikasikan!');
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (window.confirm('Hapus pengumuman ini?')) {
      StorageService.deleteAnnouncement(id);
      onRefreshData();
    }
  };

  // Handlers for Monthly Budget Reports
  const handleAddMonthlyReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.monthYear.trim()) return;

    const endingBal = Number(reportForm.startingBalance) + Number(reportForm.totalIncome) - Number(reportForm.totalExpense);

    StorageService.addMonthlyReport({
      monthYear: reportForm.monthYear,
      periodCode: reportForm.periodCode || new Date().toISOString().substring(0, 7),
      startingBalance: Number(reportForm.startingBalance),
      totalIncome: Number(reportForm.totalIncome),
      totalExpense: Number(reportForm.totalExpense),
      endingBalance: endingBal,
      incomeCategories: [
        { name: 'Iuran Wajib Ranting Anggota', amount: Number(reportForm.totalIncome) * 0.85 },
        { name: 'Bantuan Operasional / Dana Abadi', amount: Number(reportForm.totalIncome) * 0.15 }
      ],
      expenseCategories: [
        { name: 'Advokasi & Bantuan Hukum Anggota', amount: Number(reportForm.totalExpense) * 0.3 },
        { name: 'Pelatihan Kompetensi & Seminar Guru', amount: Number(reportForm.totalExpense) * 0.4 },
        { name: 'Operasional Sekretariat & Publikasi', amount: Number(reportForm.totalExpense) * 0.3 }
      ],
      status: 'Final',
      notes: reportForm.notes,
      verifiedBy: reportForm.verifiedBy,
    });

    onRefreshData();
    setReportForm({
      monthYear: '',
      periodCode: '',
      startingBalance: 0,
      totalIncome: 0,
      totalExpense: 0,
      notes: 'Laporan kas bulanan disahkan bendahara & ketua PGRI Cabang Leuwisadeng.',
      verifiedBy: 'Bendahara PGRI Cabang Leuwisadeng',
    });
    alert('Laporan transparansi keuangan bulanan berhasil ditambahkan!');
  };

  // Aspirations handler
  const handleSaveAspirationResponse = () => {
    if (!responseModalAspiration) return;
    StorageService.respondAspiration(
      responseModalAspiration.id,
      officialResponseText,
      newAspStatus
    );
    setResponseModalAspiration(null);
    setOfficialResponseText('');
    onRefreshData();
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Hapus data anggota ini dari basis data lokal cabang?')) {
      StorageService.deleteMember(id);
      onRefreshData();
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      
      {/* Top Banner with 2FA Indicator */}
      <div className="rounded-2xl bg-gradient-to-r from-red-950 via-red-900 to-red-800 text-white p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-xs">
            <ShieldCheck className="w-8 h-8 text-red-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                Dashboard Pengurus Cabang
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
                ADMIN AKTIF
              </span>
            </div>
            <p className="text-xs text-red-100 mt-1">
              Hak Akses: Pengurus Cabang & Administrator TI PGRI Leuwisadeng
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {onOpenGoogleSheetsModal && (
            <button
              onClick={onOpenGoogleSheetsModal}
              className="px-3.5 py-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-emerald-400/30 shadow-xs"
            >
              <Database className="w-4 h-4 text-emerald-200" />
              <span>Database Spreadsheet</span>
            </button>
          )}
          <button
            onClick={() => StorageService.exportFinancialToPDF()}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer border border-white/20"
          >
            <Download className="w-4 h-4 text-red-200" />
            <span>Cetak PDF Kas</span>
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </div>

      {/* Admin Tabs Bar */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'ringkasan', label: 'Ringkasan', icon: TrendingUp },
          { id: 'anggota', label: `Data Anggota (${members.length})`, icon: Users },
          { id: 'laporan-keuangan', label: `Laporan Keuangan (${monthlyReports.length})`, icon: Wallet },
          { id: 'artikel', label: 'Posting Berita', icon: FileText },
          { id: 'pengumuman', label: 'Posting Agenda', icon: Calendar },
          { id: 'aspirasi', label: `Aspirasi Guru (${aspirations.length})`, icon: MessageSquare },
        ].map(t => {
          const Icon = t.icon;
          const isActive = activeAdminTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveAdminTab(t.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-red-50 hover:text-red-700 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: RINGKASAN */}
      {activeAdminTab === 'ringkasan' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Total Anggota Terdata</div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">{members.length}</div>
              <div className="text-[11px] text-red-700 dark:text-red-400 font-medium mt-1">9 Ranting di Leuwisadeng</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Laporan Kas Terpublikasi</div>
              <div className="text-3xl font-black text-red-700 dark:text-red-400 mt-1">{monthlyReports.length} Periode</div>
              <div className="text-[11px] text-slate-500 mt-1">Transparansi Bulanan</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Kabar / Berita</div>
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">{articles.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Publikasi Terverifikasi</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="text-xs text-slate-500 font-semibold uppercase">Aspirasi Anggota</div>
              <div className="text-3xl font-black text-red-700 dark:text-red-400 mt-1">{aspirations.length}</div>
              <div className="text-[11px] text-slate-500 mt-1">Saluran advokasi aktif</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Google Sheets Cloud DB Card */}
            <div className="bg-gradient-to-br from-emerald-950/20 via-white dark:via-slate-900 to-emerald-950/10 dark:bg-slate-900 p-6 rounded-2xl border border-emerald-300/50 dark:border-emerald-800/60 space-y-4 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Google Spreadsheet Database</span>
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  GoogleSheetsService.isConnected()
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                }`}>
                  {GoogleSheetsService.isConnected() ? '🟢 Online Cloud' : '⚪ Lokal'}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Terhubung via Google Apps Script (Code.gs). Semua input aspirasi, berita, agenda, kas, dan anggota tersimpan otomatis ke sheet Anda.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {onOpenGoogleSheetsModal && (
                  <button
                    onClick={onOpenGoogleSheetsModal}
                    className="px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Konfigurasi & Kode GS</span>
                  </button>
                )}
                <button
                  onClick={async () => {
                    const ok = await StorageService.syncWithGoogleSheets();
                    if (ok) {
                      onRefreshData();
                      alert('Sinkronisasi data Google Sheets berhasil!');
                    } else {
                      if (onOpenGoogleSheetsModal) onOpenGoogleSheetsModal();
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-600" />
                  <span>Sinkronkan Sekarang</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-red-700" />
                <span>Transparansi Laporan Kas Bulanan</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Sesuai kebijakan pengurus, pengelolaan kas cabang diringkas dalam bentuk laporan keuangan bulanan yang dapat diunduh publik dalam format PDF resmi.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => StorageService.exportFinancialToPDF()}
                  className="px-3.5 py-2 rounded-xl bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Cetak Laporan Kas (PDF)</span>
                </button>
                <button
                  onClick={() => setActiveAdminTab('laporan-keuangan')}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-200 transition cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4 text-red-600" />
                  <span>Input Kas Bulan Baru</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-red-700" />
                <span>Pusat KTA Digital PB PGRI</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Pendaftaran anggota baru dan pencetakan KTA resmi diproses langsung melalui sistem satu pintu PB PGRI di <code>https://ktadigitalpgri.org/</code>.
              </p>
              <div className="pt-2">
                <a
                  href="https://ktadigitalpgri.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-red-700 dark:text-red-400 text-xs font-bold hover:bg-red-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
                >
                  <span>Buka Portal KTA Digital</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: KELOLA ANGGOTA */}
      {activeAdminTab === 'anggota' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                Daftar Anggota PGRI Cabang Leuwisadeng
              </h3>
              <p className="text-xs text-slate-500">
                Data anggota guru terdata dari 9 ranting di lingkungan Cabang Leuwisadeng.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => StorageService.exportMembersToCSV()}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Ekspor Excel (.csv)</span>
              </button>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Cari nama anggota, No. KTA, atau asal sekolah..."
              value={memberSearch}
              onChange={(e) => setMemberSearch(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
            />
            <select
              value={selectedRantingFilter}
              onChange={(e) => setSelectedRantingFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
            >
              <option value="Semua">Semua Ranting ({members.length})</option>
              {RANTING_LIST.map(r => (
                <option key={r.name} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 font-semibold">Nama Lengkap</th>
                  <th className="p-3 font-semibold">No. KTA</th>
                  <th className="p-3 font-semibold">Ranting & Satuan</th>
                  <th className="p-3 font-semibold">Status Kepegawaian</th>
                  <th className="p-3 font-semibold">Kontak</th>
                  <th className="p-3 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredMembers.map(m => (
                  <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100">
                      {m.fullName}
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                      {m.ktaNumber || '-'}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">{m.branchUnit}</div>
                      <div>{m.schoolOrigin}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {m.employmentStatus}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      <div>{m.phone}</div>
                      <div className="text-[10px] text-slate-400">{m.email}</div>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteMember(m.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                        title="Hapus Anggota"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: LAPORAN KEUANGAN BULANAN */}
      {activeAdminTab === 'laporan-keuangan' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  Input Laporan Transparansi Keuangan Kas Bulanan
                </h3>
                <p className="text-xs text-slate-500">
                  Publikasikan ringkasan saldo kas, penerimaan, dan pengeluaran per periode bulan untuk diakses seluruh anggota.
                </p>
              </div>

              <button
                onClick={() => StorageService.exportFinancialToPDF()}
                className="px-3.5 py-2 rounded-xl bg-red-700 text-white hover:bg-red-800 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Laporan PDF</span>
              </button>
            </div>

            <form onSubmit={handleAddMonthlyReport} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Bulan & Tahun *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: April 2026"
                    value={reportForm.monthYear}
                    onChange={(e) => setReportForm({ ...reportForm, monthYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Kode Periode
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: 2026-04"
                    value={reportForm.periodCode}
                    onChange={(e) => setReportForm({ ...reportForm, periodCode: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Saldo Kas Awal (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={reportForm.startingBalance}
                    onChange={(e) => setReportForm({ ...reportForm, startingBalance: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Total Penerimaan Kas (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={reportForm.totalIncome}
                    onChange={(e) => setReportForm({ ...reportForm, totalIncome: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Total Pengeluaran Kas (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={reportForm.totalExpense}
                    onChange={(e) => setReportForm({ ...reportForm, totalExpense: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Pengesahan / Verifikator
                  </label>
                  <input
                    type="text"
                    value={reportForm.verifiedBy}
                    onChange={(e) => setReportForm({ ...reportForm, verifiedBy: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Catatan Keterangan
                  </label>
                  <input
                    type="text"
                    value={reportForm.notes}
                    onChange={(e) => setReportForm({ ...reportForm, notes: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Terbitkan Laporan Bulan Ini</span>
              </button>
            </form>
          </div>

          {/* List of Existing Reports */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Riwayat Laporan Bulanan Tersimpan ({monthlyReports.length})
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyReports.map(rep => (
                <div key={rep.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{rep.monthYear}</span>
                    <span className="text-[11px] text-slate-500">{rep.status}</span>
                  </div>
                  <div className="space-y-1 text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>Saldo Awal:</span>
                      <span>Rp {rep.startingBalance.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Penerimaan:</span>
                      <span>+Rp {rep.totalIncome.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-rose-600 font-semibold">
                      <span>Pengeluaran:</span>
                      <span>-Rp {rep.totalExpense.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1 font-bold text-slate-900 dark:text-slate-100">
                      <span>Saldo Akhir:</span>
                      <span className="text-red-700 dark:text-red-400">Rp {rep.endingBalance.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-500 italic pt-1">
                    {rep.verifiedBy}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: POSTING BERITA */}
      {activeAdminTab === 'artikel' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Tulis & Terbitkan Berita Baru
            </h3>
            
            <form onSubmit={handlePostArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Judul Berita *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Konferensi Kerja PGRI Leuwisadeng..."
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Kategori
                  </label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  >
                    <option value="Berita">Berita Organisasi</option>
                    <option value="Pendidikan">Pendidikan</option>
                    <option value="Advokasi">Advokasi & Kesejahteraan</option>
                    <option value="Pelatihan">Pelatihan</option>
                    <option value="Opini Guru">Opini Guru</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Foto Sampul (URL Image)
                  </label>
                  <input
                    type="url"
                    value={articleForm.coverImage}
                    onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan inti berita dalam 1-2 kalimat..."
                  value={articleForm.excerpt}
                  onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Isi Lengkap Berita *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tuliskan berita lengkap..."
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Terbitkan Berita</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Daftar Berita Terbit ({articles.length})
            </h3>
            <div className="space-y-3">
              {articles.map(art => (
                <div key={art.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900">
                      {art.category}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-1 line-clamp-1">{art.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{art.date} • {art.author}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteArticle(art.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: POSTING PENGUMUMAN */}
      {activeAdminTab === 'pengumuman' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Publikasikan Agenda / Surat Edaran
            </h3>

            <form onSubmit={handlePostAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Judul Pengumuman / Agenda *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rapat Koordinasi Persiapan Hardiknas..."
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Kategori
                  </label>
                  <select
                    value={announcementForm.category}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  >
                    <option value="Kegiatan Organisasi">Kegiatan Organisasi</option>
                    <option value="Pelatihan / Diklat">Pelatihan / Diklat</option>
                    <option value="Surat Edaran">Surat Edaran</option>
                    <option value="Rapat Pengurus">Rapat Pengurus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Waktu / Jadwal Pelaksanaan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Sabtu, 15 Mei 2026 - 08.30 WIB"
                    value={announcementForm.eventDate}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, eventDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Lokasi Kegiatan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Aula PGRI Cabang Leuwisadeng"
                    value={announcementForm.location}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    Lampiran Berkas (PDF)
                  </label>
                  <input
                    type="text"
                    value={announcementForm.attachmentName}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, attachmentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="urgentCheck"
                  checked={announcementForm.isUrgent}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, isUrgent: e.target.checked })}
                  className="w-4 h-4 rounded accent-red-700"
                />
                <label htmlFor="urgentCheck" className="font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
                  Tandai sebagai Agenda Mendesak / PENTING
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Uraian Isi Pengumuman *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan instruksi atau uraian kegiatan..."
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publikasikan Pengumuman</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Agenda & Pengumuman Aktif ({announcements.length})
            </h3>
            <div className="space-y-3">
              {announcements.map(anc => (
                <div key={anc.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                        {anc.category}
                      </span>
                      {anc.isUrgent && (
                        <span className="text-[10px] font-bold text-rose-600">PENTING</span>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 mt-1">{anc.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{anc.eventDate || anc.date}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteAnnouncement(anc.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition cursor-pointer"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: KELOLA ASPIRASI */}
      {activeAdminTab === 'aspirasi' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
              Daftar Aspirasi & Permohonan Advokasi Masuk
            </h3>
            <p className="text-xs text-slate-500">
              Berikan tanggapan resmi pengurus cabang dan perbarui status tindak lanjut untuk setiap tiket aspirasi.
            </p>
          </div>

          <div className="space-y-4">
            {aspirations.map(asp => (
              <div
                key={asp.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-red-700 dark:text-red-400">
                      {asp.ticketNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300">
                      {asp.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      asp.status === 'Selesai Ditanggapi'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {asp.status}
                    </span>
                    <button
                      onClick={() => {
                        setResponseModalAspiration(asp);
                        setOfficialResponseText(asp.officialResponse || '');
                        setNewAspStatus(asp.status);
                      }}
                      className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition"
                    >
                      Beri Tanggapan
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{asp.subject}</h4>
                  <p className="text-slate-600 dark:text-slate-300 mt-1">{asp.message}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span>Pengirim: <strong>{asp.senderName}</strong></span>
                  <span>Satuan: {asp.schoolOrigin}</span>
                  <span>WhatsApp: {asp.phone}</span>
                  <span>Tanggal: {asp.date}</span>
                </div>

                {asp.officialResponse && (
                  <div className="p-3 bg-red-50/60 dark:bg-slate-700/60 rounded-lg border-l-2 border-red-700 space-y-1">
                    <div className="font-bold text-red-800 dark:text-red-300 text-[11px]">
                      Tanggapan Resmi Pengurus ({asp.responseDate}):
                    </div>
                    <p className="text-slate-800 dark:text-slate-200 italic">{asp.officialResponse}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Response Modal */}
      {responseModalAspiration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Tanggapan Resmi Pengurus Cabang
            </h3>
            <p className="text-xs text-slate-500">
              Tiket: <strong className="font-mono">{responseModalAspiration.ticketNumber}</strong> - {responseModalAspiration.subject}
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Status Penanganan
                </label>
                <select
                  value={newAspStatus}
                  onChange={(e) => setNewAspStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                >
                  <option value="Sedang Diproses">Sedang Diproses</option>
                  <option value="Selesai Ditanggapi">Selesai Ditanggapi</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
                  Uraian Tanggapan / Tindak Lanjut Resmi
                </label>
                <textarea
                  rows={4}
                  placeholder="Tuliskan respon resmi yang dapat dilihat anggota melalui nomor tiket..."
                  value={officialResponseText}
                  onChange={(e) => setOfficialResponseText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setResponseModalAspiration(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold cursor-pointer hover:bg-slate-200"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveAspirationResponse}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold cursor-pointer transition shadow-xs"
              >
                Simpan & Publikasikan Tanggapan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
