import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Brain, Sparkles, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { SectionHeader } from '../components/SectionHeader';
import { TiltCard } from '../components/TiltCard';
import { sound } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<'portrait' | 'campus' | 'conference' | 'outdoor'>('portrait');

  const photos = [
    {
      id: 'portrait',
      url: '/images/yashwanth-portrait.jpg',
      label: 'Developer Profile',
      caption: 'Full-Stack & Systems Architecture',
      objectPosition: 'center 18%',
    },
    {
      id: 'campus',
      url: '/images/yashwanth-campus.jpg',
      label: 'MCE Campus',
      caption: 'Student Chapter & Campus Operations',
      objectPosition: 'center 16%',
    },
    {
      id: 'conference',
      url: '/images/yashwanth-conference.jpg',
      label: 'ICTIEE 2024',
      caption: 'Official Delegate & Student Chapter Leadership',
      objectPosition: 'center 16%',
    },
    {
      id: 'outdoor',
      url: '/images/yashwanth-outdoor.jpg',
      label: 'Campus Grounds',
      caption: 'Engineering & Innovation Environment',
      objectPosition: 'center 22%',
    },
  ];

  const currentPhoto = photos.find((p) => p.id === activePhoto) || photos[0];

  const capabilityCards = [
    {
      title: 'Software Development & Architecture',
      Icon: Code2,
      desc: 'Robust enterprise backends, REST APIs, and database schemas engineered with Java, Spring Boot, and MySQL.',
      accent: '#00D084',
      tag: 'JAVA / SPRING',
    },
    {
      title: 'Artificial Intelligence & Machine Learning',
      Icon: Brain,
      desc: 'Predictive modeling, sequential forecasting with LSTMs, and Proximal Policy Optimization (PPO) reinforcement learning.',
      accent: '#F5A623',
      tag: 'DEEP RL / PPO',
    },
    {
      title: 'Research & Sustainable Systems',
      Icon: Sparkles,
      desc: 'Investigating explainable AI (XAI), green data center optimization, and multi-agent distributed systems.',
      accent: '#38BDF8',
      tag: 'SUSTAINABLE COMPUTING',
    },
  ];

  const interestTags = [
    'Java Enterprise',
    'Spring Boot',
    'Deep Reinforcement Learning (PPO)',
    'Sequential LSTMs',
    'Explainable AI (XAI)',
    'REST APIs',
    'MySQL Architecture',
    'Distributed Systems',
    'Clean Architecture',
    'Open Source Contribution',
  ];

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.45, delay },
  });

  return (
    <section id="about" className="pt-6 sm:pt-8 pb-0 sm:pb-2 relative overflow-hidden">
      {/* Subtle background aura */}
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full pointer-events-none blur-[140px] opacity-15"
        style={{ background: 'radial-gradient(circle, #00D084 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* ══ LEFT — 7/12: Header + Narrative + Academic Facts ══ */}
          <div className="md:col-span-7 space-y-7">
            <SectionHeader
              number="01"
              title="About The Engineer"
              subtitle="Building intelligent, practical applications at the intersection of Java systems, data science, and AI."
              badge="Philosophy & Background"
              className="mb-4 sm:mb-6"
            />

            {/* Decorative giant magazine marker */}
            <div
              className="font-display font-black select-none leading-none -mb-4 sm:-mb-6 text-slate-900/[0.04] dark:text-white/[0.04] text-[clamp(4rem,10vw,7rem)] transition-colors duration-300"
              aria-hidden
            >
              01 // YMS
            </div>

            {/* Lead paragraph */}
            <motion.p
              {...fadeUp(0)}
              className="text-lg sm:text-xl leading-relaxed font-display text-slate-800 dark:text-[#F5F0E8] font-normal transition-colors duration-300"
            >
              I&apos;m a Computer Science Engineering student at{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Malnad College of Engineering, Hassan
              </strong>
              , interested in software development, artificial intelligence, and emerging technologies. I enjoy exploring technical ideas and developing practical solutions to real-world problems.
            </motion.p>

            {/* Secondary narrative */}
            <motion.p
              {...fadeUp(0.08)}
              className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 font-normal transition-colors duration-300"
            >
              My goal is to combine strong programming fundamentals with intelligent systems to build scalable, meaningful, and user-focused applications. My academic journey is anchored by disciplined computer science coursework, achieving a <strong className="text-amber-600 dark:text-amber-300 font-bold">{personalInfo.cgpa} CGPA</strong>, while actively contributing to student chapters, hackathons, and systems research.
            </motion.p>

            {/* Editorial divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="origin-left h-[1px] bg-gradient-to-r from-[#4ADE80]/50 via-[#FACC15]/40 to-transparent"
            />

            {/* Academic facts panel */}
            <motion.div
              {...fadeUp(0.16)}
              className="p-5 sm:p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md dark:bg-[#090D16]/95 dark:border-white/[0.08] backdrop-blur-md space-y-3 font-mono text-sm transition-colors duration-300 relative z-10"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                <span className="text-slate-500 text-xs">Institution</span>
                <span className="text-slate-900 dark:text-white font-medium text-right sm:text-left">
                  Malnad College of Engineering, Hassan
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                <span className="text-slate-500 text-xs">Degree &amp; Program</span>
                <span className="text-slate-700 dark:text-slate-200 text-right sm:text-left">
                  B.E. in Computer Science &amp; Engineering
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-white/[0.04]">
                <span className="text-slate-500 text-xs">Graduation Year</span>
                <span className="text-slate-700 dark:text-slate-200">Class of 2027</span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-slate-500 text-xs">Cumulative GPA</span>
                <span className="font-bold text-xl stat-gradient-text">
                  {personalInfo.cgpa} <span className="text-xs text-slate-500 font-normal">/ 10.0</span>
                </span>
              </div>
            </motion.div>

            {/* Technical Interest Chips */}
            <motion.div {...fadeUp(0.22)} className="flex flex-wrap gap-2 pt-1">
              {interestTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg font-mono text-xs text-slate-700 bg-slate-100 border border-slate-200/90 hover:border-emerald-500/40 dark:text-slate-300 dark:bg-white/[0.03] dark:border-white/[0.08] hover-gradient-text transition-all duration-300 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT — 5/12: Interactive Photo Showcase & Capability Cards ══ */}
          <div className="md:col-span-5 pt-4 md:pt-16 lg:pt-[104px] space-y-4 max-w-lg mx-auto md:max-w-none w-full">
            
            {/* Interactive Photo Switcher Card with 3D Tilt */}
            <TiltCard
              tiltAmount={8}
              glowColor="rgba(0, 208, 132, 0.2)"
              className="rounded-3xl overflow-hidden border border-slate-200 bg-white dark:border-white/[0.1] dark:bg-dark-900/80 backdrop-blur-md shadow-2xl transition-colors duration-300"
            >
              {/* Photo selector tab header */}
              <div className="flex items-center justify-between p-3 border-b border-slate-200 bg-slate-50 dark:border-white/[0.08] dark:bg-dark-950/60 transition-colors duration-300">
                <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>CAMPUS & ACTIVITIES</span>
                </div>
                <div className="flex items-center gap-1">
                  {photos.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        sound.playClick();
                        setActivePhoto(p.id as any);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                        activePhoto === p.id
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40 font-bold'
                          : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Display with Balanced Proportions & Centered Face Framing */}
              <div className="relative h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[500px] overflow-hidden bg-slate-900">
                <img
                  src={currentPhoto.url}
                  alt={currentPhoto.label}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700 ease-out"
                  style={{ objectPosition: currentPhoto.objectPosition }}
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Bottom caption glass pill */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-2xl bg-white/90 border border-slate-200 text-slate-800 dark:bg-dark-950/80 dark:border-white/[0.1] dark:text-slate-200 backdrop-blur-md shadow-lg flex items-center justify-between transition-colors duration-300">
                  <div className="flex items-center gap-2 text-xs font-mono min-w-0">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
                    <span className="font-medium tracking-tight truncate">{currentPhoto.caption}</span>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 shrink-0 ml-2">
                    MCE 2027
                  </span>
                </div>
              </div>
            </TiltCard>

            {/* Three Compact Capability Cards with Translucent Glass */}
            <div className="space-y-2.5">
              {capabilityCards.map((card, idx) => {
                const Icon = card.Icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-500/40 dark:bg-dark-950/60 dark:hover:bg-dark-950/80 dark:border-white/[0.08] backdrop-blur-md transition-all duration-300 group cursor-default shadow-md hover:shadow-lg"
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-white/[0.08]"
                        style={{ backgroundColor: `${card.accent}15`, color: card.accent }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-syne font-bold text-sm text-slate-900 dark:text-white group-hover-gradient-text transition-all duration-300">
                            {card.title}
                          </h4>
                          <span className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
                            {card.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1 font-normal transition-colors duration-300">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
