
import React, { useRef, useState } from 'react';
// Added Loader2 to the imports from lucide-react
import { X, Download, Copy, Check, Share2, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: {
    arabic: string;
    translation: string;
    surah: string;
    ayah: number;
  };
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, verse }) => {
  const shareRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'emerald' | 'dark' | 'amber'>('emerald');
  const [imgFontSize, setImgFontSize] = useState(32);
  const [isSaving, setIsSaving] = useState(false);

  const handleDownload = async () => {
    if (!shareRef.current) return;
    try {
      setIsSaving(true);
      const canvas = await html2canvas(shareRef.current, {
        scale: 3, // Higher resolution
        useCORS: true,
        backgroundColor: null,
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const fileName = `Iqro_Quran_Digital_${verse.surah.replace(/\s+/g, '_')}_Ayat_${verse.ayah}.jpg`;
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Save image error:", err);
      alert("Failed to save image. Please check permissions.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNativeShare = async () => {
    const text = `${verse.arabic}\n\n"${verse.translation}"\n(QS. ${verse.surah}: ${verse.ayah})\n\nShared via IQRO Quran Digital`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ayah Share: ${verse.surah}`,
          text: text,
        });
      } catch (err) {
        console.error("Native share failed:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      alert("Share API not supported on this browser. Content copied to clipboard.");
    }
  };

  const themes = {
    emerald: 'bg-emerald-700 text-white',
    dark: 'bg-slate-950 text-white border-2 border-slate-800',
    amber: 'bg-amber-50 text-slate-900 border-2 border-amber-200'
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-slate-800">
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-black text-2xl">Bagikan Ayat</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Simpan sebagai gambar atau teks</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh]">
          {/* Card Preview */}
          <div 
            ref={shareRef}
            className={`p-12 rounded-[2rem] mb-10 shadow-2xl ${themes[theme]} transition-all duration-500 min-h-[450px] flex flex-col justify-center text-center relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
            <p 
              className="font-quran mb-10 leading-[2] tracking-wide" 
              style={{ fontSize: `${imgFontSize}px`, color: theme === 'amber' ? 'black' : 'white' }}
              dir="rtl"
            >
              {verse.arabic}
            </p>
            <p className="text-lg font-bold opacity-90 italic leading-relaxed mb-10">
              "{verse.translation}"
            </p>
            <div className="flex items-center justify-center gap-6 mt-auto">
              <div className="h-[2px] bg-current opacity-20 flex-1"></div>
              <p className="text-xs font-black uppercase tracking-[0.3em] px-4">
                QS. {verse.surah}: {verse.ayah}
              </p>
              <div className="h-[2px] bg-current opacity-20 flex-1"></div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pilih Tema Kartu</p>
                <div className="flex gap-4">
                  {(Object.keys(themes) as Array<keyof typeof themes>).map((t) => (
                    <button 
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`w-12 h-12 rounded-2xl border-4 transition-all ${theme === t ? 'border-emerald-500 scale-110 shadow-lg' : 'border-transparent'} ${themes[t].split(' ')[0]}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Ukuran Font Arab</p>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
                   <button onClick={() => setImgFontSize(Math.max(20, imgFontSize - 4))} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl"><ZoomOut size={18}/></button>
                   <span className="w-10 text-center font-black text-sm">{imgFontSize}</span>
                   <button onClick={() => setImgFontSize(Math.min(80, imgFontSize + 4))} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-xl"><ZoomIn size={18}/></button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleDownload}
                disabled={isSaving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />} 
                Simpan Gambar
              </button>
              
              <button 
                onClick={handleNativeShare}
                className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
                title="Share"
              >
                <Share2 size={24} />
              </button>

              <button 
                onClick={() => {
                   navigator.clipboard.writeText(`${verse.arabic}\n\n"${verse.translation}"\n(QS. ${verse.surah}: ${verse.ayah})`);
                   setCopied(true);
                   setTimeout(() => setCopied(false), 2000);
                }}
                className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                title="Salin Teks"
              >
                {copied ? <Check size={24} className="text-emerald-400" /> : <Copy size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
