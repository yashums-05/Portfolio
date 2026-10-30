import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    /* Top illuminated laser line */
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#4ADE80] via-[#A3E635] to-[#FACC15] origin-left z-[70] shadow-[0_0_14px_rgba(74,222,128,0.7)]"
      style={{ scaleX }}
    />
  );
};
