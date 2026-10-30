import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { educationHistory } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';

export const EducationSection: React.FC = () => {
  const primary = educationHistory[0];
  const priorEducation = educationHistory.slice(1);

  return (
    <section id="education" className="pt-6 sm:pt-10 pb-6 sm:pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          number="05"
          title="Education & Academics"
          subtitle="Formal engineering education, foundational milestones, and coursework."
          badge="Academic Background"
          className="mb-6 sm:mb-8"
        />

        {/* Primary Entry — MCE */}
        {primary && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mt-6 sm:mt-8 space-y-8 rounded-3xl bg-white dark:bg-[#090D16]/90 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-300"
          >
            {/* Subtle top hover glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400/60 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Top row: Degree Info + Stat Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left columns: Institution Details */}
              <div className="md:col-span-7 lg:col-span-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-slate-900 dark:text-[#F5F0E8] leading-tight mb-2 transition-colors duration-300">
                  {primary.institution}
                </h3>
                <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-2 font-medium">{primary.degree}</p>
                <p className="font-mono text-sm text-slate-500">
                  {primary.duration} · {primary.location}
                </p>
              </div>

              {/* Right columns: Perfectly Fitted CGPA Stat Card */}
              <div className="md:col-span-5 lg:col-span-4 w-full max-w-sm md:max-w-none md:ml-auto rounded-2xl sm:rounded-3xl bg-slate-50/80 border border-slate-200/90 dark:bg-white/[0.03] dark:border-white/[0.08] p-5 sm:p-6 backdrop-blur-md shadow-md relative overflow-hidden group/cgpa hover:border-emerald-500/30 transition-all duration-300">
                {/* Thin top accent rule with subtle green-to-yellow gradient */}
                <div className="h-[1px] w-full bg-gradient-to-r from-[#4ADE80]/60 via-[#FACC15]/60 to-transparent mb-3 sm:mb-4" />

                <div className="flex items-center justify-between md:block">
                  <div className="md:hidden font-mono text-xs text-emerald-600 dark:text-emerald-400">
                    <p className="tracking-wide font-semibold">Cumulative GPA</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal">Scale: 10.0</p>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight stat-gradient-text inline-block">
                      9.09
                    </span>
                  </div>
                </div>

                {/* Labels: Cumulative Grade Point (left) & Average (right) */}
                <div className="hidden md:block mt-3 lg:mt-4 font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400">
                  <p className="tracking-wide">Cumulative Grade Point</p>
                  <p className="tracking-wide text-right mt-1 font-medium">Average</p>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="pt-2">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4">
                Highlights
              </p>
              <ul className="space-y-2.5">
                {primary.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed transition-colors duration-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coursework — flat text grid */}
            <div>
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-4">
                Core Coursework
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
                {primary.coursework.map(course => (
                  <span key={course} className="text-sm text-slate-600 dark:text-slate-400 font-mono hover-gradient-text cursor-default transition-all">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Divider */}
        {priorEducation.length > 0 && <div className="my-10 border-t border-slate-200/80 dark:border-white/[0.06]" />}

        {/* Prior Education Entries — PU College & High School */}
        {priorEducation.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 font-semibold">
                Foundational & Prior Education
              </span>
              <div className="flex-1 h-[1px] bg-slate-200/80 dark:bg-white/[0.06]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {priorEducation.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.12 }}
                  className="rounded-3xl bg-white dark:bg-[#090D16]/90 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-7 backdrop-blur-md shadow-xl relative overflow-hidden group hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Subtle top hover glow line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400/60 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div>
                    {/* Top Meta Bar: Level & Duration */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-500/10 border border-emerald-500/25 dark:text-emerald-400 dark:border-emerald-500/20">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {idx === 0 ? 'Pre-University (12th)' : 'Secondary School (10th)'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {edu.duration}
                      </span>
                    </div>

                    {/* Institution Name */}
                    <h4 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white group-hover-gradient-text transition-all duration-300 mb-1 leading-snug">
                      {edu.institution}
                    </h4>

                    {/* Degree & Location */}
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400/90 mb-1">
                      {edu.degree}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 mb-5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{edu.location}</span>
                    </div>

                    {/* Highlights */}
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="space-y-2 mb-5">
                        {edu.highlights.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div>
                    {/* Score / Performance Callout Box */}
                    <div className="rounded-2xl p-4 bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-white/[0.06] mb-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                          {edu.scoreLabel}
                        </span>
                        <span className="text-2xl sm:text-3xl font-display font-bold stat-gradient-text">
                          {edu.scoreValue}
                        </span>
                      </div>
                      {/* Metric score visual fill bar */}
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-700"
                          style={{ width: edu.scoreValue }}
                        />
                      </div>
                    </div>

                    {/* Coursework Tags */}
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2">
                        Key Subjects & Coursework
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map(c => (
                          <span
                            key={c}
                            className="px-2.5 py-1 rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] hover-gradient-text transition-all cursor-default"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
