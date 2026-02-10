'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ScrollElephant - A fixed background elephant logo that transitions through
 * different "poses" as the user scrolls down the landing page.
 *
 * Scroll Progress -> Pose:
 *   0-15%   : Trunk Up (rotated so trunk lifts)
 *   15-35%  : Walking / Trunk Down (normal orientation, drifting right)
 *   35-55%  : Sitting (squished vertically, lowered)
 *   55-75%  : Standing Tall (stretched up, proud)
 *   75-100% : Dancing (wobble rotation + bounce)
 */

export const ScrollElephant = () => {
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Smooth spring for all transforms ──
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  // ── ROTATION: trunk up -> normal -> sitting tilt -> upright -> dancing wobble ──
  const rotate = useTransform(
    smoothProgress,
    [0, 0.12, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.82, 0.88, 0.94, 1.0],
    [-18, -8, 3, 8, -3, 0, -2, 5, -8, 10, -12, 8]
  );

  // ── VERTICAL POSITION: moves down as user scrolls, sits lower, then rises ──
  const translateY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.50, 0.55, 0.75, 1.0],
    [0, 15, 80, 50, 20, -15, 30]
  );

  // ── HORIZONTAL DRIFT: subtle side-to-side ──
  const translateX = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1.0],
    [0, 30, -15, 25, -30, 0]
  );

  // ── SCALE Y: squish for sitting, stretch for standing ──
  const scaleY = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.50, 0.55, 0.70, 0.75, 1.0],
    [1, 1, 0.72, 0.72, 1.05, 1.12, 1.0, 0.95]
  );

  // ── SCALE X: widen when sitting, normal otherwise ──
  const scaleX = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.50, 0.55, 0.70, 0.75, 1.0],
    [1, 1, 1.15, 1.15, 0.95, 1.0, 1.0, 1.05]
  );

  // ── OPACITY: clearly visible watermark, not distracting ──
  const elephantOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.3, 0.5, 0.7, 0.85, 1.0],
    [0.14, 0.16, 0.15, 0.17, 0.16, 0.18, 0.16]
  );

  // ── SKEW: adds a lean for walking and dancing poses ──
  const skewX = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.85, 0.92, 1.0],
    [0, 3, -2, 0, 4, -5, 6, -3]
  );

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
      style={{ zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.div
        style={{
          rotate,
          y: translateY,
          x: translateX,
          scaleX,
          scaleY,
          opacity: elephantOpacity,
          skewX,
        }}
        className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
      >
        {/* Logo is black on white; invert = white elephant on black; subtle green tint */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt=""
          className="w-full h-full object-contain select-none"
          style={{
            filter: 'invert(1) brightness(0.85) sepia(0.15) hue-rotate(100deg) saturate(1.1)',
          }}
          aria-hidden="true"
        />
      </motion.div>
    </motion.div>
  );
};
