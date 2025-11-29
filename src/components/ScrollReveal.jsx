import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * ScrollReveal Component
 * Wraps children with scroll-triggered animations using Framer Motion's useInView hook
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to animate
 * @param {Object} props.variants - Framer Motion animation variants (should have 'hidden' and 'visible' states)
 * @param {number} props.threshold - Percentage of element visibility before triggering (0-1)
 * @param {boolean} props.once - Whether animation should only happen once
 */
const ScrollReveal = ({ 
  children, 
  variants, 
  threshold = 0.1, 
  once = true,
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: once,
    amount: threshold 
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
