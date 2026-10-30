import React from 'react';
import { motion } from 'framer-motion';
import { experienceItems } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="pt-6 sm:pt-10 pb-6 sm:pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="04"
          title="Experience & Leadership"
          subtitle="Technical chapter roles, hackathon leadership, and engineering initiatives."
          badge="Leadership & Impact"
          className="mb-6 sm:mb-8"
        />

        {/* Timeline */}
        <div className="relative mt-6 sm:mt-8">
          {/* Vertical mint line */}
          <div className="absolute left-[88px] sm:left-[110px] top-0 bottom-0 w-px bg-emerald-500/20 hidden md:block" />

          <div className="space-y-14">
            {experienceItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="md:grid md:grid-cols-[110px_1fr] gap-8 items-start"
              >
                {/* Left: period */}
                <div className="hidden md:flex flex-col items-end pr-8 pt-0.5 shrink-0">
                  <span className="font-mono text-[11px] text-slate-500 leading-snug text-right">
                    {item.period.split(' - ').join('\n–\n')}
                  </span>
                  <span className="mt-2 w-2 h-2 rounded-full bg-emerald-500/50 ring-2 ring-emerald-500/10" />
                </div>

                {/* Right: content */}
                <div className="flex flex-col gap-5">
                  {/* Mobile period */}
                  <span className="md:hidden font-mono text-[11px] text-slate-500">{item.period}</span>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 bg-emerald-500/10 border border-emerald-500/25 dark:text-emerald-400 dark:border-emerald-500/20 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      {item.statusBadge && (
                        <span className="text-[10px] font-mono text-slate-500">· {item.statusBadge}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-[#F5F0E8] group-hover-gradient-text leading-snug transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">{item.organization}</p>
                    <p className="text-xs font-mono text-slate-500 mt-1">{item.location}</p>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2">
                    {item.description.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500/60 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Competencies — flat text list */}
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                      Competencies
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed transition-colors duration-300">
                      {item.coreCompetencies.join(' · ')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center text-[11px] text-slate-500 dark:text-slate-600 font-mono">
          Official role records & conference delegations verified at Malnad College of Engineering.
        </div>
      </div>
    </section>
  );
};
