import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';
import { User, Palette, Briefcase, Monitor, Bell, Shield, Moon, Sun } from 'lucide-react';

const Settings = ({ isDarkMode, toggleTheme }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { personal } = PORTFOLIO_DATA || {};
  
  const [preferences, setPreferences] = useState({
    fullTime: true,
    freelance: true,
    remote: true,
    relocation: false,
    notifications: true,
    animations: true
  });

  const togglePref = (key) => setPreferences(prev => ({ ...prev, [key]: !prev[key] }));

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'availability', label: 'Availability', icon: <Briefcase size={18} /> },
    { id: 'system', label: 'System', icon: <Monitor size={18} /> },
  ];

  const ToggleSwitch = ({ label, checked, onChange, desc }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div>
        <div className="font-medium">{label}</div>
        {desc && <div className="text-xs opacity-60 mt-0.5">{desc}</div>}
      </div>
      <button 
        onClick={onChange}
        className={`w-11 h-6 rounded-full relative transition-colors ${checked ? 'bg-[#39d353]' : isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`}
      >
        <span className={`block w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className={`flex w-full h-full font-ubuntu text-sm ${isDarkMode ? 'bg-[#0d1117] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Sidebar Navigation */}
      <div className={`w-48 flex-shrink-0 flex flex-col py-4 border-r ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
        <div className="px-4 mb-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Settings</div>
        <div className="flex flex-col gap-1 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === tab.id 
                  ? (isDarkMode ? 'bg-[#E95420]/20 text-[#E95420]' : 'bg-orange-100 text-orange-700') 
                  : 'hover:bg-white/5 text-slate-500 hover:text-inherit'
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-xl mx-auto space-y-8">
          
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-2"><User /> User Profile</h2>
              <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gradient-to-tr from-[#E95420] to-[#77216f] flex items-center justify-center shadow-lg ring-2 ring-white/10">
                    <img
                      src="/profile.png"
                      alt={personal?.name || 'Profile'}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-3xl font-bold text-white">{personal?.name?.charAt(0) || 'A'}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{personal?.name || 'Awanish Kumar Rai'}</h3>
                    <p className={isDarkMode ? 'text-[#E95420]' : 'text-orange-600'}>Administrator</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase font-bold opacity-50 block mb-1">Display Name</label>
                    <input type="text" value={personal?.name || 'Awanish Kumar Rai'} readOnly className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-[#0d1117] border-white/10 focus:border-[#E95420]' : 'bg-slate-50 border-slate-200 focus:border-orange-500'}`} />
                  </div>
                  <div>
                    <label className="text-xs uppercase font-bold opacity-50 block mb-1">Title</label>
                    <input type="text" value={personal?.title || 'Computer Science Engineer'} readOnly className={`w-full p-2.5 rounded-lg border outline-none ${isDarkMode ? 'bg-[#0d1117] border-white/10 focus:border-[#E95420]' : 'bg-slate-50 border-slate-200 focus:border-orange-500'}`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Palette /> Appearance</h2>
              
              <div className={`p-6 rounded-xl border space-y-2 ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
                <ToggleSwitch 
                  label="Dark Mode" 
                  desc="Use dark theme across the system"
                  checked={isDarkMode} 
                  onChange={toggleTheme || (() => {})} 
                />
                <ToggleSwitch 
                  label="System Animations" 
                  desc="Enable smooth window transitions and effects"
                  checked={preferences.animations} 
                  onChange={() => togglePref('animations')} 
                />
              </div>

              <h3 className="text-sm font-bold uppercase opacity-50 mt-8 mb-4">Color Accents</h3>
              <div className="flex gap-4">
                {['#E95420', '#77216f', '#27AE60', '#f0a30a', '#3468d5'].map(color => (
                  <button key={color} className={`w-10 h-10 rounded-full border-2 border-transparent hover:scale-110 transition-transform ${color === '#E95420' ? 'ring-2 ring-offset-2 ring-offset-[#0d1117] ring-white' : ''}`} style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Briefcase /> Work Availability</h2>
              <p className="opacity-70">Update your current status for recruiters and potential clients.</p>
              
              <div className={`p-6 rounded-xl border flex items-center gap-4 mb-6 ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39d353] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#39d353]"></span>
                </div>
                <div>
                  <div className="font-bold">Currently Available</div>
                  <div className="text-xs opacity-70">Open to new opportunities</div>
                </div>
              </div>

              <div className={`px-6 py-2 rounded-xl border ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
                <ToggleSwitch label="Full-time Roles" desc="Open to permanent employment" checked={preferences.fullTime} onChange={() => togglePref('fullTime')} />
                <ToggleSwitch label="Freelance / Contract" desc="Available for short-term projects" checked={preferences.freelance} onChange={() => togglePref('freelance')} />
                <ToggleSwitch label="Remote Work" desc="Looking for 100% remote positions" checked={preferences.remote} onChange={() => togglePref('remote')} />
                <ToggleSwitch label="Relocation" desc="Willing to relocate for the right role" checked={preferences.relocation} onChange={() => togglePref('relocation')} />
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold flex items-center gap-2"><Monitor /> System Info</h2>
              
              <div className={`p-6 rounded-xl border space-y-4 ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs opacity-50 uppercase font-bold">OS Version</div>
                    <div className="font-medium">Ubuntu 24.04 LTS (Noble Numbat)</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-50 uppercase font-bold">Framework</div>
                    <div className="font-medium">React 18 / Vite</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-50 uppercase font-bold">Styling</div>
                    <div className="font-medium">Tailwind CSS v3</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-50 uppercase font-bold">Animations</div>
                    <div className="font-medium">Framer Motion</div>
                  </div>
                </div>
              </div>

              <div className={`px-6 py-2 rounded-xl border ${isDarkMode ? 'bg-[#161b22] border-white/10' : 'bg-white border-slate-200'}`}>
                <ToggleSwitch 
                  label="System Notifications" 
                  desc="Allow popups and toast messages"
                  checked={preferences.notifications} 
                  onChange={() => togglePref('notifications')} 
                />
              </div>

              <div className="text-center opacity-40 text-xs pt-4">
                &copy; {new Date().getFullYear()} Awanish Kumar Rai. All rights reserved.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
