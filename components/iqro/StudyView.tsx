import React, { useState, useCallback, useRef } from 'react';
import { iqroData } from '../../data/iqroData';
import { generateSpeech } from '../../services/geminiService';
import { useIqroProgress } from '../../hooks/useIqroProgress';
import { Info, BookText } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';
import { HijaiyahCard } from './HijaiyahCard';

type AudioPlaybackResult = {
  sourceNode: AudioBufferSourceNode;
  controls: { onended: (() => void) | null };
};

interface StudyViewProps {
    levelData: typeof iqroData[0];
}

const StudyView: React.FC<StudyViewProps> = ({ levelData }) => {
    const { markAsCompleted } = useIqroProgress();
    const { t } = useTranslation();

    const [loadingAudio, setLoadingAudio] = useState<string | null>(null);
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);

    const audioCache = useRef<Map<string, () => AudioPlaybackResult>>(new Map());
    const audioController = useRef<AudioBufferSourceNode | null>(null);

    const handlePlayAudio = useCallback(async (text: string, id: string) => {
        if (loadingAudio) return;
        if (playingAudio) audioController.current?.stop();

        if (audioCache.current.has(id)) {
            const play = audioCache.current.get(id)!;
            const { sourceNode, controls } = play();
            audioController.current = sourceNode;
            setPlayingAudio(id);
            controls.onended = () => { setPlayingAudio(null); markAsCompleted(id); };
            return;
        }

        setLoadingAudio(id);
        try {
            const { play, sourceNode, controls } = await generateSpeech(text);
            audioCache.current.set(id, play);
            audioController.current = sourceNode;
            setPlayingAudio(id);
            controls.onended = () => { setPlayingAudio(null); markAsCompleted(id); };
        } catch (error) {
            console.error("Error generating speech:", error);
            alert("Gagal memutar audio. Coba lagi.");
        } finally {
            setLoadingAudio(null);
        }
    }, [loadingAudio, playingAudio, markAsCompleted]);


    return (
        <div className="space-y-8">
            <div className="bg-emerald-light/20 dark:bg-emerald-dark/30 p-4 rounded-xl flex items-start gap-3">
                <Info className="h-5 w-5 text-emerald-dark dark:text-emerald-light flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-emerald-dark dark:text-white">{t('learningMaterials')}</h3>
                    <p className="text-sm text-emerald-dark/80 dark:text-emerald-light/80">{levelData.description}</p>
                </div>
            </div>

            {levelData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <h3 className="font-bold text-lg text-emerald-dark dark:text-white">{section.title}</h3>
                    
                    {section.info && (
                         <p className="text-sm text-gray-600 dark:text-gray-400 italic">{section.info}</p>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {section.items.map((item, itemIndex) => {
                            const id = `${levelData.level}-${sectionIndex}-${itemIndex}`;
                            return (
                                <HijaiyahCard
                                    key={id}
                                    id={id}
                                    item={item}
                                    level={levelData.level}
                                    sectionTitle={section.title}
                                    isLoading={loadingAudio === id}
                                    isPlaying={playingAudio === id}
                                    onPlay={() => handlePlayAudio(item.char, id)}
                                />
                            );
                        })}
                    </div>

                    {section.guide && (
                        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mt-4 flex items-start gap-3">
                            <BookText size={20} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
                            <p className="text-sm text-amber-800 dark:text-amber-300 whitespace-pre-wrap">{section.guide}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default StudyView;