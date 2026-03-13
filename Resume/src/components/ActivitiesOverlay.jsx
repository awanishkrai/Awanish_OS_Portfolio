import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OS_APPS, getAppIcon } from "./DesktopIcons";
import { Search } from "lucide-react";

const WORKSPACE_COUNT = 4;

const ActivitiesOverlay = ({
  isDarkMode,
  onOpenApp,
  onClose,
  currentWorkspace,
  onSwitchWorkspace,
  openAppsByWorkspace,
}) => {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Super" || e.key === "Meta") e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchRef.current?.value?.toLowerCase().trim() || "";
    const match = OS_APPS.find(
      (a) =>
        a.label.toLowerCase().includes(query) ||
        a.id.toLowerCase().includes(query)
    );
    if (match) {
      onOpenApp(match.id);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onContextMenu={(e) => e.preventDefault()}
      className="fixed inset-0 z-[9500] backdrop-blur-md bg-black/50 flex flex-col"
      data-no-context-menu
    >
      {/* Top: Search bar */}
      <div className="pt-20 pb-8 flex justify-center">
        <form
          onSubmit={handleSearch}
          className={`flex items-center gap-3 w-full max-w-xl mx-6 px-4 py-3 rounded-xl border ${
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white/90 border-slate-200"
          }`}
        >
          <Search size={20} className="opacity-50" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Type to search applications..."
            className={`flex-1 bg-transparent outline-none text-lg ${
              isDarkMode ? "text-white placeholder-slate-500" : "text-black placeholder-slate-400"
            }`}
            autoComplete="off"
          />
          <span className="text-xs opacity-50">Alt+F2</span>
        </form>
      </div>

      {/* Center: App grid */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-3xl">
          {OS_APPS.map((app) => (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                onOpenApp(app.id);
                onClose();
              }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                {getAppIcon(app.id, 28)}
              </div>
              <span className="text-sm font-medium truncate max-w-[80px] text-center">
                {app.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Bottom: Workspace switcher */}
      <div className="pb-24 flex justify-center gap-2">
        {[...Array(WORKSPACE_COUNT)].map((_, i) => (
          <button
            key={i}
            onClick={() => {
              onSwitchWorkspace(i);
              onClose();
            }}
            className={`w-12 h-2 rounded-full transition-all ${
              currentWorkspace === i
                ? "bg-[#53d8fb] w-8"
                : isDarkMode
                ? "bg-white/20 hover:bg-white/30"
                : "bg-black/20 hover:bg-black/30"
            }`}
            title={`Workspace ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ActivitiesOverlay;
