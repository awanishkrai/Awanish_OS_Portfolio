import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DesktopIcons from './components/DesktopIcons';
import DesktopContextMenu from './components/DesktopContextMenu';
import Taskbar from './components/taskbar';
import Window from './components/Window';
import ActivitiesOverlay from './components/ActivitiesOverlay';
import RunDialog from './components/RunDialog';
import NotificationCenter from './components/NotificationCenter';
import About from './components/Apps/About';
import Projects from './components/Apps/Projects';
import Terminal from './components/Apps/Terminal';
import Resume from './components/Apps/Resume';
import Browser from './components/Apps/Browser';
import Settings from './components/Apps/Settings';
import Certifications from './components/Apps/Certifications';
import Contact from './components/Apps/Contact';
import Skills from './components/Apps/Skills';
import Education from './components/Apps/Education';
import Competitive from './components/Apps/Competitive';
import TopBar from './components/TopBar';


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [windows, setWindows] = useState({});
  const [windowOrder, setWindowOrder] = useState([]);
  const [showBoot, setShowBoot] = useState(true);
  const [currentWorkspace, setCurrentWorkspace] = useState(0);
  const [showActivities, setShowActivities] = useState(false);
  const [showRunDialog, setShowRunDialog] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const openWindow = useCallback((appId, workspace) => {
    const ws = workspace ?? currentWorkspace;
    setWindows((prev) => {
      if (prev[appId]) {
        return { ...prev, [appId]: { ...prev[appId], minimized: false, workspace: ws } };
      }
      return { ...prev, [appId]: { minimized: false, workspace: ws } };
    });
    setWindowOrder((prev) => {
      if (prev.includes(appId)) return [...prev.filter((id) => id !== appId), appId];
      return [...prev, appId];
    });
  }, [currentWorkspace]);

  const closeWindow = useCallback((appId) => {
    setWindows((prev) => {
      const next = { ...prev };
      delete next[appId];
      return next;
    });
    setWindowOrder((prev) => prev.filter((id) => id !== appId));
  }, []);

  useEffect(() => {
    const handleAppRequest = (e) => {
      const action = e.detail;
      if (action === 'close-resume') closeWindow('resume');
      else if (typeof action === 'string') openWindow(action);
    };
    window.addEventListener('app-request', handleAppRequest);
    return () => window.removeEventListener('app-request', handleAppRequest);
  }, [openWindow, closeWindow]);

  const toggleTheme = useCallback(() => setIsDarkMode((d) => !d), []);

  const minimizeWindow = useCallback((appId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], minimized: true },
    }));
  }, []);

  const focusWindow = useCallback((appId) => {
    setWindows((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], minimized: false },
    }));
    setWindowOrder((prev) => [...prev.filter((id) => id !== appId), appId]);
  }, []);

  const appComponents = useMemo(() => ({
    about: <About isDarkMode={isDarkMode} />,
    projects: <Projects isDarkMode={isDarkMode} />,
    terminal: <Terminal isDarkMode={isDarkMode} />,
    resume: <Resume isDarkMode={isDarkMode} />,
    browser: <Browser isDarkMode={isDarkMode} />,
    settings: <Settings isDarkMode={isDarkMode} toggleTheme={toggleTheme} />,
    certificates: <Certifications isDarkMode={isDarkMode} />,
    contact: <Contact isDarkMode={isDarkMode} />,
    education: <Education isDarkMode={isDarkMode} />,
    cp: <Competitive isDarkMode={isDarkMode} />,
    skills: <Skills isDarkMode={isDarkMode} />,
  }), [isDarkMode, toggleTheme]);

  const appTitles = useMemo(() => ({
    about: 'About Me',
    projects: 'Projects',
    terminal: 'Terminal',
    resume: 'Resume - Neovim',
    browser: 'Portfolio Browser',
    settings: 'Settings',
    certificates: 'Certificates',
    contact: 'Contact',
    education: 'Education',
    cp: 'Competitive Programming',
    skills: 'Skills',
  }), []);

  const particles = useMemo(() =>
    [...Array(15)].map(() => ({
      w: Math.random() * 1.5 + 1,
      h: Math.random() * 1.5 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      opacity: Math.random() * 0.35 + 0.15,
    })), []);

  // --- Boot Animation Screen ---
  useEffect(() => {
    if (!showBoot) return;
    const onKey = (e) => { if (e.key === 'Enter') setShowBoot(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showBoot]);

  // --- Keyboard Shortcuts (Desktop) ---
  useEffect(() => {
    if (showBoot || isLocked) return;
    const openIds = windowOrder.filter((id) => windows[id]?.workspace === currentWorkspace);
    const focused = windowOrder[windowOrder.length - 1];

    const onKeyDown = (e) => {
      if (e.altKey && e.key === 'Tab') {
        e.preventDefault();
        if (openIds.length < 2) return;
        const idx = openIds.indexOf(focused);
        const next = openIds[(idx + 1) % openIds.length];
        if (next) focusWindow(next);
        return;
      }
      if (e.altKey && e.key === 'F2') {
        e.preventDefault();
        setShowRunDialog(true);
        return;
      }
      if (e.key === 'Meta' || e.key === 'Super') {
        e.preventDefault();
        setShowActivities((s) => !s);
        return;
      }
      if (e.key === 'Escape') {
        if (showActivities) setShowActivities(false);
        else if (showRunDialog) setShowRunDialog(false);
        else if (showNotifications) setShowNotifications(false);
        else if (focused && windows[focused]) {
          e.preventDefault();
          closeWindow(focused);
        }
        return;
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showBoot, isLocked, windowOrder, windows, currentWorkspace, focusWindow, closeWindow]);

  // Must be before early returns (Rules of Hooks)
  const visibleWindowOrder = windowOrder.filter(
    (id) => windows[id] && (windows[id].workspace ?? 0) === currentWorkspace
  );
  const focusAndMaybeSwitchWorkspace = useCallback((appId) => {
    const ws = windows[appId]?.workspace ?? 0;
    if (ws !== currentWorkspace) setCurrentWorkspace(ws);
    focusWindow(appId);
  }, [windows, currentWorkspace, focusWindow]);

  if (showBoot) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-[#0d1117] flex flex-col items-center justify-center z-[9999] font-mono text-[#39d353]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        <div className="text-left w-[440px] max-w-full px-6 mx-auto text-sm leading-relaxed space-y-1 mb-8">
          {[
            "[  OK  ] Starting Portfolio kernel...",
            "[  OK  ] Loaded 847 git commits",
            "[  OK  ] Mounted /home/awanish — 42 repositories",
            "[  OK  ] Initializing skill-set: Python, C++, React, Django",
            "[  OK  ] Starting window manager (GNOME-Portfolio 46.0)",
            "[  OK  ] Network: awanish.dev reachable",
            "[  OK  ] Welcome, visitor.",
          ].map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 * i, duration: 0.2 }}
              className="tracking-tight"
            >
              <span className="text-white mr-2">{line.substring(0, 8)}</span>
              {line.substring(8)}
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, width: "0%" }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ delay: 2.5, duration: 1 }}
            className="h-1 bg-[#39d353] mt-6 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </motion.div>
        </div>

        {/* Skip button - appears after 1.5s */}
        <motion.button
          onClick={() => setShowBoot(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-[#39d353] hover:text-white transition text-xs border border-[#39d353]/30 px-4 py-1.5 rounded shadow-[0_0_10px_rgba(57,211,83,0.1)]"
        >
          [ PRESS ENTER TO JUMP IN ]
        </motion.button>
      </motion.div>
    );
  }

  // --- Lock Screen ---
  if (isLocked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-[#0d1117] flex flex-col items-center justify-center z-[9999] cursor-pointer"
        onClick={() => setIsLocked(false)}
      >
        <div className="text-6xl font-bold text-white/90 mb-4">
          {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </div>
        <div className="text-white/60 text-sm">Click anywhere to unlock</div>
      </motion.div>
    );
  }

  // --- Desktop UI ---
  return (
    <>
      <div className="scanlines"></div>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        className="w-screen h-screen overflow-hidden relative bg-[#0d1117] text-white font-ubuntu select-none"
      >
        {/* Static background */}
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "linear-gradient(to bottom right, #0d1117, #0b1b36, #12081f)" }}
        />

        {/* Floating particle stars (stable, no re-render jitter) */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#53d8fb]"
            style={{
              width: p.w,
              height: p.h,
              top: `${p.top}%`,
              left: `${p.left}%`,
              opacity: p.opacity,
            }}
          />
        ))}

        {/* Desktop Components */}
        <DesktopContextMenu
          onOpenTerminal={() => openWindow('terminal')}
          onChangeWallpaper={() => openWindow('settings')}
          onAbout={() => openWindow('about')}
          onSettings={() => openWindow('settings')}
        />
        <DesktopIcons onDoubleAppClick={openWindow} />

        {/* Top bar and dock */}
        <TopBar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
          onShutdown={() => setShowBoot(true)}
          onActivities={() => setShowActivities((v) => !v)}
          onNotifications={() => setShowNotifications((v) => !v)}
          showNotifications={showNotifications}
          onLock={() => setIsLocked(true)}
        />

        {/* Activities overlay */}
        <AnimatePresence>
          {showActivities && (
            <ActivitiesOverlay
              isDarkMode={isDarkMode}
              onOpenApp={(id) => openWindow(id)}
              onClose={() => setShowActivities(false)}
              currentWorkspace={currentWorkspace}
              onSwitchWorkspace={setCurrentWorkspace}
              openAppsByWorkspace={windows}
            />
          )}
        </AnimatePresence>

        {/* Run dialog */}
        <AnimatePresence>
          {showRunDialog && (
            <div className="fixed inset-0 z-[8400] bg-black/30 flex items-center justify-center" data-no-context-menu onClick={() => setShowRunDialog(false)}>
              <div onClick={(e) => e.stopPropagation()}>
                <RunDialog
                  isDarkMode={isDarkMode}
                  onRun={(id) => openWindow(id)}
                  onClose={() => setShowRunDialog(false)}
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Notification center */}
        <AnimatePresence>
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-[8490]" data-no-context-menu onClick={() => setShowNotifications(false)} />
              <NotificationCenter isDarkMode={isDarkMode} onClose={() => setShowNotifications(false)} />
            </>
          )}
        </AnimatePresence>
        <Taskbar
          windows={windows}
          activeApps={windowOrder}
          onFocus={(id) => {
            if (windows[id]) focusAndMaybeSwitchWorkspace(id);
            else openWindow(id);
          }}
          onMinimize={minimizeWindow}
          onClose={closeWindow}
          focusedApp={windowOrder[windowOrder.length - 1]}
          isDarkMode={isDarkMode}
        />

        {/* App Windows */}
        <AnimatePresence>
          {visibleWindowOrder.map((appId, idx) =>
            windows[appId] && !windows[appId].minimized ? (
              <Window
                key={appId}
                id={appId}
                title={appTitles[appId] || "App"}
                isDarkMode={isDarkMode}
                zIndex={1000 + idx}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onFocus={focusWindow}
              >
                {appComponents[appId] || <div className="p-4">Content not found.</div>}
              </Window>
            ) : null
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
