'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ArrowRight } from 'lucide-react';
import { ModeToggle } from './mode-toggle';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();
  return (
    <header className="w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-between items-center px-16">
        <div className="flex items-center gap-2 w-1/3">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/Logo.png" 
              alt="Ghostmode Logo" 
              width={40} 
              height={40} 
              className="rounded-md"
            />
            <span className="font-bold text-xl">Ghostmode.ai</span>
          </Link>
        </div>
        
        <div className="hidden md:flex justify-center w-1/3">
          <Menubar className="border-none shadow-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Link href="#features">Features</Link>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <Link href="#pricing">Pricing</Link>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
        
        <div className="flex items-center gap-4 justify-end w-1/3">
          <ModeToggle />
          <Button onClick={() => {
            router.push('/signin')
          }} variant="ghost" className="text-sm font-medium">
            Login
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
    </header>
  );
} 