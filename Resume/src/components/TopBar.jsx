import React, { useState, useEffect, useRef } from "react";
import { Power, Volume2, Wifi, BatteryFull, ChevronDown, Lock, RotateCcw, Moon, Sun, Settings } from "lucide-react";
import CalendarPopup from "./CalendarPopup";

const TopBar = ({ isDarkMode, toggleTheme, onShutdown, onActivities, onNotifications, showNotifications, onLock }) => {
  const [time, setTime] = useState(new Date());
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowSystemMenu(false);
      if (!e.target.closest("[data-calendar]")) setShowCalendar(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () =>
    time.toLocaleString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  const formatDate = () =>
    time.toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="topbar fixed top-0 left-0 right-0 h-[26px] flex items-center justify-between px-3 z-[2000] text-[13px] font-ubuntu select-none bg-[#1a1a1a] text-white/90">

      {/* ── Left: Activities ── */}
      <div className="flex items-center w-[140px]">
        <span
          onClick={onActivities}
          className="font-semibold cursor-pointer py-0.5 px-2.5 rounded hover:bg-white/10 transition-colors text-[13px]"
        >
          Activities
        </span>
      </div>

      {/* ── Center: Date & Time ── */}
      <div className="flex-1 flex justify-center" data-calendar>
        <div className="relative">
          <div
            onClick={() => { setShowCalendar((v) => !v); setShowSystemMenu(false); }}
            className="font-medium cursor-pointer py-0.5 px-3 rounded hover:bg-white/10 transition-colors text-[13px] tracking-wide"
          >
            {formatDate()} &nbsp; {formatTime()}
          </div>
          {showCalendar && (
            <CalendarPopup
              isDarkMode={true}
              date={time}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>

      {/* ── Right: System Tray (unified GNOME-style) ── */}
      <div className="flex items-center justify-end w-[140px]" ref={menuRef}>
        <div
          onClick={() => { setShowSystemMenu((v) => !v); setShowCalendar(false); }}
          className={`flex items-center gap-2 py-0.5 px-2 rounded transition-colors cursor-pointer ${
            showSystemMenu ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <Wifi size={13} strokeWidth={2.5} />
          <Volume2 size={13} strokeWidth={2.5} />
          <BatteryFull size={13} strokeWidth={2.5} />
          <ChevronDown size={11} strokeWidth={2.5} className="opacity-60" />
        </div>

        {/* ── System Menu Dropdown ── */}
        {showSystemMenu && (
          <div className="absolute right-3 top-[30px] w-[280px] rounded-xl shadow-2xl border border-white/10 bg-[#2b2b2b] text-white/90 z-[100] overflow-hidden font-ubuntu">

            {/* Quick Toggles Row */}
            <div className="p-3 flex gap-2 border-b border-white/10">
              <button
                onClick={() => { onNotifications(); setShowSystemMenu(false); }}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Wifi size={18} />
                <span className="text-[10px] opacity-70">Wi-Fi</span>
              </button>
              <button className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Volume2 size={18} />
                <span className="text-[10px] opacity-70">Sound</span>
              </button>
              <button
                onClick={toggleTheme}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
                <span className="text-[10px] opacity-70">{isDarkMode ? "Dark" : "Light"}</span>
              </button>
              <button className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <BatteryFull size={18} />
                <span className="text-[10px] opacity-70">100%</span>
              </button>
            </div>

            {/* Volume Slider */}
            <div className="px-4 py-3 flex items-center gap-3 border-b border-white/10">
              <Volume2 size={14} className="opacity-60 shrink-0" />
              <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-[#E95420] rounded-full" />
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <button
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("app-request", { detail: "settings" }));
                  setShowSystemMenu(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors"
              >
                <Settings size={15} className="opacity-60" />
                Settings
              </button>
              <button
                onClick={() => { onLock?.(); setShowSystemMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-white/5 transition-colors"
              >
                <Lock size={15} className="opacity-60" />
                Lock Screen
              </button>
            </div>

            {/* Power Row */}
            <div className="flex border-t border-white/10">
              <button
                onClick={() => { onShutdown?.(); setShowSystemMenu(false); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm hover:bg-white/5 transition-colors border-r border-white/10"
              >
                <Power size={15} className="text-red-400" />
                <span>Power Off</span>
              </button>
              <button
                onClick={() => { window.location.reload(); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 text-sm hover:bg-white/5 transition-colors"
              >
                <RotateCcw size={15} className="opacity-60" />
                <span>Restart</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
