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

export function Header() {
  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
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
        
        <div className="hidden md:block">
          <Menubar className="border-none shadow-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>
        
        <div className="flex items-center gap-4">
            <ModeToggle />
          <Button variant="ghost" className="text-sm font-medium">
            Login
            <ArrowRight />
          </Button>
        </div>
      </div>
    </header>
  );
} 