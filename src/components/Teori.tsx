import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';
import { staggerContainer, staggerItem } from '../lib/motion';
import {
  FaLink, FaPuzzlePiece, FaBolt, FaChartBar, FaGlobeAsia,
  FaSeedling, FaPaw, FaBug, FaRedo, FaPlay,
  GiFrog, GiSnake, GiEagleHead, GiMushroomGills, GiWheat, GiSpiderWeb,
} from '../lib/icons';

type Trofik = { name: string; full: string; icon: IconType; energy: number; color: string };

const TROFIK: Trofik[] = [
  { name: 'Produsen',     full: 'Rumput/Padi', icon: GiWheat,         energy: 10000, color: 'text-yellow-400' },
  { name: 'Konsumen I',   full: 'Belalang',    icon: FaBug,           energy: 1000,  color: 'text-lime-400' },
  { name: 'Konsumen II',  full: 'Katak',       icon: GiFrog,          energy: 100,   color: 'text-emerald-400' },
  { name: 'Konsumen III', full: 'Ular',        icon: GiSnake,         energy: 10,    color: 'text-orange-400' },
  { name: 'Konsumen IV',  full: 'Elang',       icon: GiEagleHead,     energy: 1,     color: 'text-sky-400' },
];

type Section = { icon: IconType; title: string; body: ReactNode };

const SECTIONS: Section[] = [
  {
    icon: FaLink,
    title: '1. Pengertian Rantai Makanan',
    body: (
      <>
        <p>
          <b>Rantai makanan</b> adalah perpindahan energi dari satu organisme ke organisme lain
          melalui peristiwa <i>makan dan dimakan</i> secara berurutan. Setiap tahapan dalam rantai
          makanan disebut <b>tingkat trofik</b>.
        </p>
        <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex items-center justify-center gap-2 flex-wrap text-emerald-800 font-semibold">
          <GiWheat className="w-6 h-6 text-yellow-600" /> Padi
          <span className="text-slate-400">→</span>
          <span>🐭</span> Tikus
          <span className="text-slate-400">→</span>
          <GiSnake className="w-6 h-6 text-orange-600" /> Ular
          <span className="text-slate-400">→</span>
          <GiEagleHead className="w-6 h-6 text-sky-600" /> Elang
          <span className="text-slate-400">→</span>
          <GiMushroomGills className="w-6 h-6 text-purple-600" /> Pengurai
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Arah panah menunjukkan arah <b>perpindahan energi</b>, bukan arah "dimakan".
        </p>
      </>
    ),
  },
  {
    icon: FaPuzzlePiece,
    title: '2. Komponen dalam Rantai Makanan',
    body: (
      <div className="space-y-3">
        <div className="rounded-xl border-l-4 border-green-500 bg-green-50 p-4">
          <b className="text-green-800 flex items-center gap-2">
            <FaSeedling className="w-4 h-4" /> Produsen (Autotrof)
          </b>
          <p className="text-sm text-slate-700 mt-1">
            Organisme yang dapat membuat makanan sendiri melalui <b>fotosintesis</b>
            (tumbuhan hijau, fitoplankton). Produsen selalu menempati tingkat trofik pertama
            karena merupakan sumber energi utama.
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-amber-500 bg-amber-50 p-4">
          <b className="text-amber-800 flex items-center gap-2">
            <FaPaw className="w-4 h-4" /> Konsumen (Heterotrof)
          </b>
          <p className="text-sm text-slate-700 mt-1">
            Organisme yang memperoleh energi dengan memakan organisme lain.<br />
            • <b>Konsumen I</b> = herbivora · • <b>Konsumen II</b> = karnivora · • <b>Omnivora</b> = keduanya
          </p>
        </div>
        <div className="rounded-xl border-l-4 border-purple-500 bg-purple-50 p-4">
          <b className="text-purple-800 flex items-center gap-2">
            <GiMushroomGills className="w-4 h-4" /> Pengurai (Dekomposer)
          </b>
          <p className="text-sm text-slate-700 mt-1">
            Bakteri dan jamur yang menguraikan sisa makhluk hidup menjadi zat hara anorganik
            yang dapat diserap kembali oleh produsen. Pengurai menutup siklus materi.
          </p>
        </div>
      </div>
    ),
  },
  {
    icon: FaBolt,
    title: '3. Tingkat Trofik & Aliran Energi (Hukum 10%)',
    body: (
      <>
        <p>
          Energi mengalir dari produsen ke konsumen. Namun hanya sekitar <b>10% energi</b> yang
          berhasil dipindahkan ke tingkat trofik berikutnya. Sisanya (90%) hilang sebagai
          <b> panas</b>, digunakan untuk <b>respirasi</b>, dan terbuang melalui <b>ekskresi</b>.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Klik tombol di bawah untuk mensimulasikan aliran energi tersebut.
        </p>
        <EnergySimulator />
      </>
    ),
  },
  {
    icon: GiSpiderWeb,
    title: '4. Jaring-Jaring Makanan',
    body: (
      <>
        <p>
          Di alam, organisme tidak hanya makan satu jenis makanan. Kumpulan rantai makanan yang
          saling berhubungan disebut <b>jaring-jaring makanan</b>.
        </p>
        <div className="mt-3 rounded-xl bg-cyan-50 border border-cyan-200 p-4 text-sm">
          <b className="text-cyan-800">Contoh jaring-jaring makanan di sawah:</b>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700">
            <li>Padi → Tikus → Ular → Elang</li>
            <li>Padi → Belalang → Katak → Ular</li>
            <li>Padi → Belalang → Burung → Elang</li>
            <li>Padi → Wereng → Laba-laba → Burung</li>
          </ul>
        </div>
      </>
    ),
  },
  {
    icon: FaChartBar,
    title: '5. Piramida Ekologi',
    body: (
      <>
        <p>Gambaran susunan organisme berdasarkan tingkat trofiknya disebut <b>piramida ekologi</b>.</p>
        <div className="mt-3 space-y-1 text-sm">
          <div className="mx-auto w-1/4 bg-emerald-500 text-white text-center rounded-t py-2 font-semibold flex items-center justify-center gap-1">
            <GiEagleHead className="w-4 h-4" /> Elang
          </div>
          <div className="mx-auto w-2/4 bg-lime-500 text-white text-center py-2 font-semibold flex items-center justify-center gap-1">
            <GiSnake className="w-4 h-4" /> Ular
          </div>
          <div className="mx-auto w-3/4 bg-amber-500 text-white text-center py-2 font-semibold flex items-center justify-center gap-1">
            <GiFrog className="w-4 h-4" /> Katak
          </div>
          <div className="mx-auto w-full bg-green-600 text-white text-center rounded-b py-2 font-semibold flex items-center justify-center gap-1">
            <FaSeedling className="w-4 h-4" /> Produsen
          </div>
        </div>
        <ul className="list-disc pl-5 mt-3 text-sm text-slate-700 space-y-1">
          <li><b>Piramida jumlah</b> — jumlah individu per tingkat trofik.</li>
          <li><b>Piramida biomassa</b> — total massa organisme per tingkat trofik.</li>
          <li><b>Piramida energi</b> — jumlah energi per tingkat trofik (paling akurat).</li>
        </ul>
      </>
    ),
  },
  {
    icon: FaGlobeAsia,
    title: '6. Keseimbangan Ekosistem & Peran Manusia',
    body: (
      <>
        <p>
          Rantai makanan bisa terganggu oleh aktivitas manusia: perburuan liar, pencemaran,
          penggunaan pestisida berlebihan, dan alih fungsi lahan.
        </p>
        <div className="mt-3 rounded-xl bg-rose-50 border border-rose-200 p-4 text-sm text-rose-900">
          <b>Contoh kasus:</b> Jika katak di sawah banyak diburu, populasi belalang akan meledak
          dan merusak tanaman padi. Petani pun merugi.
        </div>
      </>
    ),
  },
];

function EnergySimulator() {
  const [step, setStep] = useState<number>(0);

  return (
    <motion.div
      className="mt-4 rounded-2xl bg-slate-900 p-5 text-white"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {TROFIK.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.span
              key={t.name}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                i <= step ? 'bg-emerald-500' : 'bg-slate-700 text-slate-400'
              }`}
              animate={i <= step ? { scale: [0.9, 1.05, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.name}
            </motion.span>
          );
        })}
      </div>

      <div className="space-y-3">
        {TROFIK.map((t, i) => {
          const Icon = t.icon;
          const active = i <= step;
          const pct = Math.max(2, (t.energy / TROFIK[0].energy) * 100);
          return (
            <div key={t.name} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className={`flex items-center gap-1.5 ${active ? 'text-white' : 'text-slate-500'}`}>
                  <Icon className={`w-3.5 h-3.5 ${active ? t.color : ''}`} />
                  {t.full}
                </span>
                <span className={active ? 'text-emerald-300 font-bold' : 'text-slate-600'}>
                  {active ? t.energy.toLocaleString('id-ID') + ' kkal' : '???'}
                </span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-400 to-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: active ? `${pct}%` : '0%' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        <motion.button
          onClick={() => setStep((s) => Math.min(TROFIK.length - 1, s + 1))}
          disabled={step === TROFIK.length - 1}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="flex-1 inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm py-2 rounded-xl transition-colors"
        >
          <FaPlay className="w-3.5 h-3.5" /> Lanjutkan Aliran Energi
        </motion.button>
        <motion.button
          onClick={() => setStep(0)}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-1.5 px-4 bg-slate-700 hover:bg-slate-600 text-sm rounded-xl transition-colors"
        >
          <FaRedo className="w-3.5 h-3.5" /> Reset
        </motion.button>
      </div>

      <AnimatePresence>
        {step === TROFIK.length - 1 && (
          <motion.p
            className="text-[11px] text-emerald-300 mt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            ✓ Dari 10.000 kkal hanya tersisa 1 kkal di konsumen puncak — hanya 10% yang berpindah tiap tingkat!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Teori() {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) =>
    setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <div className="space-y-3">
      <motion.div
        className="bg-white rounded-2xl shadow-soft p-5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <FaLink className="w-5 h-5" /> Teori Dasar
        </h2>
        <p className="text-sm text-slate-500">
          Klik setiap bagian untuk membaca penjelasan lengkapnya.
        </p>
      </motion.div>

      <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
        {SECTIONS.map((s, i) => {
          const Icon = s.icon;
          const isOpen = open.includes(i);
          return (
            <motion.div
              key={s.title}
              variants={staggerItem}
              className="bg-white rounded-2xl shadow-soft overflow-hidden border border-slate-100"
            >
              <motion.button
                onClick={() => toggle(i)}
                whileHover={{ backgroundColor: 'rgba(236, 253, 245, 0.8)' }}
                className="w-full flex items-center justify-between p-4 text-left transition-colors"
              >
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                    <Icon className="w-4 h-4" />
                  </span>
                  {s.title}
                </span>
                <motion.span
                  className="text-emerald-600"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ▾
                </motion.span>
              </motion.button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-slate-700 text-sm leading-relaxed">{s.body}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}