import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/images/Logo.png" 
                alt="Ghostmode Logo" 
                width={32} 
                height={32} 
                className="rounded-md"
              />
              <span className="font-medium">Ghostmode.ai</span>
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} Ghostmode.ai. All rights reserved.</p>
            <p className="mt-1">Created by <span className="font-medium">Antonio Nelson</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
} 