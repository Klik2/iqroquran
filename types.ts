
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | any;
}

export interface Translation {
  number: number;
  text: string;
}

export interface Tafsir {
  number: number;
  text: string;
}

export interface Qari {
  identifier: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
}

export interface HijaiyahLetter {
  letter: string;
  name: string;
  sound: string;
}

export interface Doa {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  source: string;
}

export interface AppState {
  darkMode: boolean;
  selectedSurah: number | null;
  qari: string;
}
