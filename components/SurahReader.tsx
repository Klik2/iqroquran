
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Bookmark, Share2, BookOpen, Loader2, Eye, EyeOff, Search, ZoomIn, ZoomOut, Copy, Check, Rocket, AlertCircle, RefreshCw } from 'lucide-react';
import { fetchSurahWithTranslation } from '../services/quranService';
import ShareModal from './ShareModal';
import { formatHonorifics } from '../utils/honorifics';

interface ReaderProps {
  appLang: string;
  t: any;
}

const SurahReader: React.FC<ReaderProps> = ({ appLang, t }) => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState(42);
  const [showLatin, setShowLatin] = useState(true);
  const [shareVerse, setShareVerse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [playingAyah, setPlayingAyah] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const load = async () => {
    if (!number) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetchSurahWithTranslation(parseInt(number), appLang === 'id' ? 'id.indonesian' : 'en.ahmedali'); 
      setData(res);
    } catch (err: any) {
      console.error("Failed to load surah:", err);
      setError(err.message || "Failed to load surah data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [number, appLang]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-full py-48 gap-8">
      <Loader2 className="animate-spin text-emerald-600" size={64} />
      <p className="text-slate-500 font-black text-xl animate-pulse">Connecting to Mushaf...</p>
    </div>
  );

  if (error || !data || !Array.isArray(data) || data.length < 2) return (
    <div className="flex flex-col items-center justify-center h-full py-48 gap-8 px-6 text-center">
      <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600">
        <AlertCircle size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Failed to Load</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md">{error || "Internet connection issue. Please try again."}</p>
      </div>
      <div className="flex gap-4">
        <button onClick={() => navigate('/mushaf')} className="px-8 py-3 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white rounded-2xl font-black hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">Back</button>
        <button onClick={load} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all">
          <RefreshCw size={18} /> Retry
        </button>
      </div>
    </div>
  );

  const arabicEd = data[0];
  const translationEd = data[1];
  const transliterationEd = data[2];

  const handlePlayAyah = (ayahNum: number) => {
    if (playingAyah === ayahNum) {
      audioRef.current?.pause();
      setPlayingAyah(null);
      return;
    }
    setPlayingAyah(ayahNum);
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayahNum}.mp3`;
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    } else {
      const audio = new Audio(audioUrl);
      audio.onended = () => setPlayingAyah(null);
      audio.play();
      audioRef.current = audio;
    }
  };

  const copyAyah = (ayah: any, trans: string) => {
    const text = `${ayah.text}\n\n"${trans}"\n(QS. ${arabicEd.englishName}: ${ayah.numberInSurah})`;
    navigator.clipboard.writeText(text);
    setCopiedId(ayah.number);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-48 px-4 sm:px-6">
      <div className="sticky top-0 bg-white/95 dark:bg-[#0b1121]/95 backdrop-blur-md z-40 py-8 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-8 mb-16 shadow-2xl rounded-b-[2.5rem]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={() => navigate('/mushaf')} className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-md group">
              <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <div>
              <h1 className="font-black text-3xl text-slate-950 dark:text-white tracking-tight">{arabicEd.englishName}</h1>
              <p className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] mt-1">{arabicEd.revelationType} • {arabicEd.numberOfAyahs} Ayahs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mr-24 md:mr-32">
            <button 
              onClick={() => setShowLatin(!showLatin)} 
              className={`p-4 rounded-2xl transition-all shadow-md active:scale-95 ${showLatin ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
            >
               {showLatin ? <Eye size={22}/> : <EyeOff size={22}/>}
            </button>
            <button 
              onClick={() => navigate(`/tafsir/${number}`)} 
              className="flex items-center gap-3 px-6 py-4 bg-emerald-600 text-white rounded-2xl text-sm font-black shadow-xl shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all"
            >
               <BookOpen size={20} /> Tafsir
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-5">
           <div className="relative flex-1 w-full">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search words in ayah..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-slate-100 dark:border-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 font-bold transition-all shadow-inner text-slate-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 shadow-inner border-2 border-slate-200 dark:border-slate-700">
              <button onClick={() => setFontSize(Math.max(20, fontSize - 4))} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:bg-emerald-500 hover:text-white transition-all"><ZoomOut size={18}/></button>
              <div className="w-14 text-center text-sm font-black text-emerald-700 dark:text-emerald-400">{fontSize}</div>
              <button onClick={() => setFontSize(Math.min(80, fontSize + 4))} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:bg-emerald-500 hover:text-white transition-all"><ZoomIn size={18}/></button>
           </div>
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <button 
          onClick={() => navigate('/record')}
          className="flex items-center gap-4 px-10 py-5 bg-slate-900 dark:bg-emerald-900 text-white rounded-full font-black text-lg shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group border-2 border-white/10"
        >
          <Rocket size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-amber-400" />
          Launch Guru AI
        </button>
      </div>

      {arabicEd.number !== 1 && arabicEd.number !== 9 && (
        <div className="text-center py-20 animate-in fade-in slide-in-from-top-4 duration-1000">
           <p className="font-quran text-7xl select-none font-bold" dir="rtl">
             بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
           </p>
        </div>
      )}

      <div className="space-y-32">
        {arabicEd.ayahs.map((ayah: any, index: number) => {
          let text = ayah.text;
          if (index === 0 && arabicEd.number !== 1 && arabicEd.number !== 9) {
              const bismillah = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
              if (text.startsWith(bismillah)) {
                 text = text.substring(bismillah.length).trim();
              }
              if (!text) return null;
          }

          const translationText = translationEd.ayahs[index] ? formatHonorifics(translationEd.ayahs[index].text) : "";
          const latinText = transliterationEd && transliterationEd.ayahs[index] ? transliterationEd.ayahs[index].text : ""; 

          if (searchQuery && !text.includes(searchQuery) && !translationText.toLowerCase().includes(searchQuery.toLowerCase())) {
            return null;
          }

          return (
            <div key={ayah.number} className="group relative animate-in fade-in slide-in-from-bottom-12 duration-700">
              <div className="flex flex-col gap-12">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-[1.2rem] bg-emerald-600 text-white flex items-center justify-center text-lg font-black shadow-xl shadow-emerald-600/30">
                        {ayah.numberInSurah}
                      </div>
                      <button 
                        onClick={() => handlePlayAyah(ayah.number)}
                        className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all shadow-lg active:scale-90 ${playingAyah === ayah.number ? 'bg-amber-500 text-white animate-pulse' : 'bg-slate-100 dark:bg-slate-800 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
                      >
                         <Play size={24} fill="currentColor" />
                      </button>
                   </div>
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => copyAyah(ayah, translationText)}
                        className={`p-4 rounded-2xl transition-all shadow-md active:scale-90 ${copiedId === ayah.number ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-emerald-500'}`}
                      >
                        {copiedId === ayah.number ? <Check size={22} /> : <Copy size={22} />}
                      </button>
                      <button 
                        onClick={() => setShareVerse({ arabic: ayah.text, translation: translationText, surah: arabicEd.englishName, ayah: ayah.numberInSurah })} 
                        className="p-4 bg-slate-100 dark:bg-slate-800 text-blue-500 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-md active:scale-90"
                      >
                        <Share2 size={22} />
                      </button>
                      <button className="p-4 bg-slate-100 dark:bg-slate-800 text-pink-500 rounded-2xl hover:bg-pink-500 hover:text-white transition-all shadow-md active:scale-90">
                        <Bookmark size={22} />
                      </button>
                   </div>
                </div>

                <div className="text-right">
                  <p 
                    className="font-quran leading-[2.6] tracking-wide w-full select-all font-bold"
                    style={{ fontSize: `${fontSize}px` }}
                    dir="rtl"
                  >
                    {text}
                  </p>
                </div>

                {showLatin && (
                   <div className="text-right border-r-4 border-emerald-500/30 pr-6 mr-2">
                     <p className="latin-reading text-2xl leading-relaxed tracking-tight">
                        {latinText}
                     </p>
                   </div>
                )}

                <div className="border-l-8 border-emerald-500/10 pl-10 py-6 group-hover:border-emerald-500 transition-all duration-500 bg-emerald-50/20 dark:bg-transparent rounded-r-3xl">
                   <p className="text-slate-900 dark:text-slate-200 text-2xl leading-[1.8] font-bold tracking-tight">
                      {translationText}
                   </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {shareVerse && (
        <ShareModal 
          isOpen={!!shareVerse} 
          onClose={() => setShareVerse(null)} 
          verse={shareVerse} 
        />
      )}
    </div>
  );
};

export default SurahReader;
