import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Wifi, BatteryMedium, Volume2, X } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1, title: "Welcome to PortfolioOS", body: "Your desktop is ready.", time: "Just now" },
  { id: 2, title: "System", body: "All systems operational.", time: "2 min ago" },
  { id: 3, title: "Network", body: "Connected to awanish.dev", time: "5 min ago" },
];

const NotificationCenter = ({ isDarkMode, onClose }) => {
  return (
    <motion.div
      data-no-context-menu
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`fixed top-10 right-4 w-80 max-h-[70vh] rounded-xl shadow-2xl border z-[8500] flex flex-col overflow-hidden ${
        isDarkMode ? "bg-[#1e1e1e]/95 border-white/10" : "bg-white/95 border-slate-200"
      } backdrop-blur-xl`}
    >
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${
          isDarkMode ? "border-white/10" : "border-slate-200"
        }`}
      >
        <span className="font-semibold">Notifications</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
          <X size={16} />
        </button>
      </div>

      {/* Quick settings */}
      <div
        className={`flex gap-4 px-4 py-3 border-b ${
          isDarkMode ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Wifi size={20} />
          </div>
          <span className="text-xs">Wi‑Fi</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <BatteryMedium size={20} />
          </div>
          <span className="text-xs">Battery</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
            <Volume2 size={20} />
          </div>
          <span className="text-xs">Sound</span>
        </div>
      </div>

      {/* Notifications list */}
      <div className="flex-1 overflow-auto">
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`px-4 py-3 border-b cursor-pointer hover:bg-white/5 transition-colors ${
              isDarkMode ? "border-white/5" : "border-slate-100"
            }`}
          >
            <div className="font-medium text-sm">{n.title}</div>
            <div className="text-xs opacity-70 mt-0.5">{n.body}</div>
            <div className="text-xs opacity-50 mt-1">{n.time}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NotificationCenter;
