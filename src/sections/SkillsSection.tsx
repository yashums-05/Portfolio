import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Layers, Database, Brain, Wrench } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

const cardMetadata: Array<{
  icon: React.ElementType;
  color: string;
  badge: string;
  footer: string;
  footerAccent: string;
}> = [
  {
    icon: Code2,
    color: '#00D084', // Emerald
    badge: 'Core Foundation',
    footer: 'Java Enterprise · OOP & Systems',
    footerAccent: 'Primary Focus',
  },
  {
    icon: Layers,
    color: '#38BDF8', // Sky Blue
    badge: 'Full-Stack Architecture',
    footer: 'Spring Boot · REST APIs · Node.js',
    footerAccent: 'Enterprise Backend',
  },
  {
    icon: Database,
    color: '#F5A623', // Amber
    badge: 'Relational & Document',
    footer: 'ACID Guarantees · Schema Optimization',
    footerAccent: 'SQL + NoSQL',
  },
  {
    icon: Brain,
    color: '#A78BFA', // Purple
    badge: 'Intelligent Systems',
    footer: 'Deep RL · LSTM Forecasting · Green Tech',
    footerAccent: 'Applied AI / ML',
  },
  {
    icon: Wrench,
    color: '#34D399', // Mint
    badge: 'Dev Ecosystem & Toolchain',
    footer: 'Git Flow · CI/CD · Prototyping & IDEs',
    footerAccent: 'Tooling & Platforms',
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section id="skills" className="pt-0 sm:pt-4 pb-6 sm:pb-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div
        className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full pointer-events-none blur-[150px] opacity-15"
        style={{ background: 'radial-gradient(circle, #00D084 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full pointer-events-none blur-[150px] opacity-15"
        style={{ background: 'radial-gradient(circle, #38BDF8 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="02"
          title="Technical Capabilities"
          subtitle="Organized competencies across backend engineering, machine learning pipelines, and modern software architectures."
          badge="Engineering Matrix"
          className="mb-6 sm:mb-8"
        />

        {/* ─── ALL 5 CATEGORIES UNIFIED & SYMMETRICALLY BALANCED ─── */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 items-stretch">
          {skillCategories.map((cat, idx) => {
            const meta = cardMetadata[idx] || cardMetadata[0];
            const Icon = meta.icon;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] p-6 rounded-3xl bg-white border border-slate-200/90 hover:border-emerald-500/40 shadow-xl dark:bg-[#0b0c16] dark:border-white/[0.08] dark:hover:border-emerald-500/30 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header with Icon, Number, Badge */}
                  <div className="pb-4 mb-4 border-b border-slate-100 dark:border-white/[0.06]">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center border border-slate-200/80 dark:border-white/[0.08]"
                          style={{ backgroundColor: `${meta.color}15`, color: meta.color }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
                          // {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 dark:bg-white/[0.04] dark:text-slate-400 dark:border-white/[0.06]">
                        {meta.badge}
                      </span>
                    </div>

                    <h3 className="font-syne font-bold text-lg text-slate-900 dark:text-white group-hover-gradient-text transition-all duration-300">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                          skill.isPrimary
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 font-semibold shadow-[0_0_12px_rgba(0,208,132,0.1)]'
                            : 'bg-slate-100 text-slate-700 border border-slate-200/90 hover:border-slate-300 hover:text-slate-900 dark:bg-white/[0.03] dark:text-slate-300 dark:border-white/[0.06] dark:hover:border-white/[0.15] dark:hover:text-white'
                        }`}
                      >
                        {skill.isPrimary && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        )}
                        <span>{skill.name}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Unified Architectural Metadata Footer */}
                <div className="pt-3 mt-5 border-t border-slate-100 dark:border-white/[0.04] flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span className="flex items-center gap-1.5 truncate">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: meta.color }}
                    />
                    <span className="truncate">{meta.footer}</span>
                  </span>
                  <span
                    className="font-semibold shrink-0 ml-2"
                    style={{ color: `${meta.color}cc` }}
                  >
                    {meta.footerAccent}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Clean Engineering Standards Note */}
        <div className="mt-12 text-center text-xs font-mono text-slate-500">
          <span>Evaluated through practical software engineering, clean code standards, and relational data modeling rather than arbitrary proficiency percentages.</span>
        </div>
      </div>
    </section>
  );
};
