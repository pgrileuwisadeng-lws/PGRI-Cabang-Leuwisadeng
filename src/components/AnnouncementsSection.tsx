import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  FileDown, 
  Share2, 
  AlertCircle, 
  Bell, 
  Check, 
  Send 
} from 'lucide-react';
import { Announcement } from '../types';
import { StorageService } from '../services/storage';

interface AnnouncementsSectionProps {
  announcements: Announcement[];
}

export const AnnouncementsSection: React.FC<AnnouncementsSectionProps> = ({ announcements = [] }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [remindedId, setRemindedId] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = ['Semua', 'Kegiatan Organisasi', 'Pelatihan / Diklat', 'Surat Edaran', 'Rapat Pengurus'];

  const filtered = (announcements || []).filter(a => 
    activeCategory === 'Semua' || a.category === activeCategory
  );

  const handleBroadcastWA = (anc: Announcement) => {
    const url = StorageService.createWhatsAppAnnouncementBroadcast(anc);
    window.open(url, '_blank');
  };

  const handleRemindMe = (anc: Announcement) => {
    setRemindedId(anc.id);
    StorageService.triggerPushNotification(
      `Pengingat Disimpan: ${anc.title}`,
      `Kegiatan dijadwalkan pada: ${anc.eventDate || 'Waktu tertera'}. Kami akan memberi tahu Anda.`,
      'pengumuman'
    );
    setTimeout(() => setRemindedId(null), 3000);
  };

  const handleDownloadAttachment = (filename: string) => {
    setDownloadSuccessMessage(`Berkas resmi "${filename}" siap diakses.`);
    setTimeout(() => setDownloadSuccessMessage(null), 3500);
  };

  return (
    <section id="pengumuman" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Toast Alert */}
      {downloadSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/70 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-900 text-xs font-semibold flex items-center justify-between animate-in fade-in">
          <span>{downloadSuccessMessage}</span>
          <button onClick={() => setDownloadSuccessMessage(null)} className="text-xs text-red-600 underline">Tutup</button>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Agenda & Surat Edaran</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Pengumuman Kegiatan Organisasi
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Jadwal kegiatan resmi, bimbingan teknis guru, serta instruksi organisasi PGRI Cabang Leuwisadeng secara berkala.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeCategory === c
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Announcements List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(anc => (
          <div
            key={anc.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-red-300 dark:hover:border-red-900 transition duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Category & Urgent Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900">
                  {anc.category}
                </span>
                {anc.isUrgent && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
                    <AlertCircle className="w-3 h-3" />
                    <span>PENTING</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {anc.title}
              </h3>

              {/* Event Metadata */}
              <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
                {anc.eventDate && (
                  <div className="flex items-start gap-2">
                    <Clock className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{anc.eventDate}</span>
                  </div>
                )}
                {anc.location && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-red-600 mt-0.5 shrink-0" />
                    <span>{anc.location}</span>
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
                {anc.content}
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRemindMe(anc)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 transition cursor-pointer"
                  title="Pasang Pengingat"
                >
                  {remindedId === anc.id ? (
                    <Check className="w-4 h-4 text-red-600" />
                  ) : (
                    <Bell className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => handleBroadcastWA(anc)}
                  className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition cursor-pointer"
                  title="Bagikan ke WhatsApp Ranting"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {anc.attachmentName && (
                <button
                  onClick={() => handleDownloadAttachment(anc.attachmentName!)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-medium transition cursor-pointer border border-slate-200 dark:border-slate-700"
                >
                  <FileDown className="w-3.5 h-3.5 text-red-600" />
                  <span>Unduh Surat</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
