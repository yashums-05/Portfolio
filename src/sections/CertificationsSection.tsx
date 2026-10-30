import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, CheckCircle2 } from 'lucide-react';
import { certificationsList } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="pt-6 sm:pt-10 pb-6 sm:pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="07"
          title="Certifications & Learning"
          subtitle="Formal technical qualifications, validated engineering skillsets, and design certifications."
          badge="Verified Credentials"
          className="mb-6 sm:mb-8"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 sm:mt-8">
          {certificationsList.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="rounded-3xl bg-white dark:bg-[#090D16]/90 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-7 backdrop-blur-md shadow-lg hover:shadow-2xl relative overflow-hidden group hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle top hover glow line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400/60 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Category Badge & Date */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/25 dark:text-emerald-400 dark:border-emerald-500/20">
                    <Award className="w-3.5 h-3.5" />
                    {cert.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {cert.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white group-hover-gradient-text transition-all duration-300 mb-1 leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400/90 mb-3">
                  {cert.issuer}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {cert.description}
                </p>
              </div>

              <div>
                {/* Skills Covered Tags */}
                <div className="mb-5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                    Competencies Validated
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer: Status badge & Verification Link */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {cert.badgeText}
                  </span>

                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors group/link cursor-pointer"
                    >
                      <span>Verification</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
