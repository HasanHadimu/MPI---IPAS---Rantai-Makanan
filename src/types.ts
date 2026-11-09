export type TabId = 'beranda' | 'teori' | 'lkpd' | 'quiz' | 'evaluasi';

export type EvaluasiStage = 'intro' | 'petunjuk' | 'soal' | 'hasil';

export type EvaluasiResult = {
  pgScore: number;
  essayScore: number;
  total: number;
  benarPG: number;
  essayDetail: number[];
  waktu: string;
};