import React from 'react';
import { Mail, Linkedin, ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Contact = ({ isDarkMode }) => {
  const { personal, socials } = PORTFOLIO_DATA;
  const bg = isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-white text-slate-800';
  const cardBg = isDarkMode
    ? 'border-white/10 bg-black/10 hover:bg-white/5'
    : 'border-slate-200 bg-white hover:bg-slate-50';
  const titleColor = isDarkMode ? 'text-white/90' : 'text-slate-900';
  const subtitleColor = isDarkMode ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm`}>
      <div className={`px-4 py-3 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2">
          <Mail size={18} className="text-[#E95420]" />
          <span className="font-semibold">Contact</span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-3">
        <a
          href={`mailto:${personal.email}`}
          className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg}`}
        >
          <Mail size={22} className="text-[#E95420]" />
          <div>
            <p className={`font-semibold ${titleColor}`}>Email</p>
            <p className={`text-xs ${subtitleColor}`}>{personal.email}</p>
          </div>
        </a>

        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg}`}
        >
          <FaGithub size={22} className="text-[#E95420]" />
          <div>
            <p className={`font-semibold ${titleColor}`}>GitHub</p>
            <p className={`text-xs ${subtitleColor}`}>github.com/awanishkrai</p>
          </div>
        </a>

        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg}`}
        >
          <Linkedin size={22} className="text-[#E95420]" />
          <div>
            <p className={`font-semibold ${titleColor}`}>LinkedIn</p>
            <p className={`text-xs ${subtitleColor}`}>linkedin.com/in/awanish-k-rai</p>
          </div>
        </a>

        <a
          href={`tel:${personal.phone}`}
          className={`flex items-center gap-4 p-4 rounded-xl border ${cardBg}`}
        >
          <ExternalLink size={22} className="text-[#E95420]" />
          <div>
            <p className={`font-semibold ${titleColor}`}>Phone</p>
            <p className={`text-xs ${subtitleColor}`}>{personal.phone}</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
