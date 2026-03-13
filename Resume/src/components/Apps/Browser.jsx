import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, Star, Menu, Monitor, Code, Shield } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const HOME_URL = 'https://awanish.dev';

const normalizeUrl = (value) => {
  if (!value) return HOME_URL;
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const Browser = ({ isDarkMode }) => {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const education = PORTFOLIO_DATA?.education ?? {};
  const [url, setUrl] = useState(HOME_URL);
  const [inputUrl, setInputUrl] = useState(HOME_URL);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([HOME_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const contentRef = useRef(null);

  const handleNavigate = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const next = normalizeUrl(inputUrl);
    if (next === url) {
      setIsLoading(true);
      setReloadKey((k) => k + 1);
      setTimeout(() => setIsLoading(false), 400);
      return;
    }
    setIsLoading(true);
    setUrl(next);
    setHistory((prev) => {
      const base = prev.slice(0, historyIndex + 1);
      return [...base, next];
    });
    setHistoryIndex((idx) => idx + 1);
  };

  const handleReload = () => {
    setIsLoading(true);
    setReloadKey((k) => k + 1);
    setTimeout(() => setIsLoading(false), 400);
  };

  const handleBack = () => {
    if (historyIndex === 0) return;
    const nextIndex = historyIndex - 1;
    const nextUrl = history[nextIndex];
    setHistoryIndex(nextIndex);
    setUrl(nextUrl);
    setInputUrl(nextUrl);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleForward = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    const nextUrl = history[nextIndex];
    setHistoryIndex(nextIndex);
    setUrl(nextUrl);
    setInputUrl(nextUrl);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleHome = () => {
    if (url === HOME_URL) return;
    const next = HOME_URL;
    setInputUrl(next);
    setIsLoading(true);
    setUrl(next);
    setHistory((prev) => {
      const base = prev.slice(0, historyIndex + 1);
      return [...base, next];
    });
    setHistoryIndex((idx) => idx + 1);
    setTimeout(() => setIsLoading(false), 300);
  };

  useEffect(() => {
    if (url.includes('awanish.dev')) {
      setIsLoading(false);
    }
  }, [url]);

  // Scroll to section within simulated browser content
  const scrollToSection = (sectionId) => {
    const container = contentRef.current;
    if (!container) return;
    const el = container.querySelector(`#${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`flex flex-col w-full h-full ${isDarkMode ? 'bg-[#1e1e1e] text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      
      {/* Browser Chrome Toolbar */}
      <div className={`flex flex-col border-b ${isDarkMode ? 'bg-[#252526] border-black/40' : 'bg-slate-200 border-slate-300'}`}>
        
        {/* Tabs area */}
        <div className="flex h-9 items-end px-2 gap-1 overflow-hidden">
          <div className={`flex items-center gap-2 max-w-[260px] w-full h-8 px-3 rounded-t-lg text-xs border-t border-x ${isDarkMode ? 'bg-[#1e1e1e] border-white/5 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
            <Star size={14} className="text-[#53d8fb]" />
            <span className="truncate">Awanish Kumar Rai | Portfolio</span>
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-t-lg hover:bg-white/10 cursor-pointer transition-colors">
            <span className="text-lg leading-none mb-1">+</span>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className={`flex items-center gap-2 p-2 h-12 ${isDarkMode ? 'bg-[#333333]' : 'bg-white'}`}>
          <div className="flex items-center gap-1">
            <button
              onClick={handleBack}
              className={`p-1.5 rounded transition-colors disabled:opacity-30 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              disabled={historyIndex === 0}
              title="Go back"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={handleForward}
              className={`p-1.5 rounded transition-colors disabled:opacity-30 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              disabled={historyIndex >= history.length - 1}
              title="Go forward"
            >
              <ArrowRight size={16} />
            </button>
            <button
              onClick={handleReload}
              className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'} ${isLoading ? 'animate-spin' : ''}`}
              title="Reload"
            >
              <RotateCw size={16} />
            </button>
            <button
              onClick={handleHome}
              className={`p-1.5 rounded transition-colors ml-1 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}
              title="Home"
            >
              <Home size={16} />
            </button>
          </div>

          {/* Address Bar */}
          <form onSubmit={handleNavigate} className="flex-1">
            <div className={`flex items-center gap-2 w-full h-8 px-3 rounded-full border focus-within:ring-2 focus-within:ring-[#53d8fb]/50 transition-all ${isDarkMode ? 'bg-[#1e1e1e] border-[#444] text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
              <Lock size={12} className={url.startsWith('https') ? 'text-green-500' : 'text-slate-400'} />
              <input 
                type="text" 
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <Star size={14} className="text-slate-400 hover:text-yellow-400 cursor-pointer" />
            </div>
          </form>

          {/* Tools Menu */}
          <div className="flex items-center gap-1">
            <img src="/profile.png" alt="Profile" className="w-6 h-6 rounded-full mx-1 object-cover" onError={(e) => { e.target.src = 'https://github.com/awanishkrai.png'; }} />
            <button className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Browser Viewport Area */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-[#53d8fb] animate-spin"></div>
          </div>
        ) : null}
        
        {url.includes('awanish.dev') ? (
          // Simulated "webpage" inside the browser app
          <div ref={contentRef} className="w-full h-full overflow-auto text-slate-900 absolute inset-0 bg-slate-50">
            <header className="sticky top-0 w-full bg-white/85 backdrop-blur-md z-10 border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm">
              <div className="font-bold text-lg sm:text-xl tracking-tighter">Awanish<span className="text-[#53d8fb]">.dev</span></div>
              <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <button onClick={() => scrollToSection('about')} className="hover:text-black cursor-pointer">About</button>
                <button onClick={() => scrollToSection('features')} className="hover:text-black cursor-pointer">Projects</button>
                <button onClick={() => scrollToSection('education')} className="hover:text-black cursor-pointer">Education</button>
                <button onClick={() => window.dispatchEvent(new CustomEvent('app-request', { detail: 'contact' }))} className="hover:text-black cursor-pointer">Contact</button>
              </nav>
            </header>
            
            <main className="pt-28 pb-20 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto space-y-24">
              <section id="about" className="min-h-[60vh] flex flex-col justify-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5">
                  Building{" "}
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-[#53d8fb] to-[#a371f7]">
                    digital experiences
                  </span>{" "}
                  with purpose.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-4 leading-relaxed">
                  Hi, I'm {personal.name || 'Awanish Kumar Rai'}, a {personal.title || 'Computer Science engineer'}
                  {" "}who enjoys crafting polished desktop-like web interfaces, performant backend systems, and thoughtful developer tooling.
                </p>
                <p className="text-sm text-slate-500 max-w-2xl mb-8 leading-relaxed">
                  Based in {personal.location || 'India'}, I work across the stack with React, TypeScript, C/C++, Linux, and modern cloud tooling to ship reliable, human-friendly products.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('app-request', { detail: 'projects' }))}
                    className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-slate-800 transition-colors shadow-lg"
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => {
                      const url = PORTFOLIO_DATA?.socials?.github || 'https://github.com/awanishkrai';
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="px-6 py-3 group flex items-center gap-2 bg-white border border-slate-200 text-black rounded-lg font-medium hover:border-black transition-colors"
                  >
                    GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </section>

              <section id="features" className="grid sm:grid-cols-3 gap-8">
                <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Monitor size={24} /></div>
                  <h3 className="text-lg font-bold mb-2">Systems Level</h3>
                  <p className="text-slate-600 text-sm">Deep understanding of C, C++, and Linux environments allowing for hyper-optimized computing.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4"><Code size={24} /></div>
                  <h3 className="text-lg font-bold mb-2">Modern Web</h3>
                  <p className="text-slate-600 text-sm">Crafting dynamic React, Next.js, and Vite applications with cutting-edge UI frameworks.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4"><Shield size={24} /></div>
                  <h3 className="text-lg font-bold mb-2">Secure Backend</h3>
                  <p className="text-slate-600 text-sm">Developing scalable REST & GraphQL APIs backed by robust SQL & NoSQL architectures.</p>
                </div>
              </section>

              <section id="education" className="space-y-6 scroll-mt-24">
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Education</h2>
                  <div className="text-xs text-slate-400">Updated from PortfolioOS profile</div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="font-semibold text-slate-900">
                      {education?.current?.program || "B.Tech (Computer Science)"}
                      <span className="text-slate-400 font-normal">{" "}•{" "}</span>
                      <span className="text-slate-600 font-medium">
                        {education?.current?.institution || "—"}
                      </span>
                    </div>
                    <div className="text-sm text-slate-500">
                      {education?.current?.expectedGraduation ? `Expected ${education.current.expectedGraduation}` : "Expected —"}
                    </div>
                  </div>

                  <ul className="text-sm text-slate-700 space-y-1.5">
                    <li>
                      <span className="font-semibold">Current B.Tech program details</span>
                      {" "}- {education?.current?.program || "B.Tech (CSE)"} • {education?.current?.institution || "—"}
                    </li>
                    <li>
                      <span className="font-semibold">Specialization &amp; CGPA/percentage</span>
                      {" "}- {education?.current?.specialization || "Computer Science"} • CGPA: {education?.current?.cgpa || "—"}
                    </li>
                    <li>
                      <span className="font-semibold">Highlight relevant coursework &amp; projects</span>
                      {" "}- {(education?.current?.highlights || []).join(" • ") || "—"}
                    </li>
                    <li>
                      <span className="font-semibold">Include details of previous education</span>
                      {" "}- {(education?.previous || [])
                        .map((e) => `${e.level}: ${e.institution || "—"} (${e.year || "—"}) • ${e.score || "—"}`)
                        .join(" | ") || "—"}
                    </li>
                  </ul>
                </div>
              </section>
            </main>
          </div>
        ) : (
          <div className="w-full h-full absolute inset-0 bg-slate-50">
            <iframe
              key={`${reloadKey}-${url}`}
              src={url}
              title={url}
              className="w-full h-full border-0"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Browser;

