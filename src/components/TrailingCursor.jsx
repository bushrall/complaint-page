"use client";

import React, { useEffect, useRef } from 'react';
import '../styles/TrailingCursor.css';

const TrailingCursor = () => {
  const circlesRef = useRef([]);
  const coordsRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);

  // Initialize circles and start animation
  useEffect(() => {
    // Initialize circle positions
    circlesRef.current.forEach((circle) => {
      if (circle) {
        circle.x = 0;
        circle.y = 0;
      }
    });

    // Mouse move event handler
    const handleMouseMove = (e) => {
      coordsRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    // Animation function - CORRECTED VERSION
    const animateCircles = () => {
      let x = coordsRef.current.x;
      let y = coordsRef.current.y;

      circlesRef.current.forEach((circle, index) => {
        if (!circle) return;

        // Position circle at current coordinates
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;

        // Scale effect
        circle.style.transform = `scale(${(circlesRef.current.length - index) / circlesRef.current.length})`;

        // Store current position
        circle.x = x;
        circle.y = y;

        // Get next circle and calculate interpolation
        const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      // CRITICAL FIX: Continue the animation loop
      animationFrameRef.current = requestAnimationFrame(animateCircles);
    };

    // Start event listener and animation
    window.addEventListener('mousemove', handleMouseMove);
    
    // CRITICAL FIX: Start the animation loop exactly like the original
    animateCircles(); // This starts the first frame
    // The requestAnimationFrame inside animateCircles continues the loop

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Create circle elements
  const circles = Array.from({ length: 5 }, (_, index) => (
    <div
      key={index}
      className="circle"
      ref={(el) => (circlesRef.current[index] = el)}
    />
  ));

  return <div className="cursor-container">{circles}</div>;
};

export default TrailingCursor;