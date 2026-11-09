import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import Beranda from './components/Beranda';
import Teori from './components/Teori';
import LKPD from './components/LKPD';
import Quiz from './components/Quiz';
import Evaluasi from './components/Evaluasi';
import { fadeUp } from './lib/motion';
import { FaHome, FaBook, FaClipboardList, FaGamepad, FaBullseye, FaLeaf } from './lib/icons';
import type { TabId } from './types';

const TABS: { id: TabId; label: string; icon: IconType }[] = [
  { id: 'beranda',  label: 'Beranda',     icon: FaHome },
  { id: 'teori',    label: 'Teori Dasar', icon: FaBook },
  { id: 'lkpd',     label: 'LKPD',        icon: FaClipboardList },
  { id: 'quiz',     label: 'Quiz',        icon: FaGamepad },
  { id: 'evaluasi', label: 'Evaluasi',    icon: FaBullseye },
];

export default function App() {
  const [tab, setTab] = useState<TabId>('beranda');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tab]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-200/40 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-teal-200/40 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.45, 0.6, 0.45] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <header className="relative bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 text-white shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#fff_0%,transparent_40%)] pointer-events-none" />
        <motion.div
          className="max-w-6xl mx-auto px-4 pt-6 pb-3 relative"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-[11px] tracking-[0.3em] uppercase text-emerald-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Media Pembelajaran Interaktif
          </motion.p>
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold mt-1 flex items-center gap-2"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <FaLeaf className="w-7 h-7 text-emerald-200" />
            </motion.span>
            Rantai Makanan &amp; Jaring-Jaring Makanan
          </motion.h1>
          <p className="text-sm text-emerald-100 mt-1">
            IPA · Kelas VII SMP · Kurikulum Merdeka
          </p>
        </motion.div>

        <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto relative">
          {TABS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`relative px-4 py-3 text-sm font-semibold rounded-t-xl whitespace-nowrap transition-colors ${
                  tab === t.id ? 'text-emerald-700' : 'text-emerald-50 hover:text-white'
                }`}
              >
                {tab === t.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-t-xl shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-4 h-4" />
                  {t.label}
                </span>
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            variants={fadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {tab === 'beranda'  && <Beranda onStart={() => setTab('teori')} />}
            {tab === 'teori'    && <Teori />}
            {tab === 'lkpd'     && <LKPD />}
            {tab === 'quiz'     && <Quiz />}
            {tab === 'evaluasi' && <Evaluasi />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="text-center text-xs text-slate-500 py-6 no-print relative">
        © 2025 <span className="font-semibold text-emerald-700">Hasan Bashri Hadimu</span> — SMP Cendekia Ambon
      </footer>
    </div>
  );
}