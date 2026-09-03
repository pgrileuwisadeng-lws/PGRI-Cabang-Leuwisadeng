import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  MapPin, 
  Calendar, 
  X, 
  Maximize2 
} from 'lucide-react';
import { GalleryItem } from '../types';

interface GallerySectionProps {
  galleryItems: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ galleryItems = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const categories = ['Semua', 'Workshop', 'Hari Guru', 'Konferensi', 'Sosial & Baksos', 'Olahraga & Seni'];

  const filtered = (galleryItems || []).filter(item => 
    selectedCategory === 'Semua' || item.category === selectedCategory
  );

  return (
    <section id="galeri" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
            <ImageIcon className="w-4 h-4" />
            <span>Dokumentasi Visual</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Galeri Kegiatan PGRI Leuwisadeng
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Potret kebersamaan, bakti sosial, peningkatan kompetensi, serta semarak kegiatan guru di Kecamatan Leuwisadeng.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                selectedCategory === c
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => setActivePhoto(item)}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition p-4 flex flex-col justify-end text-white">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-red-800/90 text-white w-max mb-1.5">
                {item.category}
              </span>
              <h3 className="text-sm font-bold leading-snug line-clamp-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-2">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-red-400" />
                  {item.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-red-400" />
                  {item.location}
                </span>
              </div>
            </div>

            <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-5 bg-slate-900 text-white space-y-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-700 text-white">
                  {activePhoto.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  {activePhoto.date}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  {activePhoto.location}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                {activePhoto.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activePhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
