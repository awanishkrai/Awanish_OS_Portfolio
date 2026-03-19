import React from "react";
import { motion } from "framer-motion";

const CalendarPopup = ({ isDarkMode, date, onClose }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(
      <div key={`p-${i}`} className="w-8 h-8 flex items-center justify-center text-xs opacity-40">
        {prevMonthDays - firstDay + i + 1}
      </div>
    );
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today;
    cells.push(
      <div
        key={d}
        className={`w-8 h-8 flex items-center justify-center text-xs rounded ${
          isToday
            ? "bg-[#E95420] text-white font-bold"
            : "hover:bg-white/10"
        }`}
      >
        {d}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className={`absolute right-0 top-full mt-1 w-64 p-4 rounded-xl shadow-xl border z-[100] ${
        isDarkMode ? "bg-[#1e1e1e] border-white/10" : "bg-white border-slate-200"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="text-center font-semibold mb-3">
        {months[month]} {year}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs opacity-70 mb-2">
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </motion.div>
  );
};

export default CalendarPopup;
