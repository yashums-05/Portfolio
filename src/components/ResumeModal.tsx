import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, GraduationCap, Code2, Briefcase, Trophy, Mail, MapPin } from 'lucide-react';
import { personalInfo, educationHistory, skillCategories, projectsData, achievementsList } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-dark-950/85 backdrop-blur-md transition-colors duration-300"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white border border-slate-200 text-slate-800 dark:bg-dark-900 dark:border-white/[0.12] dark:text-slate-200 rounded-2xl shadow-2xl z-10 overflow-hidden transition-colors duration-300"
        >
          {/* Top Control Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200 dark:bg-dark-850 dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-900 dark:text-white text-base">Resume Preview</span>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 hidden sm:inline">&middot; Yashwanth_MS_Resume.pdf</span>
            </div>

            <div className="flex items-center gap-2.5">
              <a
                href="/resume.pdf"
                download="Yashwanth_MS_Resume.pdf"
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-sm transition-all"
                title="Download local file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors ml-2"
                aria-label="Close resume modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Printable Resume Document Container */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-200 print:bg-white print:text-black transition-colors duration-300">
            <div className="max-w-3xl mx-auto bg-white border border-slate-200/90 dark:bg-dark-900/90 dark:border-white/[0.08] rounded-xl p-6 sm:p-8 shadow-md">
              
              {/* Document Header */}
              <div className="border-b border-slate-200 dark:border-white/[0.1] pb-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 border border-emerald-500/30 shrink-0 shadow-md">
                      <img
                        src="/images/yashwanth-portrait.jpg"
                        alt={personalInfo.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-syne font-bold text-slate-900 dark:text-white tracking-tight">
                        {personalInfo.name}
                      </h1>
                      <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {personalInfo.role}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {personalInfo.institution}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300 font-mono sm:text-right">
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <Mail className="w-3.5 h-3.5 text-sky-500" />
                      {personalInfo.contactEmail}
                    </span>
                    <span className="flex items-center gap-1.5 sm:justify-end">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      {personalInfo.location}
                    </span>
                    <span>CGPA: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{personalInfo.cgpa} / 10.0</strong></span>
                  </div>
                </div>
              </div>

              {/* Summary / Objective */}
              <div className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                  Objective
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {personalInfo.objective || personalInfo.bioSummary}
                </p>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Education
                </h2>
                <div className="space-y-4">
                  {educationHistory.map((edu) => (
                    <div key={edu.id} className="text-xs">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between font-semibold text-slate-900 dark:text-slate-100">
                        <span>{edu.degree}</span>
                        <span className="text-sky-600 dark:text-brand-blue font-mono">{edu.duration}</span>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 flex items-center justify-between mt-0.5">
                        <span>{edu.institution}, {edu.location}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium font-mono">{edu.scoreLabel}: {edu.scoreValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Technical Competencies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {skillCategories.map((cat) => (
                    <div key={cat.category} className="bg-slate-50 border border-slate-200 dark:bg-white/[0.02] p-2.5 rounded-lg dark:border-white/[0.05]">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">{cat.category}:</span>
                      <span className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {cat.skills.map(s => s.name).join(', ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Projects */}
              <div className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Selected Projects
                </h2>
                <div className="space-y-3.5">
                  {projectsData.slice(0, 4).map((p) => (
                    <div key={p.id} className="text-xs">
                      <div className="flex items-center justify-between font-semibold text-slate-900 dark:text-slate-100">
                        <span>{p.title} &mdash; <span className="font-normal text-slate-500 dark:text-slate-400">{p.tagline}</span></span>
                        <span className="text-slate-500 font-mono text-[10px]">{p.status}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">{p.description}</p>
                      <div className="text-sky-600 dark:text-brand-blue font-mono text-[11px] mt-1">
                        Tech Stack: {p.technologies.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitions & Achievements */}
              <div className="mb-6">
                <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold mb-3 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  Competitions & Achievements
                </h2>
                <div className="space-y-2 text-xs">
                  {achievementsList.map((ach) => (
                    <div key={ach.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1.5 border-b border-slate-100 dark:border-white/[0.04]">
                      <div className="text-slate-800 dark:text-slate-200">
                        <strong className="text-slate-900 dark:text-white font-medium">• {ach.title}</strong>
                        <span className="text-slate-500 dark:text-slate-400 ml-2">({ach.issuer})</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[10px]">{ach.date}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
