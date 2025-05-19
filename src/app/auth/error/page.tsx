'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const errorMessages: Record<string, string> = {
    Configuration:
      'There is a problem with the server configuration. Please try again later.',
    AccessDenied: 'You do not have permission to sign in.',
    Verification:
      'The verification link may have expired or already been used.',
    Default: 'An error occurred during authentication. Please try again.',
  };

  const errorMessage = error
    ? errorMessages[error] || errorMessages.Default
    : errorMessages.Default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border p-6 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Authentication Error
          </h1>
          <p className="mt-2 text-gray-600">{errorMessage}</p>
        </div>
        <div className="mt-6 space-y-4">
          <Button asChild className="w-full">
            <Link href="/accounts">Return to Accounts</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
