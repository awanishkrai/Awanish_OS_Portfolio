import React from 'react';
import { Mail, Phone, Github, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Contact = ({ isDarkMode }) => {
  const { personal, socials } = PORTFOLIO_DATA;

  return (
    <div className={`p-8 space-y-6 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
      <div>
        <h2 className="text-3xl font-bold text-orange-500 mb-2">Get in Touch</h2>
        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          Reach out and let's connect
        </p>
      </div>

      <div className="space-y-3">
        <a
          href={`mailto:${personal.email}`}
          className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
            isDarkMode
              ? 'bg-slate-800 hover:bg-orange-600'
              : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Mail size={24} className="text-orange-500" />
          <div>
            <p className="font-semibold">Email</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
              {personal.email}
            </p>
          </div>
        </a>

        <a
          href={`tel:${personal.phone}`}
          className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
            isDarkMode
              ? 'bg-slate-800 hover:bg-orange-600'
              : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Phone size={24} className="text-orange-500" />
          <div>
            <p className="font-semibold">Phone</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
              {personal.phone}
            </p>
          </div>
        </a>

        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
            isDarkMode
              ? 'bg-slate-800 hover:bg-orange-600'
              : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <Github size={24} className="text-orange-500" />
          <div>
            <p className="font-semibold">GitHub</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
              github.com/awanishkrai
            </p>
          </div>
        </a>

        <a
          href={socials.codeforces}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-105 ${
            isDarkMode
              ? 'bg-slate-800 hover:bg-orange-600'
              : 'bg-orange-50 hover:bg-orange-100'
          }`}
        >
          <ExternalLink size={24} className="text-orange-500" />
          <div>
            <p className="font-semibold">Codeforces</p>
            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>
              Awanish_Rai
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
