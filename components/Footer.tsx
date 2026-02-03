
import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC<{t: any}> = ({ t }) => {
  return (
    <footer className="mt-24 py-16 px-8 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1121] transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Contact Info - Aligned sejajar */}
        <div className="flex items-center gap-4 mb-10 text-center">
          <div className="w-12 h-12 bg-emerald-600/10 rounded-full flex items-center justify-center shadow-inner">
            <Mail size={24} className="text-emerald-600" />
          </div>
          <a 
            href="mailto:hijr.time+iqroquran@gmail.com" 
            className="text-xl font-black text-slate-800 dark:text-slate-200 hover:text-emerald-500 transition-colors tracking-tight"
          >
            Contact us
          </a>
        </div>

        {/* Support me on Ko-fi removed as per requirement */}

        {/* Legal info moved to Sidebar as per requirement */}

        <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800/60 w-full">
          <p className="text-base font-black text-slate-400 dark:text-slate-600 tracking-tight">
            Te_eR™ Innovative @2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
