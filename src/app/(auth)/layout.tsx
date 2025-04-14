import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Left side - Image and branding */}
      <div className="relative h-[200px] md:h-[250px] lg:h-full flex-col bg-muted text-white lg:flex dark:border-r">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/images/auth-image.jpg"
            alt="Authentication background"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        
        <div className="relative z-20 flex items-center text-lg font-medium p-4 lg:p-10">
          <Image
            src="/images/Logo.png"
            alt="Ghostmode.ai Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          Ghostmode.ai
        </div>
        
        <div className="relative z-20 mt-auto hidden lg:block lg:p-10">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Ghostmode.ai has completely transformed how I handle my digital boundaries. It&apos;s like having a personal assistant that understands when I need space.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="lg:p-8 p-4 mt-4 lg:mt-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {children}
        </div>
      </div>
    </div>
  );
} 