
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2, List, Layers, BookOpen, ChevronRight } from 'lucide-react';
import { Surah } from '../types';
import { fetchSurahs } from '../services/quranService';

const SurahList: React.FC<{t: any}> = ({ t }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSurahs().then(setSurahs).finally(() => setLoading(false));
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(search.toLowerCase()) || 
    s.name.includes(search)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-6">
        <Loader2 className="animate-spin text-emerald-600" size={60} />
        <p className="text-slate-500 font-black text-xl animate-pulse">Connecting to Mushaf...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-4 border-slate-100 dark:border-slate-800 pb-12">
        <div>
          <h1 className="text-5xl font-black mb-3 tracking-tighter text-slate-950 dark:text-white">{t.mushaf}</h1>
          <p className="text-slate-500 text-lg font-medium">Read and understand the divine meaning of every holy verse.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder={t.searchSurah}
              className="pl-14 pr-8 py-4 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl focus:ring-4 focus:ring-emerald-500/20 outline-none w-full md:w-96 shadow-xl shadow-slate-200/20 font-bold transition-all text-lg text-slate-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-2 rounded-3xl border-2 border-slate-200 dark:border-slate-700 shadow-inner">
             <button 
               onClick={() => setViewMode('surah')}
               className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-base font-black uppercase tracking-widest transition-all ${viewMode === 'surah' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <List size={20}/> Surah
             </button>
             <button 
               onClick={() => setViewMode('juz')}
               className={`flex items-center gap-3 px-8 py-3 rounded-2xl text-base font-black uppercase tracking-widest transition-all ${viewMode === 'juz' ? 'bg-white dark:bg-slate-700 text-emerald-600 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-600'}`}
             >
                <Layers size={20}/> Juz
             </button>
          </div>
        </div>
      </div>

      {viewMode === 'surah' ? (
        /* Instruction #4: Max two columns on desktop, proportional buttons */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {filteredSurahs.map((surah) => (
            <button 
              key={surah.number}
              onClick={() => navigate(`/surah/${surah.number}`)}
              className="flex items-center gap-8 p-10 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all text-left shadow-xl hover:shadow-emerald-600/10 group hover:-translate-y-1"
            >
              <div className="w-20 h-20 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center font-black text-white text-2xl shrink-0 group-hover:scale-110 transition-all shadow-lg">
                {surah.number}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-slate-950 dark:text-white text-2xl tracking-tight">{surah.englishName}</h3>
                <p className="text-[12px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                  {surah.englishNameTranslation} • {surah.numberOfAyahs} Ayahs
                </p>
              </div>
              <div className="text-right">
                {/* Instruction #3: Arabic text in white inside button (group-hover/active) or black outside. 
                    Since it's in a white card, we use slate-950/white based on dark mode. */}
                <span className="font-quran text-4xl text-slate-950 dark:text-white block mb-1 font-bold">{surah.name}</span>
                <p className="text-[10px] uppercase font-black text-slate-400 dark:text-slate-600 tracking-tighter">{surah.revelationType}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           {Array.from({length: 30}, (_, i) => i + 1).map(juz => (
             <button 
               key={juz}
               onClick={() => navigate(`/juz/${juz}`)}
               className="group p-8 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-slate-50 dark:border-slate-800 text-center hover:border-emerald-500 hover:shadow-2xl transition-all relative overflow-hidden active:scale-95 shadow-lg"
             >
                <div className="absolute -right-4 -bottom-4 text-emerald-500 opacity-5 group-hover:scale-110 transition-transform"><BookOpen size={80}/></div>
                <p className="text-[12px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-[0.4em] mb-4 group-hover:text-emerald-600 transition-colors">Juz</p>
                <span className="text-5xl font-black text-slate-950 dark:text-white">{juz}</span>
                <div className="mt-8 flex justify-center items-center gap-2 text-emerald-600 font-black text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ChevronRight size={14} />
                </div>
             </button>
           ))}
        </div>
      )}
    </div>
  );
};

export default SurahList;
