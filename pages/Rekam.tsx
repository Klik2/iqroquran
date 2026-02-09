
import React, { useState, useRef, useEffect } from 'react';
import { Mic, StopCircle, Play, Trash2, Download, BookOpen, Music, PlayCircle } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { fetchAllSurahs, fetchSurah } from '../services/quranApi';
import { Surah, Ayah } from '../types';
import { LoadingSpinner } from '../components/ui/Feedback';

const Rekam: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { t } = useTranslation();

  // Comparison feature state
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [selectedAyah, setSelectedAyah] = useState<Ayah | null>(null);
  const [surahAyahs, setSurahAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(false);
  const originalAudioRef = useRef<HTMLAudioElement | null>(null);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingComparison, setIsPlayingComparison] = useState(false);

  useEffect(() => {
    fetchAllSurahs().then(setSurahs).catch(console.error);
  }, []);

  const handleSurahChange = async (surahNum: number) => {
    const surah = surahs.find(s => s.number === surahNum);
    setSelectedSurah(surah || null);
    setLoading(true);
    try {
        const detail = await fetchSurah(surahNum);
        setSurahAyahs(detail.ayahs);
        setSelectedAyah(detail.ayahs[0]);
    } catch (e) {
        console.error(e);
    } finally {
        setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        audioChunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setAudioURL(null);
      setAudioBlob(null);
    } catch (err) {
      console.error("Error starting recording:", err);
      alert("Tidak dapat memulai rekaman. Pastikan Anda telah memberikan izin mikrofon.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleReset = () => {
      setAudioURL(null);
      setAudioBlob(null);
      setIsPlayingComparison(false);
  }

  const handleDownload = () => {
      if (audioURL && audioBlob) {
          const a = document.createElement('a');
          a.href = audioURL;
          a.download = `bacaan_quran_${new Date().toISOString()}.wav`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
      }
  }

  const playComparison = () => {
    if (!selectedAyah || !audioURL) return;

    if (isPlayingComparison) {
        originalAudioRef.current?.pause();
        userAudioRef.current?.pause();
        setIsPlayingComparison(false);
        return;
    }

    setIsPlayingComparison(true);
    
    // Original Audio
    const orig = new Audio(selectedAyah.audio);
    originalAudioRef.current = orig;
    
    // User Recording
    const user = new Audio(audioURL);
    userAudioRef.current = user;

    orig.play();
    user.play();

    orig.onended = () => {
        if (user.ended) setIsPlayingComparison(false);
    };
    user.onended = () => {
        if (orig.ended) setIsPlayingComparison(false);
    };
  };

  return (
    <div className="space-y-6 text-center pb-12">
      <h1 className="text-3xl font-bold text-emerald-dark dark:text-white">{t('recordYourReading')}</h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">{t('recordInstruction')}</p>
      
      {/* Target Selector */}
      <div className="max-w-md mx-auto bg-white dark:bg-dark-blue-card p-4 rounded-2xl shadow-sm space-y-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 text-emerald-dark font-bold text-sm border-b pb-2 mb-2">
              <BookOpen size={16}/> Target Hafalan / Perbandingan
          </div>
          <div className="grid grid-cols-2 gap-2">
              <select 
                onChange={(e) => handleSurahChange(parseInt(e.target.value))}
                className="p-2 bg-gray-50 dark:bg-dark-blue rounded-lg text-xs outline-none border border-gray-200 dark:border-gray-700"
              >
                  <option value="">Pilih Surah</option>
                  {surahs.map(s => <option key={s.number} value={s.number}>{s.number}. {s.englishName}</option>)}
              </select>
              <select 
                onChange={(e) => setSelectedAyah(surahAyahs.find(a => a.numberInSurah === parseInt(e.target.value)) || null)}
                disabled={!selectedSurah || loading}
                className="p-2 bg-gray-50 dark:bg-dark-blue rounded-lg text-xs outline-none border border-gray-200 dark:border-gray-700 disabled:opacity-50"
              >
                  <option value="">Pilih Ayat</option>
                  {surahAyahs.map(a => <option key={a.number} value={a.numberInSurah}>Ayat {a.numberInSurah}</option>)}
              </select>
          </div>
          {loading && <LoadingSpinner className="h-4 w-4" />}
          {selectedAyah && (
              <div className="p-3 bg-emerald-light/10 rounded-xl text-right">
                  <p className="font-arabic text-xl mb-1">{selectedAyah.text}</p>
                  <p className="text-[10px] text-gray-500 italic">Target: QS. {selectedSurah?.englishName} : {selectedAyah.numberInSurah}</p>
              </div>
          )}
      </div>

      <div className="bg-white dark:bg-dark-blue-card p-8 rounded-2xl shadow-md max-w-md mx-auto flex flex-col items-center justify-center space-y-6 min-h-[250px] border border-gray-100 dark:border-gray-800">
        {!isRecording && !audioURL && (
          <button
            onClick={startRecording}
            className="w-24 h-24 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110 active:scale-100 shadow-xl"
            aria-label="Mulai Merekam"
          >
            <Mic size={48} />
          </button>
        )}
        
        {isRecording && (
          <button
            onClick={stopRecording}
            className="w-24 h-24 bg-gray-700 hover:bg-gray-800 text-white rounded-full flex items-center justify-center transition-transform transform hover:scale-110 active:scale-100 shadow-xl"
            aria-label="Berhenti Merekam"
          >
            <StopCircle size={48} />
          </button>
        )}

        {audioURL && (
          <div className="w-full space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl">
                <p className="text-xs font-bold text-gray-400 mb-2 uppercase">Hasil Rekaman Anda</p>
                <audio src={audioURL} controls className="w-full h-10" />
              </div>
              
              <div className="flex flex-col gap-3">
                {selectedAyah && (
                    <button 
                        onClick={playComparison}
                        className={`flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold transition-all shadow-md ${isPlayingComparison ? 'bg-gold-dark text-white animate-pulse' : 'bg-emerald-dark text-white hover:bg-emerald-dark/90'}`}
                    >
                        <Music size={20} />
                        {isPlayingComparison ? 'Menghentikan Perbandingan...' : 'Putar & Bandingkan (Original vs Saya)'}
                    </button>
                )}

                <div className="flex justify-center gap-4">
                    <button onClick={handleReset} className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-700 dark:text-gray-200 transition" aria-label="Hapus Rekaman">
                        <Trash2 className="h-5 w-5" />
                        <span className="text-xs font-bold">Hapus</span>
                    </button>
                    <button onClick={handleDownload} className="flex-1 flex items-center justify-center gap-2 p-3 bg-emerald-light/20 text-emerald-dark dark:text-emerald-light rounded-xl hover:bg-emerald-light/40 transition" aria-label="Unduh Rekaman">
                        <Download className="h-5 w-5" />
                        <span className="text-xs font-bold">Unduh</span>
                    </button>
                </div>
              </div>
          </div>
        )}

        <div className="h-8">
            {isRecording && <p className="text-red-500 font-bold animate-pulse text-sm">Merekam Suara Anda...</p>}
        </div>
      </div>
    </div>
  );
};

export default Rekam;
