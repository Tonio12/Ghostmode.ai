'use client';

import Image from 'next/image';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useRouter } from 'next/navigation';
const LandingPage = () => {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="flex flex-col items-center bg-background text-foreground">
        <div className="w-full h-screen flex flex-col justify-between items-center p-8 relative">
          <div className="absolute inset-0 w-full h-full">
            <DotPattern
              className={cn(
                'opacity-30 text-muted-foreground',
                '[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]'
              )}
              glow={true}
            />
          </div>
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto z-10 relative h-screen">
            <div className="mb-6">
              <Image
                src="/images/Logo.png"
                alt="Ghostmode Logo"
                width={80}
                height={80}
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
            <h1 className="font-bold mb-6">Set Boundaries, Not Fires</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Let <AnimatedGradientText>Ghostmode.ai</AnimatedGradientText>{' '}
              gently delay or auto-reply to messages when you&apos;re
              overwhelmed. No guilt. Just space to breathe.
            </p>
            <Button
              onClick={() => router.push('/signup')}
              className="mt-6 text-lg"
            >
              Get Started
            </Button>
          </div>
          <div className="absolute bottom-24 right-32 z-0">
            <Image
              src="/images/integrations.png"
              alt="Integrations"
              width={180}
              height={180}
              className="animate-bounce animate-duration-2000 animate-infinite"
            />
          </div>
        </div>

        <Features />
        <Pricing />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
