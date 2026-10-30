import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const PersistentBackgroundPortrait: React.FC = () => {
  const { scrollY, scrollYProgress } = useScroll();
  const [heroBottom, setHeroBottom] = useState<number>(1150);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState<boolean>(true);

  // Measure device characteristics: cleanly separate laptop/desktop PC from mobile phones
  useEffect(() => {
    const checkDevice = () => {
      if (typeof window === 'undefined') return;
      
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isPortraitScreen = typeof screen !== 'undefined' && screen.height > screen.width;
      const isPortraitViewport = window.innerHeight > window.innerWidth;
      
      // On mobile phones (including Chrome "Desktop site" mode), screen orientation is portrait or mobile UA
      const isMobile = isMobileUA || isPortraitScreen || isPortraitViewport;
      
      setIsMobileDevice(isMobile);
      setIsNarrowMobile(window.innerWidth < 640);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Measure the exact bottom position of the Hero section on current viewport
  useEffect(() => {
    const measureHero = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        const bottom = rect.bottom + scrollTop;
        if (bottom > 400) {
          setHeroBottom(bottom);
        }
      }
    };

    measureHero();
    const t1 = setTimeout(measureHero, 300);
    const t2 = setTimeout(measureHero, 1200);
    window.addEventListener('resize', measureHero);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', measureHero);
    };
  }, []);

  // Ultra-smooth spring physics applied directly to scroll position to eliminate all jerking & wheel notch judder
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
    restDelta: 0.0001,
  });

  const smoothScrollY = useSpring(scrollY, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
    restDelta: 0.1,
  });

  // ── LAPTOP / DESKTOP (lg+): Scrolls Smoothly Without Any Jerking ──
  // 1. Opacity: Hidden during Hero (scrollY < 420px), fades in smoothly as entering About
  const desktopOpacity = useTransform(
    smoothScrollY,
    [420, 680, 2000, 6500, 8500],
    [0, 0.35, 0.32, 0.28, 0.15]
  );

  // 2. Vertical scroll: in mobile desktop view (mobile/portrait), travel lower (up to 460px);
  // on a real laptop/desktop PC (landscape), travel gently (max 40px) so the prominent image stays perfectly framed
  const desktopMaxTravel = isMobileDevice ? 460 : 40;

  const desktopY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
    [
      0,
      desktopMaxTravel * 0.15,
      desktopMaxTravel * 0.38,
      desktopMaxTravel * 0.60,
      desktopMaxTravel * 0.78,
      desktopMaxTravel * 0.90,
      desktopMaxTravel,
    ]
  );

  const desktopScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [1, 0.99, 0.97, 0.95]
  );

  // ── MOBILE / PHONE (< lg): Perfectly Balanced Travel That Never Goes Out of Display ──
  // 1. Opacity: Strictly 0 throughout Hero section (including Hero text & photo), enters only AFTER Hero ends
  const mobileOpacity = useTransform(smoothScrollY, (latest) => {
    // Stay completely hidden while within the Hero section
    const startFade = Math.max(700, heroBottom - 40);
    const fullFade = startFade + 180;

    if (latest < startFade) return 0;
    if (latest < fullFade) {
      return ((latest - startFade) / (fullFade - startFade)) * 0.25;
    }
    return 0.24;
  });

  // 2. Controlled vertical travel:
  // - On regular mobile phone (<640px width), max 210px so the portrait NEVER falls off the bottom of the display
  // - On wider mobile desktop view (>=640px width), travels up to 500px as confirmed correct
  const mobileMaxTravel = isNarrowMobile ? 210 : 500;

  const mobileY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
    [
      0,
      mobileMaxTravel * 0.16,
      mobileMaxTravel * 0.38,
      mobileMaxTravel * 0.60,
      mobileMaxTravel * 0.78,
      mobileMaxTravel * 0.90,
      mobileMaxTravel,
    ]
  );

  return (
    <>
      {/* ── MOBILE / PHONE (< lg): Constant Background Portrait Watermark ── */}
      <div className="fixed inset-0 pointer-events-none z-0 lg:hidden overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ opacity: mobileOpacity, y: mobileY }}
          className="absolute top-12 sm:top-16 right-[-20px] w-[260px] sm:w-[340px] h-[360px] sm:h-[460px] flex items-center justify-center overflow-visible"
        >
          {/* Subtle Ambient Rim Light */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent blur-[90px] opacity-25 rounded-full" />

          {/* Portrait in Black and White Condition */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
            }}
          >
            <img
              src="/images/yashwanth-hero.png?v=8"
              alt="Yashwanth M S — Background Presence"
              className="w-full h-full object-contain object-bottom filter grayscale contrast-[1.12] brightness-[0.75] dark:brightness-[0.70] drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              loading="eager"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50 dark:from-[#050508] to-transparent transition-colors duration-300" />
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP (lg+): Constant Background Portrait from About onwards ── */}
      <div className="fixed inset-0 pointer-events-none z-0 hidden lg:block overflow-hidden" aria-hidden="true">
        <motion.div
          style={{ opacity: desktopOpacity, y: desktopY, scale: desktopScale }}
          className="absolute top-10 lg:top-12 xl:top-14 right-0 w-[428px] lg:w-[468px] xl:w-[528px] 2xl:w-[568px] h-[548px] lg:h-[608px] xl:h-[668px] flex items-center justify-center overflow-visible"
        >
          {/* Subtle Monochrome Ambient Rim Light */}
          <div
            className="absolute -inset-4 bg-gradient-to-tr from-white/[0.04] via-emerald-500/10 to-transparent blur-[130px] opacity-20 rounded-full"
          />

          {/* The Cutout Portrait in Black and White Condition with Smooth Bottom Fade */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            }}
          >
            <img
              src="/images/yashwanth-hero.png?v=8"
              alt="Yashwanth M S — Background Presence"
              className="w-full h-full object-contain object-bottom filter grayscale contrast-[1.15] brightness-[0.80] dark:brightness-[0.72] drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              loading="lazy"
            />

            {/* Bottom dark/light blend to integrate smoothly with page floor */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-50 dark:from-[#050508] to-transparent transition-colors duration-300" />
          </div>

          {/* Technical Metadata Tag */}
          <div className="absolute bottom-6 right-4 sm:right-8 z-20 px-3 py-1 rounded-xl bg-white/90 border border-slate-200/80 text-slate-700 shadow-xl dark:bg-[#08080D]/90 dark:border-white/[0.1] dark:text-slate-400 backdrop-blur-md flex items-center gap-2 text-[11px] font-mono transition-colors duration-300">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>YMS // SYSTEM PORTRAIT</span>
          </div>
        </motion.div>
      </div>
    </>
  );
};
