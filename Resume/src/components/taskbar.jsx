import React from "react";
import { motion } from "framer-motion";
import { Terminal, FolderKanban, User, Award, Phone, Cpu } from "lucide-react";

const icons = {
  terminal: <Terminal size={18} />,
  projects: <FolderKanban size={18} />,
  about: <User size={18} />,
  skills: <Cpu size={18} />,
  certs: <Award size={18} />,
  contact: <Phone size={18} />,
};

const Taskbar = ({ activeApps, onFocus, focusedApp, isDarkMode }) => {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 flex gap-3 rounded-2xl backdrop-blur-xl border shadow-lg z-[60] ${
        isDarkMode
          ? "bg-slate-900/70 border-slate-700"
          : "bg-white/60 border-slate-200"
      }`}
    >
      {activeApps.length === 0 ? (
        <span
          className={`text-xs px-2 italic ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          No active apps
        </span>
      ) : (
        activeApps.map((appId) => (
          <motion.button
            key={appId}
            onClick={() => onFocus(appId)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
              focusedApp === appId
                ? isDarkMode
                  ? "bg-orange-500/80 text-white"
                  : "bg-orange-400 text-white"
                : isDarkMode
                ? "bg-slate-800/60 hover:bg-slate-700 text-slate-200"
                : "bg-white/70 hover:bg-slate-100 text-slate-800"
            }`}
          >
            {icons[appId]}
            <span className="capitalize">{appId}</span>
          </motion.button>
        ))
      )}
    </motion.div>
  );
};

export default Taskbar;
