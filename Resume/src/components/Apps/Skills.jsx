import React from 'react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Skills = ({ isDarkMode }) => {
  const { skills } = PORTFOLIO_DATA;

  return (
    <div className={`p-8 space-y-8 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <div>
        <h2 className="text-3xl font-bold text-orange-500 mb-2">Skills</h2>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Technologies and expertise
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
              {category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {items.map((skill, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-110 ${
                    isDarkMode
                      ? 'bg-slate-700 text-orange-300 hover:bg-slate-600'
                      : 'bg-orange-100 text-orange-900 hover:bg-orange-200'
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