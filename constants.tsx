
import React from 'react';
import { HijaiyahLetter, Doa } from './types';

export const HIJAIYAH_LETTERS: HijaiyahLetter[] = [
  { letter: 'ا', name: 'Alif', sound: 'Alif' },
  { letter: 'ب', name: 'Ba', sound: 'Ba' },
  { letter: 'ت', name: 'Ta', sound: 'Ta' },
  { letter: 'ث', name: 'Tsa', sound: 'Tsa' },
  { letter: 'ج', name: 'Jim', sound: 'Jim' },
  { letter: 'ح', name: 'Ha', sound: 'Ha' },
  { letter: 'خ', name: 'Kho', sound: 'Kho' },
  { letter: 'د', name: 'Dal', sound: 'Dal' },
  { letter: 'ذ', name: 'Dzal', sound: 'Dzal' },
  { letter: 'ر', name: 'Ro', sound: 'Ro' },
  { letter: 'ز', name: 'Zay', sound: 'Zay' },
  { letter: 'س', name: 'Sin', sound: 'Sin' },
  { letter: 'ش', name: 'Syin', sound: 'Syin' },
  { letter: 'ص', name: 'Shod', sound: 'Shod' },
  { letter: 'ض', name: 'Dhod', sound: 'Dhod' },
  { letter: 'ط', name: 'Tho', sound: 'Tho' },
  { letter: 'ظ', name: 'Zho', sound: 'Zho' },
  { letter: 'ع', name: 'Ain', sound: 'Ain' },
  { letter: 'غ', name: 'Gho', sound: 'Gho' },
  { letter: 'ف', name: 'Fa', sound: 'Fa' },
  { letter: 'ق', name: 'Qof', sound: 'Qof' },
  { letter: 'ك', name: 'Kaf', sound: 'Kaf' },
  { letter: 'ل', name: 'Lam', sound: 'Lam' },
  { letter: 'م', name: 'Mim', sound: 'Mim' },
  { letter: 'ن', name: 'Nun', sound: 'Nun' },
  { letter: 'و', name: 'Wau', sound: 'Wau' },
  { letter: 'ه', name: 'Ha', sound: 'Ha' },
  { letter: 'ي', name: 'Ya', sound: 'Ya' },
];

export const DOA_LIST: Doa[] = [
  {
    id: '1',
    title: 'Doa Memohon Ampunan dan Kasih Sayang',
    arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
    latin: 'Rabbana zhalamna anfusana wa-in lam taghfir lana watarhamna lanakunanna minal-khasirin.',
    translation: 'Ya Tuhan kami, kami telah menzalimi diri sendiri. Jika Engkau tidak mengampuni kami dan memberi rahmat kepada kami, niscaya kami termasuk orang-orang yang rugi.',
    source: 'QS. Al-Araf: 23'
  },
  {
    id: '2',
    title: 'Doa Kebaikan Dunia dan Akhirat',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanatan wafil-akhirati hasanatan waqina adzaban-nar.',
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    source: 'QS. Al-Baqarah: 201'
  }
];

export const QARIS = [
  { identifier: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
  { identifier: 'ar.abdulsamad', name: 'Abdul Basit Abdus Samad' },
  { identifier: 'ar.huzayfi', name: 'Ali Hudhaifi' },
  { identifier: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi' },
];
