'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center px-4 md:px-8 lg:px-16 py-4 transition-all duration-300",
        scrolled 
          ? "bg-background/90 backdrop-blur-md shadow-md h-16" 
          : "bg-background/50 backdrop-blur-sm h-20"
      )}
    >
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-2"
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative overflow-hidden rounded-md transition-all duration-300 group-hover:shadow-md group-hover:shadow-primary/20">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Image 
                src="/images/Logo.png" 
                alt="Ghostmode Logo" 
                width={40} 
                height={40} 
                className="rounded-md transition-transform duration-300"
              />
            </motion.div>
          </div>
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 group-hover:from-primary/80 group-hover:to-indigo-400">Ghostmode.ai</span>
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="hidden md:flex justify-center space-x-8"
      >
        {['Features'].map((item, index) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="group relative"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {item}
            </motion.span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex items-center gap-3"
      >
        <ModeToggle />
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button
            onClick={() => router.push('/signin')}
            variant="ghost" 
            className="text-sm font-medium relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Login
              <motion.div
                initial={{ x: -5, opacity: 0.8 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 1 }}
              >
                <ArrowRight className="ml-2 h-4 w-4 group-hover:text-primary transition-colors duration-300" />
              </motion.div>
            </span>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Button>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => router.push('/signup')}
            variant="default"
            className="text-sm font-medium bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </motion.header>
  );
} 