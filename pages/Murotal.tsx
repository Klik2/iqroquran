
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchAllSurahs, fetchAudioEditions } from '../services/quranApi';
import { Surah } from '../types';
import { Play, Pause, SkipBack, SkipForward, Loader2, Volume2, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/Feedback';
import { useTranslation } from '../contexts/LanguageContext';
import { useQuran } from '../contexts/QuranContext';

const Murotal: React.FC = () => {
  const { t } = useTranslation();
  const { setPlayingAyah, playingAyah } = useQuran();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [qaris, setQaris] = useState<any[]>([]);
  
  // UI selection state
  const [uiSelectedQari, setUiSelectedQari] = useState('ar.alafasy');
  const [uiSelectedSurah, setUiSelectedSurah] = useState<Surah | null>(null);

  // Active playing state
  const [activeQariName, setActiveQariName] = useState('Mishary Rashid Alafasy');
  const [activeSurah, setActiveSurah] = useState<Surah | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = "";
        }
        setPlayingAyah(null);
    };
  }, [setPlayingAyah]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsListLoading(true);
        const [surahData, audioData] = await Promise.all([
          fetchAllSurahs(),
          fetchAudioEditions()
        ]);
        setSurahs(surahData);
        setQaris(audioData.filter(ed => ed.format === 'audio'));
        if (surahData.length > 0) setUiSelectedSurah(surahData[0]);
      } catch (err) {
        setError("Gagal memuat data pemutar Murotal.");
      } finally {
        setIsListLoading(false);
      }
    };
    loadData();
  }, []);

  const cleanupAudio = () => {
    if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', onPlay);
        audioRef.current.removeEventListener('pause', onPause);
        audioRef.current.removeEventListener('loadedmetadata', onMetadata);
        audioRef.current.removeEventListener('timeupdate', onTimeUpdate);
        audioRef.current.removeEventListener('canplay', onCanPlay);
        audioRef.current.removeEventListener('ended', onEnded);
        audioRef.current.removeEventListener('error', onError);
        audioRef.current.src = '';
        audioRef.current = null;
    }
    setIsPlaying(false);
    setPlayingAyah(null);
  };

  const onPlay = () => setIsPlaying(true);
  const onPause = () => setIsPlaying(false);
  const onMetadata = () => { if (audioRef.current) setDuration(audioRef.current.duration); };
  const onTimeUpdate = () => { if (audioRef.current) setCurrentTime(audioRef.current.currentTime); };
  const onCanPlay = () => {
    setIsAudioLoading(false);
    audioRef.current?.play().catch(() => setIsPlaying(false));
  };
  const onEnded = () => {
    setIsPlaying(false);
    setPlayingAyah(null);
    // Auto-play next Surah
    if (activeSurah && activeSurah.number < 114) {
        const nextSurah = surahs.find(s => s.number === activeSurah.number + 1);
        if (nextSurah) {
            setUiSelectedSurah(nextSurah);
            startPlayback(uiSelectedQari, nextSurah);
        }
    }
  };
  const onError = () => {
    setIsAudioLoading(false);
    setError("Audio tidak tersedia atau gagal dimuat.");
    setIsPlaying(false);
  };

  const startPlayback = (qariId: string, surah: Surah) => {
    cleanupAudio();
    setIsAudioLoading(true);
    setError(null);
    
    setActiveSurah(surah);
    const qariObj = qaris.find(q => q.identifier === qariId);
    setActiveQariName(typeof qariObj?.name === 'string' ? qariObj.name : 'Reciter');

    const audioUrl = `https://cdn.islamic.network/quran/audio/128/${qariId}/${surah.number}.mp3`;
    const newAudio = new Audio(audioUrl);
    audioRef.current = newAudio;

    newAudio.addEventListener('play', onPlay);
    newAudio.addEventListener('pause', onPause);
    newAudio.addEventListener('loadedmetadata', onMetadata);
    newAudio.addEventListener('timeupdate', onTimeUpdate);
    newAudio.addEventListener('canplay', onCanPlay);
    newAudio.addEventListener('ended', onEnded);
    newAudio.addEventListener('error', onError);
    
    setPlayingAyah({ surahNumber: surah.number, ayahNumber: 0, audioUrl });
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(() => setError("Gagal melanjutkan pemutaran."));
        }
    } else if (uiSelectedSurah) {
        startPlayback(uiSelectedQari, uiSelectedSurah);
    }
  };

  const changeSurah = (direction: 'next' | 'prev') => {
    const currentNum = uiSelectedSurah?.number || 1;
    const targetNum = direction === 'next' ? currentNum + 1 : currentNum - 1;
    if (targetNum >= 1 && targetNum <= 114) {
        const next = surahs.find(s => s.number === targetNum);
        if (next) {
            setUiSelectedSurah(next);
            if (audioRef.current) {
                startPlayback(uiSelectedQari, next);
            }
        }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
      const time = Number(e.target.value);
      if (audioRef.current) {
          audioRef.current.currentTime = time;
          setCurrentTime(time);
      }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isListLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-emerald-dark dark:text-white flex items-center gap-3">
          <Volume2 className="text-emerald-dark" />
          {t('murotalPlayer')}
      </h1>
      
      <div className="bg-white dark:bg-dark-blue-card p-6 md:p-10 rounded-3xl shadow-xl max-w-2xl mx-auto border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('selectQari')}</label>
            <select 
                aria-label="Pilih Qari"
                value={uiSelectedQari} 
                onChange={e => setUiSelectedQari(e.target.value)} 
                className="w-full p-3.5 bg-gray-50 dark:bg-dark-blue border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-dark transition-all text-sm font-semibold"
            >
              {qaris.map(qari => <option key={qari.identifier} value={qari.identifier}>{qari.name}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{t('selectSurah')}</label>
            <select 
                aria-label="Pilih Surah"
                value={uiSelectedSurah?.number || ''} 
                onChange={e => setUiSelectedSurah(surahs.find(s => s.number === parseInt(e.target.value)) || null)} 
                className="w-full p-3.5 bg-gray-50 dark:bg-dark-blue border border-gray-100 dark:border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-dark transition-all text-sm font-semibold"
            >
              {surahs.map(surah => <option key={surah.number} value={surah.number}>{surah.number}. {surah.englishName}</option>)}
            </select>
          </div>
        </div>

        {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl mb-6 border border-red-100 dark:border-red-900/30">
                <AlertCircle size={20} />
                <p className="text-sm font-semibold">{error}</p>
            </div>
        )}

        <div className="py-8 text-center space-y-3 bg-emerald-light/5 dark:bg-emerald-dark/5 rounded-3xl mb-8 border border-emerald-dark/10">
            <div className="space-y-1 px-4">
                <p className="text-xs font-bold text-emerald-dark/60 dark:text-emerald-light/60 uppercase tracking-widest">Sedang Diputar</p>
                <h2 className="text-2xl font-bold text-emerald-dark dark:text-white truncate">
                    {activeSurah ? `${activeSurah.number}. ${activeSurah.englishName}` : (uiSelectedSurah ? `${uiSelectedSurah.number}. ${uiSelectedSurah.englishName}` : 'Pilih Surah')}
                </h2>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{activeQariName}</p>
            </div>
            <p className="font-arabic text-4xl text-emerald-dark dark:text-emerald-light pt-2" dir="rtl">
                {activeSurah?.name || uiSelectedSurah?.name || '---'}
            </p>
        </div>
        
        <div className="space-y-3">
            <input 
                type="range"
                aria-label="Seek Audio"
                value={currentTime}
                max={duration || 0}
                onChange={handleSeek}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-dark"
                disabled={!audioRef.current || isAudioLoading}
            />
            <div className="flex justify-between text-[11px] font-mono font-bold text-gray-400 dark:text-gray-500">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>

        <div className="flex items-center justify-center gap-10 mt-8">
            <button 
                onClick={() => changeSurah('prev')} 
                disabled={uiSelectedSurah?.number === 1} 
                className="p-4 text-gray-400 hover:text-emerald-dark disabled:opacity-20 transition-all active:scale-90"
                aria-label="Surah Sebelumnya"
            >
                <SkipBack size={36} fill="currentColor" />
            </button>
            <button 
                onClick={togglePlayPause} 
                disabled={isAudioLoading} 
                className="p-8 bg-emerald-dark text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 ring-8 ring-emerald-dark/10"
                aria-label={isPlaying ? 'Jeda' : 'Putar'}
            >
                {isAudioLoading ? <Loader2 className="animate-spin" size={44}/> : (isPlaying ? <Pause size={44} fill="currentColor"/> : <Play size={44} fill="currentColor"/>)}
            </button>
            <button 
                onClick={() => changeSurah('next')} 
                disabled={uiSelectedSurah?.number === 114} 
                className="p-4 text-gray-400 hover:text-emerald-dark disabled:opacity-20 transition-all active:scale-90"
                aria-label="Surah Selanjutnya"
            >
                <SkipForward size={36} fill="currentColor" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Murotal;
