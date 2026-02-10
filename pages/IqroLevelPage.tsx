import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookCopy, CheckSquare, Sparkles, BookHeart, Bookmark, Trash2, ArrowLeft } from 'lucide-react';
import { iqroData } from '../data/iqroData';
import { useTranslation } from '../contexts/LanguageContext';
import { useIqroProgress } from '../hooks/useIqroProgress';

import StudyView from '../components/iqro/StudyView';
import PracticeView from '../components/iqro/PracticeView';
import TajwidView from '../components/iqro/TajwidView';
import QuizView from '../components/iqro/QuizView';
import BookmarksView from '../components/iqro/BookmarksView';

type IqroMode = 'study' | 'practice' | 'tajwid' | 'quiz' | 'bookmarks';

const IqroLevelPage: React.FC = () => {
  const { levelNumber } = useParams<{ levelNumber: string }>();
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<IqroMode>('study');
  const { t } = useTranslation();
  const { resetProgress, calculateLevelCompletion } = useIqroProgress();

  const activeLevel = parseInt(levelNumber || '1');
  const levelData = iqroData.find(level => level.level === activeLevel);

  const handleResetProgress = () => {
    if (window.confirm("Apakah Anda yakin ingin mengatur ulang semua progres belajar Iqro?")) {
        resetProgress();
    }
  };

  const modes = [
    { id: 'study', label: 'Study', icon: BookCopy },
    { id: 'practice', label: 'Practice', icon: CheckSquare },
    { id: 'tajwid', label: 'Tajwid', icon: Sparkles },
    { id: 'quiz', label: 'Quiz', icon: BookHeart },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
  ];

  if (!levelData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-soft-white dark:bg-dark-blue">
        <h2 className="text-2xl font-bold text-red-500">Level Iqro tidak ditemukan.</h2>
        <button onClick={() => navigate('/iqro')} className="mt-4 px-4 py-2 bg-emerald-dark text-white rounded-lg">
          Kembali ke Menu Iqro
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-white dark:bg-dark-blue p-4">
      <header className="flex justify-between items-center mb-6">
        <button onClick={() => navigate('/iqro')} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ArrowLeft className="text-emerald-dark dark:text-white" />
        </button>
        <h1 className="text-2xl font-bold text-emerald-dark dark:text-white">{t('learnIqroTitle')} - {levelData.title}</h1>
        <button
            onClick={handleResetProgress}
            className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition"
            aria-label="Reset progress"
        >
            <Trash2 size={16} />
        </button>
      </header>

      <div className="bg-white dark:bg-dark-blue-card p-4 rounded-xl shadow-lg">
        {/* Mode Navigator */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-4 overflow-hidden">
            <nav className="-mb-px flex space-x-2 sm:space-x-4 overflow-x-auto no-scrollbar pb-2">
                {modes.map(mode => (
                    <button 
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id as IqroMode)}
                        className={`whitespace-nowrap flex items-center gap-2 py-3 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors
                          ${activeMode === mode.id 
                            ? 'border-emerald-dark dark:border-emerald-light text-emerald-dark dark:text-emerald-light' 
                            : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'}`}
                    >
                        <mode.icon size={16} />
                        {mode.label}
                    </button>
                ))}
            </nav>
        </div>

        {/* Content based on mode */}
        {activeMode === 'study' && <StudyView levelData={levelData} />}
        {activeMode === 'practice' && <PracticeView levelData={levelData} />}
        {activeMode === 'tajwid' && <TajwidView />}
        {activeMode === 'quiz' && <QuizView levelData={levelData} />}
        {activeMode === 'bookmarks' && <BookmarksView onNavigate={(level) => navigate(`/iqro/${level}`)}/>}
      </div>
    </div>
  );
};

export default IqroLevelPage;
