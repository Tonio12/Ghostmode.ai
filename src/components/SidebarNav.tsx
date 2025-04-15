'use client';

import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from '@/components/ui/sidebar';
import { MessageSquare, Home, Users, Settings, Database, Bot, BarChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from 'next-auth';
import { ModeToggle } from './mode-toggle';

interface SidebarNavProps {
  user?: User;
}

export default function SidebarNav({ user }: SidebarNavProps) {
  const pathname = usePathname();
  
  return (
    <div className="w-[16rem] max-w-[16rem] shrink-0 md:w-[16rem]">
      <SidebarProvider defaultOpen={true}>
        <Sidebar className="border-r">
          <SidebarHeader className="px-4 py-6">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h1 className="text-lg font-bold mb-0">Ghostmode.ai</h1>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/home" passHref>
                  <SidebarMenuButton 
                    isActive={pathname === '/home'} 
                    tooltip="Dashboard"
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link href="/messages" passHref>
                  <SidebarMenuButton 
                    isActive={pathname.startsWith('/messages')} 
                    tooltip="Messages"
                  >
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link href="/accounts" passHref>
                  <SidebarMenuButton 
                    isActive={pathname.startsWith('/accounts')} 
                    tooltip="Accounts"
                  >
                    <Users className="h-5 w-5" />
                    <span>Social Accounts</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link href="/templates" passHref>
                  <SidebarMenuButton 
                    isActive={pathname.startsWith('/templates')} 
                    tooltip="AI Templates"
                  >
                    <Database className="h-5 w-5" />
                    <span>AI Templates</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link href="/analytics" passHref>
                  <SidebarMenuButton 
                    isActive={pathname.startsWith('/analytics')} 
                    tooltip="Analytics"
                  >
                    <BarChart className="h-5 w-5" />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <Link href="/settings" passHref>
                  <SidebarMenuButton 
                    isActive={pathname.startsWith('/settings')} 
                    tooltip="Settings"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="px-4 py-4">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {user?.name?.[0] || 'U'}
                </div>
                <div className="flex flex-col text-sm">
                  <span className="font-medium">{user?.name || 'User'}</span>
                  <span className="text-muted-foreground text-xs truncate">{user?.email || 'user@example.com'}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Theme</span>
                <ModeToggle />
              </div>
            </div>
          </SidebarFooter>

          <SidebarTrigger />
        </Sidebar>
      </SidebarProvider>
    </div>
  );
} 