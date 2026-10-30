import React from 'react';

interface KineticMarqueeProps {
  items?: string[];
  direction?: 'left' | 'right';
  speed?: 'normal' | 'fast' | 'slow';
  accentText?: string;
}

const defaultItems = [
  'JAVA 21 ENTERPRISE',
  'DEEP REINFORCEMENT LEARNING',
  'MALNAD COLLEGE OF ENGINEERING',
  'CGPA 9.09 MERIT',
  'SPRING BOOT & REST APIS',
  'SUSTAINABLE COMPUTING',
  'IUCEE EWB CHAPTER',
  'SYSTEMS ARCHITECTURE',
  'COMPUTER VISION & XAI',
  'PPO & LSTM ALGORITHMS',
];

export const KineticMarquee: React.FC<KineticMarqueeProps> = ({
  items = defaultItems,
  direction = 'left',
  speed = 'normal',
  accentText = '•',
}) => {
  const duration = speed === 'fast' ? '22s' : speed === 'slow' ? '45s' : '32s';

  return (
    <div className="relative w-full overflow-hidden py-3 border-y border-slate-200/80 bg-slate-100/70 dark:border-white/[0.08] dark:bg-dark-950/70 backdrop-blur-md select-none group transition-colors duration-300">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-dark-950 to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-dark-950 to-transparent z-10 pointer-events-none transition-colors duration-300" />

      <div
        className="flex whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `${direction === 'left' ? 'marqueeScroll' : 'marqueeScrollReverse'} ${duration} linear infinite`,
        }}
      >
        {[...items, ...items, ...items].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-6 mx-4 font-mono text-xs sm:text-sm tracking-[0.18em] uppercase transition-colors"
          >
            <span className="text-slate-600 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors font-medium">
              {item}
            </span>
            <span className="text-emerald-500 dark:text-emerald-400 font-bold scale-125">
              {accentText}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
