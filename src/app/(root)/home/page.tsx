'use client';

import React from 'react';
import { Plus, PlusCircle, BellRing, Users, Database, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardPage = () => {
  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your social media automation</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Connect Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Connected Accounts</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-muted-foreground text-sm mt-2">Connect your social media accounts to get started</p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-2">Pending Messages</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-muted-foreground text-sm mt-2">Messages waiting for response</p>
        </div>

        <div className="border rounded-lg p-4 shadow-sm">
          <h2 className="font-semibold mb-2">AI Templates</h2>
          <p className="text-3xl font-bold">0</p>
          <p className="text-muted-foreground text-sm mt-2">Create AI templates for automated responses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Recent Activity</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col">
              <p className="text-muted-foreground text-center py-6 md:py-8">No recent activity</p>
              <p className="text-sm text-center text-muted-foreground">Connect your social media accounts to see activity here</p>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">AI Message Templates</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Template
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="border rounded p-3 bg-muted/30">
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
            </div>
            
            <div className="flex flex-col items-center justify-center py-4">
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Template
              </Button>
              <p className="text-xs text-muted-foreground mt-2">Use AI to generate personalized responses</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 md:mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Get Started</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Connect Accounts</h3>
              <p className="text-sm text-muted-foreground">Link your social media accounts to enable automation</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Create Templates</h3>
              <p className="text-sm text-muted-foreground">Set up AI templates for different types of messages</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
            <div className="flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Automate Responses</h3>
              <p className="text-sm text-muted-foreground">Let AI handle your social media interactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
