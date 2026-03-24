import React from 'react';
import { FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Certifications = ({ isDarkMode }) => {
  const { certifications } = PORTFOLIO_DATA;
  const bg = isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-white text-slate-800';

  const openFile = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm`}>
      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-[#ffbd2e]" />
          <span className="font-semibold">Certificates</span>
        </div>
        <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>~/Documents/Certificates</span>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {certifications.map((file) => (
            <button
              key={file.name}
              onClick={() => openFile(file.url)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer group transition-colors ${
                isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'
              }`}
            >
              <div className={`p-3 rounded-xl border group-hover:scale-105 transition-transform ${
                isDarkMode ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <FileText size={40} className="text-[#ffbd2e]" />
              </div>
              <span className={`text-xs text-center truncate w-28 group-hover:text-white ${
                isDarkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>
                {file.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
