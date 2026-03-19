import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { OS_APPS } from "./DesktopIcons";

const RunDialog = ({ isDarkMode, onRun, onClose }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = inputRef.current?.value?.trim().toLowerCase();
    const match = OS_APPS.find(
      (a) =>
        a.id === cmd ||
        a.label.toLowerCase().includes(cmd) ||
        (cmd === "resume" && a.id === "resume") ||
        (cmd === "vim" && a.id === "resume") ||
        (cmd === "nvim" && a.id === "resume")
    );
    if (match) {
      onRun(match.id);
      onClose();
    } else if (cmd) {
      // Show "command not found" - could add toast
      inputRef.current.value = "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[8500]"
    >
      <div
        className={`w-[420px] rounded-xl shadow-2xl border overflow-hidden ${
          isDarkMode ? "bg-[#1e1e1e] border-white/10" : "bg-white border-slate-200"
        }`}
      >
        <div
          className={`px-4 py-2 border-b ${
            isDarkMode ? "bg-[#252526] border-white/5" : "bg-slate-50 border-slate-200"
          }`}
        >
          <span className="text-xs font-medium opacity-70">Run a command</span>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Application name (e.g. terminal, about, browser)"
            className={`w-full px-3 py-2 rounded-lg outline-none border ${
              isDarkMode
                ? "bg-[#0d1117] border-white/10 focus:border-[#E95420]"
                : "bg-slate-50 border-slate-200 focus:border-blue-500"
            }`}
          />
        </form>
      </div>
    </motion.div>
  );
};

export default RunDialog;
