import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, RotateCw, Home, Lock, Star, Menu, Monitor, Code, Shield, ExternalLink, Github, Linkedin, Trophy, GraduationCap, Mail, ChevronDown, Sparkles, Zap, Award, ArrowUpRight, FolderGit2, BookOpen, Server, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';
import { motion, useInView as useFramerInView, AnimatePresence } from 'framer-motion';

const HOME_URL = 'https://awanish.dev';

const normalizeUrl = (value) => {
  if (!value) return HOME_URL;
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

// ── Reusable Animated Section Wrapper ──
const Section = ({ children, id, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <section id={id} className={`w-full ${className}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: delay, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
};

// ── Animated counter ──
const AnimatedCounter = ({ end, duration = 1500, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useFramerInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Browser = ({ isDarkMode }) => {
  const personal = PORTFOLIO_DATA?.personal ?? {};
  const socials = PORTFOLIO_DATA?.socials ?? {};
  const education = PORTFOLIO_DATA?.education ?? {};
  const projects = PORTFOLIO_DATA?.projects ?? [];
  const skills = PORTFOLIO_DATA?.skills ?? {};
  const cp = PORTFOLIO_DATA?.competitiveProgramming ?? [];
  const certs = PORTFOLIO_DATA?.certifications ?? [];
  const profileSrc = `${import.meta.env.BASE_URL}profile.png`;

  const [url, setUrl] = useState(HOME_URL);
  const [inputUrl, setInputUrl] = useState(HOME_URL);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([HOME_URL]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const contentRef = useRef(null);

  const handleNavigate = (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    const next = normalizeUrl(inputUrl);
    if (next === url) { setIsLoading(true); setReloadKey(k => k + 1); setTimeout(() => setIsLoading(false), 400); return; }
    setIsLoading(true);
    setUrl(next);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), next]);
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
    setActiveSection(sectionId);
  };

  const handleContentScroll = useCallback((e) => {
    const sections = ['home', 'about', 'services', 'projects', 'contact'];
    let current = 'home';
    for (const s of sections) {
      const el = e.target.querySelector(`#${s}`);
      if (el && el.offsetTop <= e.target.scrollTop + 200) {
        current = s;
      }
    }
    if (activeSection !== current) setActiveSection(current);
  }, [activeSection]);

  const openApp = (id) => window.dispatchEvent(new CustomEvent('app-request', { detail: id }));

  // ── skill data for bars ──
  const skillBars = [
    { name: "Python / C++", pct: 90 },
    { name: "React / Node.js", pct: 85 },
    { name: "Postgres / MongoDB", pct: 80 },
    { name: "Cloud / DevOps", pct: 75 },
    { name: "System Design", pct: 75 },
  ];

  const browserIsDark = isDarkMode;

  return (
    <div className={`flex flex-col w-full h-full ${browserIsDark ? 'bg-[#1e1e1e] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>

      {/* ── Browser Chrome ── */}
      <div className={`flex flex-col border-b z-20 ${browserIsDark ? 'bg-[#252526] border-black/40' : 'bg-[#f3f4f6] border-[#e5e7eb]'}`}>
        <div className="flex h-9 items-end px-2 gap-1 overflow-hidden pt-1">
          <div className={`flex items-center gap-2 max-w-[260px] w-full h-8 px-3 rounded-t-lg text-xs border-t border-x ${browserIsDark ? 'bg-[#1e1e1e] border-white/5 text-slate-200' : 'bg-white border-[#e5e7eb] border-b-white text-slate-800'}`}>
            <Star size={14} className="text-[#000]" style={{ color: browserIsDark ? '#e2e8f0' : '#000' }} />
            <span className="truncate font-medium">{personal.name || 'Awanish'} - Portfolio</span>
          </div>
          <div className={`w-8 h-8 flex items-center justify-center rounded-t-lg cursor-pointer transition-colors ${browserIsDark ? 'hover:bg-white/10 text-white' : 'hover:bg-slate-200 text-slate-600'}`}>
            <span className="text-lg leading-none mb-1">+</span>
          </div>
        </div>
        <div className={`flex items-center gap-2 p-2 h-12 ${browserIsDark ? 'bg-[#333333]' : 'bg-white'}`}>
          <div className="flex items-center gap-1">
            <button onClick={handleBack} className={`p-1.5 rounded transition-colors disabled:opacity-30 ${browserIsDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`} disabled={historyIndex === 0}><ArrowLeft size={16} /></button>
            <button onClick={handleForward} className={`p-1.5 rounded transition-colors disabled:opacity-30 ${browserIsDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`} disabled={historyIndex >= history.length - 1}><ArrowRight size={16} /></button>
            <button onClick={handleReload} className={`p-1.5 rounded transition-colors ${browserIsDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'} ${isLoading ? 'animate-spin' : ''}`}><RotateCw size={16} /></button>
            <button onClick={handleHome} className={`p-1.5 rounded transition-colors ml-1 ${browserIsDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}><Home size={16} /></button>
          </div>
          <form onSubmit={handleNavigate} className="flex-1">
            <div className={`flex items-center gap-2 w-full h-8 px-3 rounded-md border focus-within:ring-2 focus-within:ring-[#000] focus-within:border-transparent transition-all ${browserIsDark ? 'bg-[#1e1e1e] border-[#444] text-slate-200 focus-within:ring-white' : 'bg-slate-100 border-[#e5e7eb] text-slate-800'}`}>
              <Lock size={12} className={url.startsWith('https') ? 'text-green-600' : 'text-slate-400'} />
              <input type="text" value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} className="flex-1 bg-transparent outline-none text-sm font-medium" />
            </div>
          </form>
          <div className="flex items-center gap-1">
            <img src="/profile.png" alt="Profile" className="w-6 h-6 rounded-full mx-1 object-cover border border-slate-200" onError={(e) => { e.target.style.display = 'none'; }} />
            <button className={`p-1.5 rounded transition-colors ${browserIsDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'}`}><Menu size={18} /></button>
          </div>
        </div>
      </div>

      {/* ── Browser Viewport ── */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-[#000] animate-spin" />
          </div>
        )}

        {url.includes('awanish.dev') ? (
          <div ref={contentRef} className="w-full h-full overflow-auto absolute inset-0 scroll-smooth bg-white text-slate-900" onScroll={handleContentScroll}>

            {/* ── Sticky Web Navbar ── */}
            <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm w-full transition-all">
              <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="font-black text-xl tracking-tighter">
                  awanish<span className="text-slate-400">.dev</span>
                </div>
                <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-600">
                  {['home', 'about', 'services', 'projects'].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => scrollToSection(sec)}
                      className={`capitalize transition-colors hover:text-black ${activeSection === sec ? 'text-black font-semibold' : ''}`}
                    >
                      {sec}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="ml-4 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors shadow-md"
                  >
                    Contact Me
                  </button>
                </div>
              </div>
            </nav>

            {/* ═══════════════════ HERO ═══════════════════ */}
            <Section id="home" className="pt-24 pb-32 bg-[#fafafa] border-b border-slate-200">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-200/50 border border-slate-300 text-slate-700 text-xs font-semibold mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Available for work
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black tracking-tighter mb-6 leading-[1.05]">
                    Engineering <br />
                    <span className="text-slate-400">Digital</span> <br />
                    Excellence.
                  </h1>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-md">
                    I'm {personal.name?.split(' ')[0] || 'Awanish'}, a backend-focused full-stack developer turning complex problems into elegant, scalable solutions.
                  </p>
                  <div className="flex gap-4 items-center">
                    <button onClick={() => scrollToSection('projects')} className="px-7 py-3.5 bg-black text-white rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2">
                      View Work <ArrowUpRight size={18} />
                    </button>
                    <button onClick={() => window.open(socials.github || '#', '_blank')} className="px-7 py-3.5 bg-white text-black border border-slate-300 rounded-lg font-semibold hover:border-black transition-all shadow-sm flex items-center gap-2">
                      <Github size={18} /> GitHub
                    </button>
                  </div>
                </div>
                <div className="relative flex justify-center md:justify-end">
                  <div className="w-full max-w-md aspect-square bg-slate-100 rounded-3xl border border-slate-200 overflow-hidden shadow-2xl relative">
                    <img src={profileSrc} alt="Profile" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" onError={(e) => { e.target.style.display = 'none'; }} />
                    <div className="absolute bottom-6 left-6 right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</div>
                        <div className="font-semibold text-slate-900">Competitive Programmer | Aspiring Software Engineer</div>
                      </div>
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                        <Code size={18} className="text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* ═══════════════════ METRICS ═══════════════════ */}
            <section className="py-12 bg-black text-white border-b border-slate-800">
              <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-800">
                {[
                  { label: "Completed Projects", value: projects.length || 3, suffix: "+" },
                  { label: "DSA Problems Solved", value: 500, suffix: "+" },
                  { label: "Max CP Rating", value: 1600, suffix: "+" },
                  { label: "Certifications", value: certs.length || 4, suffix: "" },
                ].map((stat, i) => (
                  <div key={i} className="text-center px-4">
                    <div className="text-4xl md:text-5xl font-black mb-2 tracking-tighter">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* ═══════════════════ ABOUT & SKILLS ═══════════════════ */}
            <Section id="about" className="py-32 bg-white">
              <div className="grid md:grid-cols-[1fr_400px] gap-16">
                <div>
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">About the Developer</h2>
                  <h3 className="text-4xl font-black text-black tracking-tight mb-8 leading-tight">
                    Bridging the gap between robust computer science theory and modern web architecture.
                  </h3>
                  <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-normal">
                    <p>
                      Currently pursuing my {personal.title || 'B.Tech CSE'}, I specialize in building efficient systems from the ground up. My foundation in competitive programming translates to writing highly optimized, scalable application logic.
                    </p>
                    <p>
                      Whether it's designing RESTful architectures, managing state in complex React applications, or optimizing database queries, I approach every engineering challenge with a performance-first mindset.
                    </p>
                  </div>
                  <div className="mt-10 flex flex-wrap gap-2">
                    {Object.values(skills).flat().map((skill, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:border-black transition-colors cursor-crosshair">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                  <h3 className="text-xl font-bold text-black mb-8 flex items-center gap-2">
                    <Zap size={20} /> Core Proficiencies
                  </h3>
                  <div className="space-y-6">
                    {skillBars.map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-2 font-bold text-slate-700">
                          <span>{s.name}</span>
                          <span className="text-slate-400">{s.pct}%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.pct}%` }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="h-full bg-black rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            {/* ═══════════════════ SERVICES / FOCUS ═══════════════════ */}
            <Section id="services" className="py-24 bg-[#fafafa] border-y border-slate-200">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Areas of Expertise</h2>
                <h3 className="text-4xl font-black text-black tracking-tight">Technical disciplines I specialize in delivering.</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Server, title: "Backend Architecture", desc: "Designing robust, scalable APIs and microservices using Node.js, Django, and modern DBs." },
                  { icon: Code, title: "Frontend Engineering", desc: "Building responsive, highly interactive web applications using React and TailwindCSS." },
                  { icon: Terminal, title: "Systems & DevOps", desc: "Deploying and maintaining applications with Docker, Linux administration, and CI/CD pipelines." }
                ].map((s, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-xl hover:border-slate-300 transition-all group">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6 border border-slate-200 group-hover:bg-black group-hover:text-white transition-colors">
                      <s.icon size={24} />
                    </div>
                    <h4 className="text-xl font-bold text-black mb-3">{s.title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{s.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ═══════════════════ PROJECTS ═══════════════════ */}
            <Section id="projects" className="py-32 bg-white">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Selected Work</h2>
                  <h3 className="text-4xl font-black text-black tracking-tight">Featured Case Studies.</h3>
                </div>
                <button onClick={() => window.open(socials.github || '#', '_blank')} className="font-semibold text-black hover:text-slate-500 transition-colors flex items-center gap-1">
                  View full archive <ArrowRight size={16} />
                </button>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {projects.map((project, i) => (
                  <div key={i} className="group bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-slate-400 transition-all duration-300 flex flex-col">
                    <div className="p-8 lg:p-10 flex-1">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center shadow-sm">
                          <FolderGit2 size={24} className="text-black" />
                        </div>
                        <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-black hover:border-black transition-all">
                          <ArrowUpRight size={18} />
                        </a>
                      </div>
                      <h4 className="text-2xl font-black text-black mb-4 group-hover:text-slate-700 transition-colors">{project.name}</h4>
                      <p className="text-slate-600 text-lg leading-relaxed mb-8">{project.description}</p>

                      {(project.highlights || []).length > 0 && (
                        <ul className="space-y-3 mb-8">
                          {project.highlights.slice(0, 3).map((h, j) => (
                            <li key={j} className="flex items-start gap-3 text-slate-700 font-medium">
                              <span className="text-slate-400 mt-1">―</span> {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="bg-white px-8 py-5 border-t border-slate-200 flex flex-wrap gap-2">
                      {(project.technologies || '').split(',').map((tech, j) => (
                        <span key={j} className="px-3 py-1 bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest rounded-md">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ═══════════════════ COMPETITIVE & ACADEMICS ═══════════════════ */}
            <Section id="academics" className="py-24 bg-black text-white">
              <div className="grid md:grid-cols-2 gap-16">
                {/* CP */}
                <div>
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
                    <Trophy size={24} className="text-slate-400" /> Competitive Programming
                  </h3>
                  <div className="space-y-4">
                    {cp.map((platform, i) => (
                      <a key={i} href={platform.url || '#'} target="_blank" rel="noopener noreferrer" className="block p-6 rounded-2xl bg-[#111] border border-slate-800 hover:border-white/40 hover:bg-[#1a1a1a] transition-all group">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-bold text-lg">{platform.platform}</h4>
                          <ArrowUpRight size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <div className="text-3xl font-black text-white trackign-tighter">{platform.rating}</div>
                        <div className="text-sm font-medium text-slate-400 mt-1">{platform.label}</div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-2xl font-black mb-8 flex items-center gap-3 border-b border-slate-800 pb-4">
                    <BookOpen size={24} className="text-slate-400" /> Academics & Certs
                  </h3>
                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 text-black">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded">Current</span>
                      </div>
                      <h4 className="font-black text-xl mb-1">{education?.current?.program || 'B.Tech Computer Science'}</h4>
                      <p className="text-slate-600 font-medium mb-4">{education?.current?.institution || '—'}</p>
                      <div className="flex justify-between items-center text-sm font-bold text-slate-900 border-t border-slate-200 pt-4">
                        <span>CGPA: {education?.current?.cgpa}</span>
                        <span className="text-slate-500">Class of {education?.current?.expectedGraduation}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {certs.slice(0, 2).map((cert, i) => (
                        <a key={i} href={cert.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-[#111] border border-slate-800 hover:bg-[#1a1a1a] transition-all">
                          <Award size={20} className="text-slate-400 mb-3" />
                          <h5 className="font-bold text-sm leading-tight text-white mb-2">{cert.name}</h5>
                          <span className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">View Credential <ArrowRight size={12} /></span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* ═══════════════════ CONTACT / FOOTER ═══════════════════ */}
            <Section id="contact" className="py-32 bg-[#fafafa]">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <Mail size={28} />
                </div>
                <h2 className="text-4xl sm:text-6xl font-black text-black tracking-tighter mb-6 leading-tight">
                  Ready to start a project?
                </h2>
                <p className="text-xl text-slate-600 mb-10 font-medium">
                  Reach out today to discuss how we can work together.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href={`mailto:${personal.email || 'awanish420@gmail.com'}`} className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1">
                    Send an Email
                  </a>
                  <a href={socials.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold border border-slate-300 rounded-xl hover:border-black transition-all hover:-translate-y-1 shadow-sm hover:shadow-md">
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </Section>

            {/* Footer */}
            <footer className="py-8 bg-white border-t border-slate-200">
              <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="font-black text-xl tracking-tighter">
                  awanish<span className="text-slate-400">.dev</span>
                </div>
                <p className="text-sm font-medium text-slate-500">
                  © {new Date().getFullYear()} {personal.name || 'Awanish Kumar Rai'}. All rights reserved.
                </p>
                <div className="flex gap-4 text-slate-400">
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Github size={20} /></a>
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors"><Linkedin size={20} /></a>
                </div>
              </div>
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
