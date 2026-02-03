
import React, { useState } from 'react';
import { Volume2, LayoutGrid, Info, ChevronRight, BookOpen, Sparkles, Star } from 'lucide-react';
import { HIJAIYAH_LETTERS } from '../constants';
import { speakText } from '../services/geminiService';

const IQRO_LEVELS = [
  { id: 1, title: 'Iqro 1', desc: 'Introduction to Hijaiyah letters and Fathah.', color: 'bg-emerald-500', icon: <Star size={24}/>, content: 'This level focuses on single letters from Alif to Ya.' },
  { id: 2, title: 'Iqro 2', desc: 'Learning connected letters and long vowels.', color: 'bg-blue-600', icon: <Sparkles size={24}/>, content: 'Understanding how letters change form when connected.' },
  { id: 3, title: 'Iqro 3', desc: "Mastering Kasroh ('i') and Dhommah ('u').", color: 'bg-amber-600', icon: <LayoutGrid size={24}/>, content: 'Focus on basic harakat and sound changes.' },
  { id: 4, title: 'Iqro 4', desc: 'Learning Tanwin, Sukun, and Qolqolah.', color: 'bg-indigo-600', icon: <Info size={24}/>, content: 'Practice tanwin and stopped letter sounds.' },
  { id: 5, title: 'Iqro 5', desc: 'Tajweed rules like Waqof and Tasydid.', color: 'bg-purple-600', icon: <BookOpen size={24}/>, content: 'Deepening complex reading rules.' },
  { id: 6, title: 'Iqro 6', desc: 'Iqlab, Ikhfa, and advanced signs.', color: 'bg-pink-600', icon: <ChevronRight size={24}/>, content: 'Final level before Mushaf reading.' },
];

const IqroModule: React.FC<{t: any}> = ({ t }) => {
  const [activeLevel, setActiveLevel] = useState(1);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 px-4">
      <div className="text-center md:text-left">
        <h1 className="text-5xl font-black mb-4 tracking-tight text-slate-950 dark:text-white">Iqro Learning Center</h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl">Practical method to learn Quran from basics supported by AI Guru Tahfidz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {IQRO_LEVELS.map((lvl) => (
          <button 
            key={lvl.id}
            onClick={() => setActiveLevel(lvl.id)}
            className={`flex items-center gap-6 p-8 rounded-[2.5rem] border-2 transition-all text-left group active:scale-95 ${activeLevel === lvl.id ? 'bg-emerald-600 border-emerald-500 text-white shadow-2xl shadow-emerald-600/40' : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-emerald-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg font-black text-2xl shrink-0 ${activeLevel === lvl.id ? 'bg-white text-emerald-600' : lvl.color + ' text-white'}`}>
              {lvl.id}
            </div>
            <div className="flex-1">
               <h3 className="font-black text-2xl tracking-tight">{lvl.title}</h3>
               <p className={`text-[11px] font-black uppercase tracking-[0.2em] ${activeLevel === lvl.id ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>Level {lvl.id}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0b1121] rounded-[4rem] p-12 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] border-4 border-slate-50 dark:border-slate-800">
         <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className={`w-28 h-28 rounded-[3rem] flex items-center justify-center text-white shadow-2xl scale-110 ${IQRO_LEVELS.find(l => l.id === activeLevel)?.color}`}>
              {IQRO_LEVELS.find(l => l.id === activeLevel)?.icon}
            </div>
            <div className="text-center md:text-left">
               <h2 className="text-5xl font-black mb-3 tracking-tighter text-slate-950 dark:text-white">{IQRO_LEVELS.find(l => l.id === activeLevel)?.title}</h2>
               <p className="text-slate-500 text-2xl font-medium">{IQRO_LEVELS.find(l => l.id === activeLevel)?.desc}</p>
            </div>
         </div>

         <div className="p-10 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] mb-16 border-2 border-slate-100 dark:border-slate-800 shadow-inner">
            <p className="text-slate-950 dark:text-slate-100 leading-relaxed text-2xl font-bold italic text-center">
              "{IQRO_LEVELS.find(l => l.id === activeLevel)?.content}"
            </p>
         </div>

         {activeLevel === 1 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-5">
              {HIJAIYAH_LETTERS.map((item) => (
                <button
                  key={item.letter}
                  onClick={() => speakText(`Letter ${item.name}`)}
                  className="aspect-square bg-white dark:bg-slate-800 rounded-[2rem] flex flex-col items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all shadow-xl hover:shadow-emerald-600/30 border-2 border-slate-100 dark:border-slate-700 active:scale-90 group"
                >
                  <span className="font-hijaiyah text-6xl leading-none text-slate-950 dark:text-white group-hover:scale-110 transition-transform group-hover:text-white font-bold">{item.letter}</span>
                  <span className="text-[11px] font-black uppercase tracking-tighter text-slate-400 dark:text-slate-500 group-hover:text-white/80">{item.name}</span>
                </button>
              ))}
            </div>
         ) : (
            <div className="space-y-16">
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                 {Array.from({length: 12}).map((_, i) => (
                   <button 
                     key={i}
                     onClick={() => speakText(`Studying material ${i + 1} for level ${activeLevel}`)}
                     className="p-12 bg-white dark:bg-slate-800 rounded-[3.5rem] border-2 border-slate-50 dark:border-slate-800 hover:border-emerald-500 transition-all flex flex-col items-center gap-8 group hover:shadow-2xl active:scale-95 shadow-lg"
                   >
                      <div className="font-quran text-6xl group-hover:scale-110 transition-transform font-bold" dir="rtl">
                         بَـتَـثَ {i + 1}
                      </div>
                      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner border border-emerald-100 dark:border-emerald-800/50">
                         <Volume2 size={28} />
                      </div>
                   </button>
                 ))}
               </div>
               
               <div className="bg-amber-100/20 dark:bg-amber-900/10 p-14 rounded-[4rem] border-4 border-dashed border-amber-200 dark:border-amber-900/30 text-center">
                  <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-amber-500/30 scale-110">
                    <Sparkles size={48} />
                  </div>
                  <h4 className="font-black text-amber-950 dark:text-amber-400 text-3xl mb-4 tracking-tight">AI Tahfidz Feature</h4>
                  <p className="text-amber-900 dark:text-amber-500 font-bold text-xl max-w-2xl mx-auto mb-12">Listen to correct pronunciation guidance according to Tajweed directly from our AI Quran Teacher.</p>
                  <button 
                    onClick={() => speakText(`Here is the reading guide for Iqro level ${activeLevel}. Pay attention to the vowel length and harakat to make your reading perfect.`)}
                    className="px-14 py-6 bg-amber-500 hover:bg-amber-600 text-white font-black text-2xl rounded-3xl shadow-[0_20px_50px_rgba(245,158,11,0.4)] transition-all transform hover:scale-105 active:scale-95 flex items-center gap-4 mx-auto"
                  >
                    <Volume2 size={32} /> Listen to AI Guide
                  </button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
};

export default IqroModule;
