import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Power, Sun, Moon } from "lucide-react";

const TopBar = ({ isDarkMode, toggleTheme }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () =>
    time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format for Linux/OS realism
    });

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-6 backdrop-blur-xl border-b transition-all duration-300 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.15)] ${
        isDarkMode
          ? "bg-gradient-to-b from-slate-900/70 to-slate-950/50 border-slate-800 text-white"
          : "bg-gradient-to-b from-white/70 to-slate-100/50 border-slate-200 text-slate-900"
      }`}
    >
      {/* Left: Logo & Title */}
      <div className="flex items-center gap-3 select-none">
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [1, 0.9, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-orange-500/40"
        >
          A
        </motion.div>
        <span className="font-semibold text-sm tracking-wide opacity-90">
          Awanish&nbsp;OS
        </span>
      </div>

      {/* Center: Clock */}
      <div className="text-sm font-mono tracking-wider opacity-90">
        {formatTime()}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all flex items-center justify-center ${
            isDarkMode
              ? "bg-slate-800 hover:bg-slate-700 text-yellow-300 hover:shadow-[0_0_10px_rgba(250,204,21,0.3)]"
              : "bg-slate-100 hover:bg-slate-200 text-orange-500 hover:shadow-[0_0_10px_rgba(249,115,22,0.3)]"
          }`}
          title="Toggle Theme"
        >
          {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        {/* Power Button */}
        <button
          className={`p-2 rounded-full transition-all flex items-center justify-center ${
            isDarkMode
              ? "hover:bg-red-800/30 text-red-400 hover:text-red-300 hover:shadow-[0_0_12px_rgba(239,68,68,0.4)]"
              : "hover:bg-red-100 text-red-500 hover:text-red-600 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          }`}
          title="Power"
        >
          <Power size={18} />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
