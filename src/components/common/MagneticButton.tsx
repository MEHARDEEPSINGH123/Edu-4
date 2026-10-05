'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'div' | 'a';
  href?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.35,
  onClick,
  as = 'div',
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 220, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (as === 'a' && href) {
    return (
      <motion.a
        ref={ref as any}
        href={href}
        style={{ x: smoothX, y: smoothY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`inline-block cursor-pointer ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  if (as === 'button') {
    return (
      <motion.button
        ref={ref as any}
        type="button"
        style={{ x: smoothX, y: smoothY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`inline-block cursor-pointer ${className}`}
      >
        {children}
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
