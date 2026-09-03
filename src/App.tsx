import React, { useState, useEffect } from 'react';
import { 
  Home, 
  BookOpen, 
  Users, 
  CreditCard, 
  Calendar, 
  Image as ImageIcon, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  ExternalLink,
  Wallet
} from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { NewsSection } from './components/NewsSection';
import { LeadershipSection } from './components/LeadershipSection';
import { KtaDigitalSection } from './components/KtaDigitalSection';
import { MonthlyFinancialSection } from './components/MonthlyFinancialSection';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { GallerySection } from './components/GallerySection';
import { AspirationSection } from './components/AspirationSection';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { NotificationToast } from './components/NotificationToast';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { StorageService } from './services/storage';
import { GoogleSheetsService } from './services/googleSheets';
import { 
  Member, 
  MonthlyBudgetReport, 
  Article, 
  Announcement, 
  GalleryItem, 
  Aspiration, 
  PushNotificationItem 
} from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  
  // Theme State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('pgri_dark_mode') === 'true';
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('pgri_admin_session') === 'true';
  });
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [googleSheetsModalOpen, setGoogleSheetsModalOpen] = useState(false);

  // Application Data States
  const [members, setMembers] = useState<Member[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<MonthlyBudgetReport[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [aspirations, setAspirations] = useState<Aspiration[]>([]);
  const [notifications, setNotifications] = useState<PushNotificationItem[]>([]);

  // Load all data from storage service on mount
  const refreshAllData = () => {
    setMembers(StorageService.getMembers());
    setMonthlyReports(StorageService.getMonthlyReports());
    setArticles(StorageService.getArticles());
    setAnnouncements(StorageService.getAnnouncements());
    setGallery(StorageService.getGallery());
    setAspirations(StorageService.getAspirations());
    setNotifications(StorageService.getNotifications());
  };

  useEffect(() => {
    refreshAllData();
    // Auto-sync with Google Sheets in background if configured
    if (GoogleSheetsService.isConnected()) {
      StorageService.syncWithGoogleSheets().then((success) => {
        if (success) {
          refreshAllData();
        }
      });
    }
  }, []);

  // Handle Dark Mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pgri_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pgri_dark_mode', 'false');
    }
  }, [darkMode]);

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    sessionStorage.setItem('pgri_admin_session', 'true');
    setActiveTab('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('pgri_admin_session');
    if (activeTab === 'admin') {
      setActiveTab('beranda');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 selection:bg-red-700 selection:text-white pb-16 xl:pb-0">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenAdminLogin={() => setAdminModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={handleAdminLogout}
        notifications={notifications}
        onRefreshNotifications={refreshAllData}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <div className="space-y-4">
            {/* Hero Section */}
            <HeroSection
              onNavigate={(tab) => {
                setActiveTab(tab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              membersCount={members.length}
              monthlyReportsCount={monthlyReports.length}
              activeAnnouncementsCount={announcements.length}
            />

            {/* Quick Announcements Alert Bar */}
            {announcements.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                <div 
                  onClick={() => setActiveTab('pengumuman')}
                  className="p-4 rounded-2xl bg-red-50/70 dark:bg-slate-900 border border-red-200/80 dark:border-slate-800 flex items-center justify-between cursor-pointer hover:bg-red-100/70 dark:hover:bg-slate-850 transition shadow-xs"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase bg-red-700 text-white shrink-0">
                      Agenda Terbaru
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {announcements[0].title} — <span className="font-normal text-slate-600 dark:text-slate-400">{announcements[0].eventDate || 'Jadwal tertera'}</span>
                    </p>
                  </div>
                  <span className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1 shrink-0 ml-2">
                    <span className="hidden sm:inline">Lihat Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            )}

            {/* Latest News Preview */}
            <NewsSection articles={articles} />

            {/* KTA Digital Callout Banner */}
            <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-800 text-white py-14 px-4 my-8 shadow-sm">
              <div className="max-w-5xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-red-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Sistem Registrasi Satu Pintu PB PGRI</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Pendaftaran & Penerbitan KTA Digital Resmi PGRI
                </h3>
                <p className="text-sm text-red-100 max-w-2xl mx-auto leading-relaxed">
                  Pendaftaran anggota baru, pemutakhiran data, serta penerbitan Kartu Tanda Anggota (KTA) Digital terintegrasi nasional melalui portal resmi PB PGRI di <strong>ktadigitalpgri.org</strong>.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href="https://ktadigitalpgri.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-white hover:bg-red-50 text-red-900 font-bold text-sm transition shadow-lg flex items-center gap-2"
                  >
                    <span>Daftar di ktadigitalpgri.org</span>
                    <ExternalLink className="w-4 h-4 text-red-700" />
                  </a>
                  <button
                    onClick={() => {
                      setActiveTab('kta-digital');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-6 py-3 rounded-xl bg-red-800/80 hover:bg-red-800 text-white font-bold text-sm transition border border-red-700/50 cursor-pointer flex items-center gap-2"
                  >
                    <span>Pelajari Alur & Syarat KTA</span>
                    <ArrowRight className="w-4 h-4 text-red-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Leadership Overview */}
            <LeadershipSection />

            {/* Monthly Financial Transparency Preview */}
            <MonthlyFinancialSection reports={monthlyReports} monthlyReports={monthlyReports} />

            {/* Gallery Preview */}
            <GallerySection galleryItems={gallery} />

            {/* Aspirations Preview */}
            <AspirationSection 
              aspirations={aspirations}
              onAspirationSubmitted={refreshAllData}
            />
          </div>
        )}

        {activeTab === 'berita' && (
          <NewsSection articles={articles} />
        )}

        {activeTab === 'pengurus' && (
          <LeadershipSection />
        )}

        {activeTab === 'kta-digital' && (
          <KtaDigitalSection />
        )}

        {activeTab === 'laporan-keuangan' && (
          <MonthlyFinancialSection reports={monthlyReports} monthlyReports={monthlyReports} />
        )}

        {activeTab === 'pengumuman' && (
          <AnnouncementsSection announcements={announcements} />
        )}

        {activeTab === 'galeri' && (
          <GallerySection galleryItems={gallery} />
        )}

        {activeTab === 'aspirasi' && (
          <AspirationSection 
            aspirations={aspirations}
            onAspirationSubmitted={refreshAllData}
          />
        )}

        {activeTab === 'admin' && (
          isAdminLoggedIn ? (
            <AdminDashboard
              members={members}
              monthlyReports={monthlyReports}
              articles={articles}
              announcements={announcements}
              aspirations={aspirations}
              onRefreshData={refreshAllData}
              onLogout={handleAdminLogout}
              onOpenGoogleSheetsModal={() => setGoogleSheetsModalOpen(true)}
            />
          ) : (
            <div className="py-20 text-center max-w-md mx-auto space-y-4 px-4">
              <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-slate-900 text-red-700 dark:text-red-400 mx-auto flex items-center justify-center border border-red-200 dark:border-slate-800">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Akses Dashboard Terkunci</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Silakan masuk dengan akun pengurus cabang untuk membuka halaman pengelolaan dan konfigurasi database.
              </p>
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-6 py-2.5 rounded-xl bg-red-700 text-white text-xs font-bold hover:bg-red-800 transition cursor-pointer"
              >
                Masuk Portal Admin
              </button>
            </div>
          )
        )}
      </main>

      {/* Official Footer */}
      <Footer 
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAdmin={() => {
          if (isAdminLoggedIn) {
            setActiveTab('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            setAdminModalOpen(true);
          }
        }}
      />

      {/* Admin 2FA Login Modal */}
      <AdminLoginModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />

      {/* Google Sheets Database Modal & Code.gs */}
      <GoogleSheetsModal
        isOpen={googleSheetsModalOpen}
        onClose={() => setGoogleSheetsModalOpen(false)}
        onSyncComplete={refreshAllData}
      />

      {/* Real-time Push Notification Toast Popup */}
      <NotificationToast notifications={notifications} />

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1 flex items-center justify-around shadow-2xl">
        {[
          { id: 'beranda', label: 'Beranda', icon: Home },
          { id: 'berita', label: 'Berita', icon: BookOpen },
          { id: 'pengurus', label: 'Pengurus', icon: Users },
          { id: 'kta-digital', label: 'KTA', icon: CreditCard },
          { id: 'laporan-keuangan', label: 'Kas', icon: Wallet },
          { id: 'pengumuman', label: 'Agenda', icon: Calendar },
          { id: 'aspirasi', label: 'Aspirasi', icon: MessageSquare },
        ].map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition cursor-pointer min-w-[44px] ${
                isActive 
                  ? 'text-red-700 dark:text-red-400 font-bold' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-red-50 dark:bg-slate-800' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
