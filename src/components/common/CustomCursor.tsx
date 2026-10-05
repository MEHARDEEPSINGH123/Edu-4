'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const moveHandler = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('.cursor-pointer') ||
        target?.closest('[role="button"]') ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'SELECT'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const leaveHandler = () => setIsVisible(false);

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', leaveHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', leaveHandler);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-9999 rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovered ? 48 : 16,
        height: isHovered ? 48 : 16,
        backgroundColor: isHovered ? 'rgba(255, 107, 53, 0.9)' : '#FFFFFF',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
}
