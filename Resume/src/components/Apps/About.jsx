import React from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const About = ({ isDarkMode }) => {
  const { personal, socials } = PORTFOLIO_DATA;

  return (
    <div
      className={`min-h-screen w-full p-20 space-y-12 transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      {/* === Name + Title === */}
      <div className="space-y-3">
        <h1 className="text-5xl font-bold text-red-500">{personal.name}</h1>
        <h2 className="text-2xl font-semibold text-orange-400">
          {personal.title}
        </h2>
        <p
          className={`max-w-3xl text-base ${
            isDarkMode ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {personal.subtitle}
        </p>
      </div>

      {/* === Contact Section === */}
      <div
        className={`p-8 rounded-2xl border shadow-md ${
          isDarkMode
            ? 'bg-slate-800 border-slate-700'
            : 'bg-orange-50 border-orange-200'
        }`}
      >
        <h3 className="font-semibold mb-4 text-lg text-orange-500">
          Contact Information
        </h3>
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-3">
            <Mail size={18} className="text-orange-500" />
            <a
              href={`mailto:${personal.email}`}
              className="hover:text-orange-500 transition"
            >
              {personal.email}
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Phone size={18} className="text-orange-500" />
            <a
              href={`tel:${personal.phone}`}
              className="hover:text-orange-500 transition"
            >
              {personal.phone}
            </a>
          </p>
        </div>
      </div>

      {/* === Social Links === */}
      <div>
        <h3 className="font-semibold mb-4 text-lg text-orange-500">
          Connect With Me
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg transition-all hover:scale-105"
          >
            <Github size={20} />
            <span className="font-medium">GitHub</span>
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all hover:scale-105"
          >
            <Linkedin size={20} />
            <span className="font-medium">LinkedIn</span>
          </a>
          <a
            href={socials.codeforces}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg transition-all hover:scale-105"
          >
            <ExternalLink size={20} />
            <span className="font-medium">Codeforces</span>
          </a>
          <a
            href={socials.codechef}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-700 text-white hover:shadow-lg transition-all hover:scale-105"
          >
            <ExternalLink size={20} />
            <span className="font-medium">CodeChef</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
