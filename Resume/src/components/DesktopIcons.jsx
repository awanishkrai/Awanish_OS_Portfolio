import React from "react";

// ── Yaru-style inline SVG icons ──
const YaruIcon = ({ bg, children, size = 32 }) => (
  <div
    className="rounded-[22%] flex items-center justify-center shadow-md"
    style={{
      width: size + 12,
      height: size + 12,
      background: bg,
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size * 0.7}
      height={size * 0.7}
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  </div>
);

// ── Icon definitions (Yaru-inspired with Ubuntu palette) ──
const icons = {
  about: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #E95420, #c7411a)" size={size}>
      <circle cx="12" cy="8" r="4" />
      <path d="M6 21v-1a6 6 0 0112 0v1" />
    </YaruIcon>
  ),
  projects: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #3EB489, #2d8c6b)" size={size}>
      <path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7l-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </YaruIcon>
  ),
  terminal: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #300a24, #1a0514)" size={size}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </YaruIcon>
  ),
  resume: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #c7411a, #a63516)" size={size}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </YaruIcon>
  ),
  browser: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #E95420, #ff7843)" size={size}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </YaruIcon>
  ),
  settings: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #77216f, #5e185a)" size={size}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.08-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1.08 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 010 4h-.09c-.658.003-1.25.396-1.51 1z" />
    </YaruIcon>
  ),
  certificates: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #f0a30a, #d4900a)" size={size}>
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </YaruIcon>
  ),
  cp: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #e94560, #c73a52)" size={size}>
      <path d="M6 9H4.5a2.5 2.5 0 010-5C7 4 9 7 12 7s5-3 7.5-3a2.5 2.5 0 010 5H18" />
      <path d="M18 13v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6" />
      <path d="M6 9v4h12V9" />
    </YaruIcon>
  ),
  education: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #3468d5, #2a54ab)" size={size}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
    </YaruIcon>
  ),
  contact: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #27AE60, #1e8449)" size={size}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-10 7L2 7" />
    </YaruIcon>
  ),
  skills: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #8e44ad, #6c3483)" size={size}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </YaruIcon>
  ),
  trash: (size) => (
    <YaruIcon bg="linear-gradient(135deg, #555, #3a3a3a)" size={size}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </YaruIcon>
  ),
};

export const OS_APPS = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Files" },
  { id: "terminal", label: "Terminal" },
  { id: "resume", label: "Resume" },
  { id: "browser", label: "Firefox" },
  { id: "settings", label: "Settings" },
  { id: "certificates", label: "Certificates" },
  { id: "cp", label: "Comp. Prog." },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
  { id: "skills", label: "Skills" },
];

export const getAppIcon = (id, size = 24) => {
  const renderer = icons[id];
  if (renderer) return renderer(size);
  return icons.about(size);
};

// Desktop-only items (like real Ubuntu — just a few file/folder shortcuts, not the full app list)
const DESKTOP_ITEMS = [
  { id: "projects", label: "Home" },
  { id: "resume", label: "Resume.pdf" },
  { id: "terminal", label: "Terminal" },
];

const DesktopIcons = ({ onDoubleAppClick }) => {
  return (
    <div
      className="absolute top-16 bottom-24 right-6 flex flex-col justify-between w-24"
      data-no-context
    >
      {/* Desktop shortcut icons */}
      <div className="flex flex-col gap-5">
        {DESKTOP_ITEMS.map((item) => (
          <div
            key={item.id}
            onDoubleClick={() => onDoubleAppClick(item.id)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 cursor-pointer text-center group transition-all duration-200 hover:scale-105"
          >
            {getAppIcon(item.id, 32)}
            <span className="text-[11px] font-medium text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Trash - bottom */}
      <div className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
        onDoubleClick={() => {}}
      >
        {icons.trash(32)}
        <span className="text-[11px] font-medium text-white/70">Trash</span>
      </div>
    </div>
  );
};

export default DesktopIcons;
