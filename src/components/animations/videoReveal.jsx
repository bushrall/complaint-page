"use client";

import React, { useRef, useEffect, useState } from "react";

function videoReveal({ 
  src, 
  alt = "", 
  animateOnScroll = true, 
  delay = 0,
  className = "",
  scrub = false,
  autoPlay = false,
  muted = true,
  loop = false,
  controls = false
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
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
    if (!scrub || !animateOnScroll || !containerRef.current || !videoRef.current) return;

    const handleScroll = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startScroll = windowHeight * 0.8;
      const endScroll = windowHeight * 0.2;
      
      if (rect.top <= startScroll && rect.top >= endScroll) {
        const progress = 1 - (rect.top - endScroll) / (startScroll - endScroll);
        videoRef.current.style.clipPath = `inset(0 0 ${(1 - progress) * 100}% 0)`;
      } else if (rect.top < endScroll) {
        videoRef.current.style.clipPath = 'inset(0 0 0% 0)';
      } else {
        videoRef.current.style.clipPath = 'inset(0 0 100% 0)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrub, animateOnScroll]);

  useEffect(() => {
    if (!animateOnScroll && videoRef.current) {
      setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);
    }
  }, [animateOnScroll, delay]);

  // Handle video play when revealed (for scrub mode)
  useEffect(() => {
    if (!videoRef.current || !scrub || !autoPlay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(console.error);
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [scrub, autoPlay]);

  return (
    <div 
      ref={containerRef} 
      className={className}
    >
      <video 
        ref={videoRef}
        src={src} 
        alt={alt}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        controls={controls}
        className={!scrub && isVisible ? 'animate-reveal' : ''}
        style={{ 
          clipPath: scrub ? 'inset(0 0 100% 0)' : undefined,
          willChange: 'clip-path',
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
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

export default videoReveal;