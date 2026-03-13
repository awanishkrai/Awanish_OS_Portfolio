import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, Star, Menu, Monitor, Code, Shield } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Browser = ({ isDarkMode }) => {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const [url, setUrl] = useState('https://awanish.dev');
  const [inputUrl, setInputUrl] = useState('https://awanish.dev');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setUrl(inputUrl);
    setTimeout(() => setIsLoading(false), 800);
  };

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className={`flex flex-col w-full h-full ${isDarkMode ? 'bg-[#1e1e1e] text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
      
      {/* Browser Chrome Toolbar */}
      <div className={`flex flex-col border-b ${isDarkMode ? 'bg-[#252526] border-black/40' : 'bg-slate-200 border-slate-300'}`}>
        
        {/* Tabs area (mock) */}
        <div className="flex h-10 items-end px-2 gap-1 overflow-hidden mt-1">
          {/* Window controls (fake close / minimize / maximize) */}
          <div className="flex items-center gap-1 h-8 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>

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
            <button className="p-1.5 rounded hover:bg-black/10 transition-colors disabled:opacity-30" disabled>
              <ArrowLeft size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-black/10 transition-colors disabled:opacity-30" disabled>
              <ArrowRight size={16} />
            </button>
            <button onClick={handleReload} className={`p-1.5 rounded hover:bg-black/10 transition-colors ${isLoading ? 'animate-spin' : ''}`}>
              <RotateCw size={16} />
            </button>
            <button className="p-1.5 rounded hover:bg-black/10 transition-colors ml-1">
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
            <button className="p-1.5 rounded hover:bg-black/10 transition-colors">
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
          <div className="w-full h-full overflow-auto text-slate-900 absolute inset-0 bg-slate-50">
            <header className="fixed top-0 w-full bg-white/85 backdrop-blur-md z-10 border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm">
              <div className="font-bold text-lg sm:text-xl tracking-tighter">Awanish<span className="text-[#53d8fb]">.dev</span></div>
              <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                <a href="#about" className="hover:text-black">About</a>
                <a href="#projects" className="hover:text-black">Projects</a>
                <a href="#skills" className="hover:text-black">Skills</a>
                <a href="#contact" className="hover:text-black">Contact</a>
              </nav>
            </header>
            
            <main className="pt-28 pb-20 px-6 sm:px-12 md:px-24 max-w-5xl mx-auto space-y-24">
              <section id="about" className="min-h-[60vh] flex flex-col justify-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-5">
                  Building{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#53d8fb] to-[#a371f7]">
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
            </main>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 bg-slate-50">
            <Shield size={64} className="mb-4 text-slate-300" />
            <h2 className="text-2xl font-bold text-slate-700 mb-2">Site not found</h2>
            <p className="text-sm max-w-md text-center">DNS address could not be found. Please check your URL and try again.</p>
            <p className="text-xs mt-4 text-slate-400 font-mono">ERR_NAME_NOT_RESOLVED</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Browser;
