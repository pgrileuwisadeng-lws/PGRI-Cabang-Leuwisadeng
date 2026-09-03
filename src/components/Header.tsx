import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  Bell, 
  ShieldCheck, 
  Lock,
  ChevronDown,
  CreditCard, 
  FileText, 
  MessageSquare,
  Calendar,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { LOGO_PGRI } from '../data/initialData';
import { PushNotificationItem } from '../types';
import { StorageService } from '../services/storage';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
  notifications: PushNotificationItem[];
  onRefreshNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onLogoutAdmin,
  notifications,
  onRefreshNotifications,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [layananDropdownOpen, setLayananDropdownOpen] = useState(false);
  const layananRef = useRef<HTMLDivElement>(null);

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (layananRef.current && !layananRef.current.contains(event.target as Node)) {
        setLayananDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setLayananDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLayananActive = ['kta-digital', 'laporan-keuangan', 'pengumuman', 'aspirasi'].includes(activeTab);

  const layananItems = [
    {
      id: 'kta-digital',
      title: 'KTA Digital Nasional',
      desc: 'Panduan & verifikasi kartu PB PGRI',
      icon: CreditCard,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60',
    },
    {
      id: 'laporan-keuangan',
      title: 'Transparansi Kas Bulanan',
      desc: 'Rekapitulasi kas berkala & unduh PDF',
      icon: FileText,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60',
    },
    {
      id: 'pengumuman',
      title: 'Agenda & Surat Edaran',
      desc: 'Jadwal kegiatan organisasi & dokumen',
      icon: Calendar,
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60',
    },
    {
      id: 'aspirasi',
      title: 'Saluran Aspirasi Guru',
      desc: 'Kirim tiket advokasi & pantau progres',
      icon: MessageSquare,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60',
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Compact Typography */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group shrink-0"
            onClick={() => handleNavClick('beranda')}
          >
            <div className="relative">
              <img 
                src={LOGO_PGRI} 
                alt="Logo PGRI Leuwisadeng" 
                className="h-10 w-10 object-contain rounded-xl p-0.5 bg-white border border-slate-200/80 dark:border-slate-800 shadow-xs group-hover:scale-105 transition"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-tight">
                  PGRI <span className="text-red-700 dark:text-red-500">LEUWISADENG</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-red-50 text-red-700 dark:bg-red-950/80 dark:text-red-300 border border-red-200/60 dark:border-red-900">
                  KAB. BOGOR
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:inline">
                Portal Resmi Organisasi Profesi Guru
              </span>
            </div>
          </div>

          {/* Minimalist & High-End Desktop Navigation Bar */}
          <nav className="hidden lg:flex items-center bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 rounded-full p-1 shadow-2xs backdrop-blur-md">
            
            {/* Beranda */}
            <button
              onClick={() => handleNavClick('beranda')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'beranda'
                  ? 'bg-red-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Beranda
            </button>

            {/* Kabar & Berita */}
            <button
              onClick={() => handleNavClick('berita')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'berita'
                  ? 'bg-red-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Kabar Guru
            </button>

            {/* Struktur Pengurus */}
            <button
              onClick={() => handleNavClick('pengurus')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'pengurus'
                  ? 'bg-red-700 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pengurus
            </button>

            {/* Layanan Anggota (Minimalist Dropdown) */}
            <div className="relative" ref={layananRef}>
              <button
                onClick={() => setLayananDropdownOpen(!layananDropdownOpen)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isLayananActive
                    ? 'bg-red-700 text-white shadow-xs font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Layanan</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${layananDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Minimal Dropdown Popover */}
              {layananDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    Layanan & Transparansi
                  </div>
                  <div className="space-y-1 mt-1">
                    {layananItems.map(item => {
                      const isActive = activeTab === item.id;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-300 font-semibold'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${item.color} shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold leading-snug">{item.title}</div>
                            <div className="text-[10px] text-slate-400 dark:text-slate-500 leading-tight">
                              {item.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Tools (Minimalist & Functional) */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition cursor-pointer"
              title={darkMode ? 'Mode Terang' : 'Mode Gelap'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-850 transition cursor-pointer"
                title="Pemberitahuan"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-red-600 ring-2 ring-white dark:ring-slate-950"></span>
                )}
              </button>

              {/* Notification Popup */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 py-2.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      Pemberitahuan
                    </span>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => {
                          StorageService.markAllNotificationsAsRead();
                          onRefreshNotifications();
                        }}
                        className="text-[11px] text-red-600 hover:underline cursor-pointer font-semibold"
                      >
                        Tandai dibaca
                      </button>
                    )}
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        Tidak ada notifikasi baru
                      </div>
                    ) : (
                      notifications.slice(0, 5).map(n => (
                        <div key={n.id} className={`p-3 text-xs ${!n.read ? 'bg-red-50/40 dark:bg-red-950/20' : ''}`}>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">{n.body}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Admin / Portal Pengurus Button */}
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-red-800 text-white shadow-xs'
                      : 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 hover:bg-red-100'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Admin</span>
                </button>
                <button
                  onClick={onLogoutAdmin}
                  className="px-2 py-1.5 text-xs text-slate-400 hover:text-red-600 rounded-full transition cursor-pointer"
                  title="Keluar"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-800 hover:bg-red-700 text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Akses Pengurus PGRI"
              >
                <Lock className="w-3 h-3" />
                <span className="hidden sm:inline">Pengurus</span>
              </button>
            )}

            {/* Mobile Drawer Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 py-3 space-y-1 shadow-xl animate-in slide-in-from-top-2">
          
          <button
            onClick={() => handleNavClick('beranda')}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'beranda'
                ? 'bg-red-700 text-white font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Beranda Utama
          </button>

          <button
            onClick={() => handleNavClick('berita')}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'berita'
                ? 'bg-red-700 text-white font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Kabar & Informasi Guru
          </button>

          <button
            onClick={() => handleNavClick('pengurus')}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              activeTab === 'pengurus'
                ? 'bg-red-700 text-white font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Struktur Pengurus Cabang & Ranting
          </button>

          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800">
            <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Layanan Anggota
            </div>
            {layananItems.map(item => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition cursor-pointer ${
                    isActive
                      ? 'bg-red-50 text-red-800 dark:bg-red-950/60 dark:text-red-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-red-700 dark:text-red-400" />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
