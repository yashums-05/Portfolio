import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Mail, ArrowRight, X, ExternalLink, GraduationCap, Briefcase, Sun, Moon } from 'lucide-react';
import { personalInfo, projectsData, skillCategories } from '../data/portfolioData';
import type { Project } from '../types';
import { sound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onSelectProject: (project: Project) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playPop();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter projects & skills based on query
  const matchingProjects = projectsData.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.technologies.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const matchingSkills = skillCategories.flatMap(c => c.skills).filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-dark-950/80 backdrop-blur-md transition-colors duration-300"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200/90 shadow-2xl dark:bg-dark-900 dark:border-white/[0.12] rounded-2xl overflow-hidden z-10 transition-colors duration-300"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-dark-850">
            <Search className="w-5 h-5 text-emerald-500 shrink-0 mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, project, or skill (e.g. 'Java', 'RailPulse', 'Theme')..."
              className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions List */}
          <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
            {/* Quick Actions */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
                Quick Shortcuts
              </div>
              <div className="space-y-1">
                {/* Theme Toggle shortcut */}
                <button
                  onClick={() => {
                    sound.playClick();
                    toggleTheme();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Moon className="w-4 h-4 text-indigo-500" />
                    )}
                    <span>Toggle Theme (Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">
                    Current: {theme}
                  </span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span>View & Download Resume (PDF)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">Enter ↵</span>
                </button>

                <a
                  href={`mailto:${personalInfo.contactEmail}`}
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-sky-500" />
                    <span>Send Email to Yashwanth ({personalInfo.contactEmail})</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <a
                  href="#about"
                  onClick={() => {
                    sound.playClick();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-4 h-4 text-emerald-500" />
                    <span>Jump to Academic Profile (9.09 CGPA & MCE Hassan)</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Projects Matches */}
            {matchingProjects.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
                  Projects ({matchingProjects.length})
                </div>
                <div className="space-y-1">
                  {matchingProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        sound.playClick();
                        onClose();
                        onSelectProject(p);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-4 h-4 text-emerald-500 shrink-0" />
                        <div>
                          <div className="font-semibold text-slate-900 dark:text-white">{p.title}</div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{p.tagline}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
                        {p.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Matches */}
            {query.trim().length > 0 && matchingSkills.length > 0 && (
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1">
                  Skills Matching ({matchingSkills.length})
                </div>
                <div className="flex flex-wrap gap-1.5 p-2">
                  {matchingSkills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-white/[0.04] dark:border-white/[0.08]"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
