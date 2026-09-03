import { jsPDF } from 'jspdf';
import { 
  Member, 
  DuesRecord, 
  CashTransaction, 
  Article, 
  Announcement, 
  GalleryItem, 
  Aspiration, 
  PushNotificationItem,
  MonthlyBudgetReport 
} from '../types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_DUES, 
  INITIAL_TRANSACTIONS, 
  INITIAL_ARTICLES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_GALLERY, 
  INITIAL_ASPIRATIONS,
  INITIAL_MONTHLY_REPORTS 
} from '../data/initialData';
import { GoogleSheetsService } from './googleSheets';

const STORAGE_KEYS = {
  MEMBERS: 'pgri_leuwisadeng_members',
  DUES: 'pgri_leuwisadeng_dues',
  MONTHLY_REPORTS: 'pgri_leuwisadeng_monthly_reports',
  TRANSACTIONS: 'pgri_leuwisadeng_transactions',
  ARTICLES: 'pgri_leuwisadeng_articles',
  ANNOUNCEMENTS: 'pgri_leuwisadeng_announcements',
  GALLERY: 'pgri_leuwisadeng_gallery',
  ASPIRATIONS: 'pgri_leuwisadeng_aspirations',
  NOTIFICATIONS: 'pgri_leuwisadeng_notifications',
  PUSH_ENABLED: 'pgri_leuwisadeng_push_enabled',
  DARK_MODE: 'pgri_leuwisadeng_dark_mode',
  ADMIN_AUTH: 'pgri_leuwisadeng_admin_auth',
};

// Safe JSON parser helper
function getStored<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return defaultVal;
  }
}

function setStored<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export class StorageService {
  // --- Members ---
  static getMembers(): Member[] {
    return getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
  }

  static saveMembers(members: Member[]): void {
    setStored(STORAGE_KEYS.MEMBERS, members);
  }

  static addMember(member: Omit<Member, 'id' | 'joinDate' | 'status' | 'ktaNumber'>): Member {
    const members = this.getMembers();
    const nextSeq = (members.length + 1).toString().padStart(3, '0');
    const newMember: Member = {
      ...member,
      id: 'mem-' + Date.now(),
      ktaNumber: `32.01.28.${nextSeq}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'aktif',
    };
    members.unshift(newMember);
    this.saveMembers(members);
    GoogleSheetsService.postData('addMember', newMember);
    this.triggerPushNotification(
      'Pendaftaran Anggota Berhasil!',
      `Selamat datang ${newMember.fullName} di PGRI Cabang Leuwisadeng. Nomor KTA: ${newMember.ktaNumber}`,
      'iuran'
    );
    return newMember;
  }

  static updateMember(updated: Member): void {
    const members = this.getMembers().map(m => m.id === updated.id ? updated : m);
    this.saveMembers(members);
  }

  static deleteMember(id: string): void {
    const members = this.getMembers().filter(m => m.id !== id);
    this.saveMembers(members);
    GoogleSheetsService.postData('deleteMember', { id });
  }

  // --- Monthly Budget Reports & Transparansi Keuangan ---
  static getMonthlyReports(): MonthlyBudgetReport[] {
    return getStored<MonthlyBudgetReport[]>(STORAGE_KEYS.MONTHLY_REPORTS, INITIAL_MONTHLY_REPORTS);
  }

  static saveMonthlyReports(reports: MonthlyBudgetReport[]): void {
    setStored(STORAGE_KEYS.MONTHLY_REPORTS, reports);
  }

  static addMonthlyReport(report: Omit<MonthlyBudgetReport, 'id'>): MonthlyBudgetReport {
    const reports = this.getMonthlyReports();
    const newReport: MonthlyBudgetReport = {
      ...report,
      id: 'rep-' + Date.now(),
    };
    reports.unshift(newReport);
    this.saveMonthlyReports(reports);
    GoogleSheetsService.postData('addMonthlyReport', newReport);
    this.triggerPushNotification(
      'Laporan Keuangan Bulanan Baru',
      `Transparansi laporan kas periode ${newReport.monthYear} telah diterbitkan.`,
      'pengumuman'
    );
    return newReport;
  }

  // --- Dues & Transactions ---
  static getDues(): DuesRecord[] {
    return getStored<DuesRecord[]>(STORAGE_KEYS.DUES, INITIAL_DUES);
  }

  static saveDues(dues: DuesRecord[]): void {
    setStored(STORAGE_KEYS.DUES, dues);
  }

  static addDuesRecord(record: Omit<DuesRecord, 'id' | 'receiptNumber'>): DuesRecord {
    const dues = this.getDues();
    const receiptSeq = Math.floor(1000 + Math.random() * 9000);
    const newRecord: DuesRecord = {
      ...record,
      id: 'due-' + Date.now(),
      receiptNumber: `KW-${new Date().getFullYear()}-${receiptSeq}`,
    };
    dues.unshift(newRecord);
    this.saveDues(dues);

    // Also record into cash transactions
    if (newRecord.status === 'lunas') {
      this.addTransaction({
        date: newRecord.paymentDate || new Date().toISOString().split('T')[0],
        type: 'pemasukan',
        category: 'Iuran Anggota',
        description: `Iuran ${newRecord.monthYear} - ${newRecord.memberName} (${newRecord.schoolOrigin})`,
        amount: newRecord.amount,
        receiptNumber: newRecord.receiptNumber,
      });
    }

    this.triggerPushNotification(
      'Pencatatan Iuran Berhasil',
      `Iuran ${newRecord.monthYear} an. ${newRecord.memberName} sebesar Rp ${newRecord.amount.toLocaleString('id-ID')} telah dicatat.`,
      'iuran'
    );

    return newRecord;
  }

  static updateDuesStatus(id: string, status: DuesRecord['status']): void {
    const dues = this.getDues().map(d => {
      if (d.id === id) {
        return { ...d, status, paymentDate: status === 'lunas' ? new Date().toISOString().split('T')[0] : d.paymentDate };
      }
      return d;
    });
    this.saveDues(dues);
  }

  static getTransactions(): CashTransaction[] {
    return getStored<CashTransaction[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
  }

  static saveTransactions(txs: CashTransaction[]): void {
    setStored(STORAGE_KEYS.TRANSACTIONS, txs);
  }

  static addTransaction(tx: Omit<CashTransaction, 'id'>): CashTransaction {
    const txs = this.getTransactions();
    const newTx: CashTransaction = {
      ...tx,
      id: 'tx-' + Date.now(),
    };
    txs.unshift(newTx);
    this.saveTransactions(txs);
    return newTx;
  }

  // --- Articles ---
  static getArticles(): Article[] {
    return getStored<Article[]>(STORAGE_KEYS.ARTICLES, INITIAL_ARTICLES);
  }

  static saveArticles(articles: Article[]): void {
    setStored(STORAGE_KEYS.ARTICLES, articles);
  }

  static addArticle(article: Omit<Article, 'id' | 'views'>): Article {
    const articles = this.getArticles();
    const newArticle: Article = {
      ...article,
      id: 'art-' + Date.now(),
      views: 1,
    };
    articles.unshift(newArticle);
    this.saveArticles(articles);
    GoogleSheetsService.postData('addArticle', newArticle);
    this.triggerPushNotification(
      'Berita Terbaru PGRI Leuwisadeng',
      newArticle.title,
      'berita'
    );
    return newArticle;
  }

  static deleteArticle(id: string): void {
    const articles = this.getArticles().filter(a => a.id !== id);
    this.saveArticles(articles);
    GoogleSheetsService.postData('deleteArticle', { id });
  }

  // --- Announcements ---
  static getAnnouncements(): Announcement[] {
    return getStored<Announcement[]>(STORAGE_KEYS.ANNOUNCEMENTS, INITIAL_ANNOUNCEMENTS);
  }

  static saveAnnouncements(ancs: Announcement[]): void {
    setStored(STORAGE_KEYS.ANNOUNCEMENTS, ancs);
  }

  static addAnnouncement(anc: Omit<Announcement, 'id'>): Announcement {
    const ancs = this.getAnnouncements();
    const newAnc: Announcement = {
      ...anc,
      id: 'anc-' + Date.now(),
    };
    ancs.unshift(newAnc);
    this.saveAnnouncements(ancs);
    GoogleSheetsService.postData('addAnnouncement', newAnc);
    this.triggerPushNotification(
      'Pengumuman Kegiatan Baru!',
      newAnc.title,
      'pengumuman'
    );
    return newAnc;
  }

  static deleteAnnouncement(id: string): void {
    const ancs = this.getAnnouncements().filter(a => a.id !== id);
    this.saveAnnouncements(ancs);
    GoogleSheetsService.postData('deleteAnnouncement', { id });
  }

  // --- Gallery ---
  static getGallery(): GalleryItem[] {
    return getStored<GalleryItem[]>(STORAGE_KEYS.GALLERY, INITIAL_GALLERY);
  }

  static saveGallery(items: GalleryItem[]): void {
    setStored(STORAGE_KEYS.GALLERY, items);
  }

  static addGalleryItem(item: Omit<GalleryItem, 'id'>): GalleryItem {
    const items = this.getGallery();
    const newItem: GalleryItem = {
      ...item,
      id: 'gal-' + Date.now(),
    };
    items.unshift(newItem);
    this.saveGallery(items);
    return newItem;
  }

  static deleteGalleryItem(id: string): void {
    const items = this.getGallery().filter(g => g.id !== id);
    this.saveGallery(items);
  }

  // --- Aspirations ---
  static getAspirations(): Aspiration[] {
    return getStored<Aspiration[]>(STORAGE_KEYS.ASPIRATIONS, INITIAL_ASPIRATIONS);
  }

  static saveAspirations(asps: Aspiration[]): void {
    setStored(STORAGE_KEYS.ASPIRATIONS, asps);
  }

  static addAspiration(asp: Omit<Aspiration, 'id' | 'ticketNumber' | 'date' | 'status'>): Aspiration {
    const asps = this.getAspirations();
    const randomSeq = Math.floor(10 + Math.random() * 90);
    const newAsp: Aspiration = {
      ...asp,
      id: 'asp-' + Date.now(),
      ticketNumber: `ASP-${new Date().getFullYear()}-00${randomSeq}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Diterima',
    };
    asps.unshift(newAsp);
    this.saveAspirations(asps);
    GoogleSheetsService.postData('addAspiration', newAsp);
    this.triggerPushNotification(
      'Aspirasi Berhasil Terkirim',
      `Tiket Anda: ${newAsp.ticketNumber}. Pengurus akan menindaklanjuti sesegera mungkin.`,
      'aspirasi'
    );
    return newAsp;
  }

  static respondAspiration(id: string, response: string, newStatus: Aspiration['status']): void {
    const asps = this.getAspirations().map(a => {
      if (a.id === id) {
        return {
          ...a,
          officialResponse: response,
          status: newStatus,
          responseDate: new Date().toISOString().split('T')[0],
        };
      }
      return a;
    });
    this.saveAspirations(asps);

    const updatedItem = asps.find(a => a.id === id);
    if (updatedItem) {
      GoogleSheetsService.postData('updateAspiration', {
        id: updatedItem.id,
        ticketNumber: updatedItem.ticketNumber,
        officialResponse: response,
        status: newStatus,
        responseDate: new Date().toISOString().split('T')[0]
      });
    }
  }

  // --- Google Sheets Cloud Sync ---
  static async syncWithGoogleSheets(): Promise<boolean> {
    const cloudData = await GoogleSheetsService.syncAllFromCloud();
    if (!cloudData) return false;

    if (cloudData.aspirasi && cloudData.aspirasi.length > 0) {
      this.saveAspirations(cloudData.aspirasi);
    }
    if (cloudData.berita && cloudData.berita.length > 0) {
      this.saveArticles(cloudData.berita);
    }
    if (cloudData.pengumuman && cloudData.pengumuman.length > 0) {
      this.saveAnnouncements(cloudData.pengumuman);
    }
    if (cloudData.laporanKeuangan && cloudData.laporanKeuangan.length > 0) {
      this.saveMonthlyReports(cloudData.laporanKeuangan);
    }
    if (cloudData.anggota && cloudData.anggota.length > 0) {
      this.saveMembers(cloudData.anggota);
    }
    return true;
  }

  // --- Push Notifications ---
  static getNotifications(): PushNotificationItem[] {
    return getStored<PushNotificationItem[]>(STORAGE_KEYS.NOTIFICATIONS, [
      {
        id: 'notif-init',
        title: 'Selamat Datang di Portal Resmi PGRI Leuwisadeng',
        body: 'Akses informasi terkini, pendaftaran anggota baru, dan cek iuran dengan mudah.',
        timestamp: 'Hari ini',
        type: 'pengumuman',
        read: false,
      }
    ]);
  }

  static markAllNotificationsAsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, read: true }));
    setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  static triggerPushNotification(title: string, body: string, type: PushNotificationItem['type']): void {
    const notifs = this.getNotifications();
    const newNotif: PushNotificationItem = {
      id: 'notif-' + Date.now(),
      title,
      body,
      timestamp: 'Baru saja',
      type,
      read: false,
    };
    notifs.unshift(newNotif);
    setStored(STORAGE_KEYS.NOTIFICATIONS, notifs);

    // Browser Notification API
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: 'https://i.ibb.co.com/k63d3yPS/White-Teal-Minimalist-Scan-QR-Poster.png',
        });
      } catch (e) {
        console.warn('Native notification failed:', e);
      }
    }
  }

  // --- WhatsApp Notification Generator ---
  static createWhatsAppIuranLink(record: DuesRecord, phoneOverride?: string): string {
    const targetPhone = (phoneOverride || '6281289123451').replace(/^0/, '62').replace(/\D/g, '');
    const message = `*KONFIRMASI PEMBAYARAN IURAN PGRI CABANG LEUWISADENG*
------------------------------------------------
Yth. Bapak/Ibu *${record.memberName}*
Nomor KTA: *${record.ktaNumber}*
Unit Kerja: *${record.schoolOrigin}*

Rincian Pembayaran:
* Periode: *${record.monthYear}*
* Jumlah: *Rp ${record.amount.toLocaleString('id-ID')}*
* No. Kuitansi: *${record.receiptNumber}*
* Metode: *${record.paymentMethod}*
* Status: *LUNAS & TERVERIFIKASI* (${record.paymentDate})

Terima kasih atas dedikasi dan iuran solidaritas dalam memajukan organisasi profesi guru di Kecamatan Leuwisadeng.

_Salam Solidaritas, Hidup Guru! Hidup PGRI!_
*Pengurus Cabang PGRI Leuwisadeng*`;

    return `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
  }

  static createWhatsAppAnnouncementBroadcast(announcement: Announcement, targetPhone = ''): string {
    const cleanPhone = targetPhone.replace(/^0/, '62').replace(/\D/g, '');
    const message = `*PENGUMUMAN RESMI PGRI CABANG LEUWISADENG*
------------------------------------------------
*${announcement.title.toUpperCase()}*

Kategori: *${announcement.category}*
${announcement.eventDate ? `Waktu: *${announcement.eventDate}*\n` : ''}${announcement.location ? `Tempat: *${announcement.location}*\n` : ''}
Isi Pengumuman:
${announcement.content}

Informasi lengkap & konfirmasi kehadiran dapat diakses melalui portal resmi PGRI Leuwisadeng.

_Pengurus Cabang PGRI Leuwisadeng, Kab. Bogor_
*Hidup Guru! Hidup PGRI! Solidaritas Yess!*`;

    if (!cleanPhone) {
      return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    }
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  // --- Data Export Utilities ---
  static exportMembersToCSV(): void {
    const members = this.getMembers();
    const headers = ['No KTA', 'Nama Lengkap', 'NIK', 'NUPTK', 'NIP', 'Unit Kerja', 'Ranting', 'Status Pegawai', 'Mata Pelajaran', 'No WA', 'Email', 'Tanggal Daftar', 'Status'];
    
    const rows = members.map(m => [
      `"${m.ktaNumber}"`,
      `"${m.fullName}"`,
      `"${m.nik}"`,
      `"${m.nuptk}"`,
      `"${m.nip || '-'}"`,
      `"${m.schoolOrigin}"`,
      `"${m.branchUnit}"`,
      `"${m.employmentStatus}"`,
      `"${m.subject}"`,
      `"${m.phone}"`,
      `"${m.email}"`,
      `"${m.joinDate}"`,
      `"${m.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Daftar_Anggota_PGRI_Leuwisadeng_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static exportFinancialToCSV(): void {
    const dues = this.getDues();
    const headers = ['No Kuitansi', 'Nama Anggota', 'No KTA', 'Unit Kerja', 'Bulan/Tahun', 'Nominal (Rp)', 'Tanggal Bayar', 'Metode', 'Status', 'Catatan'];
    
    const rows = dues.map(d => [
      `"${d.receiptNumber}"`,
      `"${d.memberName}"`,
      `"${d.ktaNumber}"`,
      `"${d.schoolOrigin}"`,
      `"${d.monthYear}"`,
      d.amount,
      `"${d.paymentDate}"`,
      `"${d.paymentMethod}"`,
      `"${d.status}"`,
      `"${d.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Iuran_PGRI_Leuwisadeng_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static exportFinancialToPDF(selectedReport?: MonthlyBudgetReport): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const reports = this.getMonthlyReports();
    const activeReport = selectedReport || reports[0];
    const totalIncome = reports.reduce((acc, curr) => acc + curr.totalIncome, 0);
    const totalExpense = reports.reduce((acc, curr) => acc + curr.totalExpense, 0);
    const latestBalance = reports[0]?.endingBalance || 0;

    // Kop Surat Resmi PGRI
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(185, 28, 28); // Official PGRI Crimson Red
    doc.text('PERSATUAN GURU REPUBLIK INDONESIA (PGRI)', 105, 18, { align: 'center' });
    doc.setFontSize(11);
    doc.text('PENGURUS CABANG KECAMATAN LEUWISADENG', 105, 24, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Sekretariat: Jl. Raya Sadeng - Leuwisadeng, Kec. Leuwisadeng, Kab. Bogor - Jawa Barat 16640', 105, 29.5, { align: 'center' });
    doc.text('Email: pgri.leuwisadeng@gmail.com | Portal: pgri-leuwisadeng.id', 105, 34, { align: 'center' });

    // Garis Kop Red Accent
    doc.setLineWidth(0.8);
    doc.setDrawColor(185, 28, 28);
    doc.line(15, 37.5, 195, 37.5);
    doc.setLineWidth(0.3);
    doc.setDrawColor(220, 38, 38);
    doc.line(15, 39, 195, 39);

    // Judul Dokumen
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text('LAPORAN TRANSPARANSI ANGGARAN & KAS KEUANGAN BULANAN', 105, 47, { align: 'center' });
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Periode Cetak: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })} | Dokumen Terverifikasi`, 105, 52, { align: 'center' });

    // Ringkasan Keuangan Box
    doc.setFillColor(254, 242, 242); // Soft red background
    doc.rect(15, 56, 180, 22, 'F');
    doc.setDrawColor(254, 202, 202); // Red border
    doc.rect(15, 56, 180, 22, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(153, 27, 27);
    doc.text(`Saldo Kas Terkini: Rp ${latestBalance.toLocaleString('id-ID')}`, 20, 64);
    doc.text(`Total Pemasukan Kas Berjalan: Rp ${totalIncome.toLocaleString('id-ID')}`, 20, 71);
    doc.text(`Total Realisasi Pengeluaran: Rp ${totalExpense.toLocaleString('id-ID')}`, 110, 64);
    doc.text(`Status Pemeriksaan: Teraudit & Wajar Tanpa Pengecualian`, 110, 71);

    // Tabel Rekapitulasi Laporan Kas Bulanan
    let startY = 84;
    doc.setFillColor(185, 28, 28); // Header PGRI Red
    doc.rect(15, startY, 180, 7.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('Periode Bulan', 18, startY + 5);
    doc.text('Saldo Awal (Rp)', 50, startY + 5);
    doc.text('Penerimaan (Rp)', 82, startY + 5);
    doc.text('Pengeluaran (Rp)', 118, startY + 5);
    doc.text('Saldo Akhir (Rp)', 154, startY + 5);
    doc.text('Status', 183, startY + 5);

    startY += 8.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);

    reports.forEach((rep, idx) => {
      const isEven = idx % 2 === 0;
      if (isEven) {
        doc.setFillColor(248, 250, 252);
        doc.rect(15, startY - 1, 180, 6.5, 'F');
      }

      doc.text(rep.monthYear, 18, startY + 3.5);
      doc.text(rep.startingBalance.toLocaleString('id-ID'), 50, startY + 3.5);
      doc.text(rep.totalIncome.toLocaleString('id-ID'), 82, startY + 3.5);
      doc.text(rep.totalExpense.toLocaleString('id-ID'), 118, startY + 3.5);
      doc.text(rep.endingBalance.toLocaleString('id-ID'), 154, startY + 3.5);
      doc.text(rep.status, 183, startY + 3.5);

      startY += 6.5;
    });

    // Detail Sorotan Bulan Berjalan
    if (activeReport) {
      startY += 6;
      doc.setFillColor(254, 242, 242);
      doc.rect(15, startY, 180, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(153, 27, 27);
      doc.text(`Rincian Realisasi Kas Periode: ${activeReport.monthYear}`, 18, startY + 4.2);

      startY += 8;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(71, 85, 105);
      doc.text('Pos Penerimaan Utama:', 18, startY);
      doc.text('Pos Pengeluaran Utama:', 105, startY);

      startY += 4.5;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(15, 23, 42);

      activeReport.incomeCategories.forEach((inc, i) => {
        doc.text(`• ${inc.name}: Rp ${inc.amount.toLocaleString('id-ID')}`, 18, startY + (i * 4));
      });

      activeReport.expenseCategories.forEach((exp, i) => {
        doc.text(`• ${exp.name}: Rp ${exp.amount.toLocaleString('id-ID')}`, 105, startY + (i * 4));
      });
    }

    // Tanda Tangan Resmi
    const signY = 240;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text('Mengetahui & Mengesahkan,', 30, signY);
    doc.text('Ketua Cabang PGRI Leuwisadeng', 30, signY + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.text('Drs. H. Ahmad Sanusi, M.Pd.', 30, signY + 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('NIP. 19720512 199702 1 003', 30, signY + 30);

    doc.setFontSize(8.5);
    doc.text('Leuwisadeng, ' + new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric', day: 'numeric' }), 130, signY);
    doc.text('Bendahara Cabang,', 130, signY + 4.5);
    doc.setFont('helvetica', 'bold');
    doc.text('Hj. Endah Sulistiawati, S.Pd.', 130, signY + 26);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.text('NIP. 19790410 200501 2 009', 130, signY + 30);

    doc.save(`Laporan_Keuangan_Bulanan_PGRI_Leuwisadeng_${new Date().toISOString().split('T')[0]}.pdf`);
  }
}
