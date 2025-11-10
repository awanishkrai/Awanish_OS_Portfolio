import React from 'react';
import { motion } from 'framer-motion';

const Dock = ({ onAppClick, isDarkMode, activeApps = [] }) => {
  const apps = [
    { id: 'about', icon: '👤', label: 'About' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'skills', icon: '⚙️', label: 'Skills' },
    { id: 'certs', icon: '🎓', label: 'Certifications' },
    { id: 'contact', icon: '📩', label: 'Contact' },
    { id: 'terminal', icon: '🖥️', label: 'Terminal' },
  ];

 return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className={`fixed left-6 bottom-6 flex flex-col gap-3 px-4 py-4 rounded-3xl backdrop-blur-md border transition-all ${
        isDarkMode
          ? 'bg-slate-800 bg-opacity-40 border-slate-700'
          : 'bg-white bg-opacity-50 border-slate-300'
      } shadow-2xl`}
    >
      {apps.map((app) => (
        <motion.button
          key={app.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onAppClick(app.id)}
          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all cursor-pointer relative group ${
            activeApps.includes(app.id) ? 'ring-2 ring-orange-500' : ''
          }`}
          title={app.label}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 group-hover:opacity-20 transition-opacity" />
          <span className="relative z-10">{app.icon}</span>

          {activeApps.includes(app.id) && (
            <div className="absolute bottom-1 w-1 h-1 bg-orange-500 rounded-full" />
          )}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default Dock;
