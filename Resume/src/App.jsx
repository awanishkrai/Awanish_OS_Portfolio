import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import Window from './components/Window';
import About from './components/Apps/About';
import Projects from './components/Apps/Projects';
import Skills from './components/Apps/Skills';
import Certifications from './components/Apps/Certifications';
import Contact from './components/Apps/Contact';
import Terminal from './components/Apps/Terminal';
import TopBar from './components/Topbar';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [windows, setWindows] = useState({});
  const [windowOrder, setWindowOrder] = useState([]);
  const [showBoot, setShowBoot] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const openWindow = (appId) => {
    if (windows[appId]) {
      setWindowOrder([...windowOrder.filter((id) => id !== appId), appId]);
    } else {
      setWindows({ ...windows, [appId]: true });
      setWindowOrder([...windowOrder, appId]);
    }
  };

  const closeWindow = (appId) => {
    const newWindows = { ...windows };
    delete newWindows[appId];
    setWindows(newWindows);
    setWindowOrder(windowOrder.filter((id) => id !== appId));
  };

  const minimizeWindow = (appId) => {
    setWindowOrder(windowOrder.filter((id) => id !== appId));
  };

  const focusWindow = (appId) => {
    setWindowOrder([...windowOrder.filter((id) => id !== appId), appId]);
  };

  const appComponents = {
    about: <About isDarkMode={isDarkMode} />,
    projects: <Projects isDarkMode={isDarkMode} />,
    skills: <Skills isDarkMode={isDarkMode} />,
    certs: <Certifications isDarkMode={isDarkMode} />,
    contact: <Contact isDarkMode={isDarkMode} />,
    terminal: <Terminal isDarkMode={isDarkMode} />,
  };

  const appTitles = {
    about: 'About Me',
    projects: 'Projects',
    skills: 'Skills',
    certs: 'Certifications',
    contact: 'Contact',
    terminal: 'Terminal',
  };

  if (showBoot) {
    return (
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center z-[9999]"
      >
        <div className="text-center space-y-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-6xl font-bold mx-auto"
          >
            A
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-white text-3xl font-bold">Awanish OS</h1>
            <p className="text-slate-400 text-sm">Booting portfolio system...</p>
          </div>

          <motion.button
            onClick={() => setShowBoot(false)}
            className="text-orange-500 hover:text-orange-400 transition text-sm"
          >
            Click to continue ↓
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div
      className={`w-screen h-screen overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-100'}`}
      style={{
        backgroundImage: isDarkMode
          ? 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)'
          : 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
      }}
    >
      <TopBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Dock onAppClick={openWindow} isDarkMode={isDarkMode} activeApps={windowOrder} />

      <AnimatePresence>
        {windowOrder.map((appId, idx) =>
          windows[appId] ? (
            <Window
              key={appId}
              id={appId}
              title={appTitles[appId]}
              isDarkMode={isDarkMode}
              zIndex={1000 + idx}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onFocus={focusWindow}
            >
              {appComponents[appId]}
            </Window>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}