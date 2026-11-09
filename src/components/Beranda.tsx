import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { IconType } from 'react-icons';
import { staggerContainer, staggerItem, cardHover } from '../lib/motion';
import {
  FaBook, FaClipboardList, FaGamepad, FaBullseye,
  FaUser, FaRocket,
  FaSeedling, FaBug,
  GiFrog, GiSnake, GiEagleHead, GiWheat,
} from '../lib/icons';

type MenuItem = { icon: IconType; title: string; desc: string };

const MENU: MenuItem[] = [
  { icon: FaBook,          title: 'Teori Dasar', desc: 'Konsep lengkap rantai makanan, tingkat trofik, dan aliran energi.' },
  { icon: FaClipboardList, title: 'LKPD',        desc: 'Lembar kerja interaktif lengkap dengan tabel pengamatan.' },
  { icon: FaGamepad,       title: 'Quiz',        desc: 'Game drag & drop dan cari kata seputar rantai makanan.' },
  { icon: FaBullseye,      title: 'Evaluasi',    desc: '15 butir soal untuk mengukur pemahamanmu.' },
];

const FOOD_CHAIN: { icon: IconType; label: string; color: string }[] = [
  { icon: GiWheat,     label: 'Padi',     color: 'text-yellow-200' },
  { icon: FaBug,       label: 'Belalang', color: 'text-lime-200' },
  { icon: GiFrog,      label: 'Katak',    color: 'text-emerald-200' },
  { icon: GiSnake,     label: 'Ular',     color: 'text-orange-200' },
  { icon: GiEagleHead, label: 'Elang',    color: 'text-sky-200' },
];

const emojiVariant: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.6 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 18 },
  },
};

type Props = { onStart: () => void };

export default function Beranda({ onStart }: Props) {
  return (
    <div className="space-y-6">
      <motion.div
        className="bg-white rounded-3xl shadow-card overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 md:p-12 text-center text-white overflow-hidden">
          <motion.div
            className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative">
            <motion.div
              className="mb-4 flex items-center justify-center gap-2 md:gap-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
              }}
            >
              {FOOD_CHAIN.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.span
                    key={i}
                    variants={emojiVariant}
                    className="inline-flex items-center justify-center p-3 md:p-4 rounded-2xl bg-white/15 backdrop-blur-sm"
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    title={item.label}
                  >
                    <Icon className={`w-8 h-8 md:w-12 md:h-12 ${item.color}`} />
                  </motion.span>
                );
              })}
            </motion.div>

            <motion.h2
              className="text-3xl md:text-5xl font-extrabold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              RANTAI MAKANAN
            </motion.h2>
            <motion.p
              className="text-lg md:text-2xl font-light mt-1 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              &amp; Jaring-Jaring Makanan
            </motion.p>
            <motion.p
              className="mt-4 text-emerald-50 text-sm inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              Mata Pelajaran IPA · Kelas VII SMP
            </motion.p>
          </div>
        </div>

        <motion.div
          className="p-6 md:p-8 grid md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={staggerItem} className="rounded-2xl bg-emerald-50 p-5 border border-emerald-100">
            <h3 className="font-bold text-emerald-800 text-lg mb-2 flex items-center gap-2">
              <FaUser className="w-5 h-5" /> Penyusun
            </h3>
            <p className="text-slate-800 font-semibold">Hasan Bashri Hadimu</p>
            <p className="text-slate-500 text-sm">SMP Cendekia Ambon</p>
          </motion.div>
          <motion.div variants={staggerItem} className="rounded-2xl bg-cyan-50 p-5 border border-cyan-100">
            <h3 className="font-bold text-cyan-800 text-lg mb-2 flex items-center gap-2">
              <FaBullseye className="w-5 h-5" /> Capaian Pembelajaran
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Peserta didik mampu menganalisis interaksi antar komponen ekosistem
              melalui rantai makanan, jaring-jaring makanan, dan aliran energi.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {MENU.map((m) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.title}
              variants={staggerItem}
              {...cardHover}
              className="bg-white rounded-2xl shadow-soft p-5 cursor-pointer border border-slate-100"
            >
              <motion.div
                className="mb-2 inline-flex p-2.5 rounded-xl bg-emerald-50"
                whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
              >
                <Icon className="w-6 h-6 text-emerald-600" />
              </motion.div>
              <h4 className="font-bold text-slate-800">{m.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{m.desc}</p>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.5)' }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-colors"
        >
          <FaRocket className="w-5 h-5" />
          Mulai Belajar
        </motion.button>
      </motion.div>
    </div>
  );
}