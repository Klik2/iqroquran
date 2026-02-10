import React from 'react';
import { Link } from 'react-router-dom';
import { useIqro } from '../hooks/useIqro';
import { iqroPageData } from '../data/iqroPageData';
import { BookOpen } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

const Iqro: React.FC = () => {
    const { lastRead, getLevelProgress } = useIqro();
    const { t } = useTranslation();

    const lastReadData = lastRead ? iqroPageData.find(l => l.id === lastRead.level) : null;
    
    const levelColors = [
        'bg-red-400', 'bg-green-400', 'bg-blue-400',
        'bg-orange-400', 'bg-purple-400', 'bg-pink-400'
    ];

    return (
        <div className="p-4 space-y-6 bg-gray-50 dark:bg-dark-blue min-h-screen">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Iqro Digital</h1>
            </header>

            {lastRead && lastReadData && (
                <Link 
                    to={`/iqro/${lastRead.level}?page=${lastRead.page}`}
                    className="block bg-green-600 text-white p-4 rounded-2xl shadow-lg hover:bg-green-700 transition"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-semibold opacity-80">Terakhir dibaca</p>
                            <p className="text-xl font-bold">{lastReadData.title}</p>
                            <p className="text-sm">Halaman {lastRead.page}</p>
                        </div>
                        <div className="bg-white/20 p-4 rounded-full">
                            <BookOpen size={24} />
                        </div>
                    </div>
                </Link>
            )}

            <div className="space-y-3">
                {iqroPageData.map((level, index) => {
                    const progress = getLevelProgress(level.id, level.totalItems);
                    return (
                        <Link 
                            to={`/iqro/${level.id}`} 
                            key={level.id}
                            className="flex items-center bg-white dark:bg-dark-blue-card p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <img src={level.cover} alt={level.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 dark:text-white">{level.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{level.description}</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                        <div 
                                            className={`${levelColors[index % levelColors.length]} h-2 rounded-full`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-500">{Math.round(progress)}%</span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Iqro;