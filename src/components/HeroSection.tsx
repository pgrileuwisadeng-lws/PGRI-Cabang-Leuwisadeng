import React from 'react';
import { 
  CreditCard, 
  MessageSquare, 
  Award, 
  ArrowRight, 
  Building2, 
  TrendingUp,
  FileText,
  Users,
  ShieldCheck,
  Radio,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { LOGO_PGRI, LOGO_BOGOR } from '../data/initialData';

interface HeroSectionProps {
  onNavigate: (tab: string) => void;
  membersCount?: number;
  totalIncome?: number;
  monthlyReportsCount?: number;
  activeAnnouncementsCount?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  membersCount = 0,
  totalIncome = 0,
  monthlyReportsCount = 0,
  activeAnnouncementsCount = 0,
}) => {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800/80">
      
      {/* Background ambient lighting effects */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[900px] h-[500px] bg-gradient-to-b from-red-700/25 via-red-900/10 to-transparent blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-amber-600/10 blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      {/* Live Announcement Ticker */}
      <div className="relative border-b border-white/10 bg-white/5 backdrop-blur-md px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-600 text-white uppercase tracking-wider animate-pulse">
              <Radio className="w-3 h-3" /> Live
            </span>
            <span className="text-slate-300 font-medium truncate text-[11px] sm:text-xs">
              Portal Resmi PGRI Leuwisadeng • Penerbitan KTA Digital pbpgri.org • Transparansi Kas Terbuka • Layanan Advokasi & Aspirasi Guru
            </span>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Main Hero Editorial Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-red-300 text-xs font-semibold backdrop-blur-md shadow-inner">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Persatuan Guru Republik Indonesia • Cabang Leuwisadeng</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Satu Suara, Satu Barisan Demi{' '}
              <span className="bg-gradient-to-r from-red-400 via-red-200 to-amber-200 bg-clip-text text-transparent">
                Martabat Pendidik
              </span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-normal">
              Selamat datang di portal resmi PGRI Cabang Leuwisadeng, Kabupaten Bogor. Pusat informasi advokasi, pengurusan KTA Digital Nasional, transparansi kas bulanan, dan saluran aspirasi guru yang terhubung langsung ke Google Sheets.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => onNavigate('kta-digital')}
                className="px-5 py-3 rounded-full bg-red-700 hover:bg-red-600 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-900/40 transition flex items-center gap-2 cursor-pointer border border-red-500/30"
              >
                <CreditCard className="w-4 h-4 text-white" />
                <span>Pengurusan KTA Digital</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-200" />
              </button>

              <button
                onClick={() => onNavigate('laporan-keuangan')}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 text-white font-semibold text-xs sm:text-sm border border-white/20 transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Laporan Kas Bulanan</span>
              </button>

              <button
                onClick={() => onNavigate('aspirasi')}
                className="px-4 py-3 rounded-full bg-slate-900/80 hover:bg-slate-850 active:scale-95 text-slate-200 font-medium border border-slate-800 transition flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saluran Aspirasi</span>
              </button>
            </div>

            {/* Verified Footnote */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Terdaftar PB PGRI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>9 Ranting Se-Kecamatan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Database Cloud Online</span>
              </div>
            </div>
          </div>

          {/* Side Bento Graphic Badges & Stats */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/15 shadow-2xl overflow-hidden">
              
              {/* Subtle top glare */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

              {/* Logo Emblem Header */}
              <div className="flex items-center justify-around pb-5 border-b border-white/10">
                <div className="text-center group">
                  <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center border border-white/30 transition group-hover:scale-105">
                    <img 
                      src={LOGO_PGRI} 
                      alt="Logo PGRI Leuwisadeng" 
                      className="h-full w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="block mt-2 text-xs font-bold text-white tracking-wide">
                    PGRI LEUWISADENG
                  </span>
                  <span className="text-[10px] text-red-300">Pengurus Cabang</span>
                </div>

                <div className="h-12 w-px bg-white/15"></div>

                <div className="text-center group">
                  <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md p-1.5 shadow-md flex items-center justify-center border border-white/20 transition group-hover:scale-105">
                    <img 
                      src={LOGO_BOGOR} 
                      alt="Logo Kab Bogor" 
                      className="h-full w-full object-contain drop-shadow"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="block mt-2 text-xs font-bold text-amber-300 tracking-wide">
                    KAB. BOGOR
                  </span>
                  <span className="text-[10px] text-slate-400">Jawa Barat</span>
                </div>
              </div>

              {/* Modern Bento Metric Grid */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                
                {/* Metric 1 */}
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-3.5 hover:border-red-500/30 transition">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="text-[11px] font-medium">Ranting Aktif</span>
                    <Building2 className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1.5">9</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">SD, SMP, SMK, PAUD</div>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-3.5 hover:border-red-500/30 transition">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="text-[11px] font-medium">Data Guru</span>
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1.5">{membersCount || 260}+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Pendidik Terdaftar</div>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-3.5 hover:border-amber-500/30 transition">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="text-[11px] font-medium">Saldo Kas Aktif</span>
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="text-lg font-black text-amber-300 mt-1.5">
                    Rp 22.100.000
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Transparan & Terbuka</div>
                </div>

                {/* Metric 4 */}
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-3.5 hover:border-emerald-500/30 transition">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span className="text-[11px] font-medium">Layanan Advokasi</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-base font-black text-emerald-300 mt-1.5">
                    Resmi & Sigap
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">LKBH PGRI Siap Kawal</div>
                </div>
              </div>

              {/* Secretariat Badge */}
              <div className="mt-4 pt-3 border-t border-white/10 text-center text-[10px] text-slate-400 leading-normal">
                📍 Sekretariat: Jl. Raya Sadeng - Leuwisadeng, Kec. Leuwisadeng, Kab. Bogor 16640
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
