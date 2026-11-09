import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  FaRedo, FaSearch, FaCheck, FaCheckCircle, FaTrophy, FaGamepad, FaArrowRight,
  FaSeedling, FaBug,
  GiFrog, GiSnake, GiEagleHead, GiMushroomGills, GiWheat, GiSpiderWeb,
} from '../lib/icons';

/* ============ GAME 1: DRAG & DROP ============ */
type Slot = { id: string; name: string; sub: string; color: string };
type Item = { id: string; label: string; icon: IconType; answer: string; color: string };

const SLOTS: Slot[] = [
  { id: 'produsen', name: 'Produsen',     sub: 'Tingkat Trofik 1', color: 'bg-emerald-50 border-emerald-300' },
  { id: 'k1',       name: 'Konsumen I',   sub: 'Tingkat Trofik 2', color: 'bg-lime-50 border-lime-300' },
  { id: 'k2',       name: 'Konsumen II',  sub: 'Tingkat Trofik 3', color: 'bg-amber-50 border-amber-300' },
  { id: 'k3',       name: 'Konsumen III', sub: 'Tingkat Trofik 4', color: 'bg-orange-50 border-orange-300' },
  { id: 'pengurai', name: 'Pengurai',     sub: 'Dekomposer',       color: 'bg-purple-50 border-purple-300' },
];

const ITEMS: Item[] = [
  { id: 'padi',     label: 'Padi',     icon: GiWheat,         answer: 'produsen', color: 'text-yellow-600' },
  { id: 'belalang', label: 'Belalang', icon: FaBug,           answer: 'k1',       color: 'text-lime-600' },
  { id: 'katak',    label: 'Katak',    icon: GiFrog,          answer: 'k2',       color: 'text-emerald-600' },
  { id: 'ular',     label: 'Ular',     icon: GiSnake,         answer: 'k3',       color: 'text-orange-600' },
  { id: 'jamur',    label: 'Jamur',    icon: GiMushroomGills, answer: 'pengurai', color: 'text-purple-600' },
];

function DragDropGame() {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongSlot, setWrongSlot] = useState<string | null>(null);

  const placedIds = Object.values(placed);
  const pool = ITEMS.filter((i) => !placedIds.includes(i.id));
  const done = placedIds.length === ITEMS.length;

  const tryPlace = (slotId: string, itemId: string) => {
    if (!itemId || placed[slotId]) return;
    const item = ITEMS.find((i) => i.id === itemId);
    if (!item) return;

    if (item.answer === slotId) {
      setPlaced((p) => ({ ...p, [slotId]: itemId }));
      setSelected(null);
    } else {
      setWrongSlot(slotId);
      setSelected(null);
      setTimeout(() => setWrongSlot(null), 500);
    }
  };

  const reset = () => {
    setPlaced({});
    setSelected(null);
    setWrongSlot(null);
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft p-5 border border-slate-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-emerald-800 flex items-center gap-2">
          <FaGamepad className="w-5 h-5" /> Game 1 — Susun Rantai Makanan
        </h3>
        <motion.button
          onClick={reset}
          whileTap={{ scale: 0.94, rotate: -15 }}
          className="inline-flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-lg transition-colors"
        >
          <FaRedo className="w-3.5 h-3.5" /> Reset
        </motion.button>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Tarik (atau klik) organisme lalu letakkan pada tingkat trofik yang tepat.
      </p>

      <div className="flex flex-wrap items-center gap-2 min-h-[60px] p-3 rounded-xl bg-slate-100 mb-4">
        {pool.length === 0 ? (
          <span className="text-sm text-slate-400 inline-flex items-center gap-1.5">
            <FaCheckCircle className="w-4 h-4 text-emerald-500" />
            Semua organisme sudah ditempatkan
          </span>
        ) : (
          pool.map((it) => {
            const Icon = it.icon;
            return (
              <motion.button
                key={it.id}
                layoutId={`item-${it.id}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', it.id)}
                onClick={() => setSelected(selected === it.id ? null : it.id)}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold text-sm border-2 cursor-grab active:cursor-grabbing ${
                  selected === it.id
                    ? 'bg-emerald-600 text-white border-emerald-700 shadow-lg'
                    : 'bg-white border-slate-300 hover:border-emerald-400'
                }`}
              >
                <Icon className={`w-4 h-4 ${selected === it.id ? 'text-white' : it.color}`} />
                {it.label}
              </motion.button>
            );
          })
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {SLOTS.map((s) => {
          const itemId = placed[s.id];
          const item = itemId ? ITEMS.find((i) => i.id === itemId) : undefined;
          const Icon = item?.icon;
          return (
            <motion.div
              key={s.id}
              layout
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                tryPlace(s.id, e.dataTransfer.getData('text/plain'));
              }}
              onClick={() => selected && tryPlace(s.id, selected)}
              animate={wrongSlot === s.id ? { x: [-6, 6, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border-2 border-dashed p-3 min-h-[110px] flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${s.color} ${
                wrongSlot === s.id ? 'border-rose-500 bg-rose-100' : ''
              } ${selected && !item ? 'ring-2 ring-emerald-400' : ''}`}
            >
              <p className="font-bold text-sm">{s.name}</p>
              <p className="text-[10px] text-slate-500 mb-2">{s.sub}</p>
              {item && Icon ? (
                <motion.span
                  layoutId={`item-${item.id}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white shadow font-semibold text-sm"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  <Icon className={`w-4 h-4 ${item.color}`} />
                  {item.label}
                </motion.span>
              ) : (
                <span className="text-xs text-slate-400">letakkan di sini</span>
              )}
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="rounded-xl bg-emerald-100 border border-emerald-300 p-3 text-sm text-emerald-900 font-semibold overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <FaTrophy className="w-4 h-4 text-yellow-600" /> Hebat! Rantai makanan tersusun benar:
              <GiWheat className="w-4 h-4 text-yellow-600" /> Padi
              <FaArrowRight className="w-3 h-3" />
              <FaBug className="w-4 h-4 text-lime-600" /> Belalang
              <FaArrowRight className="w-3 h-3" />
              <GiFrog className="w-4 h-4 text-emerald-600" /> Katak
              <FaArrowRight className="w-3 h-3" />
              <GiSnake className="w-4 h-4 text-orange-600" /> Ular
              <GiMushroomGills className="w-4 h-4 text-purple-600" /> (pengurai: jamur)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============ GAME 2: CROSS THE WORDS ============ */
const GRID: string[][] = [
  ['R','U','M','P','U','T','C','U','N','J'],
  ['O','S','E','K','D','P','R','L','I','A'],
  ['H','G','F','T','W','Q','Y','A','V','M'],
  ['N','B','C','L','O','E','S','R','D','U'],
  ['X','Y','Z','A','B','C','D','E','F','R'],
  ['E','W','B','E','L','A','L','A','N','G'],
  ['P','L','K','J','H','G','F','D','S','A'],
  ['R','E','A','W','Q','T','Y','U','I','O'],
  ['Z','X','C','N','M','B','V','S','P','L'],
  ['U','T','S','R','G','K','A','T','A','K'],
];

type WordEntry = { word: string; color: string };
const WORDS: WordEntry[] = [
  { word: 'RUMPUT',   color: 'bg-green-300' },
  { word: 'BELALANG', color: 'bg-yellow-300' },
  { word: 'KATAK',    color: 'bg-lime-300' },
  { word: 'ULAR',     color: 'bg-orange-300' },
  { word: 'ELANG',    color: 'bg-sky-300' },
  { word: 'JAMUR',    color: 'bg-purple-300' },
];

type Coord = [number, number];

function getLine(a: Coord, b: Coord): Coord[] | null {
  const [r1, c1] = a;
  const [r2, c2] = b;
  const dr = r2 - r1, dc = c2 - c1;
  if (dr === 0 && dc === 0) return null;
  if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return null;
  const steps = Math.max(Math.abs(dr), Math.abs(dc));
  const sr = Math.sign(dr), sc = Math.sign(dc);
  const line: Coord[] = [];
  for (let i = 0; i <= steps; i++) line.push([r1 + sr * i, c1 + sc * i]);
  return line;
}

function WordSearchGame() {
  const [start, setStart] = useState<Coord | null>(null);
  const [cellColors, setCellColors] = useState<Record<string, string>>({});
  const [found, setFound] = useState<string[]>([]);

  const handleClick = (r: number, c: number) => {
    if (!start) { setStart([r, c]); return; }
    const line = getLine(start, [r, c]);
    if (!line) { setStart([r, c]); return; }
    const str = line.map(([rr, cc]) => GRID[rr][cc]).join('');
    const rev = [...str].reverse().join('');
    const hit = WORDS.find((w) => !found.includes(w.word) && (w.word === str || w.word === rev));
    if (hit) {
      const next = { ...cellColors };
      line.forEach(([rr, cc]) => { next[`${rr},${cc}`] = hit.color; });
      setCellColors(next);
      setFound((f) => [...f, hit.word]);
    }
    setStart(null);
  };

  const reset = () => { setStart(null); setCellColors({}); setFound([]); };
  const allFound = found.length === WORDS.length;

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-soft p-5 border border-slate-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-emerald-800 flex items-center gap-2">
          <GiSpiderWeb className="w-5 h-5 text-emerald-600" /> Game 2 — Cross the Words
        </h3>
        <motion.button
          onClick={reset}
          whileTap={{ scale: 0.94, rotate: -15 }}
          className="inline-flex items-center gap-1 text-sm bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-lg transition-colors"
        >
          <FaRedo className="w-3.5 h-3.5" /> Reset
        </motion.button>
      </div>
      <p className="text-xs text-slate-500 mb-4">
        Klik huruf awal lalu huruf akhir kata. Kata bisa mendatar, menurun, atau diagonal.
      </p>

      <div className="grid md:grid-cols-[auto_1fr] gap-5">
        <div className="inline-grid grid-cols-10 gap-1 mx-auto">
          {GRID.map((row, r) =>
            row.map((ch, c) => {
              const isStart = start !== null && start[0] === r && start[1] === c;
              const color = cellColors[`${r},${c}`];
              return (
                <motion.button
                  key={`${r}-${c}`}
                  onClick={() => handleClick(r, c)}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  animate={color ? { scale: [1, 1.18, 1] } : {}}
                  transition={{ duration: 0.35 }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md text-sm font-bold transition-colors ${
                    color
                      ? `${color} text-slate-900 shadow-sm`
                      : isStart
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-300'
                      : 'bg-slate-100 hover:bg-emerald-100 text-slate-700'
                  }`}
                >
                  {ch}
                </motion.button>
              );
            })
          )}
        </div>

        <div>
          <p className="font-semibold text-sm mb-2 flex items-center gap-1.5">
            <FaSearch className="w-3.5 h-3.5 text-emerald-600" /> Kata yang harus dicari:
          </p>
          <ul className="space-y-2">
            {WORDS.map((w) => {
              const isFound = found.includes(w.word);
              return (
                <motion.li
                  key={w.word}
                  animate={isFound ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.4 }}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-between transition-colors ${
                    isFound ? `${w.color} line-through text-slate-600` : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <span>{w.word}</span>
                  {isFound && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <FaCheck className="w-4 h-4 text-emerald-700" />
                    </motion.span>
                  )}
                </motion.li>
              );
            })}
          </ul>
          <AnimatePresence>
            {allFound && (
              <motion.p
                className="mt-3 text-sm font-semibold text-emerald-700 text-center inline-flex items-center gap-1.5 w-full justify-center"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <FaTrophy className="w-4 h-4 text-yellow-500" />
                Semua kata berhasil ditemukan!
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function Quiz() {
  return (
    <div className="space-y-4">
      <motion.div
        className="bg-white rounded-2xl shadow-soft p-5 border border-slate-100"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-emerald-800 flex items-center gap-2">
          <FaGamepad className="w-5 h-5" /> Quiz Interaktif
        </h2>
        <p className="text-sm text-slate-500">
          Selesaikan kedua permainan berikut. Gunakan tombol <b>Reset</b> untuk mengulang.
        </p>
      </motion.div>
      <DragDropGame />
      <WordSearchGame />
    </div>
  );
}