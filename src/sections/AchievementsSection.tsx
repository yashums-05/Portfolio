import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { achievementsList } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

const CATEGORY_STYLES: Record<string, string> = {
  Academics:  'text-emerald-700 bg-emerald-500/10 border-emerald-500/30 dark:text-emerald-400',
  Hackathon:  'text-amber-700 bg-amber-500/10 border-amber-500/30 dark:text-amber-400',
  Technical:  'text-sky-700 bg-sky-500/10 border-sky-500/30 dark:text-sky-400',
  Leadership: 'text-purple-700 bg-purple-500/10 border-purple-500/30 dark:text-purple-400',
};

export const AchievementsSection: React.FC = () => {
  return (
    <section id="achievements" className="pt-6 sm:pt-10 pb-6 sm:pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="06"
          title="Awards & Recognition"
          subtitle="Competitive hackathons, aerospace runner-up awards, and academic honors."
          badge="Honors & Milestones"
          className="mb-6 sm:mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 sm:mt-8">
          {achievementsList.map((item, idx) => {
            const catStyle = CATEGORY_STYLES[item.category] ?? 'text-slate-700 border-slate-300 dark:text-slate-400 dark:border-slate-500/30';

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.09 }}
                className="relative pl-5 py-6 pr-6 border-l-2 border-emerald-500/50 bg-white border border-slate-200/80 shadow-md dark:border-white/[0.08] dark:bg-dark-900/40 rounded-r-2xl transition-colors duration-300"
              >
                {/* Category badge + date */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-mono uppercase tracking-wider border px-2 py-0.5 rounded ${catStyle}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-display font-bold leading-snug mb-1 transition-all duration-300 text-slate-900 dark:text-[#F5F0E8] group-hover-gradient-text">
                  {item.title}
                </h3>

                {/* Issuer */}
                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400/80 mb-3">{item.issuer}</p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Badge text / Verification Link */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 dark:bg-white/[0.03] dark:text-slate-400 dark:border-white/[0.05]">
                    {item.badgeText}
                  </span>

                  {item.verificationUrl && (
                    <a
                      href={item.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                    >
                      <span>Verification</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
