import React from 'react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Certifications = ({ isDarkMode }) => {
  const { certifications } = PORTFOLIO_DATA;

  return (
    <div className={`p-8 space-y-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <div>
        <h2 className="text-3xl font-bold text-orange-500 mb-2">Certifications</h2>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Professional credentials and achievements
        </p>
      </div>

      <div className="space-y-4">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-lg border-l-4 border-orange-500 ${
              isDarkMode ? 'bg-slate-800' : 'bg-orange-50'
            }`}
          >
            <p className="font-medium">{cert}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Certifications;
