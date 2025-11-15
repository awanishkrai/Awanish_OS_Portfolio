import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

const Window = ({
  id,
  title,
  children,
  onClose,
  onMinimize,
  isDarkMode,
  zIndex,
  onFocus,
}) => {
  // position and maximize state
  const [position, setPosition] = useState({
    x: Math.random() * 300 + 100,
    y: Math.random() * 200 + 100,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMouseDown = (e) => {
    if (e.target.closest("[data-no-drag]")) return;
    if (!isMaximized) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
    onFocus(id);
  };

  // Dragging logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Toggle maximize / restore
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // style for window size and position
  const windowStyle = isMaximized
    ? {
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        zIndex,
        borderRadius: 0,
      }
    : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "680px",
        height: "540px",
        zIndex,
        borderRadius: "1rem",
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`fixed shadow-[0_8px_40px_rgba(0,0,0,0.45)] border backdrop-blur-xl transition-all ${
        isDarkMode
          ? "bg-[rgba(25,25,35,0.85)] border-slate-700"
          : "bg-[rgba(255,255,255,0.7)] border-slate-200"
      }`}
      style={windowStyle}
      onClick={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`h-11 flex items-center justify-between px-4 cursor-move select-none border-b ${
          isDarkMode
            ? "bg-gradient-to-r from-orange-500/80 to-amber-400/80 border-slate-700"
            : "bg-gradient-to-r from-orange-400/90 to-amber-300/90 border-slate-200"
        }`}
      >
        <span className="text-white font-semibold text-sm tracking-wide">
          {title}
        </span>

        <div className="flex gap-1.5" data-no-drag>
          {/* Minimize */}
          <button
            onClick={() => onMinimize(id)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <Minus size={16} />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={toggleMaximize}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-all"
          >
            <Square size={14} />
          </button>

          {/* Close */}
          <button
            onClick={() => onClose(id)}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-red-500/70 transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`h-[calc(100%-2.75rem)] overflow-auto ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-900/80 to-slate-800/70 text-slate-100"
            : "bg-gradient-to-br from-slate-50 to-white text-slate-800"
        } ${isMaximized ? "rounded-none" : "rounded-b-2xl"}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
