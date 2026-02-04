
import React, { useState } from 'react';
import { Heart, Search, Share2, Copy, Check } from 'lucide-react';
import { DOA_LIST } from '../constants';

const DoaModule: React.FC<{t: any}> = ({ t }) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredDoa = DOA_LIST.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.translation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2">Selected Supplications</h1>
          <p className="text-slate-500">Collection of powerful supplications directly from the Quran.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search doa..."
            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-64 font-bold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredDoa.map((doa) => (
          <div key={doa.id} className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-6">
               <h3 className="font-bold text-xl text-emerald-600 dark:text-emerald-400">{doa.title}</h3>
               <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(`${doa.arabic}\n\n${doa.translation}\n(${doa.source})`);
                        setCopiedId(doa.id);
                        setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    {copiedId === doa.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                  </button>
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Share2 size={18} />
                  </button>
               </div>
            </div>

            <p className="font-quran text-3xl text-right mb-8 leading-loose" dir="rtl">
              {doa.arabic}
            </p>

            <div className="space-y-4">
               <p className="latin-reading text-sm italic">{doa.latin}</p>
               <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">"{doa.translation}"</p>
               <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest pt-4 border-t border-slate-100 dark:border-slate-700 inline-block">Source: {doa.source}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoaModule;
