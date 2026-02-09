
import React, { useState, useCallback, useRef } from 'react';
import { tajwidData } from '../../data/tajwidData';
import { Volume2, Loader2, ChevronDown, Info } from 'lucide-react';
import { generateSpeech } from '../../services/geminiService';

const TajwidView: React.FC = () => {
    const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const [highlightedLetter, setHighlightedLetter] = useState<string | null>(null);
    const audioController = useRef<AudioBufferSourceNode | null>(null);

    const playAudio = useCallback(async (text: string, id: string) => {
        if (loadingAudio) return;
        if (playingAudio) {
            audioController.current?.stop();
            if (playingAudio === id) {
                setPlayingAudio(null);
                return;
            }
        }
        
        setLoadingAudio(id);
        try {
            const { sourceNode, controls } = await generateSpeech(text);
            audioController.current = sourceNode;
            setPlayingAudio(id);
            controls.onended = () => setPlayingAudio(null);
        } catch (error) {
            console.error("Error playing Tajwid example:", error);
            alert("Gagal memutar audio contoh.");
        } finally {
            setLoadingAudio(null);
        }
    }, [loadingAudio, playingAudio]);

    return (
        <div className="space-y-4">
            {tajwidData.map((rule, index) => (
                <details key={index} className="group bg-gray-50 dark:bg-dark-blue rounded-lg transition-all duration-300 open:bg-emerald-light/10 dark:open:bg-emerald-dark/20 overflow-hidden border border-transparent open:border-emerald-dark/20">
                    <summary className="font-semibold text-lg cursor-pointer list-none flex justify-between items-center text-emerald-dark dark:text-white p-4 select-none">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-dark"></div>
                             {rule.rule}
                        </div>
                        <ChevronDown className="text-gray-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4 space-y-4 text-gray-700 dark:text-gray-300">
                        <div className="p-3 bg-white/50 dark:bg-black/10 rounded-xl text-sm leading-relaxed border border-emerald-dark/5">
                            {rule.explanation}
                        </div>

                        {rule.letters && (
                            <div className="space-y-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Huruf {rule.rule}:</p>
                                <div className="flex flex-wrap gap-2">
                                    {rule.letters.split(' ').map((letter, lIdx) => (
                                        <button 
                                            key={lIdx}
                                            onClick={() => setHighlightedLetter(letter === highlightedLetter ? null : letter)}
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-arabic text-2xl transition-all shadow-sm ${highlightedLetter === letter ? 'bg-gold-dark text-white scale-110' : 'bg-white dark:bg-dark-blue-card hover:bg-emerald-dark hover:text-white'}`}
                                        >
                                            {letter}
                                        </button>
                                    ))}
                                </div>
                                {highlightedLetter && rule.letters.includes(highlightedLetter) && (
                                    <div className="text-xs bg-gold-dark/10 text-gold-dark p-2 rounded-lg flex items-center gap-2 animate-fade-in">
                                        <Info size={12}/>
                                        <span>Ketuk huruf ini dalam contoh untuk melihat hukum bacaannya.</span>
                                    </div>
                                )}
                            </div>
                        )}
                        
                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">Contoh Bacaan:</h4>
                            {rule.examples?.map((ex, exIndex) => (
                                <div key={exIndex} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-dark-blue-card shadow-sm border border-gray-100 dark:border-gray-800 hover:border-emerald-dark/30 transition-all">
                                    <div>
                                        <p className="font-arabic text-3xl mb-1" dir="rtl">
                                            {ex.arabic.split('').map((char, cIdx) => (
                                                <span key={cIdx} className={highlightedLetter === char ? 'text-gold-dark font-bold underline' : ''}>
                                                    {char}
                                                </span>
                                            ))}
                                        </p>
                                        <p className="text-xs font-bold text-emerald-dark dark:text-emerald-light tracking-wide">{ex.latin}</p>
                                    </div>
                                    <button 
                                        onClick={() => playAudio(ex.arabic, `ex-${index}-${exIndex}`)}
                                        className={`p-3 rounded-full transition-all ${playingAudio === `ex-${index}-${exIndex}` ? 'bg-gold-dark text-white' : 'bg-gray-50 dark:bg-dark-blue hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                        aria-label={`Dengarkan ${ex.latin}`}
                                    >
                                        {loadingAudio === `ex-${index}-${exIndex}` 
                                            ? <Loader2 className="animate-spin" size={20} />
                                            : <Volume2 size={20} />
                                        }
                                    </button>
                                </div>
                            ))}
                        </div>
                        
                        {rule.subRules?.map((sub, subIndex) => (
                            <div key={subIndex} className="ml-2 border-l-2 border-emerald-dark/30 pl-4 py-2 space-y-3">
                                <h4 className="font-bold text-emerald-dark dark:text-white text-md">{sub.name}</h4>
                                <p className="text-xs italic">{sub.explanation}</p>
                                <div className="space-y-2">
                                    {sub.examples.map((ex, exSubIndex) => (
                                        <div key={exSubIndex} className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-dark-blue-card shadow-sm border border-gray-100 dark:border-gray-800">
                                            <div>
                                                <p className="font-arabic text-2xl" dir="rtl">{ex.arabic}</p>
                                                <p className="text-[10px] font-bold text-emerald-dark dark:text-emerald-light uppercase tracking-tighter">{ex.latin}</p>
                                            </div>
                                            <button 
                                                onClick={() => playAudio(ex.arabic, `sub-${index}-${subIndex}-${exSubIndex}`)}
                                                className={`p-2 rounded-full transition-all ${playingAudio === `sub-${index}-${subIndex}-${exSubIndex}` ? 'bg-gold-dark text-white' : 'bg-gray-50 dark:bg-dark-blue'}`}
                                                aria-label={`Dengarkan ${ex.latin}`}
                                            >
                                                {loadingAudio === `sub-${index}-${subIndex}-${exSubIndex}` 
                                                    ? <Loader2 className="animate-spin" size={16} />
                                                    : <Volume2 size={16}/>
                                                }
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </details>
            ))}
        </div>
    );
};

export default TajwidView;
