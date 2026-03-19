import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, Star, Menu, Monitor, Code, Shield, ExternalLink, Github, Trophy, GraduationCap, Mail, ChevronDown, Sparkles, Zap, Award } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const HOME_URL = 'https://awanish.dev';

const normalizeUrl = (value) => {
  if (!value) return HOME_URL;
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

// ── Scroll-triggered animation hook ──
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, isVisible];
};

// ── Animated counter ──
const AnimatedCounter = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useInView();
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
};

// ── Animated Section Wrapper ──
const FadeInSection = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const Browser = ({ isDarkMode }) => {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const socials = PORTFOLIO_DATA?.socials ?? {};
  const education = PORTFOLIO_DATA?.education ?? {};
  const projects = PORTFOLIO_DATA?.projects ?? [];
  const skills = PORTFOLIO_DATA?.skills ?? {};
  const cp = PORTFOLIO_DATA?.competitiveProgramming ?? [];
  const certs = PORTFOLIO_DATA?.certifications ?? [];

  const [url, setUrl] = useState(HOME_URL);
  const [inputUrl, setInputUrl] = useState(HOME_URL);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([HOME_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const contentRef = useRef(null);

  const handleNavigate = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const next = normalizeUrl(inputUrl);
    if (next === url) { setIsLoading(true); setReloadKey(k => k + 1); setTimeout(() => setIsLoading(false), 400); return; }
    setIsLoading(true);
    setUrl(next);
    setHistory(prev => { const base = prev.slice(0, historyIndex + 1); return [...base, next]; });
    setHistoryIndex(idx => idx + 1);
  };

  const handleReload = () => { setIsLoading(true); setReloadKey(k => k + 1); setTimeout(() => setIsLoading(false), 400); };
  const handleBack = () => { if (historyIndex === 0) return; const i = historyIndex - 1; setHistoryIndex(i); setUrl(history[i]); setInputUrl(history[i]); setIsLoading(true); setTimeout(() => setIsLoading(false), 300); };
  const handleForward = () => { if (historyIndex >= history.length - 1) return; const i = historyIndex + 1; setHistoryIndex(i); setUrl(history[i]); setInputUrl(history[i]); setIsLoading(true); setTimeout(() => setIsLoading(false), 300); };
  const handleHome = () => { if (url === HOME_URL) return; setInputUrl(HOME_URL); setIsLoading(true); setUrl(HOME_URL); setHistory(prev => [...prev.slice(0, historyIndex + 1), HOME_URL]); setHistoryIndex(idx => idx + 1); setTimeout(() => setIsLoading(false), 300); };

  useEffect(() => { if (url.includes('awanish.dev')) setIsLoading(false); }, [url]);

  const scrollToSection = (sectionId) => {
    const el = contentRef.current?.querySelector(`#${sectionId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleContentScroll = useCallback((e) => { setScrollY(e.target.scrollTop); }, []);

  const openApp = (id) => window.dispatchEvent(new CustomEvent('app-request', { detail: id }));

  // ── skill data for bars ──
  const skillBars = [
    { name: "Python / C++", pct: 90, color: "#E95420" },
    { name: "React / JavaScript", pct: 85, color: "#77216f" },
    { name: "Django / Flask", pct: 80, color: "#3468d5" },
    { name: "PostgreSQL / MongoDB", pct: 75, color: "#27AE60" },
    { name: "Git / DevOps", pct: 70, color: "#f0a30a" },
  ];

  return (
    <div className={`flex flex-col w-full h-full ${isDarkMode ? 'bg-[#1e1e1e] text-slate-200' : 'bg-slate-100 text-slate-800'}`}>

      {/* ── Browser Chrome ── */}
      <div className={`flex flex-col border-b ${isDarkMode ? 'bg-[#252526] border-black/40' : 'bg-slate-200 border-slate-300'}`}>
        <div className="flex h-9 items-end px-2 gap-1 overflow-hidden">
          <div className={`flex items-center gap-2 max-w-[260px] w-full h-8 px-3 rounded-t-lg text-xs border-t border-x ${isDarkMode ? 'bg-[#1e1e1e] border-white/5 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
            <Star size={14} className="text-[#E95420]" />
            <span className="truncate">{personal.name || 'Awanish'} | Portfolio</span>
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-t-lg hover:bg-white/10 cursor-pointer transition-colors">
            <span className="text-lg leading-none mb-1">+</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 h-12 ${isDarkMode ? 'bg-[#333333]' : 'bg-white'}`}>
          <div className="flex items-center gap-1">
            <button onClick={handleBack} className={`p-1.5 rounded transition-colors disabled:opacity-30 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`} disabled={historyIndex === 0}><ArrowLeft size={16} /></button>
            <button onClick={handleForward} className={`p-1.5 rounded transition-colors disabled:opacity-30 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`} disabled={historyIndex >= history.length - 1}><ArrowRight size={16} /></button>
            <button onClick={handleReload} className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'} ${isLoading ? 'animate-spin' : ''}`}><RotateCw size={16} /></button>
            <button onClick={handleHome} className={`p-1.5 rounded transition-colors ml-1 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Home size={16} /></button>
          </div>
          <form onSubmit={handleNavigate} className="flex-1">
            <div className={`flex items-center gap-2 w-full h-8 px-3 rounded-full border focus-within:ring-2 focus-within:ring-[#E95420]/50 transition-all ${isDarkMode ? 'bg-[#1e1e1e] border-[#444] text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'}`}>
              <Lock size={12} className={url.startsWith('https') ? 'text-green-500' : 'text-slate-400'} />
              <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="flex-1 bg-transparent outline-none text-sm" />
            </div>
          </form>
          <div className="flex items-center gap-1">
            <img src="/profile.png" alt="Profile" className="w-6 h-6 rounded-full mx-1 object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
            <button className={`p-1.5 rounded transition-colors ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}><Menu size={18} /></button>
          </div>
        </div>
      </div>

      {/* ── Browser Viewport ── */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-[#E95420] animate-spin" />
          </div>
        )}

        {url.includes('awanish.dev') ? (
          <div ref={contentRef} className="w-full h-full overflow-auto absolute inset-0 scroll-smooth" onScroll={handleContentScroll}>

            {/* ═══════════════════ HERO ═══════════════════ */}
            <section id="hero" className="relative min-h-[100%] flex items-center justify-center overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
              {/* Animated gradient blobs */}
              <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
                style={{ background: '#E95420', top: '10%', left: '10%', animation: 'float 8s ease-in-out infinite' }} />
              <div className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
                style={{ background: '#77216f', bottom: '10%', right: '15%', animation: 'float 10s ease-in-out infinite reverse' }} />
              <div className="absolute w-[300px] h-[300px] rounded-full opacity-10 blur-[80px]"
                style={{ background: '#3468d5', top: '50%', left: '50%', animation: 'float 12s ease-in-out infinite' }} />

              <div className="relative z-10 text-center px-6 max-w-4xl"
                style={{ transform: `translateY(${scrollY * 0.3}px)`, opacity: Math.max(0, 1 - scrollY / 400) }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/70 text-xs mb-8 backdrop-blur-sm">
                  <Sparkles size={12} /> Available for opportunities
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-[1.1]">
                  Hi, I'm{' '}
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #E95420, #ff7843, #f0a30a)' }}>
                    {personal.name?.split(' ')[0] || 'Awanish'}
                  </span>
                  <br />
                  <span className="text-2xl sm:text-3xl md:text-4xl font-medium text-white/60">
                    {personal.subtitle || 'Software Engineer & Competitive Programmer'}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
                  I build performant systems and polished interfaces that solve real problems.
                  Based in {personal.location || 'India'} — let's create something amazing together.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <button onClick={() => openApp('projects')}
                    className="group px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-[#E95420]/30 transition-all hover:shadow-xl hover:shadow-[#E95420]/40 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #E95420, #ff7843)' }}>
                    View Projects <ArrowRight size={16} className="inline ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => window.open(socials.github || '#', '_blank')}
                    className="px-7 py-3.5 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm">
                    GitHub
                  </button>
                  <button onClick={() => openApp('resume')}
                    className="px-7 py-3.5 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm">
                    Resume
                  </button>
                </div>
                <div className="mt-16 animate-bounce text-white/30">
                  <ChevronDown size={28} className="mx-auto" />
                </div>
              </div>

              {/* CSS keyframes */}
              <style>{`@keyframes float { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-30px); } }`}</style>
            </section>

            {/* ═══════════════════ STATS BAR ═══════════════════ */}
            <section className="py-12 px-6" style={{ background: 'linear-gradient(90deg, #E95420, #77216f)' }}>
              <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
                {[
                  { label: "Projects", value: projects.length || 3, suffix: "+" },
                  { label: "Problems Solved", value: 500, suffix: "+" },
                  { label: "Technologies", value: Object.values(skills).flat().length || 15, suffix: "" },
                  { label: "Certifications", value: certs.length || 4, suffix: "" },
                ].map((stat, i) => (
                  <FadeInSection key={i} delay={i * 100}>
                    <div className="text-3xl sm:text-4xl font-black">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-white/70 mt-1">{stat.label}</div>
                  </FadeInSection>
                ))}
              </div>
            </section>

            {/* ═══════════════════ ABOUT ═══════════════════ */}
            <section id="about" className="py-24 px-6 bg-white scroll-mt-12">
              <div className="max-w-5xl mx-auto">
                <FadeInSection>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#E95420] font-bold mb-3">About Me</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight">Passion meets precision.</h2>
                </FadeInSection>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <FadeInSection delay={100}>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      I'm a <strong className="text-slate-900">{personal.title || 'B.Tech CSE student'}</strong> who thrives on building software that's both powerful and beautiful. From low-level C++ to modern React interfaces, I enjoy working across the entire stack.
                    </p>
                    <p className="text-slate-600 leading-relaxed mb-6">
                      My competitive programming background (LeetCode, Codeforces, CodeChef) gives me a unique edge in writing optimal, battle-tested code. I believe great software is built with empathy, precision, and a relentless focus on user experience.
                    </p>
                    <div className="flex gap-3 flex-wrap">
                      <button onClick={() => openApp('contact')} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#E95420] hover:bg-[#d94a1a] transition-colors shadow-md">
                        Get in Touch
                      </button>
                      <button onClick={() => openApp('skills')} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-700 border border-slate-200 hover:border-slate-400 transition-colors">
                        View All Skills
                      </button>
                    </div>
                  </FadeInSection>
                  <FadeInSection delay={200}>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: <Monitor size={22} />, title: "Systems", desc: "C, C++, Linux", bg: "bg-orange-50 text-[#E95420]" },
                        { icon: <Code size={22} />, title: "Frontend", desc: "React, Tailwind", bg: "bg-purple-50 text-[#77216f]" },
                        { icon: <Shield size={22} />, title: "Backend", desc: "Django, Node.js", bg: "bg-blue-50 text-[#3468d5]" },
                        { icon: <Zap size={22} />, title: "Databases", desc: "PostgreSQL, Mongo", bg: "bg-green-50 text-[#27AE60]" },
                        { icon: <Trophy size={22} />, title: "CP Rating", desc: "1600+ LeetCode", bg: "bg-yellow-50 text-[#f0a30a]" },
                        { icon: <Award size={22} />, title: "Certified", desc: `${certs.length} certs`, bg: "bg-red-50 text-red-500" },
                      ].map((card, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg}`}>{card.icon}</div>
                          <div className="font-bold text-sm text-slate-900">{card.title}</div>
                          <div className="text-xs text-slate-500">{card.desc}</div>
                        </div>
                      ))}
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </section>

            {/* ═══════════════════ SKILLS ═══════════════════ */}
            <section id="skills" className="py-24 px-6 scroll-mt-12" style={{ background: '#fafafa' }}>
              <div className="max-w-5xl mx-auto">
                <FadeInSection>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#77216f] font-bold mb-3">Skills</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12 tracking-tight">Tech I work with daily.</h2>
                </FadeInSection>
                <div className="grid md:grid-cols-2 gap-12">
                  <FadeInSection delay={100}>
                    <div className="space-y-5">
                      {skillBars.map((s, i) => {
                        const [ref, isVis] = useInView();
                        return (
                          <div key={i} ref={ref}>
                            <div className="flex justify-between text-sm mb-1.5">
                              <span className="font-semibold text-slate-800">{s.name}</span>
                              <span className="text-slate-500">{s.pct}%</span>
                            </div>
                            <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ width: isVis ? `${s.pct}%` : '0%', background: s.color, transitionDelay: `${i * 100}ms` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </FadeInSection>
                  <FadeInSection delay={200}>
                    <div className="flex flex-wrap gap-2">
                      {Object.values(skills).flat().map((skill, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white text-slate-700 border-slate-200 hover:border-[#E95420] hover:text-[#E95420] transition-colors cursor-default"
                          style={{ animationDelay: `${i * 50}ms` }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </FadeInSection>
                </div>
              </div>
            </section>

            {/* ═══════════════════ PROJECTS ═══════════════════ */}
            <section id="projects" className="py-24 px-6 bg-white scroll-mt-12">
              <div className="max-w-5xl mx-auto">
                <FadeInSection>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#3468d5] font-bold mb-3">Projects</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12 tracking-tight">Things I've built.</h2>
                </FadeInSection>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, i) => (
                    <FadeInSection key={i} delay={i * 120}>
                      <div className="group relative rounded-2xl border border-slate-100 bg-white p-6 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col overflow-hidden">
                        {/* Gradient top accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                          style={{ background: `linear-gradient(90deg, ${['#E95420','#77216f','#3468d5','#27AE60','#f0a30a'][i % 5]}, ${['#ff7843','#a855f7','#60a5fa','#34d399','#fbbf24'][i % 5]})` }} />
                        <div className="flex items-start justify-between mb-3 mt-1">
                          <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#E95420] transition-colors">{project.name}</h3>
                          <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors mt-1">
                            <ExternalLink size={16} />
                          </a>
                        </div>
                        <p className="text-sm text-slate-600 mb-4 flex-1">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {(project.technologies || '').split(',').map((tech, j) => (
                            <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                        {(project.highlights || []).length > 0 && (
                          <ul className="mt-4 space-y-1 text-xs text-slate-500">
                            {project.highlights.map((h, j) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className="text-[#E95420] mt-0.5">▸</span> {h}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════ COMPETITIVE PROGRAMMING ═══════════════════ */}
            <section className="py-24 px-6 scroll-mt-12" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
              <div className="max-w-5xl mx-auto">
                <FadeInSection>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#f0a30a] font-bold mb-3">Competitive Programming</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-white mb-12 tracking-tight">Sharpening the algorithmic edge.</h2>
                </FadeInSection>
                <div className="grid sm:grid-cols-3 gap-6">
                  {cp.map((platform, i) => (
                    <FadeInSection key={i} delay={i * 150}>
                      <a href={platform.url || '#'} target="_blank" rel="noopener noreferrer"
                        className="block p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-bold text-lg text-white">{platform.platform}</h3>
                          <ExternalLink size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
                        </div>
                        <div className="text-4xl font-black mb-1" style={{ color: platform.color }}>{platform.rating}</div>
                        <div className="text-sm text-white/50">{platform.label}</div>
                        {/* Rating bar */}
                        <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000"
                            style={{ width: `${Math.min((platform.rating / 2000) * 100, 100)}%`, background: platform.color }} />
                        </div>
                      </a>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════ EDUCATION ═══════════════════ */}
            <section id="education" className="py-24 px-6 bg-white scroll-mt-12">
              <div className="max-w-5xl mx-auto">
                <FadeInSection>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#27AE60] font-bold mb-3">Education</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12 tracking-tight">Academic foundation.</h2>
                </FadeInSection>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
                  <div className="space-y-8">
                    {/* Current education */}
                    <FadeInSection delay={100}>
                      <div className="relative pl-16">
                        <div className="absolute left-4 top-1 w-5 h-5 rounded-full border-4 border-[#E95420] bg-white z-10" />
                        <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-2 mb-1">
                            <GraduationCap size={16} className="text-[#E95420]" />
                            <span className="text-xs font-semibold text-[#E95420] uppercase tracking-wider">Current</span>
                          </div>
                          <h3 className="font-bold text-lg text-slate-900">{education?.current?.program || 'B.Tech CSE'}</h3>
                          <p className="text-sm text-slate-600 mb-2">{education?.current?.institution || '—'}</p>
                          <div className="flex gap-4 text-xs text-slate-500">
                            <span>CGPA: <strong className="text-slate-800">{education?.current?.cgpa}</strong></span>
                            <span>Expected: <strong className="text-slate-800">{education?.current?.expectedGraduation}</strong></span>
                          </div>
                          {education?.current?.highlights && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {education.current.highlights.map((h, i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{h}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </FadeInSection>
                    {/* Previous education */}
                    {(education?.previous || []).map((edu, i) => (
                      <FadeInSection key={i} delay={200 + i * 100}>
                        <div className="relative pl-16">
                          <div className="absolute left-4 top-1 w-5 h-5 rounded-full border-4 border-slate-300 bg-white z-10" />
                          <div className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-slate-900">{edu.program || edu.level}</h3>
                            <p className="text-sm text-slate-600">{edu.institution}</p>
                            <div className="text-xs text-slate-500 mt-1">
                              {edu.year} • {edu.score || edu.cgpa || edu.percentage}
                            </div>
                          </div>
                        </div>
                      </FadeInSection>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ═══════════════════ CERTIFICATIONS ═══════════════════ */}
            <section className="py-24 px-6 scroll-mt-12" style={{ background: '#fafafa' }}>
              <div className="max-w-5xl mx-auto">
                <FadeInSection>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#8e44ad] font-bold mb-3">Certifications</div>
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12 tracking-tight">Continuous learning.</h2>
                </FadeInSection>
                <div className="grid sm:grid-cols-2 gap-4">
                  {certs.map((cert, i) => (
                    <FadeInSection key={i} delay={i * 100}>
                      <div className="flex items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `linear-gradient(135deg, ${['#E95420','#77216f','#3468d5','#27AE60'][i % 4]}, ${['#ff7843','#a855f7','#60a5fa','#34d399'][i % 4]})` }}>
                          <Award size={18} className="text-white" />
                        </div>
                        <div className="text-sm font-medium text-slate-800">{cert}</div>
                      </div>
                    </FadeInSection>
                  ))}
                </div>
              </div>
            </section>

            {/* ═══════════════════ CTA / CONTACT ═══════════════════ */}
            <section className="py-28 px-6 text-center" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)' }}>
              <FadeInSection>
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">Let's build something great.</h2>
                  <p className="text-white/50 mb-10 text-lg">
                    I'm currently open to internships, freelance, and full-time opportunities. Let's connect!
                  </p>
                  <div className="flex gap-4 justify-center flex-wrap">
                    <button onClick={() => openApp('contact')}
                      className="group px-8 py-4 rounded-xl font-bold text-white shadow-lg shadow-[#E95420]/30 hover:shadow-xl hover:shadow-[#E95420]/40 hover:scale-105 transition-all"
                      style={{ background: 'linear-gradient(135deg, #E95420, #ff7843)' }}>
                      <Mail size={16} className="inline mr-2" /> Contact Me
                    </button>
                    <button onClick={() => window.open(socials.linkedin || '#', '_blank')}
                      className="px-8 py-4 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all hover:scale-105">
                      LinkedIn
                    </button>
                  </div>
                </div>
              </FadeInSection>
            </section>

            {/* ═══════════════════ FOOTER ═══════════════════ */}
            <footer className="py-6 px-6 bg-[#0a0a0a] text-center">
              <p className="text-xs text-white/30">
                © {new Date().getFullYear()} {personal.name || 'Awanish Kumar Rai'}. Built with React, Framer Motion & ☕
              </p>
            </footer>
          </div>
        ) : (
          <div className="w-full h-full absolute inset-0 bg-slate-50">
            <iframe key={`${reloadKey}-${url}`} src={url} title={url} className="w-full h-full border-0" onLoad={() => setIsLoading(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Browser;
