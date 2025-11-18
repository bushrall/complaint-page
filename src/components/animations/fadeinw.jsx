'use client';
import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import '../../styles/main.css';

export default function FadeInW({ children }) {
  const element = useRef(null);
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ['start 0.9', 'start 0.01']
  });

  const text = React.Children.map(children, child => 
    typeof child === 'string' ? child : ''
  ).join('') || '';
  
  // Split into words first to preserve word boundaries
  const words = text.split(/(\s+)/); // Split including spaces

  return (
    <p className="paragraph" ref={element}>
      {words.map((word, wordIndex) => {
        // If it's a space, just render it directly
        if (word.match(/^\s+$/)) {
          return <span key={wordIndex}>{word}</span>;
        }
        
        // For actual words, wrap in span and split characters
        return (
          <span key={wordIndex} className="word">
            {word.split('').map((character, charIndex) => {
              // Calculate position in entire text
              const charsBefore = words
                .slice(0, wordIndex)
                .join('')
                .length + charIndex;
              
              const start = charsBefore / text.length;
              const end = start + (1 / text.length);
              
              return (
                <Character 
                  key={`${wordIndex}-${charIndex}`} 
                  range={[start, end]} 
                  progress={scrollYProgress}
                >
                  {character}
                </Character>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}

const Character = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  
  return (
    <span className="character-wrapper">
      <span className="shadow">{children}</span>
      <motion.span className="motion-character" style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};