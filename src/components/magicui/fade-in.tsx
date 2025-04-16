'use client';

import { motion, HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  delay?: number;
  threshold?: number;
  distance?: number;
  once?: boolean;
}

/**
 * FadeIn Component
 * 
 * Animates children to fade in when scrolled into view
 * 
 * @param children - Content to animate
 * @param direction - Direction to animate from (up, down, left, right, or none for just fade)
 * @param duration - Animation duration in seconds
 * @param delay - Animation delay in seconds
 * @param threshold - Value between 0 and 1 indicating how much of the element should be visible before animating
 * @param distance - Distance in pixels to animate from
 * @param once - Whether to animate only once or every time element comes into view
 */
export function FadeIn({
  children,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  threshold = 0.15,
  distance = 30,
  once = true,
  className,
  ...props
}: FadeInProps) {
  // Set initial and animate values based on direction
  const getInitialProps = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'none':
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered container for multiple FadeIn components
 * Children will animate in sequence with a staggered delay
 */
export interface FadeInStaggerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
  viewAmount?: number;
}

export function FadeInStagger({
  children,
  staggerDelay = 0.1,
  viewAmount = 0.15,
  className,
  ...props
}: FadeInStaggerProps) {
  return (
    <motion.div
      viewport={{ once: true, amount: viewAmount }}
      initial="hidden"
      whileInView="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Item to be used inside a FadeInStagger container
 */
export interface FadeInStaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
}

export function FadeInStaggerItem({
  children,
  direction = 'up',
  distance = 20,
  duration = 0.5,
  className,
  ...props
}: FadeInStaggerItemProps) {
  // Set initial and animate values based on direction
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'down':
        return {
          hidden: { y: -distance, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
      case 'left':
        return {
          hidden: { x: distance, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'right':
        return {
          hidden: { x: -distance, opacity: 0 },
          visible: { x: 0, opacity: 1 }
        };
      case 'none':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { y: distance, opacity: 0 },
          visible: { y: 0, opacity: 1 }
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      transition={{
        duration,
        ease: 'easeOut',
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
} 