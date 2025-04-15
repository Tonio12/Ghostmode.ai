import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import SidebarNav from '@/components/SidebarNav';

// Server component wrapper
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Server-side authentication check
  if (!session) {
    redirect('/');
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background w-full">
      <SidebarNav user={session.user} />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
} 