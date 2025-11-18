// rolling.jsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Rolling component - Creates a scroll-triggered rolling text animation
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content with .char elements
 * @param {number} props.repeat - Number of times to repeat the roll (default: 8)
 * @param {number} props.duration - Total animation duration (default: 4)
 * @param {string} props.ease - Easing function (default: "power4.inOut")
 * @param {string} props.start - ScrollTrigger start position (default: "top 80%")
 * @param {string} props.end - ScrollTrigger end position (default: "top 20%")
 * @param {boolean} props.scrub - Whether to scrub animation with scroll (default: true)
 * @param {boolean} props.markers - Show ScrollTrigger markers for debugging (default: false)
 * @param {string} props.className - Additional CSS classes
 */
const Rolling = ({ 
  children, 
  repeat = 8,
  duration = 4,
  ease = "power4.inOut",
  start = "top 80%",
  end = "top 20%",
  scrub = true,
  markers = false,
  className = ""
}) => {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.char');
    
    if (chars.length === 0) {
      console.warn('Rolling: No elements with class "char" found');
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: start,
        end: end,
        scrub: scrub,
        markers: markers
      }
    });

    chars.forEach((char, i) => {
      const original = char.querySelector('.original-text');
      const clone = char.querySelector('.clone-text');
      
      if (!original || !clone) {
        console.warn(`Rolling: Missing .original-text or .clone-text in char ${i}`);
        return;
      }

      gsap.set(clone, {
        yPercent: i % 2 === 0 ? -100 : 100
      });
      
      let roll = gsap.to([original, clone], {
        repeat: repeat,
        ease: "none",
        yPercent: i % 2 === 0 ? "+=100" : "-=100",
        duration: 1
      });
      
      tl.add(roll, 0);
    });
    
    gsap.to(tl, { 
      progress: 1, 
      duration: duration, 
      ease: ease 
    });

    timelineRef.current = tl;

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.scrollTrigger?.kill();
        timelineRef.current.kill();
      }
    };
  }, [repeat, duration, ease, start, end, scrub, markers]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default Rolling;