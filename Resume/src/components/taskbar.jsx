import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OS_APPS, getAppIcon } from "./DesktopIcons";
import { Minus, X } from "lucide-react";

const Taskbar = ({ activeApps, onFocus, onMinimize, onClose, focusedApp, isDarkMode, windows }) => {
  const [contextMenu, setContextMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    if (contextMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [contextMenu]);
  return (
    <motion.div
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-1/2 left-0 -translate-y-1/2 px-2 py-4 flex flex-col gap-3 rounded-r-2xl backdrop-blur-xl z-[9000] taskbar ${
        isDarkMode
          ? "bg-[#111116]/80 border-r border-white/10"
          : "bg-white/60 border-r border-slate-200"
      }`}
    >
      {OS_APPS.map((app) => {
        const isOpen = !!windows[app.id];
        const isFocused = focusedApp === app.id && !windows[app.id]?.minimized;
        const isMinimized = isOpen && windows[app.id]?.minimized;

        return (
          <motion.div
            key={app.id}
            onClick={() => (isFocused ? onMinimize(app.id) : onFocus(app.id))}
            onContextMenu={(e) => {
              e.preventDefault();
              if (!isOpen) return;
              setContextMenu({
                appId: app.id,
                x: e.clientX,
                y: e.clientY,
              });
            }}
            whileHover={{ x: 6, scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center group w-12 h-12 justify-center cursor-pointer transition-all ${
              isOpen && !isFocused && isMinimized ? 'opacity-70 saturate-50' : ''
            }`}
          >
            {/* The Icon */}
            <div className="p-2 rounded-xl bg-white/5 shadow-sm border border-white/5 drop-shadow-md">
              {getAppIcon(app.id, 24)}
            </div>
            
            {/* Tooltip on hover */}
            <div className={`absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-medium rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"}`}>
              {app.label}
            </div>

            {/* Indicator Dot */}
            {isOpen && (
              <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors ${
                isFocused ? 'bg-[#E95420] shadow-[0_0_8px_#E95420]' : 'bg-gray-500'
              }`} />
            )}
          </motion.div>
        );
      })}

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed py-1 min-w-[140px] rounded-lg shadow-xl border z-[9100] ${
              isDarkMode ? "bg-[#1e1e1e] border-white/10" : "bg-white border-slate-200"
            }`}
            style={{ left: contextMenu.x, top: contextMenu.y, transform: "translateY(-100%) translateY(-8px)" }}
          >
            <button
              onClick={() => { onFocus(contextMenu.appId); setContextMenu(null); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
            >
              Restore
            </button>
            <button
              onClick={() => { onMinimize(contextMenu.appId); setContextMenu(null); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
            >
              <Minus size={14} />
              Minimize
            </button>
            <div className="border-t border-white/10 my-1" />
            <button
              onClick={() => { onClose(contextMenu.appId); setContextMenu(null); }}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-red-500/20 text-red-400 transition-colors"
            >
              <X size={14} />
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Taskbar;
