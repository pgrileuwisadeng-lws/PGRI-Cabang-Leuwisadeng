import { Member, DuesRecord, Article, Announcement, GalleryItem, Aspiration, CashTransaction, MonthlyBudgetReport } from '../types';

export const LOGO_PGRI = 'https://i.ibb.co.com/k63d3yPS/White-Teal-Minimalist-Scan-QR-Poster.png';
export const LOGO_BOGOR = 'https://i.ibb.co.com/fzjC1YMr/Logo-atau-Lambang-Kabupaten-Bogor-Transparan-PNG.png';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    ktaNumber: '32.01.28.001',
    fullName: 'Drs. H. Ahmad Sanusi, M.Pd.',
    nik: '3201281205720001',
    nuptk: '4538750652200023',
    nip: '197205121997021003',
    schoolOrigin: 'SMPN 1 Leuwisadeng',
    branchUnit: 'Ranting SMP/MTs',
    employmentStatus: 'PNS',
    subject: 'Bahasa Indonesia / Pembina',
    phone: '081289123451',
    email: 'ahmad.sanusi@sekolah.id',
    joinDate: '2015-01-10',
    status: 'aktif',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'mem-2',
    ktaNumber: '32.01.28.002',
    fullName: 'Siti Rohayati, S.Pd.SD.',
    nik: '3201285508800004',
    nuptk: '7642758660300012',
    nip: '198008152008012015',
    schoolOrigin: 'SDN Leuwisadeng 01',
    branchUnit: 'Ranting SD Negeri',
    employmentStatus: 'PNS',
    subject: 'Guru Kelas V',
    phone: '085718223344',
    email: 'siti.rohayati@sdnleuwisadeng01.sch.id',
    joinDate: '2016-03-15',
    status: 'aktif',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'mem-3',
    ktaNumber: '32.01.28.003',
    fullName: 'Bambang Sugiarto, S.Pd., M.M.',
    nik: '3201282001850007',
    nuptk: '1245763665200032',
    schoolOrigin: 'SMKN 1 Leuwisadeng',
    branchUnit: 'Ranting SMA/SMK',
    employmentStatus: 'PPPK',
    subject: 'Teknik Komputer & Jaringan',
    phone: '081399887766',
    email: 'bambang.sugiarto@smkn1leuwisadeng.sch.id',
    joinDate: '2019-07-20',
    status: 'aktif',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'mem-4',
    ktaNumber: '32.01.28.004',
    fullName: 'Nurul Hidayah, S.Pd.I.',
    nik: '3201286104920002',
    nuptk: '8934770671230045',
    schoolOrigin: 'SDN Sadeng 02',
    branchUnit: 'Ranting SD Negeri',
    employmentStatus: 'GTT/Honorer',
    subject: 'Pendidikan Agama Islam',
    phone: '085812349081',
    email: 'nurul.hidayah@gmail.com',
    joinDate: '2021-08-01',
    status: 'aktif',
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'mem-5',
    ktaNumber: '32.01.28.005',
    fullName: 'Iwan Setiawan, S.Pd.',
    nik: '3201280309870005',
    nuptk: '3456765667200088',
    nip: '198709032011011009',
    schoolOrigin: 'SDN Kalong II',
    branchUnit: 'Ranting SD Negeri',
    employmentStatus: 'PNS',
    subject: 'Pendidikan Jasmani & Olahraga',
    phone: '081290334411',
    email: 'iwan.setiawan@sdnkalong2.sch.id',
    joinDate: '2017-02-12',
    status: 'aktif',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250'
  },
  {
    id: 'mem-6',
    ktaNumber: '32.01.28.006',
    fullName: 'Eneng Maryanah, S.Pd.AUD.',
    nik: '3201284501900003',
    nuptk: '5621768670230051',
    schoolOrigin: 'TK Pertiwi Leuwisadeng',
    branchUnit: 'Ranting PAUD/TK',
    employmentStatus: 'Guru Yayasan',
    subject: 'Pendidikan Anak Usia Dini',
    phone: '087812998844',
    email: 'eneng.maryanah@tkpertiwi.sch.id',
    joinDate: '2022-01-14',
    status: 'aktif',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=250'
  }
];

export const INITIAL_DUES: DuesRecord[] = [
  {
    id: 'due-1',
    memberId: 'mem-1',
    memberName: 'Drs. H. Ahmad Sanusi, M.Pd.',
    ktaNumber: '32.01.28.001',
    schoolOrigin: 'SMPN 1 Leuwisadeng',
    monthYear: 'Maret 2026',
    amount: 25000,
    paymentDate: '2026-03-01',
    status: 'lunas',
    paymentMethod: 'Transfer Bank',
    receiptNumber: 'KW-2026-0301',
    notes: 'Iuran Wajib PGRI & Dana Solidaritas'
  },
  {
    id: 'due-2',
    memberId: 'mem-2',
    memberName: 'Siti Rohayati, S.Pd.SD.',
    ktaNumber: '32.01.28.002',
    schoolOrigin: 'SDN Leuwisadeng 01',
    monthYear: 'Maret 2026',
    amount: 20000,
    paymentDate: '2026-03-02',
    status: 'lunas',
    paymentMethod: 'Potong Gaji/Ranting',
    receiptNumber: 'KW-2026-0302',
    notes: 'Kolektif Bendahara Ranting SD 01'
  },
  {
    id: 'due-3',
    memberId: 'mem-3',
    memberName: 'Bambang Sugiarto, S.Pd., M.M.',
    ktaNumber: '32.01.28.003',
    schoolOrigin: 'SMKN 1 Leuwisadeng',
    monthYear: 'Maret 2026',
    amount: 25000,
    paymentDate: '2026-03-02',
    status: 'lunas',
    paymentMethod: 'QRIS',
    receiptNumber: 'KW-2026-0303',
    notes: 'QRIS PGRI Cabang Leuwisadeng'
  },
  {
    id: 'due-4',
    memberId: 'mem-4',
    memberName: 'Nurul Hidayah, S.Pd.I.',
    ktaNumber: '32.01.28.004',
    schoolOrigin: 'SDN Sadeng 02',
    monthYear: 'Maret 2026',
    amount: 15000,
    paymentDate: '2026-03-03',
    status: 'pending',
    paymentMethod: 'Transfer Bank',
    receiptNumber: 'KW-2026-0304',
    notes: 'Menunggu konfirmasi admin kasir'
  },
  {
    id: 'due-5',
    memberId: 'mem-5',
    memberName: 'Iwan Setiawan, S.Pd.',
    ktaNumber: '32.01.28.005',
    schoolOrigin: 'SDN Kalong II',
    monthYear: 'Maret 2026',
    amount: 20000,
    paymentDate: '2026-03-02',
    status: 'lunas',
    paymentMethod: 'Kasir Cabang',
    receiptNumber: 'KW-2026-0305',
    notes: 'Pembayaran tunai di sekretariat cabang'
  },
  {
    id: 'due-6',
    memberId: 'mem-6',
    memberName: 'Eneng Maryanah, S.Pd.AUD.',
    ktaNumber: '32.01.28.006',
    schoolOrigin: 'TK Pertiwi Leuwisadeng',
    monthYear: 'Maret 2026',
    amount: 15000,
    paymentDate: '-',
    status: 'belum_lunas',
    paymentMethod: 'Transfer Bank',
    receiptNumber: 'KW-PENDING-06',
    notes: 'Belum terverifikasi masuk'
  }
];

export const INITIAL_TRANSACTIONS: CashTransaction[] = [
  {
    id: 'tx-1',
    date: '2026-03-01',
    type: 'pemasukan',
    category: 'Iuran Anggota',
    description: 'Setoran kolektif Iuran Ranting SMP/MTs bulan Maret 2026',
    amount: 1250000,
    receiptNumber: 'IN-2026-03-01'
  },
  {
    id: 'tx-2',
    date: '2026-03-02',
    type: 'pemasukan',
    category: 'Iuran Anggota',
    description: 'Penerimaan iuran mandiri QRIS & Transfer Bank anggota',
    amount: 850000,
    receiptNumber: 'IN-2026-03-02'
  },
  {
    id: 'tx-3',
    date: '2026-03-02',
    type: 'pengeluaran',
    category: 'Operasional Kantor',
    description: 'Pembelian ATK, tinta printer KTA, dan konsumsi rapat pengurus',
    amount: 450000,
    receiptNumber: 'OUT-2026-03-01'
  },
  {
    id: 'tx-4',
    date: '2026-02-28',
    type: 'pengeluaran',
    category: 'Bantuan Sosial',
    description: 'Penyaluran dana tali asih solidaritas guru purna bakti ranting SDN Sadeng',
    amount: 1000000,
    receiptNumber: 'OUT-2026-02-28'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Penguatan Kompetensi Guru Abad 21 di Wilayah Kecamatan Leuwisadeng',
    slug: 'penguatan-kompetensi-guru-abad-21-leuwisadeng',
    category: 'Pelatihan',
    author: 'Drs. H. Ahmad Sanusi, M.Pd.',
    authorRole: 'Ketua PGRI Cabang Leuwisadeng',
    date: '2026-03-01',
    coverImage: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    excerpt: 'PGRI Cabang Leuwisadeng menggelar lokakarya intensif peningkatan literasi digital dan implementasi modul ajar berdiferensiasi bagi ratusan pendidik se-Kecamatan.',
    content: `Kecamatan Leuwisadeng, Kabupaten Bogor — Dalam upaya mewujudkan transformasi pembelajaran yang berorientasi pada peserta didik, Pengurus PGRI Cabang Leuwisadeng menyelenggarakan lokakarya berseri 'Optimalisasi Peran Pendidik di Era Pembelajaran Digital'.

Kegiatan yang dihadiri oleh perwakilan guru dari ranting SD, SMP, SMA/SMK, hingga PAUD ini memfokuskan pada pemanfaatan platform teknologi pendidikan, perancangan asesmen formatif yang humanis, serta penguatan kompetensi sosial-emosional guru.

Ketua PGRI Cabang Leuwisadeng menegaskan pentingnya solidaritas korps guru dalam mengawal mutu pendidikan di Bogor Barat: "Guru bukan hanya pengajar, melainkan arsitek peradaban. Melalui wadah PGRI, kita saling menopang dan menguatkan profesionalitas guru tanpa membedakan status kepegawaian."

Pelatihan ini mencakup praktik langsung penyusunan portofolio digital, pembuatan media pembelajaran interaktif berbasis kearifan lokal Sunda Bogor, dan strategi pembelajaran bermakna di kelas.`,
    tags: ['Pelatihan', 'Kompetensi Guru', 'Kurikulum', 'Bogor Barat'],
    views: 342
  },
  {
    id: 'art-2',
    title: 'Advokasi dan Sosialisasi Kesejahteraan Guru Honorer & Formasi PPPK 2026',
    slug: 'advokasi-kesejahteraan-guru-honorer-leuwisadeng-2026',
    category: 'Advokasi',
    author: 'Bidang Advokasi & Hukum',
    authorRole: 'Pengurus Cabang',
    date: '2026-02-25',
    coverImage: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
    excerpt: 'PGRI Leuwisadeng konsisten memperjuangkan kejelasan status dan afirmasi linearitas bagi ratusan rekan guru honorer yang telah mengabdi lebih dari satu dekade.',
    content: `Sebagai rumah besar perjuangan guru, PGRI Cabang Leuwisadeng terus mengawal regulasi ketenagakerjaan pendidik di lingkungan Dinas Pendidikan Kabupaten Bogor.

Dalam pertemuan dialogis bersama perwakilan guru honorer, ditekankan komitmen PGRI untuk terus mengawal kebijakan pengangkatan ASN PPPK secara berkeadilan. Tim advokasi siap mendampingi proses administrasi, validasi data Dapodik, hingga persiapan teknis seleksi kompetensi.

"Solidaritas adalah napas PGRI. Kita berdiri bersama kawan-kawan guru honorer yang telah membuktikan dedikasi tanpa pamrih di pelosok-pelosok desa di Leuwisadeng," ungkap tim Advokasi Cabang.`,
    tags: ['Advokasi', 'Guru Honorer', 'PPPK', 'Kesejahteraan'],
    views: 520
  },
  {
    id: 'art-3',
    title: 'Semarak Peringatan Hari Guru Nasional & HUT PGRI di Leuwisadeng',
    slug: 'semarak-hgn-hut-pgri-leuwisadeng',
    category: 'Berita',
    author: 'Humas PGRI Leuwisadeng',
    authorRole: 'Seksi Publikasi',
    date: '2026-02-18',
    coverImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
    excerpt: 'Rangkaian upacara khidmat, donor darah kemanusiaan, serta jalan sehat keluarga guru memadati lapangan utama Leuwisadeng dalam suasana kebersamaan yang hangat.',
    content: `Lebih dari 600 guru se-Kecamatan Leuwisadeng berpartisipasi dalam perayaan tahunan HUT PGRI dan Hari Guru Nasional. Acara dipusatkan di Kompleks Pendidikan Leuwisadeng dengan menghadirkan pentas seni budaya pelajar binaan guru-guru PGRI.

Selain seremoni penghargaan bagi guru-guru inspiratif dan berdedikasi tinggi, kegiatan juga diisi dengan bakti sosial santunan bagi anak yatim dan donor darah bekerjasama dengan PMI Kabupaten Bogor.`,
    tags: ['HUT PGRI', 'HGN', 'Solidaritas', 'Keluarga Guru'],
    views: 415
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'anc-1',
    title: 'Konferensi Kerja Cabang (KONKERCAB) PGRI Leuwisadeng Tahun 2026',
    category: 'Kegiatan Organisasi',
    date: '2026-03-02',
    eventDate: 'Sabtu, 28 Maret 2026 | Pukul 08.00 WIB',
    location: 'Aula Utama SMPN 1 Leuwisadeng, Jl. Raya Sadeng - Leuwisadeng',
    isUrgent: true,
    content: 'Mengundang seluruh Pengurus Ranting, utusan perwakilan satuan pendidikan jenjang PAUD/TK, SD, SMP/MTs, dan SMA/SMK se-Cabang Leuwisadeng untuk menghadiri Konkercab penetapan Program Kerja dan Anggaran Tahun 2026.',
    downloadUrl: '#',
    attachmentName: 'Surat_Undangan_Konkercab_2026.pdf'
  },
  {
    id: 'anc-2',
    title: 'Bimbingan Teknis Peningkatan Akun Belajar.id & Integrasi AI Edukasi',
    category: 'Pelatihan / Diklat',
    date: '2026-02-27',
    eventDate: 'Kamis, 19 Maret 2026 | Pukul 13.00 WIB',
    location: 'Laboratorium Komputer SMKN 1 Leuwisadeng / Daring via Zoom',
    isUrgent: false,
    content: 'Bimtek gratis ber-sertifikat 32 JP bagi seluruh anggota PGRI ber-KTA aktif. Kuota peserta luring terbatas 80 pendidik. Pendaftaran via formulir website atau koordinator ranting.',
    downloadUrl: '#',
    attachmentName: 'Panduan_Bimtek_AI_Edukasi.pdf'
  },
  {
    id: 'anc-3',
    title: 'Sosialisasi Verifikasi Data Keanggotaan & Pemutakhiran KTA Digital 2026',
    category: 'Surat Edaran',
    date: '2026-02-20',
    eventDate: 'Batas Akhir: 31 Maret 2026',
    location: 'Sekretariat Cabang PGRI Leuwisadeng & Portal Mandiri',
    isUrgent: false,
    content: 'Dihimbau kepada seluruh bapak/ibu guru untuk memperbarui data keanggotaan melalui portal online ini guna memastikan kevalidan data tunjangan profesi, bantuan advokasi, dan asuransi solidaritas anggota.',
    downloadUrl: '#',
    attachmentName: 'Edaran_Pemutakhiran_KTA.pdf'
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Lokakarya Peningkatan Literasi & Numerasi Guru',
    category: 'Workshop',
    date: '25 Februari 2026',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=750',
    caption: 'Suasana antusias guru-guru SD se-Leuwisadeng mendalami strategi pembelajaran berdiferensiasi.',
    location: 'SDN Leuwisadeng 01'
  },
  {
    id: 'gal-2',
    title: 'Upacara Peringatan Hari Guru Nasional & HUT PGRI',
    category: 'Hari Guru',
    date: '25 November 2025',
    imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=750',
    caption: 'Pengibaran bendera pusaka dan pataka PGRI oleh paduan suara guru-guru Leuwisadeng.',
    location: 'Lapangan Puspa Leuwisadeng'
  },
  {
    id: 'gal-3',
    title: 'Rapat Koordinasi Pengurus Cabang & Ketua Ranting',
    category: 'Konferensi',
    date: '15 Januari 2026',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=750',
    caption: 'Konsolidasi bulanan pengurus dalam merumuskan advokasi kesejahteraan pendidik.',
    location: 'Gedung Guru Cabang Leuwisadeng'
  },
  {
    id: 'gal-4',
    title: 'Bakti Sosial & Santunan Yatim Piatu Keluarga Guru',
    category: 'Sosial & Baksos',
    date: '10 Februari 2026',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=750',
    caption: 'Penyaluran paket sembako dan dana santunan pendidikan hasil iuran solidaritas anggota.',
    location: 'Desa Sadeng, Leuwisadeng'
  },
  {
    id: 'gal-5',
    title: 'Porseni Guru Cabang Leuwisadeng',
    category: 'Olahraga & Seni',
    date: '18 Desember 2025',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&q=80&w=750',
    caption: 'Pertandingan bulutangkis dan bola voli persahabatan antar ranting guru se-Kecamatan.',
    location: 'GOR Leuwisadeng'
  },
  {
    id: 'gal-6',
    title: 'Pelatihan Pemanfaatan Platform Merdeka Mengajar (PMM)',
    category: 'Workshop',
    date: '05 Januari 2026',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=750',
    caption: 'Pemberdayaan guru dalam menyelesaikan aksi nyata PMM hingga meraih sertifikasi kompetensi.',
    location: 'SMKN 1 Leuwisadeng'
  }
];

export const INITIAL_ASPIRATIONS: Aspiration[] = [
  {
    id: 'asp-1',
    ticketNumber: 'ASP-2026-0012',
    senderName: 'Ujang Supriatna, S.Pd.',
    isAnonymous: false,
    schoolOrigin: 'SDN Kalong I',
    phone: '081299334421',
    email: 'ujang.supriatna@gmail.com',
    category: 'Kesejahteraan & Tunjangan',
    subject: 'Keterlambatan Penyaluran Tunjangan Insentif Daerah Daerah Terpencil',
    message: 'Mohon bantuan advokasi dari PGRI Cabang Leuwisadeng terkait verifikasi data penerima insentif daerah terpencil untuk beberapa rekan guru di perbatasan Leuwisadeng yang belum cair sejak triwulan akhir.',
    date: '2026-02-28',
    status: 'Sedang Diproses',
    officialResponse: 'Aspirasi telah diterima oleh Bidang Kesejahteraan dan Advokasi Hukum. Tim telah berkoordinasi dengan Seksi PTK Disdik Kab. Bogor dan saat ini proses pencocokan data rekening penerima sedang difinalisasi.',
    responseDate: '2026-03-01'
  },
  {
    id: 'asp-2',
    ticketNumber: 'ASP-2026-0008',
    senderName: 'Perwakilan Guru Ranting PAUD',
    isAnonymous: true,
    schoolOrigin: 'Gugus PAUD Teratai',
    phone: '085711223399',
    category: 'Pelatihan / Diklat' as any,
    subject: 'Permohonan Pelatihan Khusus Media Pembelajaran Inklusif bagi Guru TK/PAUD',
    message: 'Kami mengharapkan PGRI Cabang dapat mengadakan pelatihan khusus bagi pendidik PAUD mengenai deteksi dini kebutuhan khusus dan media stimulasi motorik ramah anak.',
    date: '2026-02-15',
    status: 'Selesai Ditanggapi',
    officialResponse: 'Alhamdulillah, aspirasi ini telah dimasukkan ke dalam agenda Bimtek Semester 1 Tahun 2026 bekerjasama dengan IGTKI dan Bunda PAUD Kecamatan Leuwisadeng pada bulan April mendatang.',
    responseDate: '2026-02-18'
  }
];

export const BOARD_MEMBERS = [
  {
    name: 'Drs. H. Ahmad Sanusi, M.Pd.',
    role: 'Ketua Cabang',
    nip: '19720512 199702 1 003',
    unit: 'SMPN 1 Leuwisadeng',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Dede Rukmana, S.Pd., M.M.',
    role: 'Wakil Ketua',
    nip: '19750820 199903 1 004',
    unit: 'SDN Leuwisadeng 02',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Mamat Rohimat, S.Pd.SD.',
    role: 'Sekretaris Cabang',
    nip: '19820314 200604 1 011',
    unit: 'SDN Sadeng 01',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Hj. Endah Sulistiawati, S.Pd.',
    role: 'Bendahara Cabang',
    nip: '19790410 200501 2 009',
    unit: 'SDN Kalong II',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Bambang Sugiarto, S.Pd., M.M.',
    role: 'Ketua Bidang Infokom & Publikasi',
    nip: 'PPPK - 19850120 202221 1 007',
    unit: 'SMKN 1 Leuwisadeng',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'H. Sudrajat, S.Pd., S.H.',
    role: 'Ketua Bidang Advokasi & Perlindungan Hukum',
    nip: '19741108 199802 1 002',
    unit: 'SMPN 1 Leuwisadeng',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300'
  }
];

export const RANTING_LIST = [
  { name: 'Ranting SDN Leuwisadeng 01', membersCount: 28, head: 'Siti Rohayati, S.Pd.SD.' },
  { name: 'Ranting SDN Leuwisadeng 02', membersCount: 22, head: 'Dede Rukmana, S.Pd.' },
  { name: 'Ranting SDN Sadeng 01 & 02', membersCount: 34, head: 'Mamat Rohimat, S.Pd.' },
  { name: 'Ranting SDN Sadengkolot', membersCount: 19, head: 'Asep Suparman, S.Pd.' },
  { name: 'Ranting SDN Kalong I & II', membersCount: 31, head: 'Iwan Setiawan, S.Pd.' },
  { name: 'Ranting SMPN 1 Leuwisadeng', membersCount: 45, head: 'H. Sudrajat, S.Pd.' },
  { name: 'Ranting SMKN 1 Leuwisadeng', membersCount: 38, head: 'Bambang Sugiarto, S.Pd.' },
  { name: 'Ranting PAUD & TK Leuwisadeng', membersCount: 26, head: 'Eneng Maryanah, S.Pd.' },
  { name: 'Ranting Madrasah (MI/MTs/MA)', membersCount: 24, head: 'Ust. Ridwan Firdaus, S.Ag.' }
];

export const INITIAL_MONTHLY_REPORTS: MonthlyBudgetReport[] = [
  {
    id: 'rep-2026-03',
    monthYear: 'Maret 2026',
    periodCode: '2026-03',
    startingBalance: 18450000,
    totalIncome: 6850000,
    totalExpense: 3200000,
    endingBalance: 22100000,
    incomeCategories: [
      { name: 'Iuran Wajib Ranting (SD, SMP, SMA/SMK, PAUD)', amount: 5600000 },
      { name: 'Bantuan Donasi Organisasi & Kemitraan', amount: 1250000 }
    ],
    expenseCategories: [
      { name: 'Bantuan Advokasi & Pendampingan Hukum Guru', amount: 1200000 },
      { name: 'Operasional Sekretariat & Komunikasi IT', amount: 750000 },
      { name: 'Santunan Solidaritas & Tali Asih Anggota', amount: 1250000 }
    ],
    status: 'Final',
    verifiedBy: 'Hj. Endah Sulistiawati, S.Pd. (Bendahara) & Drs. H. Ahmad Sanusi, M.Pd. (Ketua)',
    notes: 'Laporan kas periode berjalan telah diverifikasi oleh tim pemeriksa internal cabang.'
  },
  {
    id: 'rep-2026-02',
    monthYear: 'Februari 2026',
    periodCode: '2026-02',
    startingBalance: 16100000,
    totalIncome: 7100000,
    totalExpense: 4750000,
    endingBalance: 18450000,
    incomeCategories: [
      { name: 'Iuran Wajib Ranting', amount: 5850000 },
      { name: 'Penerimaan Kegiatan Lokakarya Pembelajaran', amount: 1250000 }
    ],
    expenseCategories: [
      { name: 'Penyelenggaraan Lokakarya Guru Era Digital', amount: 2800000 },
      { name: 'Bantuan Sosial Anggota Sakit / Purna Bakti', amount: 1100000 },
      { name: 'Administrasi & Cetak Laporan Triwulan', amount: 850000 }
    ],
    status: 'Audited',
    verifiedBy: 'Dewan Kehormatan & Bendahara Cabang',
    notes: 'Laporan kas bulan Februari 2026 selesai diaudit dan disetujui dalam rapat pleno pengurus.'
  },
  {
    id: 'rep-2026-01',
    monthYear: 'Januari 2026',
    periodCode: '2026-01',
    startingBalance: 14200000,
    totalIncome: 6500000,
    totalExpense: 4600000,
    endingBalance: 16100000,
    incomeCategories: [
      { name: 'Iuran Wajib Ranting', amount: 5500000 },
      { name: 'Sisa Anggaran Kegiatan Hari Guru Nasional 2025', amount: 1000000 }
    ],
    expenseCategories: [
      { name: 'Rapat Kerja Pengurus & Sosialisasi KTA Digital', amount: 2100000 },
      { name: 'Pemeliharaan Sekretariat Cabang Leuwisadeng', amount: 1500000 },
      { name: 'Tali Asih Duka Cita Keluarga Anggota', amount: 1000000 }
    ],
    status: 'Audited',
    verifiedBy: 'Ketua & Bendahara Cabang',
    notes: 'Pembukuan awal tahun 2026 telah ditutup dengan surplus kas.'
  },
  {
    id: 'rep-2025-12',
    monthYear: 'Desember 2025',
    periodCode: '2025-12',
    startingBalance: 12500000,
    totalIncome: 9800000,
    totalExpense: 8100000,
    endingBalance: 14200000,
    incomeCategories: [
      { name: 'Iuran Anggota Ranting Akhir Tahun', amount: 6200000 },
      { name: 'Sponsor & Donasi Peringatan HGN 2025', amount: 3600000 }
    ],
    expenseCategories: [
      { name: 'Puncak Peringatan Hari Guru Nasional Cabang', amount: 6200000 },
      { name: 'Santunan Yatim Piatu Keluarga Tenaga Honorer', amount: 1200000 },
      { name: 'Operasional Akhir Tahun', amount: 700000 }
    ],
    status: 'Audited',
    verifiedBy: 'Badan Pemeriksa Keuangan Cabang PGRI',
    notes: 'Laporan pertanggungjawaban akhir tahun anggaran 2025 disahkan.'
  }
];

