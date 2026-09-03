export type MemberStatus = 'aktif' | 'pending' | 'nonaktif';
export type EmploymentStatus = 'PNS' | 'PPPK' | 'GTT/Honorer' | 'Guru Yayasan' | 'Tendik';
export type DuesStatus = 'lunas' | 'belum_lunas' | 'pending';

export interface Member {
  id: string;
  ktaNumber: string; // e.g. 32.01.28.001
  fullName: string;
  nik: string;
  nuptk: string;
  nip?: string;
  schoolOrigin: string; // e.g. SDN Leuwisadeng 01, SMPN 1 Leuwisadeng
  branchUnit: string; // Ranting: SD, SMP, SMA/SMK, PAUD/TK
  employmentStatus: EmploymentStatus;
  subject: string; // Mata Pelajaran / Guru Kelas
  phone: string; // WhatsApp number
  email: string;
  joinDate: string;
  status: MemberStatus;
  photoUrl?: string;
}

export interface DuesRecord {
  id: string;
  memberId: string;
  memberName: string;
  ktaNumber: string;
  schoolOrigin: string;
  monthYear: string; // e.g. "Maret 2026"
  amount: number; // e.g. 20000
  paymentDate: string;
  status: DuesStatus;
  paymentMethod: 'Transfer Bank' | 'Kasir Cabang' | 'QRIS' | 'Potong Gaji/Ranting';
  proofUrl?: string;
  receiptNumber: string; // e.g. KW-2026-0301
  notes?: string;
}

export interface MonthlyBudgetReport {
  id: string;
  monthYear: string; // e.g. "Maret 2026"
  periodCode: string; // e.g. "2026-03"
  startingBalance: number;
  totalIncome: number;
  totalExpense: number;
  endingBalance: number;
  incomeCategories: { name: string; amount: number }[];
  expenseCategories: { name: string; amount: number }[];
  status: 'Audited' | 'Final' | 'Provisional';
  verifiedBy: string;
  notes: string;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  duesCollectionRate: number; // percentage
}

export interface CashTransaction {
  id: string;
  date: string;
  type: 'pemasukan' | 'pengeluaran';
  category: 'Iuran Anggota' | 'Bantuan Sosial' | 'Operasional Kantor' | 'Kegiatan/Acara' | 'Advokasi Hukum' | 'Lainnya';
  description: string;
  amount: number;
  receiptNumber?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Berita' | 'Pendidikan' | 'Advokasi' | 'Pelatihan' | 'Opini Guru';
  author: string;
  authorRole: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  views: number;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Kegiatan Organisasi' | 'Surat Edaran' | 'Pelatihan / Diklat' | 'Peringatan Hari Besar' | 'Rapat Pengurus';
  date: string;
  eventDate?: string;
  location?: string;
  isUrgent?: boolean;
  content: string;
  downloadUrl?: string;
  attachmentName?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Konferensi' | 'Hari Guru' | 'Workshop' | 'Sosial & Baksos' | 'Olahraga & Seni';
  date: string;
  imageUrl: string;
  caption: string;
  location: string;
}

export interface Aspiration {
  id: string;
  ticketNumber: string; // e.g. ASP-2026-0012
  senderName: string;
  isAnonymous: boolean;
  schoolOrigin: string;
  phone: string;
  email?: string;
  category: 'Kesejahteraan & Tunjangan' | 'Sarana Prasarana' | 'Advokasi Hukum Guru' | 'Kurikulum & Pembelajaran' | 'Layanan Organisasi';
  subject: string;
  message: string;
  date: string;
  status: 'Diterima' | 'Sedang Diproses' | 'Selesai Ditanggapi';
  officialResponse?: string;
  responseDate?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'Ketua Cabang' | 'Sekretaris' | 'Bendahara' | 'Admin TI';
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  phone: string;
}

export interface PushNotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'berita' | 'iuran' | 'pengumuman' | 'aspirasi';
  read: boolean;
  actionUrl?: string;
}
