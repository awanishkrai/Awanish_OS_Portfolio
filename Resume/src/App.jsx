import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dock from './components/Dock';
import Window from './components/Window';
import About from './components/Apps/About';
import Projects from './components/Apps/Projects';
import Skills from './components/Apps/Skills';
import Certifications from './components/Apps/Certifications';
import Contact from './components/Apps/Contact';
import Terminal from './components/Apps/Terminal';
import TopBar from './components/TopBar';
import Taskbar from './components/taskbar';


export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [windows, setWindows] = useState({});
  const [windowOrder, setWindowOrder] = useState([]);
  const [showBoot, setShowBoot] = useState(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const openWindow = (appId) => {
    setWindows((prev) => {
      if (prev[appId]) return prev;
      return { ...prev, [appId]: true };
    });
    setWindowOrder((prev) => {
      if (prev.includes(appId)) return [...prev.filter((id) => id !== appId), appId];
      return [...prev, appId];
    });
  };

  const closeWindow = (appId) => {
    setWindows((prev) => {
      const newWindows = { ...prev };
      delete newWindows[appId];
      return newWindows;
    });
    setWindowOrder((prev) => prev.filter((id) => id !== appId));
  };

  const minimizeWindow = (appId) => {
    setWindowOrder((prev) => prev.filter((id) => id !== appId));
  };

  const focusWindow = (appId) => {
    setWindowOrder((prev) => [...prev.filter((id) => id !== appId), appId]);
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

  // --- Boot Animation Screen ---
  if (showBoot) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[9999] font-mono text-green-400"
      >
        {/* Animated Linux-style logo */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8], boxShadow: ["0 0 40px rgba(34,197,94,0.4)", "0 0 60px rgba(34,197,94,0.8)", "0 0 40px rgba(34,197,94,0.4)"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-28 h-28 rounded-full border-4 border-green-400 flex items-center justify-center text-5xl font-bold mb-8"
        >
          A
        </motion.div>

        {/* Boot log text simulation */}
        <div className="text-left w-[320px] mx-auto text-sm leading-relaxed space-y-1 mb-8">
          {[
            "[ OK ] Initializing kernel modules...",
            "[ OK ] Mounting virtual filesystem...",
            "[ OK ] Starting display manager...",
            "[ OK ] Loading Awanish OS environment...",
            "[ OK ] System ready.",
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 * i }}
              className="tracking-tight"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Auto transition */}
        <motion.button
          onClick={() => setShowBoot(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-green-500 hover:text-green-300 transition text-sm border border-green-500 px-4 py-1 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)]"
        >
          Press Enter or Click to Start
        </motion.button>
      </motion.div>
    );
  }

  // --- Desktop UI ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={`w-screen h-screen overflow-hidden relative ${
        isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Animated gradient background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${
          isDarkMode
            ? 'from-orange-500/10 via-purple-500/10 to-indigo-500/10'
            : 'from-orange-300/20 via-pink-300/20 to-indigo-300/20'
        } bg-[length:200%_200%]`}
      />

      {/* Floating light particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            isDarkMode ? 'bg-white/10' : 'bg-slate-800/10'
          }`}
          style={{
            width: Math.random() * 6 + 3,
            height: Math.random() * 6 + 3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Top bar and dock */}
      <TopBar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <Dock onAppClick={openWindow} isDarkMode={isDarkMode} activeApps={windowOrder} />
      <Taskbar
  activeApps={windowOrder}
  onFocus={focusWindow}
  focusedApp={windowOrder[windowOrder.length - 1]}
  isDarkMode={isDarkMode}
/>

      {/* App Windows */}
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
    </motion.div>
  );
}
