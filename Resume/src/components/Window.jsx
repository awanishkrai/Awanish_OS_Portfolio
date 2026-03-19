import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

const TOP_BAR_CLEARANCE = 30;
const TASKBAR_CLEARANCE = 12;
const DOCK_WIDTH = 64;

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
  const [isMaximized, setIsMaximized] = useState(true);
  const [snappedSide, setSnappedSide] = useState(null); // 'left' | 'right'

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

  // Dragging logic + edge snapping (left/right half, top = maximize)
  const snapRef = useRef(null);
  const SNAP_THRESHOLD = 60;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      if (e.clientX < SNAP_THRESHOLD && e.clientY < 80) snapRef.current = "max";
      else if (e.clientX < SNAP_THRESHOLD) snapRef.current = "left";
      else if (e.clientX > window.innerWidth - SNAP_THRESHOLD) snapRef.current = "right";
      else snapRef.current = null;
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    };

    const handleMouseUp = () => {
      if (!isDragging) return;
      const snap = snapRef.current;
      setIsDragging(false);
      snapRef.current = null;
      if (snap === "max") {
        setIsMaximized(true);
        setSnappedSide(null);
      } else if (snap === "left") {
        setIsMaximized(false);
        setSnappedSide("left");
        setPosition({ x: 4, y: Math.max(TOP_BAR_CLEARANCE, 4) });
      } else if (snap === "right") {
        setIsMaximized(false);
        setSnappedSide("right");
        setPosition({ x: window.innerWidth / 2 - 4, y: Math.max(TOP_BAR_CLEARANCE, 4) });
      } else {
        setSnappedSide(null);
      }
    };

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
    setSnappedSide(null);
  };

  // style for window size and position
  const windowStyle =
    isMaximized
      ? {
          left: `${DOCK_WIDTH + 4}px`,
          top: `${TOP_BAR_CLEARANCE}px`,
          width: `calc(100vw - ${DOCK_WIDTH + 8}px)`,
          height: `calc(100vh - ${TOP_BAR_CLEARANCE + TASKBAR_CLEARANCE}px)`,
          zIndex,
          borderRadius: "1rem",
          borderWidth: "1.5px",
        }
      : snappedSide === "left"
      ? {
          left: `${DOCK_WIDTH + 4}px`,
          top: `${TOP_BAR_CLEARANCE}px`,
          width: `calc(50vw - ${DOCK_WIDTH / 2 + 8}px)`,
          height: `calc(100vh - ${TOP_BAR_CLEARANCE + TASKBAR_CLEARANCE}px)`,
          zIndex,
          borderRadius: "1rem",
          borderWidth: "1.5px",
        }
      : snappedSide === "right"
      ? {
          left: `calc(50vw + ${DOCK_WIDTH / 2}px)`,
          top: `${TOP_BAR_CLEARANCE}px`,
          width: `calc(50vw - ${DOCK_WIDTH / 2 + 8}px)`,
          height: `calc(100vh - ${TOP_BAR_CLEARANCE + TASKBAR_CLEARANCE}px)`,
          zIndex,
          borderRadius: "1rem",
          borderWidth: "1.5px",
        }
      : {
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: "680px",
          height: "540px",
          zIndex,
          borderRadius: "1rem",
          borderWidth: "1.5px",
        };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`window-surface fixed shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_0_1px_rgba(233,84,32,0.08)] border backdrop-blur-2xl transition-all ${isDarkMode
          ? "bg-[rgba(25,25,35,0.85)] border-slate-700"
          : "bg-[rgba(255,255,255,0.7)] border-slate-200"
        }`}
      style={windowStyle}
      onClick={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDown}
        className={`h-11 flex items-center px-4 cursor-move select-none border-b ${isDarkMode
            ? "bg-[#252526] border-[#30363d]"
            : "bg-[#f5f5f5] border-slate-300"
          }`}
      >
        <div className="flex-1 text-left pl-2 text-[#8b949e] font-semibold text-xs tracking-wide">
          {title}
        </div>

        <div className="flex gap-2 w-16 justify-end" data-no-drag>
          {/* Minimize */}
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center group"
          >
            <Minus size={10} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>

          {/* Maximize / Restore */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center group"
          >
            <Square size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-3.5 h-3.5 rounded-full bg-[#E95420] hover:bg-[#d94a1a] flex items-center justify-center group"
          >
            <X size={10} className="text-black/60 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className={`h-[calc(100%-2.75rem)] overflow-auto ${isDarkMode
            ? "bg-linear-to-br from-slate-900/80 to-slate-800/70 text-slate-100"
            : "bg-linear-to-br from-slate-50 to-white text-slate-800"
          } ${isMaximized ? "rounded-none" : "rounded-b-2xl"}`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
