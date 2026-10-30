import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
  showGlare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  tiltAmount = 14,
  glowColor = 'rgba(0, 208, 132, 0.18)',
  showGlare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 300 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(smoothX, [0, 1], [-tiltAmount, tiltAmount]);

  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const mouseY = (e.clientY - rect.top) / rect.height;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {children}

        {/* Specular glare overlay */}
        {showGlare && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden mix-blend-overlay"
            style={{
              background: `radial-gradient(circle 320px at ${glareX} ${glareY}, ${glowColor}, transparent 70%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};
