import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Building, 
  BookMarked, 
  MapPin, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react';
import { BOARD_MEMBERS, RANTING_LIST } from '../data/initialData';

export const LeadershipSection: React.FC = () => {
  return (
    <section id="pengurus" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2 border border-red-200 dark:border-red-900">
          <Users className="w-4 h-4" />
          <span>Profil Organisasi</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Pengurus PGRI Cabang Leuwisadeng
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
          Masa Bakti XXII Tahun 2020 – 2025 (Diperpanjang). Mengabdi dengan ketulusan, memperjuangkan martabat guru, serta menjaga mutu pendidikan di Kecamatan Leuwisadeng, Kabupaten Bogor.
        </p>
      </div>

      {/* Visi & Misi Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white p-7 rounded-2xl shadow-md border border-red-900/60 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-white/15 text-red-100">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-red-200 font-bold">Arah Perjuangan</span>
              <h3 className="text-xl font-black">Visi Organisasi</h3>
            </div>
          </div>
          <p className="text-sm text-red-50/90 leading-relaxed italic bg-black/20 p-4 rounded-xl border border-white/10">
            "Terwujudnya PGRI Cabang Leuwisadeng sebagai organisasi profesi pendidik yang mandiri, solid, profesional, bermartabat, serta terdepan dalam memperjuangkan kesejahteraan dan perlindungan guru di Kabupaten Bogor."
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-7 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-red-700 dark:text-red-400 font-bold">Langkah Strategis</span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Misi Utama</h3>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-700 dark:text-red-400 mt-0.5 shrink-0" />
              <span>Meningkatkan kompetensi pedagogik, profesional, kepribadian, dan sosial pendidik secara berkelanjutan.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-700 dark:text-red-400 mt-0.5 shrink-0" />
              <span>Memperjuangkan perlindungan hukum, keselamatan kerja, dan kesejahteraan seluruh guru PNS, PPPK, maupun Honorer.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-700 dark:text-red-400 mt-0.5 shrink-0" />
              <span>Membangun transparansi tata kelola keuangan organisasi berbasis laporan bulanan yang akuntabel.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-700 dark:text-red-400 mt-0.5 shrink-0" />
              <span>Mempererat tali silaturahmi, solidaritas, dan kepedulian sosial antar sesama anggota dan keluarga guru.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Board Members Cards */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Struktur Inti Dewan Pengurus Cabang
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Penggerak roda organisasi PGRI Cabang Leuwisadeng
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-900">
            Periode Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOARD_MEMBERS.map((b, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:border-red-300 dark:hover:border-red-900 transition duration-200 flex items-center space-x-4"
            >
              <img
                src={b.image}
                alt={b.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-red-200 dark:border-red-900 p-0.5 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {b.role}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate mt-1">
                  {b.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  NIP: {b.nip}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-red-700 dark:text-red-400 mt-1 font-medium">
                  <Briefcase className="w-3 h-3" />
                  <span className="truncate">{b.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ranting / Unit Kerja List */}
      <div>
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Building className="w-5 h-5 text-red-700 dark:text-red-400" />
              <span>Daftar Ranting / Unit Kerja Se-Kecamatan Leuwisadeng</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Total 9 Ranting meliputi jenjang PAUD/TK, SD, SMP, SMA/SMK, hingga Madrasah
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {RANTING_LIST.map((r) => (
            <div 
              key={r.name}
              className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-300 dark:hover:border-red-900 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  {r.name}
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 font-semibold border border-red-200 dark:border-red-900">
                  {r.membersCount} Guru
                </span>
              </div>
              <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Koordinator: <strong className="text-slate-900 dark:text-slate-100">{r.head}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kode Etik Guru Indonesia Callout */}
      <div className="bg-red-50/60 dark:bg-slate-900/80 border border-red-200 dark:border-red-950 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-red-700 dark:text-red-300 border border-red-200 dark:border-slate-700 shrink-0">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Janji Pendidik: Kode Etik Guru Indonesia
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              Guru Indonesia berbakti membimbing anak didik seutuhnya untuk membentuk manusia pembangunan yang berpancasila. Guru memiliki kejujuran profesional dalam menerapkan kurikulum sesuai dengan kebutuhan anak didik masing-masing.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
};
