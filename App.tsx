
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Home, Book, Music, Mic, Heart, BookOpen, Menu, X, LayoutGrid, TrendingUp, Sparkles, BookMarked, Play, Pause, List, RefreshCw, ChevronUp, ChevronDown, Shield, FileText, HelpCircle
} from 'lucide-react';
import SurahList from './components/SurahList';
import SurahReader from './components/SurahReader';
import JuzReader from './components/JuzReader';
import AudioPlayer from './components/AudioPlayer';
import IqroModule from './components/IqroModule';
import DoaModule from './components/DoaModule';
import TafsirModule from './components/TafsirModule';
import RecordingModule from './components/RecordingModule';
import SettingsMenu from './components/SettingsMenu';
import Footer from './components/Footer';
import { PrivacyPolicy, FAQ } from './components/LegalPages';
import { fetchDailyAyah } from './services/quranService';
import { formatHonorifics } from './utils/honorifics';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [zoom, setZoom] = useState(1.0);
  const [appLang, setAppLang] = useState('en'); // Default to ENG
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0f172a] text-[#f1f5f9] dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#f8fafc] text-[#0f172a] light';
    }
  }, [darkMode]);

  useEffect(() => {
    if (isReadingMode) {
      document.body.classList.add('reading-mode-active');
    } else {
      document.body.classList.remove('reading-mode-active');
    }
  }, [isReadingMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

  const translations: any = {
    en: {
      dashboard: "Home",
      mushaf: "Mushaf",
      murottal: "Murottal",
      iqro: "Iqro",
      doa: "Doa",
      recording: "Recording",
      support: "Support Us",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      faq: "FAQ",
      greeting: "Assalamu'alaikum",
      motivation: "Keep consistency in reading the Quran. Adorn your days with the soothing verses of divine revelation.",
      startReading: "Start Reading",
      ayahOfDay: "Ayat of the Day",
      statsTitle: "Digital Mushaf Statistics",
      totalSurah: "Total Surah",
      totalAyah: "Total Ayah",
      makkiyah: "Makkiyah",
      madaniyah: "Madaniyah",
      exitReading: "Exit Reading Mode"
    },
    id: {
      dashboard: "Utama",
      mushaf: "Mushaf",
      murottal: "Murottal",
      iqro: "Iqro",
      doa: "Doa",
      recording: "Recording",
      support: "Support Us",
      privacy: "Kebijakan Privasi",
      terms: "Ketentuan Layanan",
      faq: "FAQ",
      greeting: "Assalamu'alaikum",
      motivation: "Teruslah istiqomah membaca Al-Quran. Hiasi hari-hari Anda dengan lantunan wahyu Ilahi yang menentramkan jiwa.",
      startReading: "Mulai Membaca",
      ayahOfDay: "Ayat Hari Ini",
      statsTitle: "Statistik Mushaf Digital",
      totalSurah: "Total Surah",
      totalAyah: "Total Ayat",
      makkiyah: "Makkiyah",
      madaniyah: "Madaniyah",
      exitReading: "Keluar Mode Baca"
    }
  };

  const t = translations[appLang];

  const navItems = [
    { name: t.dashboard, icon: <Home size={22} />, path: '/' },
    { name: t.mushaf, icon: <Book size={22} />, path: '/mushaf' },
    { name: t.murottal, icon: <Music size={22} />, path: '/audio' },
    { name: t.iqro, icon: <LayoutGrid size={22} />, path: '/iqro' },
    { name: t.doa, icon: <Heart size={22} />, path: '/doa' },
    { name: t.recording, icon: <Mic size={22} />, path: '/record' },
  ];

  const legalItems = [
    { name: t.support, icon: <Heart size={22} className="text-pink-500" />, path: 'https://sociabuzz.com/syukrankatsiron/tribe', external: true },
    { name: t.privacy, icon: <Shield size={22} />, path: '/privacy' },
    { name: t.terms, icon: <FileText size={22} />, path: '/privacy' }, // Reusing legal page placeholder
    { name: t.faq, icon: <HelpCircle size={22} />, path: '/faq' },
  ];

  return (
    <Router>
      <div 
        className={`min-h-screen transition-colors duration-300 flex flex-col md:flex-row overflow-x-hidden`}
        style={{ fontSize: `${zoom * 16}px` }}
      >
        {/* Top Right Settings & Language Toggle */}
        {!isReadingMode && (
          <div className="fixed top-5 right-5 z-[60] flex items-center gap-3">
             <div className="flex bg-white dark:bg-slate-800 p-1 rounded-xl shadow-xl border-2 border-slate-100 dark:border-slate-700">
                <button 
                  onClick={() => setAppLang('en')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${appLang === 'en' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  ENG
                </button>
                <button 
                  onClick={() => setAppLang('id')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${appLang === 'id' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                >
                  ID
                </button>
             </div>
             <SettingsMenu 
              darkMode={darkMode} 
              setDarkMode={setDarkMode} 
              zoom={zoom} 
              setZoom={setZoom} 
              isReadingMode={isReadingMode}
              setIsReadingMode={setIsReadingMode}
              t={t}
             />
          </div>
        )}

        {/* Mobile Header */}
        {!isReadingMode && (
          <header className="md:hidden flex items-center justify-between p-5 bg-emerald-800 text-white sticky top-0 z-50 app-header shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 rounded-xl shadow-inner">
                 <BookOpen className="text-emerald-900" size={24} />
              </div>
              <span className="font-black text-xl tracking-tight">IQRO Digital</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2.5 bg-emerald-700/50 rounded-xl mr-24">
                <Menu size={24} />
              </button>
            </div>
          </header>
        )}

        {/* Reading Mode Close Button */}
        {isReadingMode && (
          <button 
            onClick={() => setIsReadingMode(false)}
            className="fixed top-8 right-24 z-[100] p-4 bg-emerald-600 text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 font-black"
          >
            <X size={24} /> {t.exitReading}
          </button>
        )}

        {/* Sidebar */}
        {!isReadingMode && (
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-[#064e3b] text-white transform transition-transform duration-500 ease-in-out md:relative md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_60px_rgba(0,0,0,0.4)]' : '-translate-x-full'}
          `}>
            <div className="flex flex-col h-full">
              <div className="p-8 flex items-center justify-between border-b border-emerald-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500 rounded-[1rem] shadow-2xl">
                    <BookOpen className="text-emerald-900" size={28} />
                  </div>
                  <span className="font-black text-2xl tracking-tighter">IQRO Digital</span>
                </div>
                <button className="md:hidden p-2 bg-emerald-900/50 rounded-xl" onClick={() => setIsSidebarOpen(false)}><X size={24} /></button>
              </div>

              <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
                <div className="pb-4">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/50 px-6 mb-2">Main Menu</p>
                   {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="flex items-center gap-5 px-6 py-3.5 rounded-[1.2rem] hover:bg-emerald-800/80 transition-all group"
                    >
                      <span className="text-emerald-400 group-hover:text-amber-400 group-hover:scale-110 transition-all">{item.icon}</span>
                      <span className="font-black text-base">{item.name}</span>
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-emerald-800/40">
                   <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/50 px-6 mb-2">Support & Legal</p>
                   {legalItems.map((item) => (
                     item.external ? (
                      <a
                        key={item.name}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-5 px-6 py-3.5 rounded-[1.2rem] hover:bg-emerald-800/80 transition-all group"
                      >
                        <span className="text-emerald-400 group-hover:scale-110 transition-all">{item.icon}</span>
                        <span className="font-black text-base">{item.name}</span>
                      </a>
                     ) : (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-5 px-6 py-3.5 rounded-[1.2rem] hover:bg-emerald-800/80 transition-all group"
                      >
                        <span className="text-emerald-400 group-hover:scale-110 transition-all">{item.icon}</span>
                        <span className="font-black text-base">{item.name}</span>
                      </Link>
                     )
                  ))}
                </div>
              </nav>
              
              <div className="p-8 border-t border-emerald-800/50 bg-[#043d2f] text-center">
                 <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-2">Iqro v2.0</p>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 relative overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 md:p-14 scroll-smooth">
            <Routes>
              <Route path="/" element={<Dashboard t={t} />} />
              <Route path="/mushaf" element={<SurahList t={t} />} />
              <Route path="/surah/:number" element={<SurahReader appLang={appLang} t={t} />} />
              <Route path="/juz/:number" element={<JuzReader t={t} />} />
              <Route path="/audio" element={<AudioPlayer t={t} />} />
              <Route path="/iqro" element={<IqroModule t={t} />} />
              <Route path="/doa" element={<DoaModule t={t} />} />
              <Route path="/record" element={<RecordingModule t={t} />} />
              <Route path="/tafsir/:number" element={<TafsirModule t={t} />} />
              <Route path="/privacy" element={<PrivacyPolicy t={t} />} />
              <Route path="/faq" element={<FAQ t={t} />} />
            </Routes>
            {!isReadingMode && <Footer t={t} />}
          </div>

          {/* Global Scroll Buttons */}
          <div className="fixed bottom-24 right-8 flex flex-col gap-4 z-50">
            <button 
              onClick={scrollToTop}
              className={`p-5 bg-emerald-600 text-white rounded-[1.5rem] shadow-2xl transition-all duration-500 transform active:scale-90 hover:scale-110 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
            >
              <ChevronUp size={28} />
            </button>
            <button 
              onClick={scrollToBottom}
              className={`p-5 bg-slate-900 dark:bg-emerald-800 text-white rounded-[1.5rem] shadow-2xl transition-all duration-500 transform active:scale-90 hover:scale-110 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
            >
              <ChevronDown size={28} />
            </button>
          </div>

          {/* Bottom Navigation for Mobile */}
          {!isReadingMode && (
            <nav className="md:hidden bg-white dark:bg-[#0b1121] border-t border-slate-200 dark:border-slate-800 py-4 px-6 flex justify-around items-center sticky bottom-0 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
              {navItems.slice(0, 5).map((item) => (
                <Link key={item.path} to={item.path} className="flex flex-col items-center gap-2 text-slate-400 dark:text-slate-600 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {item.icon}
                  <span className="text-[10px] uppercase font-black tracking-[0.2em]">{item.name}</span>
                </Link>
              ))}
            </nav>
          )}
        </main>
      </div>
    </Router>
  );
};

const Dashboard: React.FC<{t: any}> = ({t}) => {
  const [dailyAyah, setDailyAyah] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const loadDailyAyah = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDailyAyah();
      setDailyAyah(data);
    } catch (err: any) {
      console.error("Dashboard error:", err);
      setError("Failed to load daily ayah.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDailyAyah();
  }, []);

  const toggleAudio = () => {
    if (!dailyAyah) return;
    const audioUrl = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${dailyAyah[0].number}.mp3`;
    
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10">
          <h1 className="text-5xl font-black mb-4 tracking-tighter">{t.greeting}</h1>
          <p className="text-emerald-50 text-xl opacity-90 max-w-lg font-bold leading-relaxed">
            {t.motivation}
          </p>
          <div className="mt-12 flex gap-4">
             <Link to="/mushaf" className="bg-amber-400 hover:bg-amber-500 text-emerald-950 px-10 py-5 rounded-2xl font-black text-xl transition-all transform hover:scale-105 shadow-2xl shadow-amber-500/30">
                {t.startReading}
             </Link>
          </div>
        </div>
        <BookOpen className="absolute -right-16 -bottom-16 text-emerald-400 opacity-20 group-hover:scale-110 transition-transform duration-1000" size={400} />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border-4 border-slate-100 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/40 rounded-2xl text-amber-600 shadow-inner"><Sparkles size={24}/></div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{t.ayahOfDay}</h2>
           </div>
           {dailyAyah && (
             <button 
               onClick={toggleAudio}
               className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isPlaying ? 'bg-amber-500 text-white animate-pulse' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-600 hover:text-white'}`}
             >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
             </button>
           )}
        </div>
        
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-8 bg-slate-100 dark:bg-slate-900 rounded-xl w-3/4 ml-auto"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-xl w-1/2"></div>
            <div className="h-4 bg-slate-100 dark:bg-slate-900 rounded-xl w-2/3"></div>
          </div>
        ) : error ? (
           <div className="flex flex-col items-center gap-4 py-6">
             <p className="text-slate-500 font-bold">{error}</p>
             <button onClick={loadDailyAyah} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
               <RefreshCw size={16} /> Retry
             </button>
           </div>
        ) : dailyAyah && (
          <div className="space-y-8">
             <div className="text-right">
                <p className="font-quran text-4xl leading-[2.2] text-slate-950 dark:text-slate-100 font-bold" dir="rtl">
                  {dailyAyah[0].text}
                </p>
             </div>
             <div className="bg-emerald-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border-2 border-emerald-100 dark:border-emerald-900/30">
                <p className="text-slate-900 dark:text-slate-300 text-xl font-bold italic leading-relaxed">
                  "{formatHonorifics(dailyAyah[1].text)}"
                </p>
                <div className="mt-6 flex items-center gap-3">
                   <div className="h-px bg-emerald-200 dark:bg-emerald-800 flex-1"></div>
                   <p className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-[0.3em]">
                     QS. {dailyAyah[0].surah.englishName}: {dailyAyah[0].numberInSurah}
                   </p>
                   <div className="h-px bg-emerald-200 dark:bg-emerald-800 flex-1"></div>
                </div>
             </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#0b1121] rounded-[3rem] p-12 shadow-2xl border-2 border-slate-100 dark:border-slate-800">
        <h2 className="text-3xl font-black mb-10 flex items-center gap-4 text-slate-900 dark:text-white">
          <LayoutGrid size={32} className="text-emerald-500" />
          {t.statsTitle}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBox label={t.totalSurah} value="114" />
          <StatBox label={t.totalAyah} value="6236" />
          <StatBox label={t.makkiyah} value="86" />
          <StatBox label={t.madaniyah} value="28" />
        </div>
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{title: string, desc: string, icon: React.ReactNode, link: string, color: string}> = ({title, desc, icon, link, color}) => (
  <Link to={link} className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group hover:-translate-y-2">
    <div className={`w-16 h-16 rounded-[1.2rem] ${color} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm`}>
      {icon}
    </div>
    <h3 className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-[0.2em]">{title}</h3>
    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors tracking-tight">{desc}</p>
  </Link>
);

const StatBox: React.FC<{label: string, value: string}> = ({label, value}) => (
  <div className="text-center p-8 bg-slate-50 dark:bg-slate-900/30 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800/50 shadow-inner hover:scale-105 transition-transform">
    <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">{value}</p>
    <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest">{label}</p>
  </div>
);

export default App;
