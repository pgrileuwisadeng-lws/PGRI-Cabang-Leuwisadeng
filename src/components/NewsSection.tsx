import React, { useState } from 'react';
import { 
  Search, 
  Tag, 
  Calendar, 
  User, 
  ArrowRight, 
  Share2, 
  X, 
  BookOpen, 
  Eye, 
  Check 
} from 'lucide-react';
import { Article } from '../types';

interface NewsSectionProps {
  articles: Article[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ articles = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['Semua', 'Berita', 'Pendidikan', 'Advokasi', 'Pelatihan', 'Opini Guru'];

  const filteredArticles = (articles || []).filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'Semua' || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleShareWA = (art: Article) => {
    const text = `*${art.title}*\n\nBaca artikel selengkapnya dari PGRI Cabang Leuwisadeng:\n${art.excerpt}\n\nKunjungi portal resmi PGRI Cabang Leuwisadeng.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="berita" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Kabar & Informasi Terkini</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            Berita & Artikel PGRI Leuwisadeng
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Publikasi kegiatan guru, advokasi ketenagakerjaan, serta wawasan pendidikan se-Kabupaten Bogor.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari berita atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-red-600 transition"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-red-700 text-white shadow-xs dark:bg-red-700'
                : 'bg-slate-100 text-slate-700 hover:bg-red-50 hover:text-red-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Tidak ditemukan artikel untuk pencarian atau kategori ini.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(art => (
            <article 
              key={art.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col hover:border-red-200 dark:hover:border-red-900"
            >
              {/* Cover Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase bg-red-800/90 text-white backdrop-blur-xs">
                  {art.category}
                </span>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      {art.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {art.views} dilihat
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-red-700 dark:group-hover:text-red-400 transition line-clamp-2 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-700 dark:text-red-300 text-xs font-bold border border-red-200 dark:border-red-900">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate max-w-[120px]">
                      {art.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleShareWA(art)}
                      className="p-1.5 text-slate-400 hover:text-emerald-600 transition rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                      title="Bagikan ke WhatsApp"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveArticle(art)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-red-700 dark:text-red-400 hover:underline cursor-pointer pl-1"
                    >
                      <span>Baca</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Article Detail Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
            {/* Modal Header Bar */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border border-red-200 dark:border-red-900">
                {activeArticle.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareWA(activeArticle)}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 hover:bg-emerald-100 transition flex items-center gap-1.5 cursor-pointer border border-emerald-200 dark:border-emerald-800"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition flex items-center gap-1 cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                  <span>{copiedLink ? 'Tersalin' : 'Salin Tautan'}</span>
                </button>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight">
                {activeArticle.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-red-700" />
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{activeArticle.author}</span>
                  <span>({activeArticle.authorRole})</span>
                </div>
                <div>•</div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              {/* Cover */}
              <div className="rounded-xl overflow-hidden max-h-72 w-full bg-slate-100">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content Text */}
              <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400 mr-1" />
                {activeArticle.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
