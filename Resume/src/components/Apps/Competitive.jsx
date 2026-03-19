import React from 'react';
import { Trophy, Code2, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Competitive = ({ isDarkMode }) => {
  const bg = isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-white text-slate-800';
  const cpData = PORTFOLIO_DATA?.competitiveProgramming ?? [];

  const open = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm`}>
      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-[#eab308]" />
          <span className="font-semibold">Competitive Programming</span>
        </div>
        <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Code2 size={14} /> ratings synced
        </span>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-auto">
        <div className="grid sm:grid-cols-3 gap-4">
          {cpData.map((cp) => (
            <button
              key={cp.platform}
              onClick={() => open(cp.url)}
              className={`rounded-xl border p-4 flex flex-col items-start gap-2 transition-colors ${
                isDarkMode
                  ? 'border-white/10 bg-black/10 hover:bg-white/5'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cp.color }} />
                <span className="font-semibold">{cp.platform}</span>
              </div>
              <div className={`text-2xl font-bold ${isDarkMode ? 'text-white/90' : 'text-slate-900'}`}>{cp.rating}</div>
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cp.label}</div>
            </button>
          ))}
        </div>

        <div className={`rounded-2xl border p-4 space-y-2 ${isDarkMode ? 'border-white/10 bg-black/10' : 'border-slate-200 bg-white'}`}>
          <div className={`font-semibold flex items-center gap-2 ${isDarkMode ? 'text-white/90' : 'text-slate-900'}`}>
            <ExternalLink size={14} /> Profiles
          </div>
          <ul className={`text-xs space-y-1 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {cpData.map((cp) => (
              <li key={cp.platform}>
                {cp.platform}:{" "}
                <a
                  href={cp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#E95420] hover:underline"
                >
                  {cp.url.replace('https://', '').replace('http://', '')}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Competitive;

