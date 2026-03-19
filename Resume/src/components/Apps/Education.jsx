import React from 'react';
import { GraduationCap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Education = ({ isDarkMode }) => {
  const bg = isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-white text-slate-800';
  const { education } = PORTFOLIO_DATA;

  const current = education?.current;
  const previous = education?.previous || [];

  const cardClass = isDarkMode
    ? 'border-white/10 bg-black/10'
    : 'border-slate-200 bg-white';
  const titleColor = isDarkMode ? 'text-white/90' : 'text-slate-900';
  const subtitleColor = isDarkMode ? 'text-slate-300' : 'text-slate-600';
  const metaColor = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm`}>
      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <GraduationCap size={18} className="text-[#E95420]" />
          <span className="font-semibold">Education</span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-auto">
        {current && (
          <div className={`rounded-2xl border p-4 ${cardClass}`}>
            <div className={`text-xs uppercase tracking-wider mb-1 ${metaColor}`}>
              Current Program
            </div>
            <div className={`font-semibold ${titleColor}`}>{current.institution}</div>
            <div className={`text-sm ${subtitleColor}`}>{current.program}</div>
            <div className={`mt-1 text-xs ${metaColor}`}>
              CGPA: {current.cgpa}
              {current.expectedGraduation && ` • Expected ${current.expectedGraduation}`}
            </div>
            {current.highlights && current.highlights.length > 0 && (
              <div className={`mt-2 flex flex-wrap gap-1.5`}>
                {current.highlights.map((h) => (
                  <span key={h} className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-white/5 border border-white/10 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}>
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {previous.map((item) => (
          <div
            key={item.institution + item.program}
            className={`rounded-2xl border p-4 ${cardClass}`}
          >
            <div className={`font-semibold ${titleColor}`}>{item.institution}</div>
            <div className={`text-sm ${subtitleColor}`}>{item.program}</div>
            {item.cgpa && (
              <div className={`mt-1 text-xs ${metaColor}`}>CGPA: {item.cgpa}</div>
            )}
            {item.percentage && (
              <div className={`mt-1 text-xs ${metaColor}`}>Percentage: {item.percentage}</div>
            )}
            {item.year && (
              <div className={`mt-1 text-xs ${metaColor}`}>Year: {item.year}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
