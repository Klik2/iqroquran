
import React, { useRef, useState } from 'react';
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
      // Fixed: Adding styles specifically for capture to prevent text stacking/overlay
      const canvas = await html2canvas(shareRef.current, {
        scale: 4, 
        useCORS: true,
        backgroundColor: null,
        onclone: (clonedDoc) => {
           const element = clonedDoc.querySelector('.capture-container') as HTMLElement;
           if (element) {
              // Ensure proper spacing for complex Arabic fonts during capture
              element.style.lineHeight = "3.2"; 
              element.style.padding = "40px";
           }
        }
      });
      
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const fileName = `Iqro_Digital_${verse.surah.replace(/\s+/g, '_')}_${verse.ayah}.jpg`;
      
      const link = document.createElement('a');
      link.href = imgData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
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
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Simpan sebagai gambar</p>
          </div>
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div 
            ref={shareRef}
            className={`capture-container p-12 rounded-[2rem] mb-10 shadow-2xl ${themes[theme]} transition-all duration-500 min-h-[450px] flex flex-col justify-center text-center relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20"></div>
            <p 
              className="font-quran mb-10 leading-[2.8] tracking-wide" 
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
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Pilih Tema</p>
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
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Font Arab</p>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
                   <button onClick={() => setImgFontSize(Math.max(20, imgFontSize - 4))} className="p-2 rounded-xl"><ZoomOut size={18}/></button>
                   <span className="w-10 text-center font-black text-sm">{imgFontSize}</span>
                   <button onClick={() => setImgFontSize(Math.min(80, imgFontSize + 4))} className="p-2 rounded-xl"><ZoomIn size={18}/></button>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={handleDownload}
                disabled={isSaving}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />} 
                Simpan Gambar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
