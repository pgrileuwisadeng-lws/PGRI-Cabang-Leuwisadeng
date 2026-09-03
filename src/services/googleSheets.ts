import { 
  Member, 
  Article, 
  Announcement, 
  Aspiration, 
  MonthlyBudgetReport 
} from '../types';

export const APPS_SCRIPT_STORAGE_KEY = 'pgri_gas_webapp_url';

// Complete Google Apps Script (Code.gs) source code
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - DATABASE ENGINE PORTAL RESMI PGRI CABANG LEUWISADENG
 * =========================================================================
 * Script ini berfungsi sebagai RESTful API backend tanpa server (serverless)
 * yang menghubungkan aplikasi web PGRI Leuwisadeng dengan Google Spreadsheet.
 * 
 * Fitur:
 * 1. Otomatisasi pembuatan 5 Sheet & format Header resmi bertema PGRI
 * 2. Endpoint GET (doGet) untuk pengambilan seluruh data (getAllData) / per modul
 * 3. Endpoint POST (doPost) untuk penyimpanan data inputan (Aspirasi, Berita, Agenda, Kas, Anggota)
 * 4. Dukungan CORS penuh untuk komunikasi aplikasi web modern
 */

// Konfigurasi Nama Sheet & Kolom Header Otomatis
const SCHEMA = {
  Aspirasi: [
    'ID', 'No Tiket', 'Nama Pengirim', 'NPA PGRI', 'Asal Sekolah', 
    'No WhatsApp', 'Kategori', 'Subjek', 'Pesan Aspirasi', 'Status', 
    'Tanggapan Resmi', 'Tanggal Kirim', 'Tanggal Tanggapan'
  ],
  Berita: [
    'ID', 'Judul Berita', 'Slug', 'Kategori', 'Penulis', 
    'Peran Penulis', 'Tanggal', 'URL Gambar', 'Ringkasan', 
    'Konten Lengkap', 'Tags', 'Views'
  ],
  Pengumuman: [
    'ID', 'Judul Pengumuman', 'Kategori', 'Tanggal Dibuat', 
    'Tanggal Kegiatan', 'Lokasi', 'Mendesak', 'Isi Pengumuman', 'Nama Lampiran'
  ],
  LaporanKeuangan: [
    'ID', 'Bulan Tahun', 'Kode Periode', 'Saldo Awal', 'Total Penerimaan', 
    'Total Pengeluaran', 'Saldo Akhir', 'Kategori Penerimaan', 
    'Kategori Pengeluaran', 'Status', 'Keterangan', 'Disahkan Oleh'
  ],
  Anggota: [
    'ID', 'Nama Lengkap', 'No KTA', 'Ranting Cabang', 'Asal Sekolah', 
    'Status Kepegawaian', 'No Telepon', 'Email', 'Tanggal Terdaftar'
  ]
};

/**
 * Fungsi inisialisasi untuk membuat semua sheet dan header secara otomatis.
 * Jalankan fungsi ini sekali dari editor Apps Script atau akan otomatis berjalan saat request pertama.
 */
function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  Object.keys(SCHEMA).forEach(function(sheetName) {
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }
    
    const headers = SCHEMA[sheetName];
    // Cek jika baris header belum terisi
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      
      // Styling Header Resmi PGRI (Merah Marun & Teks Putih Tebal)
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#8B0000'); // Maroon PGRI
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setFontFamily('Arial');
      headerRange.setFontSize(10);
      headerRange.setHorizontalAlignment('center');
      headerRange.setVerticalAlignment('middle');
      sheet.setRowHeight(1, 35);
      sheet.setFrozenRows(1);
      
      // Auto-fit kolom
      for (let c = 1; c <= headers.length; c++) {
        sheet.autoResizeColumn(c);
      }
    }
  });

  // Hapus Sheet1 bawaan kosong jika ada dan sheet lain sudah dibuat
  const defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1 && defaultSheet.getLastRow() === 0) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {}
  }
  
  return { status: 'success', message: 'Semua sheet dan header database PGRI berhasil dibuat otomatis!' };
}

/**
 * Pastikan sheet target sudah memiliki header
 */
function ensureSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0 && SCHEMA[sheetName]) {
    sheet.appendRow(SCHEMA[sheetName]);
    const headerRange = sheet.getRange(1, 1, 1, SCHEMA[sheetName].length);
    headerRange.setBackground('#8B0000');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Menangani HTTP GET Request
 */
function doGet(e) {
  return handleAllRequests(e, 'GET');
}

/**
 * Menangani HTTP POST Request untuk menyimpan data inputan web
 */
function doPost(e) {
  return handleAllRequests(e, 'POST');
}

/**
 * Handler Terpadu untuk GET & POST dengan toleransi format parameter maksimal
 */
function handleAllRequests(e, method) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    let rawObj = {};
    if (e && e.parameter) {
      for (let k in e.parameter) {
        rawObj[k] = e.parameter[k];
      }
    }
    if (e && e.postData && e.postData.contents) {
      try {
        const parsed = JSON.parse(e.postData.contents);
        if (parsed && typeof parsed === 'object') {
          for (let k in parsed) {
            rawObj[k] = parsed[k];
          }
        }
      } catch (errJson) {}
    }

    const action = rawObj.action || (rawObj.data && rawObj.data.action) || (rawObj.payload && rawObj.payload.action) || 'ping';
    const d = rawObj.data || rawObj.payload || rawObj;

    // Pastikan sheet dan header telah terbentuk
    setupDatabase();

    if (action === 'ping') {
      return jsonResponse({
        status: 'success',
        message: 'Koneksi ke Database Google Spreadsheet PGRI Cabang Leuwisadeng Aktif!',
        spreadsheetName: ss.getName(),
        timestamp: new Date().toISOString()
      });
    }

    if (action === 'setup') {
      return jsonResponse(setupDatabase());
    }

    if (action === 'getAllData' || action === 'syncAll') {
      return jsonResponse({
        status: 'success',
        data: {
          aspirasi: readSheetData(ss, 'Aspirasi', mapAspirationRow),
          berita: readSheetData(ss, 'Berita', mapArticleRow),
          pengumuman: readSheetData(ss, 'Pengumuman', mapAnnouncementRow),
          laporanKeuangan: readSheetData(ss, 'LaporanKeuangan', mapMonthlyReportRow),
          anggota: readSheetData(ss, 'Anggota', mapMemberRow),
        },
        timestamp: new Date().toISOString()
      });
    }

    const today = new Date().toISOString().split('T')[0];

    // 1. Simpan Aspirasi Guru
    if (action === 'addAspiration') {
      const sheet = ensureSheet(ss, 'Aspirasi');
      const row = [
        d.id || ('asp-' + new Date().getTime()),
        d.ticketNumber || ('ASP-' + Math.floor(1000 + Math.random() * 9000)),
        d.senderName || d.author || d.nama || d.name || 'Anggota PGRI',
        d.npaPgri || d.ktaNumber || '',
        d.schoolOrigin || d.school || d.sekolah || 'Kec. Leuwisadeng',
        d.phone || d.whatsapp || d.noHp || '-',
        d.category || d.kategori || 'Kesejahteraan & Tunjangan',
        d.subject || d.title || d.judul || 'Aspirasi',
        d.message || d.content || d.pesan || d.isi || '-',
        d.status || 'Diterima',
        d.officialResponse || d.tanggapan || '',
        d.date || d.tanggal || today,
        d.responseDate || ''
      ];
      sheet.appendRow(row);
      return jsonResponse({ status: 'success', message: 'Aspirasi berhasil disimpan ke Google Sheets!', id: d.id });
    }

    // 2. Tanggapan Aspirasi
    if (action === 'updateAspiration') {
      const sheet = ensureSheet(ss, 'Aspirasi');
      const rows = sheet.getDataRange().getValues();
      let updated = false;
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][0]) === String(d.id) || String(rows[i][1]) === String(d.ticketNumber)) {
          if (d.status) sheet.getRange(i + 1, 10).setValue(d.status);
          if (d.officialResponse) sheet.getRange(i + 1, 11).setValue(d.officialResponse);
          if (d.responseDate) sheet.getRange(i + 1, 13).setValue(d.responseDate || today);
          updated = true;
          break;
        }
      }
      return jsonResponse({ status: updated ? 'success' : 'not_found', updated: updated });
    }

    // 3. Simpan Berita
    if (action === 'addArticle') {
      const sheet = ensureSheet(ss, 'Berita');
      sheet.appendRow([
        d.id || ('art-' + new Date().getTime()),
        d.title || d.judul || 'Kabar Guru',
        d.slug || '',
        d.category || d.kategori || 'Berita',
        d.author || d.penulis || 'Pengurus Cabang',
        d.authorRole || d.peran || 'Humas',
        d.date || d.tanggal || today,
        d.coverImage || d.imageUrl || '',
        d.excerpt || d.ringkasan || '',
        d.content || d.isi || '',
        Array.isArray(d.tags) ? d.tags.join(', ') : (d.tags || 'PGRI'),
        Number(d.views || 0)
      ]);
      return jsonResponse({ status: 'success', message: 'Berita berhasil disimpan ke Spreadsheet!' });
    }

    // 4. Hapus Berita
    if (action === 'deleteArticle') {
      const sheet = ensureSheet(ss, 'Berita');
      deleteRowById(sheet, d.id);
      return jsonResponse({ status: 'success', message: 'Berita berhasil dihapus dari Spreadsheet!' });
    }

    // 5. Simpan Agenda / Pengumuman
    if (action === 'addAnnouncement') {
      const sheet = ensureSheet(ss, 'Pengumuman');
      sheet.appendRow([
        d.id || ('anc-' + new Date().getTime()),
        d.title || d.judul || 'Kegiatan Cabang',
        d.category || d.kategori || 'Kegiatan Organisasi',
        d.date || d.tanggal || today,
        d.eventDate || d.tanggalKegiatan || '',
        d.location || d.lokasi || 'Kec. Leuwisadeng',
        (d.isUrgent === true || String(d.isUrgent).toUpperCase() === 'YA') ? 'YA' : 'TIDAK',
        d.content || d.isi || '',
        d.attachmentName || d.lampiran || ''
      ]);
      return jsonResponse({ status: 'success', message: 'Pengumuman berhasil disimpan ke Spreadsheet!' });
    }

    // 6. Hapus Agenda / Pengumuman
    if (action === 'deleteAnnouncement') {
      const sheet = ensureSheet(ss, 'Pengumuman');
      deleteRowById(sheet, d.id);
      return jsonResponse({ status: 'success', message: 'Pengumuman berhasil dihapus dari Spreadsheet!' });
    }

    // 7. Simpan Laporan Keuangan Kas
    if (action === 'addMonthlyReport') {
      const sheet = ensureSheet(ss, 'LaporanKeuangan');
      const start = Number(d.startingBalance || 0);
      const inc = Number(d.totalIncome || 0);
      const exp = Number(d.totalExpense || 0);
      const end = Number(d.endingBalance || (start + inc - exp));
      sheet.appendRow([
        d.id || ('rep-' + new Date().getTime()),
        d.monthYear || d.periode || '',
        d.periodCode || '',
        start,
        inc,
        exp,
        end,
        JSON.stringify(d.incomeCategories || []),
        JSON.stringify(d.expenseCategories || []),
        d.status || 'Final',
        d.notes || d.catatan || '',
        d.verifiedBy || d.disahkanOleh || 'Bendahara PGRI Leuwisadeng'
      ]);
      return jsonResponse({ status: 'success', message: 'Laporan kas berhasil disimpan ke Spreadsheet!' });
    }

    // 8. Simpan Anggota
    if (action === 'addMember') {
      const sheet = ensureSheet(ss, 'Anggota');
      sheet.appendRow([
        d.id || ('mem-' + new Date().getTime()),
        d.fullName || d.nama || '',
        d.ktaNumber || d.noKta || '',
        d.branchUnit || d.ranting || '',
        d.schoolOrigin || d.sekolah || '',
        d.employmentStatus || d.status || 'PNS',
        d.phone || d.whatsapp || '',
        d.email || '',
        d.registeredDate || d.joinDate || today
      ]);
      return jsonResponse({ status: 'success', message: 'Anggota berhasil disimpan ke Spreadsheet!' });
    }

    // 9. Hapus Anggota
    if (action === 'deleteMember') {
      const sheet = ensureSheet(ss, 'Anggota');
      deleteRowById(sheet, d.id);
      return jsonResponse({ status: 'success', message: 'Anggota berhasil dihapus dari Spreadsheet!' });
    }

    return jsonResponse({ status: 'error', message: 'Aksi tidak dikenali: ' + action });

  } catch (err) {
    return jsonResponse({ status: 'error', message: 'Terjadi error di Apps Script: ' + err.toString() });
  }
}

/**
 * Helper menghapus baris berdasarkan ID di kolom pertama (A)
 */
function deleteRowById(sheet, targetId) {
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(targetId)) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

/**
 * Helper membaca data sheet dan memetakan ke objek
 */
function readSheetData(ss, sheetName, mapperFn) {
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return values.map(mapperFn).filter(Boolean);
}

function mapAspirationRow(r) {
  if (!r[0]) return null;
  return {
    id: String(r[0]),
    ticketNumber: String(r[1]),
    senderName: String(r[2]),
    npaPgri: String(r[3]),
    schoolOrigin: String(r[4]),
    phone: String(r[5]),
    category: r[6] || 'Lainnya',
    subject: String(r[7]),
    message: String(r[8]),
    status: r[9] || 'Diterima',
    officialResponse: r[10] ? String(r[10]) : undefined,
    date: r[11] ? String(r[11]) : '',
    responseDate: r[12] ? String(r[12]) : undefined,
  };
}

function mapArticleRow(r) {
  if (!r[0]) return null;
  return {
    id: String(r[0]),
    title: String(r[1]),
    slug: String(r[2]),
    category: r[3] || 'Berita',
    author: String(r[4]),
    authorRole: String(r[5]),
    date: r[6] ? String(r[6]) : '',
    coverImage: String(r[7]),
    excerpt: String(r[8]),
    content: String(r[9]),
    tags: r[10] ? String(r[10]).split(',').map(function(t) { return t.trim(); }) : [],
    views: Number(r[11] || 0)
  };
}

function mapAnnouncementRow(r) {
  if (!r[0]) return null;
  return {
    id: String(r[0]),
    title: String(r[1]),
    category: r[2] || 'Kegiatan Organisasi',
    date: r[3] ? String(r[3]) : '',
    eventDate: r[4] ? String(r[4]) : '',
    location: r[5] ? String(r[5]) : '',
    isUrgent: String(r[6]).toUpperCase() === 'YA',
    content: String(r[7]),
    attachmentName: r[8] ? String(r[8]) : undefined
  };
}

function mapMonthlyReportRow(r) {
  if (!r[0]) return null;
  let inCats = [];
  let exCats = [];
  try { inCats = JSON.parse(r[7]); } catch (e) {}
  try { exCats = JSON.parse(r[8]); } catch (e) {}
  return {
    id: String(r[0]),
    monthYear: String(r[1]),
    periodCode: String(r[2]),
    startingBalance: Number(r[3] || 0),
    totalIncome: Number(r[4] || 0),
    totalExpense: Number(r[5] || 0),
    endingBalance: Number(r[6] || 0),
    incomeCategories: Array.isArray(inCats) ? inCats : [],
    expenseCategories: Array.isArray(exCats) ? exCats : [],
    status: r[9] || 'Final',
    notes: r[10] ? String(r[10]) : '',
    verifiedBy: r[11] ? String(r[11]) : ''
  };
}

function mapMemberRow(r) {
  if (!r[0]) return null;
  return {
    id: String(r[0]),
    fullName: String(r[1]),
    ktaNumber: String(r[2]),
    branchUnit: String(r[3]),
    schoolOrigin: String(r[4]),
    employmentStatus: r[5] || 'PNS',
    phone: String(r[6]),
    email: String(r[7]),
    registeredDate: r[8] ? String(r[8]) : ''
  };
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

export class GoogleSheetsService {
  static getWebAppUrl(): string {
    const fromStorage = localStorage.getItem(APPS_SCRIPT_STORAGE_KEY);
    if (fromStorage && fromStorage.trim().startsWith('http')) {
      return fromStorage.trim();
    }
    return '';
  }

  static setWebAppUrl(url: string): void {
    localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, url.trim());
  }

  static isConnected(): boolean {
    const url = this.getWebAppUrl();
    return Boolean(url && url.startsWith('https://script.google.com/'));
  }

  /**
   * Ping Google Apps Script web app to verify deployment status
   */
  static async ping(): Promise<{ success: boolean; message: string; data?: any }> {
    const url = this.getWebAppUrl();
    if (!url) {
      return { success: false, message: 'URL Web App Google Apps Script belum diisi.' };
    }

    try {
      const pingUrl = url.includes('?') ? `${url}&action=ping` : `${url}?action=ping`;
      const response = await fetch(pingUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const json = await response.json();
      if (json.status === 'success') {
        return {
          success: true,
          message: json.message || 'Koneksi ke Google Sheets berhasil!',
          data: json,
        };
      }
      return {
        success: false,
        message: json.message || 'Respon Google Apps Script tidak valid.',
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Gagal terhubung ke Google Apps Script: ${err.message || err}`,
      };
    }
  }

  /**
   * Send data via POST to Google Apps Script (with no-cors protection & GET fallback)
   */
  static async postData(action: string, data: any): Promise<boolean> {
    const url = this.getWebAppUrl();
    if (!url) return false;

    // Normalisasi payload agar kompatibel dengan berbagai versi parser Apps Script
    const payload = {
      action,
      data,
      payload: data,
      ...data
    };

    try {
      // 1. Kirim via POST dengan Content-Type: text/plain & mode: no-cors
      // Mode 'no-cors' mencegah browser melempar error saat Google Apps Script melakukan HTTP 302 redirection ke googleusercontent.com
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (err) {
      console.warn(`[GoogleSheetsSync] Gagal mengirim POST aksi ${action}, mencoba fallback GET:`, err);
      
      // 2. Fallback via GET jika POST gagal di lingkungan tertentu
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('action', action);
        if (data && typeof data === 'object') {
          for (const key of Object.keys(data)) {
            const val = data[key];
            if (val !== undefined && val !== null) {
              queryParams.set(key, typeof val === 'object' ? JSON.stringify(val) : String(val));
            }
          }
        }
        const fallbackUrl = `${url}${url.includes('?') ? '&' : '?'}${queryParams.toString()}`;
        if (fallbackUrl.length < 2000) {
          await fetch(fallbackUrl, { method: 'GET', mode: 'no-cors' });
          return true;
        }
      } catch (fallbackErr) {
        console.warn(`[GoogleSheetsSync] Fallback GET juga gagal:`, fallbackErr);
      }
      return false;
    }
  }

  /**
   * Fetch all data from Google Sheets to sync with local storage
   */
  static async syncAllFromCloud(): Promise<{
    aspirasi?: Aspiration[];
    berita?: Article[];
    pengumuman?: Announcement[];
    laporanKeuangan?: MonthlyBudgetReport[];
    anggota?: Member[];
  } | null> {
    const url = this.getWebAppUrl();
    if (!url) return null;

    try {
      const fetchUrl = url.includes('?') ? `${url}&action=getAllData` : `${url}?action=getAllData`;
      const res = await fetch(fetchUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      if (!res.ok) return null;
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        return json.data;
      }
      return null;
    } catch (err) {
      console.warn('[GoogleSheetsSync] Gagal mengambil data dari Google Sheets:', err);
      return null;
    }
  }
}
