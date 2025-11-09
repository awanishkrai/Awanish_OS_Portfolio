import React, { useState, useEffect } from 'react';
import { Power } from 'lucide-react';

const TopBar = ({ isDarkMode, toggleTheme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-6 transition-all duration-300 ${
        isDarkMode
          ? 'bg-slate-900 text-white border-slate-800'
          : 'bg-white text-slate-900 border-slate-200'
      } border-b z-50 shadow-md`}
    >
      <div className="flex items-center gap-3 select-none">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">
          A
        </div>
        <span className="font-semibold text-sm">Awanish OS</span>
      </div>

      <div className="text-sm font-mono">{formatTime()}</div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
            isDarkMode
              ? 'bg-slate-800 hover:bg-slate-700'
              : 'bg-slate-100 hover:bg-slate-200'
          }`}
        >
          {isDarkMode ? '🌙' : '☀️'}
        </button>
        <button
          className={`px-2 py-1.5 rounded-lg transition-all hover:scale-105 ${
            isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
          }`}
        >
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};
export default TopBar