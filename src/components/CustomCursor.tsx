import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for the outer trailing ring
  const springConfig = { damping: 24, stiffness: 280, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering an element with data-cursor or interactive tag
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
        setIsHovered(true);
        return;
      }

      const interactive = target.closest('button, a, input, textarea, [role="button"]');
      if (interactive) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center sharp laser dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 6 : 8,
          height: isHovered ? 6 : 8,
          transition: 'width 0.2s, height 0.2s',
        }}
      />

      {/* Outer fluid spring ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-emerald-400/50 backdrop-blur-[1px] transition-colors"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorText ? 68 : isHovered ? 48 : 32,
          height: cursorText ? 68 : isHovered ? 48 : 32,
          backgroundColor: cursorText
            ? 'rgba(0, 208, 132, 0.2)'
            : isHovered
            ? 'rgba(0, 208, 132, 0.08)'
            : 'rgba(0, 208, 132, 0.02)',
          borderColor: cursorText
            ? 'rgba(0, 208, 132, 0.7)'
            : isHovered
            ? 'rgba(0, 208, 132, 0.45)'
            : 'rgba(0, 208, 132, 0.25)',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s, border-color 0.2s',
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-mono font-bold tracking-widest uppercase text-emerald-300 text-center px-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
