import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  ArrowUp 
} from 'lucide-react';
import { LOGO_PGRI, LOGO_BOGOR } from '../data/initialData';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white/90 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={LOGO_PGRI} 
                alt="Logo PGRI Leuwisadeng" 
                className="h-11 w-11 object-contain bg-white rounded-lg p-1 border border-slate-700"
                referrerPolicy="no-referrer"
              />
              <img 
                src={LOGO_BOGOR} 
                alt="Logo Kabupaten Bogor" 
                className="h-9 w-9 object-contain"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="font-extrabold text-white text-base leading-tight">
                  PGRI CABANG LEUWISADENG
                </h3>
                <p className="text-xs text-red-400 font-medium">
                  Kabupaten Bogor - Jawa Barat
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Organisasi profesi, perjuangan, dan ketenagakerjaan pendidik yang senantiasa mengawal martabat, kesejahteraan, serta mutu pendidikan di Kecamatan Leuwisadeng.
            </p>

            <div className="text-xs text-red-300/80 italic">
              "Guru Bangkit, Pulihkan Pendidikan. Indonesia Kuat, Indonesia Maju."
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button onClick={() => onNavigate('beranda')} className="hover:text-white transition cursor-pointer">
                  Beranda Utama
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('berita')} className="hover:text-white transition cursor-pointer">
                  Kabar & Berita Pendidikan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pengurus')} className="hover:text-white transition cursor-pointer">
                  Profil Pengurus & 9 Ranting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('kta-digital')} className="hover:text-red-400 font-semibold transition cursor-pointer flex items-center gap-1">
                  <span>Panduan KTA Digital</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('laporan-keuangan')} className="hover:text-red-400 font-semibold transition cursor-pointer">
                  Transparansi Laporan Keuangan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan & External */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Layanan Terkait
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a 
                  href="https://ktadigitalpgri.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                >
                  <span>ktadigitalpgri.org</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('pengumuman')} className="hover:text-white transition cursor-pointer">
                  Agenda & Kegiatan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('aspirasi')} className="hover:text-white transition cursor-pointer">
                  Aspirasi Guru
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-white text-slate-400 font-medium transition cursor-pointer flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>Login Pengurus</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Secretariat & Contact */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Kontak & Sekretariat
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>Jl. Raya Sadeng - Leuwisadeng, Kec. Leuwisadeng, Kab. Bogor, Jawa Barat 16640</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/6281289123451" target="_blank" rel="noreferrer" className="hover:text-white transition">
                  WhatsApp: 0812-8912-3451
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <a href="mailto:pgri.leuwisadeng@gmail.com" className="hover:text-white transition">
                  pgri.leuwisadeng@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Senin - Sabtu: 08.00 - 15.30 WIB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <span>© {new Date().getFullYear()} PGRI Cabang Leuwisadeng, Kab. Bogor. Seluruh Hak Cipta Dilindungi.</span>
          </div>

          <div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition flex items-center gap-1.5 cursor-pointer border border-slate-800"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
