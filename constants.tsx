
import React from 'react';
// Fix: Import types required for the new IQRO_DATA constant.
import { HijaiyahLetter, Doa, IqroLevelData, TajwidRule, QuizQuestion } from './types';

// Fix: Added structured data for Iqro levels, which was missing.
const tajwidLevel4: TajwidRule[] = [
    {
        id: '4-1',
        name: 'Izhar Halqi',
        explanation: "Izhar (إِظْهَار) berarti 'jelas'. Jika Nun Sukun (نْ) atau Tanwin (ـًـــٍـــٌ) bertemu dengan salah satu dari enam huruf Halqi (tenggorokan: ء هـ ع ح غ خ), maka dibaca dengan jelas tanpa dengung.",
        example: "مِنْهُ",
        exampleLatin: "min-hu"
    },
    {
        id: '4-2',
        name: 'Idgham Bi Ghunnah',
        explanation: "Meleburkan dengan dengung jika Nun Sukun atau Tanwin bertemu salah satu huruf: ي ن م و.",
        example: "مَنْ يَقُولُ",
        exampleLatin: "may yaqūlu"
    },
    {
        id: '4-3',
        name: 'Idgham Bila Ghunnah',
        explanation: "Meleburkan tanpa dengung jika Nun Sukun atau Tanwin bertemu huruf: ل ر.",
        example: "مِنْ لَدُنْهُ",
        exampleLatin: "mil ladunhu"
    }
];

const tajwidLevel6: TajwidRule[] = [
    {
        id: '6-1',
        name: 'Iqlab',
        explanation: "Iqlab (إِقْلَاب) berarti 'mengganti'. Jika Nun Sukun atau Tanwin bertemu dengan huruf Ba (ب), maka suara Nun/Tanwin diubah menjadi suara Mim (م) yang didengungkan.",
        example: "مِنْۢ بَعْدِ",
        exampleLatin: "mim ba‘di"
    },
    {
        id: '6-2',
        name: 'Ikhfa\' Haqiqi',
        explanation: "Ikhfa' (إِخْفَاء) berarti 'samar'. Jika Nun Sukun atau Tanwin bertemu dengan 15 huruf sisa (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك), maka dibaca samar-samar antara Izhar dan Idgham, sambil didengungkan.",
        example: "أَنْفُسَكُمْ",
        exampleLatin: "anfusakum"
    }
];

const quizLevel1: QuizQuestion[] = [
    {
        id: 'q1-1',
        question: "Apa bacaan dari huruf ini?",
        arabic: "ب",
        options: ['ba', 'ta', 'tsa', 'ja'],
        correctAnswer: 0
    },
    {
        id: 'q1-2',
        question: "Apa bacaan dari huruf ini?",
        arabic: "ج",
        options: ['ha', 'ja', 'kho', 'tsa'],
        correctAnswer: 1
    },
     {
        id: 'q1-3',
        question: "Apa bacaan dari gabungan huruf ini?",
        arabic: "دَرَ",
        options: ['dara', 'rada', 'dada', 'rara'],
        correctAnswer: 0
    }
];

const quizLevel2: QuizQuestion[] = [
    {
        id: 'q2-1',
        question: "Manakah bacaan yang benar untuk tulisan ini?",
        arabic: "قَالَ",
        options: ['qala', 'qāla', 'qola', 'qoola'],
        correctAnswer: 1
    },
     {
        id: 'q2-2',
        question: "Mana tulisan Arab untuk 'baina'?",
        options: ["بَانَ", "بَيْنَ", "بِنَا", "بَيْنَا"],
        correctAnswer: 1
    }
];

const quizLevel3: QuizQuestion[] = [
     {
        id: 'q3-1',
        question: "Apa bacaan dari huruf ini?",
        arabic: "بِ",
        options: ['ba', 'bi', 'bu', 'bai'],
        correctAnswer: 1
    },
     {
        id: 'q3-2',
        question: "Apa bacaan dari huruf ini?",
        arabic: "تُ",
        options: ['ta', 'ti', 'tu', 'tau'],
        correctAnswer: 2
    },
];

const quizLevel4: QuizQuestion[] = [
    {
        id: 'q4-1',
        question: "Apa bacaan dari harakat tanwin ini?",
        arabic: "بًا",
        options: ['ba', 'bi', 'bun', 'ban'],
        correctAnswer: 3
    }
];

export const IQRO_DATA: IqroLevelData[] = [
  {
    id: 1,
    title: "Iqro 1",
    desc: "Mengenal huruf Hijaiyah tunggal dengan harakat Fathah (bunyi 'a').",
    longDesc: "Fokus pada pengenalan bentuk huruf dan pelafalan dasarnya. Setiap huruf dibaca pendek dengan vokal 'a'.",
    color: "emerald",
    items: [
      { arabic: "أ", latin: "a" }, { arabic: "ب", latin: "ba" }, { arabic: "ت", latin: "ta" }, { arabic: "ث", latin: "tsa" }, 
      { arabic: "ج", latin: "ja" }, { arabic: "ح", latin: "ḥa" }, { arabic: "خ", latin: "kha" }, { arabic: "د", latin: "da" }, 
      { arabic: "ذ", latin: "dza" }, { arabic: "ر", latin: "ra" }, { arabic: "ز", latin: "za" }, { arabic: "س", latin: "sa" }, 
      { arabic: "ش", latin: "sya" }, { arabic: "ص", latin: "ṣa" }, { arabic: "ض", latin: "ḍa" }, { arabic: "ط", latin: "ṭa" }, 
      { arabic: "ظ", latin: "ẓa" }, { arabic: "ع", latin: "'a" }, { arabic: "غ", latin: "gha" }, { arabic: "ف", latin: "fa" }, 
      { arabic: "ق", latin: "qa" }, { arabic: "ك", latin: "ka" }, { arabic: "ل", latin: "la" }, { arabic: "م", latin: "ma" }, 
      { arabic: "ن", latin: "na" }, { arabic: "هـ", latin: "ha" }, { arabic: "و", latin: "wa" }, { arabic: "ي", latin: "ya" },
      { arabic: "بَتَ", latin: "bata" }, { arabic: "تَبَ", latin: "taba" }, { arabic: "جَحَ", latin: "jaḥa" }, { arabic: "حَجَ", latin: "ḥaja" },
      { arabic: "دَرَ", latin: "dara" }, { arabic: "رَدَ", latin: "rada" }, { arabic: "سَشَ", latin: "sasya" }, { arabic: "شَسَ", latin: "syasa" },
    ],
    quiz: quizLevel1
  },
  {
    id: 2,
    title: "Iqro 2",
    desc: "Mempelajari huruf yang disambung dan pengenalan bacaan panjang (Mad Thobi'i).",
    longDesc: "Mulai menyambung huruf-huruf hijaiyah dan belajar membedakan bacaan pendek dan panjang (2 harakat).",
    color: "blue",
    items: [
      { arabic: "بَتَ", latin: "bata" }, { arabic: "تَنَبَ", latin: "tanaba" }, { arabic: "بَيْنَ", latin: "baina" }, { arabic: "يَبنَ", latin: "yabna" },
      { arabic: "جَعَلَ", latin: "ja'ala" }, { arabic: "حَسَنَ", latin: "ḥasana" }, { arabic: "خَتَمَ", latin: "khatama" }, { arabic: "نَزَلَ", latin: "nazala" },
      { arabic: "بَا", latin: "bā" }, { arabic: "تَا", latin: "tā" }, { arabic: "نَا", latin: "nā" }, { arabic: "يَا", latin: "yā" },
      { arabic: "قَالَ", latin: "qāla" }, { arabic: "كَانَ", latin: "kāna" }, { arabic: "مَا", latin: "mā" }, { arabic: "ذَا", latin: "dzā" }
    ],
    quiz: quizLevel2
  },
  {
    id: 3,
    title: "Iqro 3",
    desc: "Mengenal harakat Kasrah (bunyi 'i') dan Dhammah (bunyi 'u').",
    longDesc: "Mempelajari harakat Kasrah (bunyi 'i') dan Dhammah (bunyi 'u'), serta variasi bacaan panjang dan huruf sukun (mati).",
    color: "amber",
    items: [
      { arabic: "بِ", latin: "bi" }, { arabic: "تِ", latin: "ti" }, { arabic: "ثِ", latin: "tsi" }, { arabic: "بُ", latin: "bu" }, { arabic: "تُ", latin: "tu" }, { arabic: "ثُ", latin: "tsu" },
      { arabic: "كُتِبَ", latin: "kutiba" }, { arabic: "قُرِئَ", latin: "quri'a" }, { arabic: "سُئِلَ", latin: "su'ila" }, { arabic: "عُمِلَ", latin: "'umila" },
      { arabic: "بِيْ", latin: "bī" }, { arabic: "تِيْ", latin: "tī" }, { arabic: "بُوْ", latin: "bū" }, { arabic: "تُوْ", latin: "tū" },
      { arabic: "فِيْهِ", latin: "fīhi" }, { arabic: "يُوْحِيْ", latin: "yūḥī" }, { arabic: "قِيْلَ", latin: "qīla" }, { arabic: "يَقُوْلُ", latin: "yaqūlu" },
    ],
    quiz: quizLevel3
  },
  {
    id: 4,
    title: "Iqro 4",
    desc: "Mempelajari harakat Tanwin, Nun Sukun/Tanwin, dan Qalqalah.",
    longDesc: "Mempelajari harakat Tanwin (Fathatain 'an', Kasratain 'in', Dhammatain 'un'), hukum Nun Sukun/Tanwin (Izhar, Idgham), dan Qalqalah.",
    color: "indigo",
    items: [
      { arabic: "بًا", latin: "ban" }, { arabic: "تًا", latin: "tan" }, { arabic: "بٍ", latin: "bin" }, { arabic: "تٍ", latin: "tin" }, { arabic: "بٌ", latin: "bun" }, { arabic: "تٌ", latin: "tun" },
      { arabic: "كِتَابًا", latin: "kitāban" }, { arabic: "رَسُوْلٍ", latin: "rasūlin" }, { arabic: "عَذَابٌ", latin: "‘ażābun" },
      { arabic: "مَنْ ءَامَنَ", latin: "man āmana" }, { arabic: "مِنْ وَلِيٍّ", latin: "miw waliyyin" }, { arabic: "يَدْخُلُوْنَ", latin: "yadkhulūna" }, { arabic: "اَحَدٌ", latin: "aḥad" },
    ],
    tajwid: tajwidLevel4,
    quiz: quizLevel4
  },
  {
    id: 5,
    title: "Iqro 5",
    desc: "Mengenal berbagai jenis Mad, bacaan Tasydid, dan cara berhenti (waqaf).",
    longDesc: "Mengenal berbagai jenis Mad (bacaan panjang), hukum bacaan Tasydid, dan cara berhenti (waqaf) pada akhir kalimat.",
    color: "purple",
    items: [
      { arabic: "اِنَّ", latin: "inna" }, { arabic: "رَبُّكَ", latin: "rabbuka" }, { arabic: "اِلَّا", latin: "illā" }, { arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ", latin: "minal jinnati wan-nās" },
      { arabic: "جَاۤءَ", latin: "jā'a" }, { arabic: "سُوْۤءَ", latin: "sū'a" }
    ]
  },
  {
    id: 6,
    title: "Iqro 6",
    desc: "Review tajwid, tanda waqaf, dan pengenalan huruf muqatha'ah.",
    longDesc: "Review hukum-hukum tajwid yang telah dipelajari (Iqlab, Ikhfa), tanda-tanda waqaf, dan pengenalan huruf muqatha'ah di awal surah.",
    color: "rose",
    items: [
      { arabic: "مِنْۢ بَعْدِ", latin: "mim ba‘di" }, { arabic: "اَنْفُسَكُمْ", latin: "anfusakum" }, { arabic: "مِنْ شَرِّ", latin: "min syarrin" }, { arabic: "رَجُلًا سَلَمًا", latin: "rajulan salaman" },
      { arabic: "الۤمّۤ", latin: "Alif Lām Mīm" }, { arabic: "يٰسۤ", latin: "Yā Sīn" }, { arabic: "قۤ", latin: "Qāf" }, { arabic: "نۤ", latin: "Nūn" }
    ],
    tajwid: tajwidLevel6
  },
];


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
    source: 'QS. Al-Araf: 23',
    ayahNumber: 977
  },
  {
    id: '2',
    title: 'Doa Kebaikan Dunia dan Akhirat',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    latin: 'Rabbana atina fid-dunya hasanatan wafil-akhirati hasanatan waqina adzaban-nar.',
    translation: 'Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan lindungilah kami dari azab neraka.',
    source: 'QS. Al-Baqarah: 201',
    ayahNumber: 208
  }
];

export const QARIS = [
  { identifier: 'ar.alafasy', name: 'Mishary Rashid Alafasy' },
  { identifier: 'ar.abdulsamad', name: 'Abdul Basit Abdus Samad' },
  { identifier: 'ar.huzayfi', name: 'Ali Hudhaifi' },
  { identifier: 'ar.minshawi', name: 'Mohamed Siddiq El-Minshawi' },
];
