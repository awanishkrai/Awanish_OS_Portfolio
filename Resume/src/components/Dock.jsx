import React from "react";
import { motion } from "framer-motion";

const Dock = ({ onAppClick, isDarkMode, activeApps = [] }) => {
  const apps = [
    { id: "about", icon: "👤", label: "About" },
    { id: "projects", icon: "📁", label: "Projects" },
    { id: "skills", icon: "⚙️", label: "Skills" },
    { id: "certs", icon: "🎓", label: "Certifications" },
    { id: "contact", icon: "📩", label: "Contact" },
    { id: "terminal", icon: "🖥️", label: "Terminal" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      className={`fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 p-5 rounded-[2rem] border backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)] transition-all duration-500 ${
        isDarkMode
          ? "bg-[rgba(15,15,25,0.65)] border-slate-800"
          : "bg-[rgba(255,255,255,0.55)] border-slate-300"
      }`}
    >
      {apps.map((app) => {
        const isActive = activeApps.includes(app.id);
        return (
          <motion.button
            key={app.id}
            whileHover={{ scale: 1.2, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAppClick(app.id)}
            title={app.label}
            className={`relative w-14 h-14 flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-300 group cursor-pointer
              ${
                isActive
                  ? "shadow-[0_0_30px_rgba(255,150,50,0.5)]"
                  : "hover:shadow-[0_0_15px_rgba(255,180,100,0.25)]"
              }
              ${
                isDarkMode
                  ? "text-slate-200 hover:text-white"
                  : "text-slate-700 hover:text-black"
              }`}
          >
            {/* Animated Glow Border */}
            {isActive && (
              <motion.div
                layoutId="active-glow"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-400/30 via-amber-400/30 to-yellow-400/30 blur-xl"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}

            {/* Icon */}
            <span className="relative z-10 text-2xl select-none">{app.icon}</span>

            {/* Tooltip Label */}
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`absolute left-full ml-3 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap shadow-md pointer-events-none
                ${
                  isDarkMode
                    ? "bg-slate-800 text-slate-100"
                    : "bg-white text-slate-800"
                }`}
            >
              {app.label}
            </motion.span>

            {/* Active Indicator Dot */}
            {isActive && (
              <motion.div
                layoutId="active-dot"
                className="absolute bottom-1 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 shadow-[0_0_6px_rgba(255,180,100,0.8)]"
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default Dock;
