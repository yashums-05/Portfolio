import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, ArrowRight, ExternalLink, ChevronDown, Sparkles, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../utils/audio';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Cursor tracking for dynamic multi-gradient typography
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, angle: 135, isHovered: false });
  const headingRef = useRef<HTMLHeadingElement>(null);

  const handleHeadingMouseMove = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!headingRef.current) return;
    const rect = headingRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.round((Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180) / Math.PI + 180);
    setMousePos({ x, y, angle, isHovered: true });
  };

  const handleHeadingMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, isHovered: false }));
  };

  // Scroll parallax for typography
  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-start pt-[76px] pb-4 overflow-x-clip"
    >
      {/* ─── Ambient Atmospheric Silhouette Rim Lighting ─── */}
      <div
        className="absolute top-1/4 right-[5%] w-[480px] h-[640px] pointer-events-none rounded-full blur-[160px] opacity-15"
        style={{ background: 'radial-gradient(circle, #00D084 0%, #38BDF8 40%, transparent 75%)' }}
      />
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none rounded-full blur-[160px] opacity-10"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
      />

      {/* ─── Main Hero Viewport Composition ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-start relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-start pt-0 pb-1">
          
          {/* ══════════════════ LEFT COLUMN: Editorial Typography ══════════════════ */}
          <motion.div
            style={{ y: textY }}
            className="md:col-span-7 lg:col-span-8 xl:col-span-8 flex flex-col gap-4 sm:gap-5 py-0 relative z-30 overflow-visible mt-0"
          >
            {/* Signature Monogram / Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-emerald-700 dark:text-emerald-300 font-semibold">
                YMS — AN ENGINEER'S PERSPECTIVE
              </span>
            </motion.div>

            {/* Prominent Editorial Name with Interactive Multi-Gradient on Cursor Movement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="overflow-visible w-full"
            >
              <h1
                ref={headingRef}
                onMouseMove={handleHeadingMouseMove}
                onMouseLeave={handleHeadingMouseLeave}
                className="font-display font-black uppercase tracking-[-0.05em] sm:tracking-tighter leading-[0.92] sm:leading-[0.88] select-none cursor-pointer group overflow-visible pr-0 sm:pr-4 lg:pr-6"
              >
                <span
                  className="block lg:inline-block min-w-max text-[clamp(3.6rem,14vw,4.8rem)] sm:text-[4.8rem] md:text-[5.2rem] lg:text-[6.5rem] xl:text-[7.8rem] 2xl:text-[8.5rem] bg-clip-text text-transparent transition-all duration-300 pr-0 lg:pr-3 whitespace-nowrap"
                  style={{
                    backgroundImage: mousePos.isHovered
                      ? `linear-gradient(${mousePos.angle}deg, #00D084 0%, #38BDF8 25%, #A855F7 50%, #F5A623 75%, #2DFFA0 100%)`
                      : isDark
                        ? 'linear-gradient(135deg, #F5F0E8 0%, #EDE6D6 50%, #A8B8D0 100%)'
                        : 'linear-gradient(135deg, #000000 0%, #0F172A 100%)',
                    backgroundSize: '200% 200%',
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: mousePos.isHovered ? 'drop-shadow(0 0 25px rgba(0,208,132,0.35))' : 'none',
                    transition: 'background-position 0.1s ease-out, filter 0.3s ease',
                  }}
                >
                  YASHWANTH
                </span>
                <span
                  className="block lg:inline-block min-w-max text-[clamp(3.6rem,14vw,4.8rem)] sm:text-[4.8rem] md:text-[5.2rem] lg:text-[6.5rem] xl:text-[7.8rem] 2xl:text-[8.5rem] bg-clip-text text-transparent transition-all duration-300 pr-0 lg:pr-3 whitespace-nowrap"
                  style={{
                    backgroundImage: mousePos.isHovered
                      ? `linear-gradient(${mousePos.angle + 180}deg, #F5A623 0%, #A855F7 25%, #38BDF8 55%, #00D084 80%, #CCFF00 100%)`
                      : 'linear-gradient(90deg, #00D084 0%, #38BDF8 50%, #F5A623 100%)',
                    backgroundSize: '200% 200%',
                    backgroundPosition: `${100 - mousePos.x}% ${100 - mousePos.y}%`,
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: mousePos.isHovered ? 'drop-shadow(0 0 25px rgba(56,189,248,0.35))' : 'none',
                    transition: 'background-position 0.1s ease-out, filter 0.3s ease',
                  }}
                >
                  M S
                </span>
              </h1>
            </motion.div>

            {/* Kinetic Laser Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="origin-left flex items-center gap-2"
            >
              <div className="h-[2px] w-24 bg-gradient-to-r from-emerald-500 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </motion.div>

            {/* Main Headline */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white hero-headline-hover tracking-tight cursor-default"
            >
              Engineering Ideas Into Intelligent Systems.
            </motion.p>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-xl font-normal transition-colors duration-300"
            >
              Computer Science Engineering student passionate about Java development, artificial intelligence, and building practical technology solutions.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5 pt-1"
            >
              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-xs sm:text-sm text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:shadow-[0_0_24px_rgba(0,208,132,0.5)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  sound.playPop();
                  onOpenResume();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 hover:border-emerald-500 hover:bg-slate-50 dark:text-slate-200 dark:bg-white/[0.04] dark:border-white/[0.12] dark:hover:bg-white/[0.08] dark:hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span>View Resume</span>
              </button>

              <a
                href="#contact"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs sm:text-sm text-slate-800 bg-white border border-slate-300 hover:border-emerald-500 hover:bg-slate-50 dark:text-slate-200 dark:bg-white/[0.04] dark:border-white/[0.12] dark:hover:bg-white/[0.08] dark:hover:border-emerald-400/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-sm group"
              >
                <Mail className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </a>
            </motion.div>

            {/* Social channels row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex flex-wrap items-center gap-5 pt-1"
            >
              {[
                { href: personalInfo.socialLinks.github, label: 'GitHub' },
                { href: personalInfo.socialLinks.linkedin, label: 'LinkedIn' },
                { href: `mailto:${personalInfo.socialLinks.email}`, label: 'Email' },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1.5 font-mono text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors group cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                  <span className="group-hover-gradient-text transition-all duration-300">{label}</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-500" />
                </a>
              ))}
            </motion.div>

            {/* Verified Academic Profile Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="flex flex-wrap lg:flex-nowrap items-center gap-x-2.5 sm:gap-x-3 lg:gap-x-3.5 font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 pt-3 pb-1 border-t border-slate-200/80 dark:border-white/[0.06] whitespace-nowrap overflow-x-auto no-scrollbar"
            >
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                CGPA: {personalInfo.cgpa} / 10.0
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-slate-900 dark:text-white font-medium shrink-0">Malnad College of Engineering, Hassan</span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-slate-600 dark:text-slate-400 shrink-0">Class of 2027</span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">Primary: Java</span>
            </motion.div>
          </motion.div>

          {/* ══════════════════ RIGHT COLUMN: Cinematic Integrated Photograph (Expanded & Scaled) ══════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-5 lg:col-span-4 xl:col-span-4 relative flex items-start justify-center md:justify-end py-0 self-start -translate-x-0 md:-translate-x-2 lg:-translate-x-4 xl:-translate-x-8 z-20"
          >
            {/* Ambient Silhouette Subtle Ambient Lighting */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-transparent blur-[160px] opacity-25 pointer-events-none rounded-full" />

            {/* Portrait Wrapper - Top hair starts exactly 5-6px down from navbar, organic uncropped silhouette */}
            <div className="relative w-full max-w-[500px] sm:max-w-[560px] md:max-w-none md:w-[138%] lg:w-[172%] xl:w-[185%] 2xl:w-[195%] flex items-start justify-center overflow-visible -mt-1 sm:-mt-1 md:-mt-1 lg:-mt-1 mb-0">
              
              {/* Drop-shadow filter wrapper with origin-top zoom */}
              <div className="relative w-full filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)] dark:drop-shadow-[0_20px_45px_rgba(0,0,0,0.85)] scale-[1.18] sm:scale-[1.22] md:scale-[1.25] lg:scale-[1.28] origin-top transition-transform duration-500 ease-out">
                {/* Aspect-Locked Alpha Masked Portrait Container - Deep Atmospheric Bottom Melt & Natural Silhouette */}
                <div
                  className="relative w-full aspect-[709/1024] overflow-visible"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,0.65) 86%, rgba(0,0,0,0.2) 94%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,0.92) 78%, rgba(0,0,0,0.65) 86%, rgba(0,0,0,0.2) 94%, transparent 100%)',
                    WebkitMaskSize: '100% 100%',
                    maskSize: '100% 100%',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                  }}
                >
                  <img
                    src="/images/yashwanth-hero.png?v=17"
                    alt="Yashwanth M S — Computer Science Engineer"
                    className="w-full h-full object-contain object-top contrast-[1.05] brightness-[1.02]"
                    loading="eager"
                  />
                </div>

                {/* Floating Monogram Stamp - Anchored at the true bottom of the scaled image */}
                <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 lg:bottom-7 right-2 sm:right-4 md:right-4 lg:right-4 xl:right-6 z-30 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl bg-white/90 border border-slate-200/80 text-slate-800 dark:bg-dark-950/85 dark:border-emerald-500/30 dark:text-white backdrop-blur-md shadow-2xl flex items-center gap-2 text-[10px] sm:text-xs font-mono transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold">YMS // CSE 2027</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── Scroll Indicator — Bottom Center ─── */}
        <div className="flex flex-col items-center justify-center mt-10 sm:mt-14 md:mt-16 pt-4 pb-2 text-slate-400 dark:text-slate-500 font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300">
          <span className="mb-1 text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-emerald-500" />
          </motion.div>
        </div>
      </div>

    </section>
  );
};
