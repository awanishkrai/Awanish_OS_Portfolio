import React from 'react';
import { Layers } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Skills = ({ isDarkMode }) => {
  const { skills } = PORTFOLIO_DATA;
  const bg = isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-white text-slate-800';

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm`}>
      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Layers size={18} className="text-[#E95420]" />
          <span className="font-semibold">Skills</span>
        </div>
        <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>~/profile/skills</span>
      </div>

      <div className="flex-1 p-6 overflow-auto space-y-6">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white/90' : 'text-slate-900'}`}>
              <span className="w-1 h-5 bg-gradient-to-b from-[#E95420] to-[#a371f7] rounded-full" />
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((skill, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                    isDarkMode
                      ? 'bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10'
                      : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Skills;