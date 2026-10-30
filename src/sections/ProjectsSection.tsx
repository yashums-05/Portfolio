import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import type { Project } from '../types';
import { SectionHeader } from '../components/SectionHeader';
import { GithubIcon } from '../components/SocialIcons';
import { sound } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

// ── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
  const styles: Record<Project['status'], string> = {
    'Completed': 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    'Active Prototype': 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
    'Research in Progress': 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
    'Proposed Architecture': 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/30',
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Full-Stack & Java', 'AI & Machine Learning', 'Research & Systems'];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="pt-6 sm:pt-10 pb-6 sm:pb-8 relative overflow-hidden">
      {/* Background glow meshes */}
      <div
        className="absolute top-1/4 -left-40 w-96 h-96 rounded-full pointer-events-none blur-[160px] opacity-15"
        style={{ background: 'radial-gradient(circle, #00D084 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-0 w-96 h-96 rounded-full pointer-events-none blur-[160px] opacity-15"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6 sm:mb-8">
          <SectionHeader
            number="03"
            title="Featured Projects"
            subtitle="Explore software systems, intelligent models, and research prototypes engineered with honest architectural integrity."
            badge="Engineering Portfolio"
            className="mb-0"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-200/70 border border-slate-300/80 dark:bg-white/[0.03] dark:border-white/[0.08] backdrop-blur-md self-start md:self-auto mb-0 md:mb-1 transition-colors duration-300">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  sound.playClick();
                  setFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-300/50 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/[0.04]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Simple Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((project, idx) => {
            const num = String(idx + 1).padStart(2, '0');
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onClick={() => {
                  sound.playPop();
                  onSelectProject(project);
                }}
                className="h-full rounded-3xl border border-slate-200/90 hover:border-emerald-500/50 bg-white hover:bg-slate-50/80 dark:border-white/[0.08] dark:hover:border-emerald-500/40 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] backdrop-blur-md shadow-lg hover:shadow-2xl flex flex-col justify-between p-7 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex flex-col flex-1 justify-between gap-4">
                  <div className="space-y-4">
                    {/* Card Header: Number & Status Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-slate-500 font-bold tracking-wider">
                        // {num}
                      </span>
                      <StatusBadge status={project.status} />
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-syne font-bold text-slate-900 dark:text-white flex items-center justify-between gap-2">
                        <span className="group-hover-gradient-text transition-all duration-300">{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </h3>
                      <p className="text-xs text-emerald-600 dark:text-emerald-400/90 font-mono mt-1 font-medium">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono text-slate-700 bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-white/[0.03] dark:border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-mono text-slate-500">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card footer CTA buttons */}
                <div className="pt-5 mt-6 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playPop();
                      onSelectProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
                  >
                    <span>View Details</span>
                    <span className="text-sm">→</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.playClick();
                        }}
                        className="flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors p-1"
                        title="Source Code"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
