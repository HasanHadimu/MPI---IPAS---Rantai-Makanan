import { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import type { IconType } from 'react-icons';
import { FaTrophy } from 'react-icons/fa';
import {
  FaBullseye,
  FaClipboardList,
  FaEdit,               // ← pengganti FaPenToSquareAlt
  FaLock,
  FaExclamationTriangle,
  FaCheckCircle,
  FaStar,
  FaCheck,
  FaBook,
} from '../lib/icons';
import type { EvaluasiResult, EvaluasiStage } from '../types';

type PGQuestion = { q: string; o: string[]; a: number };
type EssayQuestion = { q: string; kw: string[] };

const PG: PGQuestion[] = [
  { q: 'Urutan perpindahan energi dari organisme satu ke organisme lain dalam ekosistem disebut ...',
    o: ['Piramida makanan', 'Rantai makanan', 'Jaring-jaring makanan', 'Simbiosis'], a: 1 },
  { q: 'Organisme yang mampu membuat makanan sendiri melalui fotosintesis disebut ...',
    o: ['Konsumen', 'Produsen', 'Pengurai', 'Detritivor'], a: 1 },
  { q: 'Pada rantai makanan padi → tikus → ular → elang, tikus berperan sebagai ...',
    o: ['Produsen', 'Konsumen I', 'Konsumen II', 'Konsumen III'], a: 1 },
  { q: 'Organisme yang menguraikan sisa-sisa makhluk hidup menjadi zat hara disebut ...',
    o: ['Produsen', 'Konsumen', 'Pengurai', 'Predator'], a: 2 },
  { q: 'Besarnya energi yang berpindah dari satu tingkat trofik ke tingkat trofik berikutnya adalah sekitar ...',
    o: ['1%', '10%', '50%', '90%'], a: 1 },
  { q: 'Kumpulan beberapa rantai makanan yang saling berhubungan disebut ...',
    o: ['Piramida ekologi', 'Jaring-jaring makanan', 'Rantai makanan', 'Ekosistem'], a: 1 },
  { q: 'Berikut yang BUKAN komponen biotik dalam ekosistem adalah ...',
    o: ['Tumbuhan', 'Hewan', 'Bakteri', 'Cahaya matahari'], a: 3 },
  { q: 'Di ekosistem sawah, jika populasi katak menurun drastis, dampak yang paling mungkin terjadi adalah ...',
    o: ['Populasi belalang menurun', 'Populasi belalang meningkat', 'Populasi padi meningkat', 'Populasi ular meningkat'], a: 1 },
  { q: 'Gambaran susunan organisme berdasarkan tingkat trofiknya dalam ekosistem disebut ...',
    o: ['Rantai makanan', 'Piramida ekologi', 'Jaring-jaring makanan', 'Siklus biogeokimia'], a: 1 },
  { q: 'Pada piramida ekologi yang normal, jumlah organisme paling banyak berada pada tingkat trofik ...',
    o: ['Produsen', 'Konsumen I', 'Konsumen II', 'Konsumen puncak'], a: 0 },
];

const ESSAY: EssayQuestion[] = [
  { q: 'Jelaskan pengertian rantai makanan dan berikan satu contoh rantai makanan yang terdapat di ekosistem sawah!',
    kw: ['energi', 'makan', 'padi', 'sawah'] },
  { q: 'Sebutkan dan jelaskan komponen-komponen dalam rantai makanan beserta perannya!',
    kw: ['produsen', 'konsumen', 'pengurai', 'fotosintesis'] },
  { q: 'Mengapa hanya sekitar 10% energi yang berpindah ke tingkat trofik berikutnya? Jelaskan!',
    kw: ['10', 'energi', 'panas', 'respirasi'] },
  { q: 'Jelaskan perbedaan antara rantai makanan dengan jaring-jaring makanan!',
    kw: ['jaring', 'saling', 'hubungan', 'kompleks'] },
  { q: 'Apa yang akan terjadi jika salah satu komponen dalam rantai makanan punah? Jelaskan dampaknya terhadap ekosistem!',
    kw: ['seimbang', 'populasi', 'ekosistem', 'rantai'] },
];

const STORAGE_KEY = 'mpi_evaluasi_rantai_makanan';

type Predikat = { label: string; icon: IconType; color: string };

function getPredikat(total: number): Predikat {
  if (total >= 90) return { label: 'Sangat Baik',     icon: FaTrophy, color: 'text-yellow-500' };
  if (total >= 75) return { label: 'Baik',            icon: FaStar,   color: 'text-emerald-500' };
  if (total >= 60) return { label: 'Cukup',           icon: FaCheck,  color: 'text-blue-500' };
  return              { label: 'Perlu Belajar Lagi', icon: FaBook,   color: 'text-slate-500' };
}

export default function Evaluasi() {
  const [stage, setStage] = useState<EvaluasiStage>('intro');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [essay, setEssay] = useState<Record<number, string>>({});
  const [result, setResult] = useState<EvaluasiResult | null>(null);
  const [displayScore, setDisplayScore] = useState<number>(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as EvaluasiResult;
        setResult(parsed);
        setStage('hasil');
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    if (stage !== 'hasil' || !result) return;
    setDisplayScore(0);
    const controls = animate(0, result.total, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayScore(Math.round(v)),
    });
    return () => controls.stop();
  }, [stage, result]);

  const hitung = () => {
    const pgScore = PG.reduce((acc, q, i) => acc + (answers[i] === q.a ? 6 : 0), 0);
    const essayDetail: number[] = ESSAY.map((q, i) => {
      const t = (essay[i] ?? '').trim();
      const low = t.toLowerCase();
      const kw = q.kw.filter((k) => low.includes(k)).length;
      if (t.length >= 40 && kw >= 2) return 8;
      if (t.length >= 20 && kw >= 1) return 5;
      if (t.length >= 10) return 2;
      return 0;
    });
    const essayScore = essayDetail.reduce((a, b) => a + b, 0);
    const res: EvaluasiResult = {
      pgScore,
      essayScore,
      total: pgScore + essayScore,
      benarPG: PG.filter((q, i) => answers[i] === q.a).length,
      essayDetail,
      waktu: new Date().toLocaleString('id-ID'),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res));
    setResult(res);
    setStage('hasil');
  };

  const belumLengkap =
    Object.keys(answers).length < PG.length ||
    ESSAY.some((_, i) => !(essay[i] ?? '').trim());

  /* ---------- INTRO ---------- */
  if (stage === 'intro') {
    return (
      <motion.div
        className="bg-white rounded-3xl shadow-card p-10 text-center max-w-2xl mx-auto border border-slate-100"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mb-4 inline-flex p-4 rounded-full bg-emerald-50"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaBullseye className="w-14 h-14 text-emerald-600" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-emerald-800">Evaluasi Akhir</h2>
        <p className="text-slate-500 mt-2">
          Uji pemahamanmu tentang rantai makanan dan jaring-jaring makanan.
        </p>
        <motion.button
          onClick={() => setStage('petunjuk')}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.5)' }}
          whileTap={{ scale: 0.96 }}
          className="mt-6 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-colors"
        >
          <FaClipboardList className="w-4 h-4" /> Lihat Petunjuk Pengerjaan
        </motion.button>
      </motion.div>
    );
  }

  /* ---------- PETUNJUK ---------- */
  if (stage === 'petunjuk') {
    return (
      <motion.div
        className="bg-white rounded-3xl shadow-card p-8 max-w-2xl mx-auto border border-slate-100"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
          <FaClipboardList className="w-5 h-5" /> Petunjuk Pengerjaan
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700">
          <li>Evaluasi terdiri dari <b>15 butir soal</b>: 10 soal pilihan ganda dan 5 soal esai.</li>
          <li>Seluruh soal ditampilkan dalam <b>satu halaman</b>. Silakan scroll ke bawah.</li>
          <li>Soal pilihan ganda bernilai <b>6 poin</b> per soal (total 60 poin).</li>
          <li>Soal esai bernilai <b>8 poin</b> per soal (total 40 poin).</li>
          <li>Nilai akhir maksimal adalah <b>100</b>.</li>
          <li>
            <b>Evaluasi hanya dapat dikerjakan satu kali.</b> Setelah kamu menekan tombol
            "Kumpulkan", jawaban tidak dapat diubah dan evaluasi tidak dapat diulang.
          </li>
          <li>Pastikan seluruh soal telah dijawab sebelum mengumpulkan.</li>
        </ol>
        <div className="mt-5 rounded-xl bg-amber-50 border border-amber-300 p-4 text-sm text-amber-900 flex items-start gap-2">
          <FaExclamationTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span><b>Perhatian:</b> tombol "Kumpulkan Jawaban" bersifat permanen.</span>
        </div>
        <motion.button
          onClick={() => setStage('soal')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-md transition-colors"
        >
          <FaEdit className="w-4 h-4" /> Mulai Mengerjakan
        </motion.button>
      </motion.div>
    );
  }

  /* ---------- HASIL ---------- */
  if (stage === 'hasil' && result) {
    const predikat = getPredikat(result.total);
    const PredikatIcon = predikat.icon;
    return (
      <motion.div
        className="max-w-3xl mx-auto space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="bg-white rounded-3xl shadow-card p-8 text-center border border-slate-100"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <p className="text-sm text-slate-500 uppercase tracking-widest">Hasil Evaluasi</p>
          <div className="text-7xl font-extrabold text-emerald-600 my-3">{displayScore}</div>
          <p className="text-lg font-bold text-slate-700 inline-flex items-center gap-2">
            <PredikatIcon className={`w-5 h-5 ${predikat.color}`} />
            {predikat.label}
          </p>
          <p className="text-xs text-slate-400 mt-1">Dikumpulkan: {result.waktu}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Pilihan Ganda', score: `${result.pgScore} / 60`, sub: `Benar ${result.benarPG} dari 10 soal`, delay: 0.15 },
            { label: 'Soal Esai',     score: `${result.essayScore} / 40`, sub: 'Nilai otomatis berbasis kata kunci', delay: 0.25 },
          ].map((c) => (
            <motion.div
              key={c.label}
              className="bg-white rounded-2xl shadow-soft p-5 border border-slate-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: c.delay, duration: 0.4 }}
            >
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className="text-2xl font-bold text-emerald-700">{c.score}</p>
              <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-white rounded-2xl shadow-soft p-5 border border-slate-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <h3 className="font-bold text-slate-800 mb-3">Rincian Skor Esai</h3>
          <ul className="space-y-2 text-sm">
            {result.essayDetail.map((s, i) => (
              <li key={i} className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-600">Soal esai {i + 1}</span>
                <span className="font-semibold">{s} / 8</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-center text-sm text-rose-800 inline-flex items-center gap-2 w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <FaLock className="w-4 h-4" />
          Evaluasi telah selesai dan <b>tidak dapat diulang</b>.
        </motion.div>
      </motion.div>
    );
  }

  /* ---------- SOAL ---------- */
  const answeredCount = Object.keys(answers).length;
  const essayCount = ESSAY.filter((_, i) => (essay[i] ?? '').trim()).length;
  const progress = ((answeredCount + essayCount) / (PG.length + ESSAY.length)) * 100;

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="bg-white rounded-2xl shadow-soft p-5 sticky top-2 z-20 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
            <FaBullseye className="w-5 h-5" /> Lembar Evaluasi
          </h2>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            {answeredCount + essayCount} / {PG.length + ESSAY.length}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-2">
          PG: {answeredCount}/10 · Esai: {essayCount}/5
        </p>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-100">
        <h3 className="font-bold text-emerald-800 mb-4">A. Pilihan Ganda (10 soal × 6 poin)</h3>
        <div className="space-y-5">
          {PG.map((q, i) => (
            <motion.div
              key={i}
              className="border-b border-slate-100 pb-4 last:border-0"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4 }}
            >
              <p className="font-medium text-slate-800 mb-2">{i + 1}. {q.q}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {q.o.map((opt, j) => (
                  <motion.label
                    key={j}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-start gap-2 px-3 py-2 rounded-xl border-2 cursor-pointer text-sm transition-colors ${
                      answers[i] === j
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`pg-${i}`}
                      checked={answers[i] === j}
                      onChange={() => setAnswers({ ...answers, [i]: j })}
                      className="mt-0.5 accent-emerald-600"
                    />
                    <span><b>{String.fromCharCode(65 + j)}.</b> {opt}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6 border border-slate-100">
        <h3 className="font-bold text-emerald-800 mb-4">B. Soal Esai (5 soal × 8 poin)</h3>
        <div className="space-y-5">
          {ESSAY.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <p className="font-medium text-slate-800 mb-2">{i + 11}. {q.q}</p>
              <textarea
                rows={4}
                value={essay[i] ?? ''}
                onChange={(e) => setEssay({ ...essay, [i]: e.target.value })}
                placeholder="Tulis jawabanmu di sini..."
                className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm outline-none focus:border-emerald-400 transition-colors"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-5 text-center border border-slate-100">
        <motion.button
          onClick={hitung}
          disabled={belumLengkap}
          whileHover={!belumLengkap ? { scale: 1.03 } : {}}
          whileTap={!belumLengkap ? { scale: 0.97 } : {}}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold px-10 py-3 rounded-full shadow-lg transition-colors"
        >
          <FaCheckCircle className="w-4 h-4" /> Kumpulkan Jawaban
        </motion.button>
        <AnimatePresence>
          {belumLengkap && (
            <motion.p
              className="text-xs text-rose-500 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Semua soal (PG dan esai) harus dijawab sebelum dikumpulkan.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}