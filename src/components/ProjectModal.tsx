import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, Layers, CheckCircle2, Clock } from 'lucide-react';
import type { Project } from '../types';
import { GithubIcon } from './SocialIcons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const getStatusBadgeClass = (status: Project['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
      case 'Active Prototype':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30';
      case 'Research in Progress':
        return 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30';
      default:
        return 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 dark:bg-black/85 backdrop-blur-xl transition-colors duration-300"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.45, bounce: 0.1 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200/90 text-slate-800 dark:bg-[#08080D]/95 dark:border-white/[0.12] dark:text-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 z-10 custom-scrollbar transition-colors duration-300"
        >
          {/* Header Controls */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-white/[0.08] mb-6">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs font-mono font-semibold rounded-full border ${getStatusBadgeClass(project.status)}`}>
                {project.status}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tracking-wider">
                // {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-white/[0.08] transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-syne font-bold text-slate-900 dark:text-white mb-2 tracking-tight transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-emerald-600 dark:text-emerald-400 font-mono font-medium mb-6">
            {project.tagline}
          </p>

          {/* Description */}
          <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            {project.description}
          </div>

          {/* Highlights / Metrics Callout */}
          {project.metricsOrHighlight && (
            <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200/80 dark:bg-emerald-500/[0.07] dark:border-emerald-500/20 flex items-start gap-3.5">
              <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs uppercase font-mono tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">Key Architectural Highlight</div>
                <div className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 mt-1 leading-snug">{project.metricsOrHighlight}</div>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mb-8">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3.5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              Core System Features & Architecture
            </h4>
            <ul className="space-y-3">
              {project.keyFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Pills */}
          <div className="mb-8">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-3">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-slate-700 bg-slate-100 border border-slate-200 dark:text-slate-200 dark:bg-white/[0.04] dark:border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Actions / Links */}
          <div className="pt-6 border-t border-slate-100 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 dark:text-white dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:border-white/[0.12] transition-all cursor-pointer shadow-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>View Source Code</span>
                </a>
              ) : project.technologies.some(t => t.toLowerCase().includes('hardware')) ? (
                <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-medium text-emerald-700 bg-emerald-500/10 border border-emerald-500/25 dark:text-emerald-400 dark:border-emerald-500/20">
                  <Cpu className="w-4 h-4" />
                  <span>Hardware Engineering Prototype</span>
                </span>
              ) : (
                <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono text-slate-400 bg-slate-50 border border-slate-200 dark:text-slate-500 dark:bg-white/[0.02] dark:border-white/[0.04]">
                  <Clock className="w-4 h-4" />
                  <span>Repository Coming Soon</span>
                </span>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-black bg-emerald-400 hover:bg-emerald-300 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-mono font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              Close [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
