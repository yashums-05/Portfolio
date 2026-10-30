import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const InteractiveScrollBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Framer Motion scroll hooks with smooth spring dampening to eliminate jerking
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
  });

  // Smooth slow parallax transformations that travel gently through the sections
  const layer1Y = useTransform(smoothProgress, [0, 1], [0, 140]);
  const layer2Y = useTransform(smoothProgress, [0, 1], [0, 220]);

  const rotatePerspective = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const scalePerspective = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.15]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      radius: 170,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });

    // Track scroll position for canvas physics
    let lastScrollY = window.scrollY;
    let currentScrollVelocity = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      currentScrollVelocity = currentY - lastScrollY;
      lastScrollY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Interactive Star / Particle node definition with z-depth
    interface StarNode {
      x: number;
      y: number;
      z: number; // 0.1 to 1.0 depth factor
      radius: number;
      baseColor: string;
      alpha: number;
      vx: number;
      vy: number;
      pulse: number;
      pulseSpeed: number;
    }

    const nodeCount = Math.min(Math.floor(width / 14), 95);
    const nodes: StarNode[] = [];
    const colors = ['#00D084', '#38BDF8', '#BFFF00', '#FBBF24', '#FFFFFF'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1, // Depth layer
        radius: Math.random() * 2 + 1,
        baseColor: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // Grid coordinates for interactive blueprint mesh
    const gridSize = 48;

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Damp scroll velocity
      currentScrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // ── 1. Draw Scroll-Interactive Grid Matrix ──
      const scrollOffset = (window.scrollY * 0.3) % gridSize;
      ctx.lineWidth = 0.5;
      const isDark = document.documentElement.classList.contains('dark');

      // Vertical lines with mouse light distortion
      for (let x = 0; x < width; x += gridSize) {
        const distToMouse = Math.abs(x - mouse.x);
        const glowFactor = Math.max(0, 1 - distToMouse / 220);
        
        ctx.beginPath();
        ctx.strokeStyle = glowFactor > 0 
          ? `rgba(0, 208, 132, ${0.04 + glowFactor * 0.12})` 
          : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.03)');
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines that glide downward with scroll
      for (let y = scrollOffset; y < height + gridSize; y += gridSize) {
        const distToMouse = Math.abs(y - mouse.y);
        const glowFactor = Math.max(0, 1 - distToMouse / 220);

        ctx.beginPath();
        ctx.strokeStyle = glowFactor > 0 
          ? `rgba(0, 208, 132, ${0.04 + glowFactor * 0.12})` 
          : (isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(15, 23, 42, 0.03)');
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // ── 2. Draw Interactive Constellation Nodes with Scroll Depth ──
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const opacity = (1 - dist / 130) * 0.22 * nodes[i].z;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 208, 132, ${opacity})`;
            ctx.lineWidth = 0.8 * nodes[i].z;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // ── 3. Update & Draw Depth-Aware Particle Streaks ──
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Base velocity + smooth scroll velocity parallax
        node.x += node.vx;
        // Smooth clamped scroll velocity prevents particle jerking during rapid wheel notches
        const clampedVel = Math.max(-16, Math.min(16, currentScrollVelocity));
        node.y += clampedVel * 0.16 * node.z;
        node.y += node.vy;

        // Wrap around canvas boundaries smoothly
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Mouse repelling & magnetic connection
        const mdx = mouse.x - node.x;
        const mdy = mouse.y - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mDist < mouse.radius) {
          const force = (1 - mDist / mouse.radius) * 2.2 * node.z;
          node.x -= (mdx / mDist) * force;
          node.y -= (mdy / mDist) * force;

          // Glowing laser filament to mouse
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 208, 132, ${(1 - mDist / mouse.radius) * 0.45})`;
          ctx.lineWidth = 1.2 * node.z;
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Particle pulse
        node.pulse += node.pulseSpeed;
        const pulseScale = 1 + Math.sin(node.pulse) * 0.25;

        // If scrolling quickly, stretch nodes into warp streaks!
        const stretchY = Math.min(Math.abs(currentScrollVelocity) * 0.4 * node.z, 24);

        ctx.beginPath();
        if (stretchY > 2) {
          // Motion warp streak
          ctx.ellipse(
            node.x,
            node.y,
            node.radius * pulseScale * node.z,
            (node.radius + stretchY) * node.z,
            0,
            0,
            Math.PI * 2
          );
        } else {
          ctx.arc(node.x, node.y, node.radius * pulseScale * node.z, 0, Math.PI * 2);
        }

        ctx.fillStyle = node.baseColor;
        ctx.shadowBlur = 10 * node.z;
        ctx.shadowColor = node.baseColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouch);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      
      {/* ── PARALLAX LAYER 1: Deep Atmospheric Radial Gradient Mesh ── */}
      <motion.div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          y: layer1Y,
          scale: scalePerspective,
          rotateZ: rotatePerspective,
        }}
      >
        {/* Upper Left Glowing Aperture */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[140px] opacity-25"
          style={{ background: 'radial-gradient(circle, #00D084 0%, #10B981 30%, transparent 70%)' }}
        />

        {/* Center Blueprints Accent */}
        <div
          className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-20"
          style={{ background: 'radial-gradient(circle, #38BDF8 0%, #6366F1 35%, transparent 70%)' }}
        />

        {/* Lower Amber Terminal Accent */}
        <div
          className="absolute -bottom-[10%] left-[25%] w-[45vw] h-[45vw] rounded-full blur-[150px] opacity-15"
          style={{ background: 'radial-gradient(circle, #F5A623 0%, #FBBF24 35%, transparent 70%)' }}
        />
      </motion.div>

      {/* ── PARALLAX LAYER 2: Floating High-Tech Vector Schematics & Blueprint Geometry ── */}
      <motion.div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          y: layer2Y,
        }}
      >
        {/* Floating Schematic SVG 1 — Top Right Reticle */}
        <svg
          className="absolute top-[12%] right-[8%] w-48 h-48 text-emerald-400/30 animate-[spin_60s_linear_infinite]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="50" cy="50" r="45" strokeWidth="0.7" strokeDasharray="3,3" />
          <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="22" strokeWidth="0.7" strokeDasharray="6,4" />
          <line x1="50" y1="2" x2="50" y2="98" strokeWidth="0.4" />
          <line x1="2" y1="50" x2="98" y2="50" strokeWidth="0.4" />
        </svg>

        {/* Floating Schematic SVG 2 — Left Mid Circuit Node */}
        <svg
          className="absolute top-[45%] left-[5%] w-64 h-64 text-cyan-400/25"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
        >
          <rect x="15" y="15" width="90" height="90" rx="8" strokeWidth="0.6" strokeDasharray="4,4" />
          <circle cx="15" cy="15" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="105" cy="15" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="15" cy="105" r="4" fill="currentColor" opacity="0.6" />
          <circle cx="105" cy="105" r="4" fill="currentColor" opacity="0.6" />
          <line x1="60" y1="15" x2="60" y2="105" strokeWidth="0.4" />
          <line x1="15" y1="60" x2="105" y2="60" strokeWidth="0.4" />
          <text x="24" y="28" fill="currentColor" fontSize="5" fontFamily="monospace" opacity="0.7">
            [SYS.NODE.0x9F]
          </text>
        </svg>


      </motion.div>

      {/* ── PARALLAX LAYER 3: Dynamic HTML5 Physics & Constellation Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-70"
      />

      {/* ── Subtle Vignette & Scanline Overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, var(--theme-canvas-vignette, rgba(5,5,8,0.7)) 100%)',
        }}
      />
    </div>
  );
};
