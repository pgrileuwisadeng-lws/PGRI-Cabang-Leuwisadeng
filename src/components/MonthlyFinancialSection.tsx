import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Eye, 
  X, 
  Calendar,
  Building2,
  Info
} from 'lucide-react';
import { MonthlyBudgetReport } from '../types';
import { StorageService } from '../services/storage';

interface MonthlyFinancialSectionProps {
  reports?: MonthlyBudgetReport[];
  monthlyReports?: MonthlyBudgetReport[];
  onReportUpdated?: () => void;
}

export const MonthlyFinancialSection: React.FC<MonthlyFinancialSectionProps> = ({ 
  reports, 
  monthlyReports 
}) => {
  const activeReports = reports || monthlyReports || [];
  const [selectedReport, setSelectedReport] = useState<MonthlyBudgetReport | null>(null);
  const [filterYear, setFilterYear] = useState<string>('all');

  const filteredReports = activeReports.filter(r => {
    if (filterYear === 'all') return true;
    return r.periodCode?.startsWith(filterYear);
  });

  const latestReport = activeReports[0];
  const currentBalance = latestReport ? latestReport.endingBalance : 0;
  const totalAnnualIncome = activeReports.reduce((acc, curr) => acc + (curr.totalIncome || 0), 0);
  const totalAnnualExpense = activeReports.reduce((acc, curr) => acc + (curr.totalExpense || 0), 0);

  const handleDownloadPDF = (report?: MonthlyBudgetReport) => {
    StorageService.exportFinancialToPDF(report || latestReport);
  };

  return (
    <section id="laporan-keuangan" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Akuntabilitas Publik Organisasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Transparansi Laporan Keuangan Bulanan
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Sebagai wujud komitmen keterbukaan tata kelola organisasi guru di PGRI Cabang Leuwisadeng, rekapitulasi penerimaan, belanja operasional, dan saldo kas disajikan secara berkala.
          </p>
        </div>

        {/* Global Action: Download Official Statement */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleDownloadPDF()}
            className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 active:scale-95 text-white text-xs sm:text-sm font-semibold transition flex items-center gap-2 shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Rekapitulasi Resmi (PDF)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Saldo Kas Aktif</span>
            <div className="p-2 rounded-lg bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            Rp {currentBalance.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Posisi Kas per {latestReport?.monthYear || 'Bulan Berjalan'}</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Total Penerimaan</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
            Rp {totalAnnualIncome.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Iuran ranting, donasi & kemitraan
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Realisasi Belanja & Kegiatan</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-2">
            Rp {totalAnnualExpense.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Advokasi, sosial, diklat & operasional
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Status Pemeriksaan</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-2 flex items-center gap-1.5">
            <span>Wajar Tanpa Pengecualian</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Verifikasi Badan Pemeriksa Cabang
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        {/* Table Filter Bar */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-red-700 dark:text-red-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Daftar Rekapitulasi Kas per Periode Bulan
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Tahun Anggaran:</span>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-1 focus:ring-red-600 cursor-pointer"
            >
              <option value="all">Semua Periode</option>
              <option value="2026">Tahun 2026</option>
              <option value="2025">Tahun 2025</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                <th className="py-3 px-4">Periode Bulan</th>
                <th className="py-3 px-4 text-right">Saldo Awal</th>
                <th className="py-3 px-4 text-right">Penerimaan</th>
                <th className="py-3 px-4 text-right">Pengeluaran</th>
                <th className="py-3 px-4 text-right">Saldo Akhir</th>
                <th className="py-3 px-4 text-center">Status Audit</th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                  <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-red-600" />
                      <span>{rep.monthYear}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600 dark:text-slate-300">
                    Rp {rep.startingBalance.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                    +Rp {rep.totalIncome.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-amber-600 dark:text-amber-400">
                    -Rp {rep.totalExpense.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-slate-100">
                    Rp {rep.endingBalance.toLocaleString('id-ID')}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {rep.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setSelectedReport(rep)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1 cursor-pointer"
                        title="Lihat Rincian Pos Anggaran"
                      >
                        <Eye className="w-3.5 h-3.5 text-red-600" />
                        <span>Rincian</span>
                      </button>
                      <button
                        onClick={() => handleDownloadPDF(rep)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30 transition cursor-pointer"
                        title="Cetak PDF Bulan Ini"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="p-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-red-600 shrink-0" />
            <span>
              Laporan keuangan diverifikasi oleh Bendahara Cabang dan disahkan oleh Ketua PGRI Cabang Leuwisadeng.
            </span>
          </div>
          <span className="text-[11px] text-slate-400 shrink-0">
            Sumber Data: Buku Kas Umum (BKU) Cabang
          </span>
        </div>
      </div>

      {/* Itemized Modal Details */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[11px] font-bold uppercase text-red-600 tracking-wider">
                  Rincian Anggaran
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Laporan Kas Periode {selectedReport.monthYear}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Summary Strip */}
            <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-semibold">Saldo Awal</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
                  Rp {selectedReport.startingBalance.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-emerald-600 uppercase font-semibold">Penerimaan</span>
                <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  +Rp {selectedReport.totalIncome.toLocaleString('id-ID')}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-amber-600 uppercase font-semibold">Pengeluaran</span>
                <p className="text-xs sm:text-sm font-bold text-amber-600 dark:text-amber-400">
                  -Rp {selectedReport.totalExpense.toLocaleString('id-ID')}
                </p>
              </div>
            </div>

            {/* Breakdown Categories */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Pos Penerimaan Kas</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedReport.incomeCategories.map((inc, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                      <span className="text-slate-700 dark:text-slate-300">{inc.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Rp {inc.amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1.5">
                  <TrendingDown className="w-3.5 h-3.5 text-amber-600" />
                  <span>Pos Realisasi Pengeluaran Kas</span>
                </h4>
                <div className="space-y-1.5">
                  {selectedReport.expenseCategories.map((exp, i) => (
                    <div key={i} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                      <span className="text-slate-700 dark:text-slate-300">{exp.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100">
                        Rp {exp.amount.toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification Note */}
            <div className="p-3 rounded-xl bg-red-50/70 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40 text-xs space-y-1">
              <div className="font-semibold text-red-900 dark:text-red-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-700 dark:text-red-400" />
                <span>Pengesahan Dokumen</span>
              </div>
              <p className="text-red-800/90 dark:text-red-300/80 text-[11px] leading-relaxed">
                {selectedReport.notes}
              </p>
              <p className="text-[10px] text-red-700/70 dark:text-red-400/60 pt-1 font-mono">
                Pemeriksa: {selectedReport.verifiedBy}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                onClick={() => {
                  handleDownloadPDF(selectedReport);
                  setSelectedReport(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh Dokumen Resmi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
