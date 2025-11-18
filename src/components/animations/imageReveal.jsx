"use client";

import React, { useRef, useEffect, useState } from "react";

function ImageReveal({ 
  src, 
  alt = "", 
  animateOnScroll = true, 
  delay = 0,
  className = "",
  scrub = false
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!animateOnScroll);

  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!scrub) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay * 1000);
              observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [animateOnScroll, delay, scrub]);

  useEffect(() => {
    if (!scrub || !animateOnScroll || !containerRef.current || !imageRef.current) return;

    const handleScroll = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startScroll = windowHeight * 0.8;
      const endScroll = windowHeight * 0.2;
      
      if (rect.top <= startScroll && rect.top >= endScroll) {
        const progress = 1 - (rect.top - endScroll) / (startScroll - endScroll);
        imageRef.current.style.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
      } else if (rect.top < endScroll) {
        imageRef.current.style.clipPath = 'inset(0 0 0% 0)';
      } else {
        imageRef.current.style.clipPath = 'inset(0 0 100% 0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrub, animateOnScroll]);

  useEffect(() => {
    if (!animateOnScroll && imageRef.current) {
      setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);
    }
  }, [animateOnScroll, delay]);

  return (
    <div 
      ref={containerRef} 
      className={className}
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt}
        className={!scrub && isVisible ? 'animate-reveal' : ''}
        style={{ 
          clipPath: scrub ? 'inset(0 0 100% 0)' : undefined,
          willChange: 'clip-path',
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
      <style jsx>{`
        @keyframes reveal {
          from {
            clip-path: inset(0 0 100% 0);
          }
          to {
            clip-path: inset(0 0 0% 0);
          }
        }
        .animate-reveal {
          animation: reveal 0.6s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
      `}</style>
    </div>
  );
}

export default ImageReveal;