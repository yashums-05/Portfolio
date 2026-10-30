import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  number: string;       // e.g. '01', '02'
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  title,
  subtitle,
  badge,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`${className || 'mb-8 md:mb-12'} ${isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-3xl'}`}
    >
      {/* Large faint section watermark number with clean spacing */}
      <div className={`relative flex ${isCenter ? 'justify-center' : ''} mb-2.5 sm:mb-3.5 select-none pointer-events-none overflow-hidden`}>
        <span
          className="font-mono font-bold text-6xl sm:text-7xl lg:text-8xl leading-none select-none pointer-events-none text-slate-900/[0.07] dark:text-white/[0.08] tracking-tight transition-colors duration-300"
        >
          {number}
        </span>
      </div>

      {/* Accent line + badge row */}
      <div className={`flex items-center gap-3 mb-3.5 sm:mb-4 relative z-10 ${isCenter ? 'justify-center' : ''}`}>
        <span
          className="block h-[2px] w-12 sm:w-14 flex-shrink-0 bg-gradient-to-r from-[#4ADE80] via-[#A3E635] to-[#FACC15]"
        />
        {badge && (
          <span
            className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-2.5 py-1 rounded text-emerald-700 bg-emerald-500/10 border border-emerald-500/25 dark:text-[#BFFF00] dark:bg-[rgba(191,255,0,0.08)] dark:border-[rgba(191,255,0,0.22)] transition-colors duration-300"
          >
            {badge}
          </span>
        )}
      </div>

      {/* Section title */}
      <h2
        className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 dark:text-white mb-2.5 transition-colors duration-300 ${isCenter ? 'mx-auto' : ''}`}
      >
        {title}
      </h2>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl transition-colors duration-300">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
