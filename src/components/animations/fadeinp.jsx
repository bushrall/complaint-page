/*'use client';
import React, { useRef, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import '../../styles/main.css';

export default function FadeInP({ children }) {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.25']
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", e => console.log(e));
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.p
      className="paragraph"
      ref={element}
      style={{ opacity: scrollYProgress }}
    >
      {children}
    </motion.p>
  );
}*/