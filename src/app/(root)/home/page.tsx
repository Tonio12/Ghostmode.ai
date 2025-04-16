'use client';

import React from 'react';
import { Plus, PlusCircle, BellRing, Users, Database, Bot, ChevronRight, Activity, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/magicui/fade-in';
import { cn } from '@/lib/utils';

const DashboardPage = () => {
  return (
    <div className="p-4 md:p-8 w-full">
      {/* Page header with welcome message and CTA */}
      <div className="relative mb-12 rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <DotPattern
            className={cn(
              'opacity-30 text-primary/20',
              '[mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]'
            )}
            glow={true}
          />
        </div>
        
        <motion.div 
          className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 bg-gradient-to-r from-background via-background/95 to-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <motion.h1 
              className="text-2xl md:text-3xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome to <AnimatedGradientText>Ghostmode.ai</AnimatedGradientText>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground max-w-xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Manage your social media automation and set healthy boundaries for a better digital life
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button size="lg" className="shadow-lg shadow-primary/20">
              <PlusCircle className="h-4 w-4 mr-2" />
              Connect Account
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Stats cards */}
      <FadeInStagger 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
        staggerDelay={0.15}
      >
        <FadeInStaggerItem className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-background to-primary/5 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 opacity-70 transition-all duration-300 group-hover:rotate-45"></div>
          <Users className="h-8 w-8 text-primary mb-4" />
          <h2 className="font-semibold mb-2 text-base/7">Connected Accounts</h2>
          <p className="text-3xl font-bold mb-2">0</p>
          <p className="text-muted-foreground text-sm">Connect your social media accounts to get started</p>
          <Button variant="ghost" size="sm" className="mt-4 text-xs px-0 flex items-center hover:text-primary">
            Connect account <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </FadeInStaggerItem>

        <FadeInStaggerItem className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-background to-primary/5 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 opacity-70 transition-all duration-300 group-hover:rotate-45"></div>
          <BellRing className="h-8 w-8 text-primary mb-4" />
          <h2 className="font-semibold mb-2 text-base/7">Pending Messages</h2>
          <p className="text-3xl font-bold mb-2">0</p>
          <p className="text-muted-foreground text-sm">Messages waiting for response</p>
          <Button variant="ghost" size="sm" className="mt-4 text-xs px-0 flex items-center hover:text-primary">
            View messages <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </FadeInStaggerItem>

        <FadeInStaggerItem className="border rounded-xl p-6 shadow-sm bg-gradient-to-br from-background to-primary/5 relative overflow-hidden group hover:shadow-md transition-all">
          <div className="absolute top-0 right-0 size-24 bg-primary/5 rounded-bl-full -mr-6 -mt-6 opacity-70 transition-all duration-300 group-hover:rotate-45"></div>
          <Sparkles className="h-8 w-8 text-primary mb-4" />
          <h2 className="font-semibold mb-2 text-base/7">AI Templates</h2>
          <p className="text-3xl font-bold mb-2">0</p>
          <p className="text-muted-foreground text-sm">Create AI templates for automated responses</p>
          <Button variant="ghost" size="sm" className="mt-4 text-xs px-0 flex items-center hover:text-primary">
            Create template <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </FadeInStaggerItem>
      </FadeInStagger>

      {/* Activity and AI Templates */}
      <FadeInStagger 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
        staggerDelay={0.15}
        viewAmount={0.1}
      >
        <FadeInStaggerItem 
          className="border rounded-xl p-6 shadow-sm overflow-hidden relative"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-primary mr-2" />
              <h2 className="font-semibold text-base/7">Recent Activity</h2>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center justify-center flex-col py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Activity className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
                <p className="text-muted-foreground text-center">No recent activity</p>
                <p className="text-sm text-center text-muted-foreground mt-2">Connect your social media accounts to see activity here</p>
              </div>
            </div>
          </div>
        </FadeInStaggerItem>
        
        <FadeInStaggerItem 
          className="border rounded-xl p-6 shadow-sm overflow-hidden relative group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              <h2 className="font-semibold text-base/7">AI Message Templates</h2>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
          
          <div className="space-y-4">
            <motion.div 
              className="border rounded-lg p-4 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
              whileHover={{ y: -2, x: 2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Default Response</h3>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Example</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Thank you for your message! I&apos;ll get back to you as soon as possible.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <BellRing className="h-3 w-3" />
                <span>All platforms</span>
              </div>
            </motion.div>
            
            <div className="flex flex-col items-center justify-center py-6">
              <Button variant="outline" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Template
                </span>
                <span className="absolute inset-0 bg-primary translate-y-[101%] group-hover:translate-y-0 transition-transform duration-200"></span>
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Use AI to generate personalized responses</p>
            </div>
          </div>
        </FadeInStaggerItem>
      </FadeInStagger>
      
      {/* Get Started section */}
      <FadeIn 
        className="mt-6 md:mt-8"
        direction="up"
        threshold={0.1}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            <h2 className="font-semibold text-base/7">Get Started</h2>
          </div>
        </div>
        
        <FadeInStagger className="grid grid-cols-1 sm:grid-cols-3 gap-6" staggerDelay={0.2}>
          <FadeInStaggerItem 
            className="border rounded-xl p-6 bg-background relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-lg">Connect Accounts</h3>
              <p className="text-muted-foreground">Link your social media accounts to enable automation</p>
              
              <div className="mt-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem 
            className="border rounded-xl p-6 bg-background relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-lg">Create Templates</h3>
              <p className="text-muted-foreground">Set up AI templates for different types of messages</p>
              
              <div className="mt-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem 
            className="border rounded-xl p-6 bg-background relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2 text-lg">Automate Responses</h3>
              <p className="text-muted-foreground">Let AI handle your social media interactions</p>
              
              <div className="mt-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </FadeInStaggerItem>
        </FadeInStagger>
      </FadeIn>

      {/* Analytics Placeholder */}
      <FadeIn 
        className="mt-10 border rounded-xl p-6 overflow-hidden relative"
        direction="up"
        threshold={0.05}
        delay={0.1}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <BarChart3 className="h-5 w-5 text-primary mr-2" />
            <h2 className="font-semibold text-base/7">Analytics Overview</h2>
          </div>
          <Button variant="outline" size="sm">View Details</Button>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <BarChart3 className="h-8 w-8 text-muted-foreground opacity-50" />
          </div>
          <p className="text-muted-foreground text-center">No analytics data available</p>
          <p className="text-sm text-center text-muted-foreground mt-2">Start using Ghostmode.ai to see your analytics</p>
          <Button className="mt-4" variant="outline">Get Started</Button>
        </div>
      </FadeIn>
    </div>
  );
};

export default DashboardPage;
