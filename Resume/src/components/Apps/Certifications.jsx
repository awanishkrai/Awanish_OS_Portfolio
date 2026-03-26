import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, GraduationCap, CheckCircle2, Shield, X, ZoomIn } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../constants/portfolioData';

const Certifications = ({ isDarkMode }) => {
  const { certifications } = PORTFOLIO_DATA;
  const specialization = certifications.find((c) => c.type === 'specialization');
  const courses = certifications.filter((c) => c.type === 'course');
  const [lightbox, setLightbox] = useState(null);

  const bg = isDarkMode ? 'bg-[#0d1117]' : 'bg-[#f8f9fa]';
  const text = isDarkMode ? 'text-slate-200' : 'text-slate-800';
  const sub = isDarkMode ? 'text-slate-400' : 'text-slate-500';
  const cardBg = isDarkMode ? 'bg-[#161b22]' : 'bg-white';
  const border = isDarkMode ? 'border-white/8' : 'border-slate-200';

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <div className={`w-full h-full flex flex-col ${bg} ${text} font-ubuntu`}>
      {/* Header */}
      <div className={`px-5 py-3 border-b flex items-center justify-between ${border}`}>
        <div className="flex items-center gap-2.5">
          <Award size={18} className="text-[#E95420]" />
          <span className="font-semibold text-sm">Certifications</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
            isDarkMode ? 'bg-[#E95420]/15 text-[#E95420]' : 'bg-[#E95420]/10 text-[#E95420]'
          }`}>
            {certifications.length}
          </span>
        </div>
        <span className={`text-xs ${sub}`}>~/Documents/Certificates</span>
      </div>

      {/* Scrollable content */}
      <motion.div
        className="flex-1 p-5 overflow-auto space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* === Specialization Hero Card === */}
        {specialization && (
          <motion.div
            variants={itemVariants}
            className={`relative rounded-xl border overflow-hidden ${cardBg} ${border} transition-colors duration-300 group`}
          >
            {/* Gradient accent top bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#E95420] via-[#ff7b3a] to-[#ffbd2e]" />

            <div className="p-5">
              {/* Badge row */}
              <div className="flex items-center gap-2 mb-3">
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-[#E95420]/20 to-[#ffbd2e]/20 text-[#E95420]">
                  <Shield size={11} />
                  Specialization
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'
                }`}>
                  {specialization.courses?.length} Courses
                </span>
              </div>

              {/* Image + Info layout */}
              <div className="flex flex-col md:flex-row gap-5">
                {/* Certificate image */}
                {specialization.image && (
                  <div
                    className="relative md:w-[280px] shrink-0 cursor-pointer group/img"
                    onClick={() => setLightbox(specialization)}
                  >
                    <img
                      src={specialization.image}
                      alt={specialization.name}
                      className={`w-full rounded-lg border object-cover shadow-lg group-hover/img:shadow-xl transition-shadow ${
                        isDarkMode ? 'border-white/10' : 'border-slate-200'
                      }`}
                    />
                    <div className="absolute inset-0 rounded-lg bg-black/0 group-hover/img:bg-black/30 transition-all flex items-center justify-center">
                      <ZoomIn size={28} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-lg" />
                    </div>
                  </div>
                )}

                {/* Right side info */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold mb-1 group-hover:text-[#E95420] transition-colors">
                    {specialization.name}
                  </h2>

                  <div className={`flex items-center gap-3 text-xs ${sub} mb-4`}>
                    <span className="flex items-center gap-1">
                      <GraduationCap size={13} />
                      {specialization.institution}
                    </span>
                    <span>•</span>
                    <span>{specialization.date}</span>
                    <span>•</span>
                    <span className="text-[#0056D2] font-medium">{specialization.platform}</span>
                  </div>

                  {/* Included courses */}
                  {specialization.courses && (
                    <div className={`rounded-lg p-3 space-y-1.5 ${
                      isDarkMode ? 'bg-black/30' : 'bg-slate-50'
                    }`}>
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${sub}`}>
                        Courses Included
                      </span>
                      {specialization.courses.map((course, i) => (
                        <div key={i} className={`flex items-center gap-2 text-xs ${
                          isDarkMode ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />
                          {course}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Verify */}
                  <a
                    href={specialization.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-[#E95420]/10 text-[#E95420] hover:bg-[#E95420]/20'
                        : 'bg-[#E95420]/8 text-[#E95420] hover:bg-[#E95420]/15'
                    }`}
                  >
                    <ExternalLink size={12} />
                    Verify Certificate
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === Individual Course Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((cert) => (
            <motion.div
              key={cert.name}
              variants={itemVariants}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className={`relative rounded-xl border overflow-hidden ${cardBg} ${border} hover:border-[#E95420]/40 transition-colors duration-300 group cursor-default`}
            >
              {/* Certificate image */}
              {cert.image && (
                <div
                  className="relative cursor-pointer group/img overflow-hidden"
                  onClick={() => setLightbox(cert)}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className={`w-full h-36 object-cover object-top border-b transition-transform duration-300 group-hover/img:scale-105 ${
                      isDarkMode ? 'border-white/5' : 'border-slate-100'
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-all flex items-center justify-center">
                    <ZoomIn size={22} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity drop-shadow-lg" />
                  </div>
                </div>
              )}

              <div className="p-4">
                {/* Course title */}
                <h3 className="text-sm font-semibold mb-1.5 leading-snug group-hover:text-[#E95420] transition-colors line-clamp-2">
                  {cert.name}
                </h3>

                {/* Institution + date */}
                <div className={`text-[11px] ${sub} space-y-0.5 mb-3`}>
                  <div className="flex items-center gap-1">
                    <GraduationCap size={11} />
                    <span className="truncate">{cert.institution}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{cert.date}</span>
                    <span className="text-[#0056D2] font-semibold text-[10px] uppercase tracking-wider">{cert.platform}</span>
                  </div>
                </div>

                {/* Verify link */}
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 text-[11px] font-medium transition-colors ${
                    isDarkMode
                      ? 'text-slate-500 hover:text-[#E95420]'
                      : 'text-slate-400 hover:text-[#E95420]'
                  }`}
                >
                  <ExternalLink size={11} />
                  Verify
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* === Lightbox Modal === */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-3xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 z-10 bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
              >
                <X size={18} />
              </button>
              <img
                src={lightbox.image}
                alt={lightbox.name}
                className="w-full h-auto rounded-xl shadow-2xl border border-white/10"
              />
              <div className="mt-3 text-center">
                <p className="text-white font-semibold text-sm">{lightbox.name}</p>
                <p className="text-white/50 text-xs mt-0.5">{lightbox.institution} • {lightbox.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;
