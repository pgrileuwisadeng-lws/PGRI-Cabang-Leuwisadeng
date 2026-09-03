import React, { useState } from 'react';
import { 
  CreditCard, 
  ExternalLink, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  QrCode, 
  FileCheck, 
  Sparkles, 
  Building2, 
  AlertCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { LOGO_PGRI, LOGO_BOGOR } from '../data/initialData';

export const KtaDigitalSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Apakah pendaftaran KTA Digital PGRI dilakukan di website ini?',
      a: 'Tidak. Sesuai ketentuan Pengurus Besar (PB) PGRI, seluruh registrasi anggota baru, pembaruan data, dan penerbitan KTA Digital dilakukan secara terpusat melalui portal resmi https://ktadigitalpgri.org/. Website Cabang Leuwisadeng ini berfungsi sebagai portal informasi, layanan pendampingan, dan verifikasi administratif di tingkat kecamatan.'
    },
    {
      q: 'Bagaimana memastikan keanggotaan saya tercatat di Cabang Leuwisadeng?',
      a: 'Saat mengisi formulir pendaftaran di ktadigitalpgri.org, pada pilihan wilayah pastikan Anda memilih: Provinsi Jawa Barat, Kabupaten/Kota: Kabupaten Bogor, dan Pengurus Cabang: Cabang Leuwisadeng. Kemudian pilih unit kerja/sekolah tempat Anda mengajar.'
    },
    {
      q: 'Apakah guru honorer, GTT, PPPK, dan tenaga kependidikan berhak memiliki KTA Digital?',
      a: 'Ya, seluruh pendidik dan tenaga kependidikan (PNS, PPPK, Guru Tetap Yayasan, GTT/Honorer, dan Tendik) yang bertugas di wilayah Kecamatan Leuwisadeng berhak mendaftar dan memperoleh perlindungan profesi serta KTA resmi PGRI.'
    },
    {
      q: 'Berapa lama proses verifikasi KTA Digital oleh Pengurus Cabang Leuwisadeng?',
      a: 'Setelah Anda submit data di ktadigitalpgri.org, tim verifikator Cabang Leuwisadeng akan memvalidasi data Anda dalam 1-3 hari kerja. Anda dapat menghubungi pengurus cabang melalui WhatsApp jika membutuhkan percepatan verifikasi.'
    },
    {
      q: 'Bagaimana cara mencetak KTA Digital setelah disetujui?',
      a: 'Setelah akun aktif dan status disetujui di portal ktadigitalpgri.org, Anda dapat mengunduh file KTA Digital (PDF/Gambar ber-barcode QR resmi PB PGRI) dan dapat dicetak mandiri dalam bentuk kartu PVC atau kertas laminasi.'
    }
  ];

  return (
    <section id="kta-digital" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-900 via-red-800 to-red-700 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <div className="max-w-3xl space-y-5 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-red-100 text-xs font-bold uppercase tracking-wider backdrop-blur-xs border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Portal Layanan KTA Digital PB PGRI</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Pendaftaran & Pengurusan KTA Digital Resmi PGRI
          </h2>

          <p className="text-sm sm:text-base text-red-100/90 leading-relaxed">
            Pengurusan Kartu Tanda Anggota (KTA) Digital berbasis QR Code Nasional dikelola langsung melalui portal resmi Pengurus Besar PGRI di <strong className="text-white underline decoration-white/40">ktadigitalpgri.org</strong>. Dapatkan identitas resmi pendidik, perlindungan profesi, serta hak keanggotaan organisasi secara terintegrasi.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3.5">
            <a
              href="https://ktadigitalpgri.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-red-50 text-red-800 font-bold text-sm transition shadow-lg flex items-center gap-2 cursor-pointer group border border-red-100"
            >
              <span>Buka Portal ktadigitalpgri.org</span>
              <ExternalLink className="w-4 h-4 text-red-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://wa.me/6281289123451?text=Halo%20Admin%20PGRI%20Cabang%20Leuwisadeng,%20mohon%20bantuan%20verifikasi%20KTA%20Digital%20saya"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-red-950/70 hover:bg-red-950 text-white font-semibold text-sm transition border border-white/20 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Bantuan Verifikasi Cabang (WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 4 Step Workflow Guide */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
            Panduan Langkah Demi Langkah
          </span>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Alur Pengurusan KTA Digital untuk Guru di Leuwisadeng
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Ikuti 4 langkah mudah berikut untuk registrasi dan penerbitan kartu tanda anggota digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Kunjungi Portal Resmi',
              desc: 'Buka peramban di laptop atau ponsel dan akses website resmi https://ktadigitalpgri.org/',
              icon: ExternalLink,
            },
            {
              step: '02',
              title: 'Isi Data & Pilih Cabang',
              desc: 'Klik Registrasi Baru. Masukkan NIK, NUPTK, data diri, lalu pilih: Jawa Barat → Kab. Bogor → Cabang Leuwisadeng.',
              icon: Building2,
            },
            {
              step: '03',
              title: 'Verifikasi Pengurus Cabang',
              desc: 'Admin PGRI Cabang Leuwisadeng akan memvalidasi data dan keaktifan mengajar Anda di sekolah terkait.',
              icon: ShieldCheck,
            },
            {
              step: '04',
              title: 'Unduh & Cetak KTA Digital',
              desc: 'Setelah terverifikasi, unduh kartu ber-barcode QR resmi PB PGRI dan kartu siap dicetak secara mandiri.',
              icon: QrCode,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs relative flex flex-col justify-between group hover:border-red-300 dark:hover:border-red-900 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded-md bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono">
                      Langkah {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-red-600 group-hover:scale-110 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Information Cards: Benefits & Direct Helpdesk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-xs font-bold uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Manfaat & Keunggulan KTA Digital</span>
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Hak & Perlindungan bagi Pemegang KTA Digital PGRI
          </h4>
          <div className="space-y-3 pt-1">
            {[
              {
                title: 'Perlindungan Hukum & Advokasi Profesi',
                desc: 'Bantuan hukum dan advokasi resmi dari LKBH PGRI bilamana terjadi permasalahan profesi saat bertugas.'
              },
              {
                title: 'Identitas Tunggal Nasional (Single Identity)',
                desc: 'Terintegrasi dengan sistem basis data keanggotaan pendidik nasional PB PGRI ber-QR Code anti-pemalsuan.'
              },
              {
                title: 'Prioritas Pelatihan & Pengembangan Kompetensi',
                desc: 'Akses prioritas lokakarya, seminar sertifikasi, dan beasiswa pelatihan guru dari PGRI.'
              },
              {
                title: 'Hak Partisipasi Musyawarah & Solidaritas',
                desc: 'Hak suara penuh dalam Konferensi Cabang (Konkercab) dan kepesertaan program santunan sosial organisasi.'
              }
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">{b.title}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-xs font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Penting untuk Diperhatikan</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Butuh Pendampingan Pendaftaran?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Jika Anda mengalami kendala saat registrasi di <strong className="text-slate-800 dark:text-slate-200">ktadigitalpgri.org</strong> (seperti data NIK belum sesuai di Dukcapil, mutasi sekolah ranting, atau lupa kata sandi), pengurus cabang siap membantu.
            </p>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="font-semibold text-slate-900 dark:text-slate-100">
                Sekretariat PGRI Cabang Leuwisadeng
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Jl. Raya Sadeng - Leuwisadeng, Kec. Leuwisadeng, Kab. Bogor (16640)
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Waktu Layanan Verifikasi: Senin - Jumat (08.00 - 15.00 WIB)
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href="https://ktadigitalpgri.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs sm:text-sm text-center transition flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Akses Portal KTA Digital</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6281289123451?text=Halo%20Admin%20PGRI%20Leuwisadeng,%20saya%20membutuhkan%20bantuan%20terkait%20KTA%20Digital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs text-center transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Chat WhatsApp Verifikator Cabang</span>
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-red-700 dark:text-red-400">
          <HelpCircle className="w-4 h-4" />
          <span>Tanya Jawab Seputar KTA Digital</span>
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h4>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {faqs.map((f, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-red-700 transition cursor-pointer"
                >
                  <span>{f.q}</span>
                  <span className="text-red-600 text-base font-bold shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed animate-in fade-in">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
