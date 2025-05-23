'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Twitter } from 'lucide-react';

export default function AccountsPage() {
  const { data: session } = useSession();

  // For debugging
  React.useEffect(() => {
    console.log('Session data:', {
      twitterToken: !!session?.twitterAccessToken,
      twitterUsername: session?.twitterUsername,
      user: session?.user,
    });
  }, [session]);

  const handleTwitterConnect = async () => {
    try {
      const response = await fetch('/api/auth/twitter');
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to connect Twitter:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Connect your social media accounts to enable AI responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Google Connection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google</span>
              </div>
              {session?.accessToken ? (
                <Badge variant="success">Connected</Badge>
              ) : (
                <Button
                  onClick={() => signIn('google', { callbackUrl: '/accounts' })}
                  variant="outline"
                  size="sm"
                >
                  Connect
                </Button>
              )}
            </div>
            {session?.accessToken && (
              <p className="text-sm text-muted-foreground">
                Connected as {session.user?.email}
              </p>
            )}
          </div>

          {/* Twitter Connection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
                <span>Twitter</span>
              </div>
              {session?.twitterAccessToken && session?.twitterUsername ? (
                <Badge variant="success">Connected</Badge>
              ) : (
                <Button
                  onClick={handleTwitterConnect}
                  variant="outline"
                  size="sm"
                >
                  Connect
                </Button>
              )}
            </div>
            {session?.twitterAccessToken && session?.twitterUsername && (
              <p className="text-sm text-muted-foreground">
                Connected as @{session.twitterUsername}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
