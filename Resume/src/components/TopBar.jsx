import React, { useState, useEffect, useRef } from "react";
import { Power, Sun, Moon, Wifi, BatteryMedium, Bell, RotateCcw, Lock } from "lucide-react";
import CalendarPopup from "./CalendarPopup";

const TopBar = ({ isDarkMode, toggleTheme, onShutdown, onActivities, onNotifications, showNotifications, onLock }) => {
  const [time, setTime] = useState(new Date());
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowPowerMenu(false);
      if (!e.target.closest("[data-calendar]")) setShowCalendar(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = () => {
    return time.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className={`topbar fixed top-0 left-0 right-0 h-8 flex items-center justify-between px-4 backdrop-blur-md z-[2000] text-sm font-ubuntu select-none ${isDarkMode
          ? "bg-[#000000]/40 text-[#ffffff] border-b border-white/5"
          : "bg-white/80 text-black border-b border-black/5"
        }`}
    >
      {/* Left: Activities */}
      <div className="flex items-center gap-3">
        <span
          onClick={onActivities}
          className="font-semibold cursor-pointer py-1 px-2 rounded-md hover:bg-white/10 transition-colors"
        >
          Activities
        </span>
      </div>

      {/* Center: Live Clock + Calendar (perfectly centered section) */}
      <div className="flex-1 flex justify-center padding-left-50" data-calendar>
        <div className="relative">
          <div
            onClick={() => setShowCalendar((v) => !v)}
            className="font-semibold tracking-wide cursor-pointer py-1 px-2 rounded-md hover:bg-white/10 transition-colors"
          >
            {formatDateTime()}
          </div>
          {showCalendar && (
            <CalendarPopup
              isDarkMode={isDarkMode}
              date={time}
              onClose={() => setShowCalendar(false)}
            />
          )}
        </div>
      </div>

      {/* Right: Status Indicators */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <div className="flex items-center gap-3 py-1 px-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
          <Wifi size={14} />
          <BatteryMedium size={14} />
        </div>
        <div
          onClick={onNotifications}
          className={`flex items-center gap-3 py-1 px-2 rounded-md transition-colors cursor-pointer ${
            showNotifications ? "bg-white/15" : "hover:bg-white/10"
          }`}
        >
          <Bell size={14} />
        </div>
        <div
          onClick={toggleTheme}
          className="flex items-center py-1 px-2 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
        </div>
        <div ref={menuRef} className="relative">
          <div
            onClick={() => setShowPowerMenu((v) => !v)}
            className="flex items-center py-1 px-2 rounded-md hover:bg-red-500/80 transition-colors cursor-pointer text-red-400 hover:text-white"
          >
            <Power size={14} />
          </div>
          {showPowerMenu && (
            <div
              className={`absolute right-0 top-full mt-1 py-1 min-w-[140px] rounded-lg shadow-xl border z-[100] ${
                isDarkMode ? "bg-[#1e1e1e] border-white/10" : "bg-white border-slate-200"
              }`}
            >
              <button
                onClick={() => {
                  onLock?.();
                  setShowPowerMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
              >
                <Lock size={14} />
                Lock Screen
              </button>
              <button
                onClick={() => {
                  onShutdown?.();
                  setShowPowerMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
              >
                <Power size={14} className="text-red-400" />
                Shutdown
              </button>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors"
              >
                <RotateCcw size={14} />
                Restart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
