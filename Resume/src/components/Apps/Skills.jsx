import React, { useState } from 'react';
import { Layers, Code2, Layout, Server, Database, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const getCategoryConfig = (category) => {
  const configs = {
    'Languages': {
      icon: Code2,
      gradient: 'from-blue-500 to-cyan-400',
      bgGlow: 'bg-blue-500/10 hover:bg-blue-500/20',
      borderHov: 'hover:border-blue-500/50',
      shadowHov: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
      span: 'md:col-span-8',
      textColor: 'text-blue-500'
    },
    'Frontend': {
      icon: Layout,
      gradient: 'from-[#E95420] to-orange-400',
      bgGlow: 'bg-[#E95420]/10 hover:bg-[#E95420]/20',
      borderHov: 'hover:border-[#E95420]/50',
      shadowHov: 'hover:shadow-[0_0_30px_rgba(233,84,32,0.15)]',
      span: 'md:col-span-4',
      textColor: 'text-[#E95420]'
    },
    'Backend': {
      icon: Server,
      gradient: 'from-emerald-500 to-teal-400',
      bgGlow: 'bg-emerald-500/10 hover:bg-emerald-500/20',
      borderHov: 'hover:border-emerald-500/50',
      shadowHov: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
      span: 'md:col-span-4',
      textColor: 'text-emerald-500'
    },
    'Databases': {
      icon: Database,
      gradient: 'from-purple-500 to-fuchsia-400',
      bgGlow: 'bg-purple-500/10 hover:bg-purple-500/20',
      borderHov: 'hover:border-purple-500/50',
      shadowHov: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
      span: 'md:col-span-4',
      textColor: 'text-purple-500'
    },

  };
  return configs[category] || configs['Languages'];
};

const Skills = ({ isDarkMode }) => {
  const { skills } = PORTFOLIO_DATA;
  const bg = isDarkMode ? 'bg-[#0a0a0f] text-slate-200' : 'bg-slate-50 text-slate-800';
  const cardBgBase = isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-slate-900';
  const skillBadgeBg = isDarkMode ? 'bg-black/40 border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-700';
  const skillBadgeHov = isDarkMode ? 'shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border-white/20' : 'shadow-sm border-slate-300';

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm overflow-hidden`}>
      <div className={`px-5 py-4 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${isDarkMode ? 'border-white/10 bg-black/40' : 'border-slate-200 bg-white/80'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-[#E95420] to-[#a371f7] rounded-lg shadow-lg shadow-[#E95420]/20">
            <Layers size={18} className="text-white" />
          </div>
          <div>
            <h2 className={`font-bold text-lg leading-tight ${textPrimary}`}>Technical Skills</h2>
            <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>~/profile/core-competencies</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto">
          {Object.entries(skills).map(([category, items]) => {
            const config = getCategoryConfig(category);
            const Icon = config.icon;

            return (
              <div
                key={category}
                className={`col-span-1 border p-6 rounded-3xl flex flex-col relative overflow-hidden transition-all duration-500 group cursor-default ${config.span} ${cardBgBase} ${config.borderHov} ${config.shadowHov}`}
              >
                {/* Background ambient glow */}
                <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-[60px] -mr-20 -mt-20 transition-all duration-700 ${config.bgGlow}`} />

                <div className="z-10 mb-6 flex items-center gap-3">
                  <div className={`p-2 rounded-xl backdrop-blur-md border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <Icon size={20} className={config.textColor} />
                  </div>
                  <h3 className={`text-xl font-black tracking-tight ${textPrimary}`}>{category}</h3>
                </div>

                <div className="z-10 flex flex-wrap gap-2.5 mt-auto">
                  {items.map((skill, idx) => (
                    <div
                      key={idx}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${skillBadgeBg} hover:${skillBadgeHov}`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Skills;
