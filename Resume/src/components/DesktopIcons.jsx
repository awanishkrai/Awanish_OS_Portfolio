import React from "react";
import { User, FolderKanban, Terminal, FileText, Globe, Settings as SettingsIcon, Trash2 } from "lucide-react";

export const OS_APPS = [
  { id: "about", label: "About Me", color: "text-[#39d353]" },
  { id: "projects", label: "Projects/", color: "text-[#53d8fb]" },
  { id: "terminal", label: "Terminal", color: "text-[#e94560]" },
  { id: "resume", label: "Resume.pdf", color: "text-[#ffbd2e]" },
  { id: "browser", label: "Browser", color: "text-[#53d8fb]" },
  { id: "settings", label: "Settings", color: "text-gray-400" },
];

export const getAppIcon = (id, size) => {
  const app = OS_APPS.find(a => a.id === id);
  const color = app ? app.color : "text-white";
  switch(id) {
    case 'about': return <User size={size} className={color} strokeWidth={1.5} />;
    case 'projects': return <FolderKanban size={size} className={color} strokeWidth={1.5} />;
    case 'terminal': return <Terminal size={size} className={color} strokeWidth={1.5} />;
    case 'resume': return <FileText size={size} className={color} strokeWidth={1.5} />;
    case 'browser': return <Globe size={size} className={color} strokeWidth={1.5} />;
    case 'settings': return <SettingsIcon size={size} className={color} strokeWidth={1.5} />;
    default: return <User size={size} className={color} />;
  }
};

const DesktopIcons = ({ onDoubleAppClick }) => {
  return (
    <div
      className="absolute top-16 bottom-24 left-4 flex flex-col justify-between w-24"
      data-no-context
    >
      {/* App icons column */}
      <div className="flex flex-col gap-6">
        {OS_APPS.map((app) => (
          <div
            key={app.id}
            onDoubleClick={() => onDoubleAppClick(app.id)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 cursor-pointer text-center group transition-all duration-200 hover:scale-105"
          >
            <div className="p-2 bg-black/20 rounded-xl shadow-lg border border-white/5 drop-shadow-md group-hover:scale-105 transition-transform backdrop-blur-sm">
              {getAppIcon(app.id, 32)}
            </div>
            <span className="text-[11px] font-medium bg-black/40 px-2 py-0.5 rounded drop-shadow-md text-white/90">
              {app.label}
            </span>
          </div>
        ))}
      </div>

      {/* Trash - bottom, aligned with column and above taskbar */}
      <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
        <div className="p-2 bg-black/20 rounded-xl border border-white/5">
          <Trash2 size={32} className="text-slate-500" strokeWidth={1.5} />
        </div>
        <span className="text-[11px] font-medium text-slate-500">Trash</span>
      </div>
    </div>
  );
};

export default DesktopIcons;
