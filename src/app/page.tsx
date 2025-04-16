'use client';

import Image from 'next/image';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/magicui/fade-in';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
import { MessageSquare, Shield, Clock, MessageCircle, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

const LandingPage = () => {
  const router = useRouter();
  
  return (
    <>
      <Header />
      <main className="flex flex-col items-center bg-background text-foreground overflow-hidden">
        {/* Hero Section */}
        <section className="w-full min-h-screen flex flex-col justify-center items-center p-8 relative">
          <div className="absolute inset-0 w-full h-full">
            <DotPattern
              className={cn(
                'opacity-30 text-primary/20',
                '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]'
              )}
              glow={true}
            />
          </div>

          <motion.div 
            className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Image
                src="/images/Logo.png"
                alt="Ghostmode Logo"
                width={100}
                height={100}
                className="mx-auto rounded-lg shadow-xl"
                priority
              />
            </motion.div>

            <motion.h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Set Boundaries, <span className="text-primary">Not Fires</span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Let <AnimatedGradientText 
                    className="font-semibold"
                    colorFrom="#9c40ff" 
                    colorTo="#ffaa40"
                   >
                     Ghostmode.ai
                   </AnimatedGradientText>{' '}
              gently delay or auto-reply to messages when you&apos;re
              overwhelmed. No guilt. Just space to breathe.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button 
                onClick={() => router.push('/signup')}
                size="lg"
                className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                Get Started
              </Button>
              <Button 
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full"
              >
                See Features
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <motion.div 
            className="absolute bottom-24 right-32 z-0 hidden md:block"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: [0, -15, 0], opacity: 1 }}
            transition={{ 
              opacity: { duration: 1, delay: 1.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="bg-background/80 backdrop-blur-md shadow-xl rounded-2xl p-6 border">
              <div className="flex gap-4">
                <MessageSquare className="h-10 w-10 text-primary animate-pulse" />
                <Shield className="h-10 w-10 text-purple-500" />
                <Clock className="h-10 w-10 text-amber-500" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="absolute top-1/4 left-32 z-0 hidden lg:block"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8, rotate: [0, 10, -10, 0] }}
            transition={{ 
              scale: { duration: 0.8, delay: 1.5 },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <div className="bg-gradient-to-br from-primary/30 to-primary/10 p-6 rounded-full backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="h-12 w-12 text-primary/70" />
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-40 left-24 z-0 hidden md:flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.7 }}
          >
            <div className="bg-background border border-muted-foreground/10 shadow-lg rounded-lg p-4 backdrop-blur-sm">
              <MessageSquare className="h-8 w-8 text-primary animate-bounce" />
            </div>
          </motion.div>
          
          {/* Add a new floating element */}
          <motion.div 
            className="absolute top-1/3 right-24 z-0 hidden lg:flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0.9, 1.1, 0.9], opacity: 1 }}
            transition={{ 
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.8, delay: 1.3 }
            }}
          >
            <div className="bg-background/70 border border-primary/20 shadow-lg rounded-full p-3 backdrop-blur-sm">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ 
              opacity: { duration: 1, delay: 2 },
              y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <ChevronDown className="h-10 w-10 text-muted-foreground" />
          </motion.div>
        </section>

        {/* Feature highlight before main features */}
        <FadeIn 
          className="w-full py-16 bg-gradient-to-b from-background to-muted/20"
          threshold={0.1}
        >
          <div className="container mx-auto px-4">
            <FadeInStagger className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <FadeInStaggerItem className="p-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-indigo-100/30 p-3 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-indigo-200/40">
                    <MessageSquare className="h-6 w-6 text-indigo-500" />
                  </div>
                </div>
                <h3 className="mt-3 font-medium">AI Replies</h3>
              </FadeInStaggerItem>
              <FadeInStaggerItem className="p-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-purple-100/30 p-3 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-purple-200/40">
                    <Shield className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
                <h3 className="mt-3 font-medium">Boundary Setting</h3>
              </FadeInStaggerItem>
              <FadeInStaggerItem className="p-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-amber-100/30 p-3 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-amber-200/40">
                    <Clock className="h-6 w-6 text-amber-500" />
                  </div>
                </div>
                <h3 className="mt-3 font-medium">Scheduled Replies</h3>
              </FadeInStaggerItem>
              <FadeInStaggerItem className="p-6">
                <div className="flex justify-center">
                  <div className="rounded-full bg-emerald-100/30 p-3 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-emerald-200/40">
                    <MessageCircle className="h-6 w-6 text-emerald-500" />
                  </div>
                </div>
                <h3 className="mt-3 font-medium">Message Tones</h3>
              </FadeInStaggerItem>
            </FadeInStagger>
          </div>
        </FadeIn>

        {/* Use FadeIn for the Features section */}
        <FadeIn>
          <Features />
        </FadeIn>
        
        {/* Use FadeIn for the Pricing section */}
        <FadeIn>
          <Pricing />
        </FadeIn>
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
