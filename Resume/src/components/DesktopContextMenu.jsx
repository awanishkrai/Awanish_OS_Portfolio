import React, { useEffect, useState } from "react";

const DesktopContextMenu = ({ onOpenTerminal, onChangeWallpaper, onAbout, onSettings }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      // Don't override context menu if right clicking on a window or the topbar/taskbar
      if (e.target.closest(".window-surface") || e.target.closest(".topbar") || e.target.closest(".taskbar")) {
        return;
      }
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const handleClick = () => {
      if (visible) setVisible(false);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("click", handleClick);
    };
  }, [visible]);

  if (!visible) return null;

  // Keep menu on screen
  const safeX = Math.min(position.x, window.innerWidth - 192); // 192 is w-48
  const safeY = Math.min(position.y, window.innerHeight - 200);

  return (
    <div
      className="fixed z-[9999] w-48 bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-sm text-slate-200 py-1.5 font-ubuntu"
      style={{ top: safeY, left: safeX }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="px-3 py-1.5 hover:bg-[#53d8fb] hover:text-black cursor-pointer transition-colors" onClick={onOpenTerminal}>
        Open Terminal
      </div>
      <div className="px-3 py-1.5 hover:bg-[#53d8fb] hover:text-black cursor-pointer transition-colors" onClick={onChangeWallpaper}>
        Change Wallpaper
      </div>
      <div className="border-b border-white/10 my-1"></div>
      <div className="px-3 py-1.5 hover:bg-[#53d8fb] hover:text-black cursor-pointer transition-colors" onClick={onSettings}>
        Settings
      </div>
      <div className="px-3 py-1.5 hover:bg-[#53d8fb] hover:text-black cursor-pointer transition-colors" onClick={onAbout}>
        About This System
      </div>
    </div>
  );
};

export default DesktopContextMenu;
