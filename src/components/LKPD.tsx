import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, buttonTap } from '../lib/motion';
import { FaFilePdf, FaClipboardList } from '../lib/icons';

type RowTabel = { organisme: string; peran: string; trofik: string };

const ORGANISME = ['Padi', 'Belalang', 'Katak', 'Ular', 'Elang', 'Jamur'] as const;

const PERTANYAAN: string[] = [
  'Berdasarkan tabel di atas, susunlah satu rantai makanan yang mungkin terjadi!',
  'Apa yang dimaksud dengan produsen? Mengapa produsen selalu berada di tingkat trofik pertama?',
  'Jelaskan aliran energi yang terjadi pada rantai makanan yang kamu susun!',
  'Jika populasi katak berkurang drastis, apa yang akan terjadi pada populasi belalang dan ular? Jelaskan!',
  'Tuliskan kesimpulan dari kegiatan ini!',
];

export default function LKPD() {
  const [tabel, setTabel] = useState<RowTabel[]>(() =>
    ORGANISME.map((o) => ({ organisme: o, peran: '', trofik: '' }))
  );
  const [jawaban, setJawaban] = useState<Record<number, string>>({});

  const updateTabel = (i: number, key: keyof RowTabel, val: string) =>
    setTabel((t) => t.map((row, idx) => (idx === i ? { ...row, [key]: val } : row)));

  return (
    <motion.div className="space-y-4" variants={fadeUp} initial="initial" animate="animate">
      <div className="no-print bg-white rounded-2xl shadow-soft p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
            <FaClipboardList className="w-5 h-5" /> Lembar Kerja Peserta Didik
          </h2>
          <p className="text-xs text-slate-500">
            Isi seluruh bagian, lalu klik tombol di samping untuk menyimpan hasilnya.
          </p>
        </div>
        <motion.button
          onClick={() => window.print()}
          whileHover={{ scale: 1.03 }}
          {...buttonTap}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition-colors"
        >
          <FaFilePdf className="w-4 h-4" /> Simpan sebagai PDF
        </motion.button>
      </div>

      <motion.div
        id="lkpd-print"
        className="bg-white rounded-2xl shadow-card p-6 md:p-8 space-y-6 text-slate-800 border border-slate-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <div className="border-b-2 border-emerald-600 pb-4 text-center">
          <h1 className="text-xl font-extrabold uppercase">Lembar Kerja Peserta Didik (LKPD)</h1>
          <p className="font-semibold">Rantai Makanan dan Jaring-Jaring Makanan</p>
          <p className="text-sm text-slate-600">IPA · Kelas VII SMP · SMP Cendekia Ambon</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          {['Nama', 'Kelas', 'Tanggal'].map((lbl) => (
            <div key={lbl}>
              <label className="font-semibold">{lbl}</label>
              <input className="w-full border-b border-slate-400 outline-none py-1 bg-transparent focus:border-emerald-500 transition-colors" />
            </div>
          ))}
        </div>

        <section>
          <h3 className="font-bold text-emerald-800 mb-2">A. Tujuan Pembelajaran</h3>
          <ol className="list-decimal pl-5 text-sm space-y-1">
            <li>Mengidentifikasi komponen-komponen dalam rantai makanan.</li>
            <li>Menjelaskan peran produsen, konsumen, dan pengurai dalam ekosistem.</li>
            <li>Menganalisis aliran energi pada rantai makanan.</li>
            <li>Memprediksi dampak perubahan populasi terhadap keseimbangan ekosistem.</li>
          </ol>
        </section>

        <section>
          <h3 className="font-bold text-emerald-800 mb-2">B. Alat dan Bahan</h3>
          <ul className="list-disc pl-5 text-sm space-y-1">
            <li>Laptop / gawai yang terhubung internet</li>
            <li>Media Pembelajaran Interaktif ini</li>
            <li>Alat tulis</li>
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-emerald-800 mb-2">C. Langkah Kerja</h3>
          <ol className="list-decimal pl-5 text-sm space-y-1">
            <li>Bacalah bagian <b>Teori Dasar</b> pada media ini dengan cermat.</li>
            <li>Amatilah ekosistem sawah di sekitar tempat tinggalmu (atau pada video/gambar).</li>
            <li>Catat organisme yang kamu temukan pada tabel hasil pengamatan di bawah.</li>
            <li>Tentukan peran dan tingkat trofik setiap organisme.</li>
            <li>Jawablah pertanyaan pada bagian E dengan lengkap.</li>
          </ol>
        </section>

        <section>
          <h3 className="font-bold text-emerald-800 mb-2">D. Hasil Pengamatan</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-emerald-100">
                <th className="border border-slate-400 px-2 py-2 w-10">No</th>
                <th className="border border-slate-400 px-2 py-2">Nama Organisme</th>
                <th className="border border-slate-400 px-2 py-2">
                  Peran
                  <br />
                  <span className="text-xs font-normal">(Produsen / Konsumen / Pengurai)</span>
                </th>
                <th className="border border-slate-400 px-2 py-2">Tingkat Trofik</th>
              </tr>
            </thead>
            <tbody>
              {tabel.map((row, i) => (
                <tr key={row.organisme} className="hover:bg-emerald-50/50 transition-colors">
                  <td className="border border-slate-400 px-2 py-1 text-center">{i + 1}</td>
                  <td className="border border-slate-400 px-2 py-1">{row.organisme}</td>
                  <td className="border border-slate-400 p-1">
                    <input
                      value={row.peran}
                      onChange={(e) => updateTabel(i, 'peran', e.target.value)}
                      className="w-full outline-none bg-transparent px-1 focus:bg-emerald-50 rounded transition-colors"
                    />
                  </td>
                  <td className="border border-slate-400 p-1">
                    <input
                      value={row.trofik}
                      onChange={(e) => updateTabel(i, 'trofik', e.target.value)}
                      className="w-full outline-none bg-transparent px-1 focus:bg-emerald-50 rounded transition-colors"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3 className="font-bold text-emerald-800 mb-2">E. Pertanyaan</h3>
          <ol className="list-decimal pl-5 text-sm space-y-3">
            {PERTANYAAN.map((q, i) => (
              <li key={i}>
                <p className="mb-1">{q}</p>
                <textarea
                  rows={3}
                  value={jawaban[i] ?? ''}
                  onChange={(e) => setJawaban({ ...jawaban, [i]: e.target.value })}
                  placeholder="Tulis jawabanmu di sini..."
                  className="w-full border border-slate-400 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 bg-transparent transition-all"
                />
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h3 className="font-bold text-emerald-800 mb-2">F. Kesimpulan</h3>
          <textarea
            rows={4}
            placeholder="Tulis kesimpulanmu..."
            className="w-full border border-slate-400 rounded-lg p-2 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-500 bg-transparent transition-all"
          />
        </section>

        <p className="text-xs text-slate-500 text-center pt-4 border-t border-slate-300">
          LKPD Interaktif — Hasan Bashri Hadimu · SMP Cendekia Ambon
        </p>
      </motion.div>
    </motion.div>
  );
}