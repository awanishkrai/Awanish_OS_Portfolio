import React from 'react';
import { Trophy, ExternalLink, Star, Target, Activity } from 'lucide-react';
import { cpStats } from '../../constants/cpData';

const ActivityHeatmap = ({ isDarkMode }) => {
  const dailyCounts = {};
  let maxCount = 0;
  let totalSubmissions = 0;
  
  Object.values(cpStats.submissionCalendars).forEach(cal => {
    Object.entries(cal).forEach(([ts, count]) => {
      const d = new Date(parseInt(ts) * 1000);
      d.setHours(0,0,0,0);
      const key = d.getTime();
      dailyCounts[key] = (dailyCounts[key] || 0) + count;
      totalSubmissions += count;
      if (dailyCounts[key] > maxCount) maxCount = dailyCounts[key];
    });
  });

  const today = new Date();
  today.setHours(0,0,0,0);
  const days = [];
  const DAYS_TO_SHOW = 365;
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - DAYS_TO_SHOW + 1);

  const startDayOfWeek = startDate.getDay(); 
  for(let i=0; i<startDayOfWeek; i++) {
    days.push({ empty: true });
  }

  for (let i = 0; i < DAYS_TO_SHOW; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    const count = dailyCounts[d.getTime()] || 0;
    days.push({ date: d, count });
  }

  const getColor = (count) => {
    if (count === 0) return isDarkMode ? 'bg-white/5' : 'bg-slate-200';
    if (count < 3) return isDarkMode ? 'bg-[#0e4429]' : 'bg-[#9be9a8]';
    if (count < 6) return isDarkMode ? 'bg-[#006d32]' : 'bg-[#40c463]';
    if (count < 10) return isDarkMode ? 'bg-[#26a641]' : 'bg-[#30a14e]';
    return isDarkMode ? 'bg-[#39d353] shadow-[0_0_8px_rgba(57,211,83,0.4)]' : 'bg-[#216e39]';
  };

  return (
    <div className={`col-span-1 md:col-span-12 rounded-3xl border p-6 flex flex-col transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 hover:shadow-lg'}`}>
      <div className="flex items-center gap-2 mb-6">
        <Activity size={18} className="text-[#39d353]" />
        <h3 className={`font-black tracking-wide ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Submission Activity <span className={`text-xs ml-2 font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{totalSubmissions} contributions in the last year</span>
        </h3>
      </div>
      
      <div className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-max pr-4">
          <div className="grid grid-flow-col grid-rows-7 gap-[3px] inline-grid">
            {days.map((day, i) => (
              <div 
                key={i} 
                className={`w-[13px] h-[13px] rounded-sm ${day.empty ? 'bg-transparent' : getColor(day.count)} transition-all duration-300 hover:scale-150 hover:z-10 cursor-crosshair`}
                title={day.empty ? '' : `${day.count} submissions on ${day.date.toDateString()}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-2 mt-2 text-[10px] uppercase tracking-widest font-bold text-slate-500">
        <span>Less</span>
        <div className={`w-[13px] h-[13px] rounded-sm ${isDarkMode ? 'bg-white/5' : 'bg-slate-200'}`} />
        <div className={`w-[13px] h-[13px] rounded-sm ${isDarkMode ? 'bg-[#0e4429]' : 'bg-[#9be9a8]'}`} />
        <div className={`w-[13px] h-[13px] rounded-sm ${isDarkMode ? 'bg-[#006d32]' : 'bg-[#40c463]'}`} />
        <div className={`w-[13px] h-[13px] rounded-sm ${isDarkMode ? 'bg-[#26a641]' : 'bg-[#30a14e]'}`} />
        <div className={`w-[13px] h-[13px] rounded-sm ${isDarkMode ? 'bg-[#39d353]' : 'bg-[#216e39]'}`} />
        <span>More</span>
      </div>
    </div>
  );
};

const Competitive = ({ isDarkMode }) => {
  const bg = isDarkMode ? 'bg-[#0a0a0f] text-slate-200' : 'bg-slate-50 text-slate-800';
  const cardBg = isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-lg';
  const textPrimary = isDarkMode ? 'text-white' : 'text-slate-900';
  const textSecondary = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  const open = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  return (
    <div className={`w-full h-full flex flex-col ${bg} font-ubuntu text-sm overflow-hidden`}>
      <div className={`px-5 py-4 border-b flex items-center justify-between backdrop-blur-md sticky top-0 z-10 ${isDarkMode ? 'border-white/10 bg-black/40' : 'border-slate-200 bg-white/80'}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg shadow-lg shadow-yellow-500/20">
            <Trophy size={18} className="text-white" />
          </div>
          <div>
            <h2 className={`font-bold text-lg leading-tight ${textPrimary}`}>Competitive Programming</h2>
            <span className={textSecondary}>Total Solved: <span className="text-teal-400 font-bold">{cpStats.totalSolved}</span> Problems</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-24 custom-scrollbar">
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 max-w-5xl mx-auto">
          
          {/* LeetCode - Huge Span */}
          <div 
            onClick={() => open('https://leetcode.com/Awanish_Rai')}
            className={`col-span-1 md:col-span-8 rounded-3xl border p-6 flex flex-col md:flex-row gap-6 cursor-pointer group transition-all duration-300 ${cardBg} hover:border-yellow-500/50 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)] relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/10 blur-[50px] rounded-full -mr-20 -mt-20 transition-all duration-500 group-hover:bg-yellow-500/20" />
            <img src={cpStats.leetcode.avatar} alt="LeetCode" className="w-24 h-24 rounded-full border-2 border-yellow-500/50 shadow-xl object-cover z-10" />
            <div className="flex flex-col justify-center flex-1 z-10">
              <div className="flex items-center justify-between">
                <h3 className={`text-2xl font-black tracking-tight ${textPrimary}`}>LeetCode</h3>
                <ExternalLink size={18} className={`${textSecondary} group-hover:text-yellow-500 transition-colors duration-300`} />
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-5xl font-black text-yellow-500 tracking-tighter drop-shadow-md">{cpStats.leetcode.rating}</span>
                <span className={`text-sm font-medium ${textSecondary}`}>Top {cpStats.leetcode.rank}</span>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${textSecondary}`}>Easy</span>
                    <span className="font-bold text-teal-400 text-base leading-none">{cpStats.leetcode.easy}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-teal-500 to-teal-300 rounded-full" style={{width: `${(cpStats.leetcode.easy/cpStats.leetcode.solved)*100}%`}}></div></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${textSecondary}`}>Medium</span>
                    <span className="font-bold text-yellow-400 text-base leading-none">{cpStats.leetcode.medium}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full" style={{width: `${(cpStats.leetcode.medium/cpStats.leetcode.solved)*100}%`}}></div></div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-end">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${textSecondary}`}>Hard</span>
                    <span className="font-bold text-red-500 text-base leading-none">{cpStats.leetcode.hard}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full" style={{width: `${(cpStats.leetcode.hard/cpStats.leetcode.solved)*100}%`}}></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Codeforces */}
          <div 
            onClick={() => open('https://codeforces.com/profile/Awanish_Rai')}
            className={`col-span-1 md:col-span-4 rounded-3xl border p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 ${cardBg} hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-[50px] rounded-full -mr-20 -mt-20 transition-all duration-500 group-hover:bg-blue-500/20" />
            <div className="z-10">
              <div className="flex items-center justify-between mb-3">
                <h3 className={`text-xl font-black ${textPrimary}`}>Codeforces</h3>
                <ExternalLink size={16} className={`${textSecondary} group-hover:text-blue-500 transition-colors`} />
              </div>
              <div className="inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-[#00a800]/20 text-[#00a800] border border-[#00a800]/30 mb-5 shadow-sm">{cpStats.codeforces.rank}</div>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} drop-shadow-sm`}>{cpStats.codeforces.rating}</span>
                <span className={`text-xs font-medium ${textSecondary}`}>Peak {cpStats.codeforces.maxRating}</span>
              </div>
            </div>
            <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'} z-10 flex justify-between items-end`}>
               <span className={`text-xs uppercase tracking-widest font-bold ${textSecondary}`}>Solved</span>
               <span className={`font-black text-2xl leading-none ${textPrimary}`}>{cpStats.codeforces.solved}</span>
            </div>
          </div>

          {/* Topics Radar / Mastery */}
          <div className={`col-span-1 md:col-span-6 rounded-3xl border p-6 flex flex-col transition-all duration-300 ${cardBg}`}>
            <div className="flex items-center gap-2 mb-5">
              <Target size={18} className="text-purple-400" />
              <h3 className={`font-black tracking-wide ${textPrimary}`}>Algorithm Mastery</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {Object.entries(cpStats.topics).map(([topic, count]) => (
                <div key={topic} className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-3 transition-all hover:scale-105 hover:-translate-y-0.5 cursor-default ${isDarkMode ? 'bg-black/40 border-white/10 text-slate-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' : 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'}`}>
                  <span>{topic}</span>
                  <span className="px-2 py-0.5 rounded-md text-[11px] bg-purple-500/10 text-purple-400 border border-purple-500/20">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Codechef */}
          <div 
            onClick={() => open('https://www.codechef.com/users/master_magnus')}
            className={`col-span-1 md:col-span-3 rounded-3xl border p-6 flex flex-col cursor-pointer group transition-all duration-300 ${cardBg} hover:border-[#8B4513]/50 hover:shadow-[0_0_30px_rgba(139,69,19,0.1)] relative overflow-hidden`}
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B4513]/10 blur-[40px] rounded-full -mr-16 -mt-16 transition-all group-hover:bg-[#8B4513]/20" />
             <div className="z-10 h-full flex flex-col">
              <div className="flex items-center justify-between mb-5">
                  <h3 className={`font-black tracking-wide ${textPrimary}`}>CodeChef</h3>
                  <ExternalLink size={16} className={`${textSecondary} group-hover:text-[#8B4513] transition-colors`} />
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(cpStats.codechef.stars)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#E1A041] text-[#E1A041] drop-shadow-sm" />
                ))}
              </div>
              <span className={`text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'} block mb-1 drop-shadow-sm`}>{cpStats.codechef.rating}</span>
              
              <div className={`mt-auto pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'} flex justify-between items-end`}>
               <span className={`text-xs uppercase tracking-widest font-bold ${textSecondary}`}>Solved</span>
               <span className={`font-black text-xl leading-none ${textPrimary}`}>{cpStats.codechef.solved}</span>
              </div>
             </div>
          </div>

          {/* GFG & InterviewBit Stack */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-5">
             <div className={`flex-1 rounded-3xl border p-5 pl-6 flex flex-col justify-center cursor-pointer group transition-all duration-300 ${cardBg} hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] relative overflow-hidden`} onClick={() => open('https://auth.geeksforgeeks.org/user/awanishs56b')}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 blur-[30px] rounded-full -mr-10 -mt-10 transition-all group-hover:bg-green-500/20" />
                <div className="flex items-center justify-between mb-2 z-10">
                  <h3 className={`font-black text-green-500 tracking-wide`}>GeeksforGeeks</h3>
                  <ExternalLink size={14} className={`${textSecondary} group-hover:text-green-500`} />
                </div>
                <div className="text-3xl font-black text-white z-10">{cpStats.geeksforgeeks.solved} <span className={`text-[10px] uppercase font-bold tracking-widest ${textSecondary}`}>Solved</span></div>
             </div>
             <div className={`flex-1 rounded-3xl border p-5 pl-6 flex flex-col justify-center cursor-pointer group transition-all duration-300 ${cardBg} hover:border-sky-500/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.15)] relative overflow-hidden`} onClick={() => open('https://www.interviewbit.com/profile/awanish-kumar-rai')}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-[30px] rounded-full -mr-10 -mt-10 transition-all group-hover:bg-sky-500/20" />
                <div className="flex items-center justify-between mb-2 z-10">
                  <h3 className={`font-black text-sky-500 tracking-wide`}>InterviewBit</h3>
                  <ExternalLink size={14} className={`${textSecondary} group-hover:text-sky-500`} />
                </div>
                <div className="text-3xl font-black text-white z-10">{cpStats.interviewbit.solved} <span className={`text-[10px] uppercase font-bold tracking-widest ${textSecondary}`}>Solved</span></div>
             </div>
          </div>

          {/* Activity Heatmap spanning full width */}
          <ActivityHeatmap isDarkMode={isDarkMode} />

        </div>
      </div>
    </div>
  );
};

export default Competitive;

