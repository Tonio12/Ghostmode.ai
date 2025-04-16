'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, XCircle, Mail, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface TestResult {
  success?: boolean;
  message?: string;
  error?: string;
  profile?: Record<string, unknown>;
  session?: {
    hasAccessToken: boolean;
    hasRefreshToken: boolean;
    email?: string;
  };
  details?: Record<string, unknown>;
}

export function GmailTest() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const testGmailAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gmail/test', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json() as TestResult;
      setResult(data);
    } catch (error) {
      console.error('Error testing Gmail API:', error);
      setResult({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to test Gmail API' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <motion.div 
        className="p-6 border rounded-lg bg-gradient-to-br from-background to-muted/20 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="rounded-full bg-muted p-4 mb-4">
            <Mail className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Connect Your Gmail Account</h3>
          <p className="text-muted-foreground mb-6 max-w-md">Sign in with your Google account to enable Gmail integration and start using AI-powered email replies</p>
          <Button 
            onClick={() => signIn('google')}
            className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
            size="lg"
          >
            <Mail className="mr-2 h-4 w-4" />
            Sign in with Google
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="border rounded-lg shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-muted/20 px-6 py-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Mail className="h-5 w-5 text-primary mr-2" />
          Gmail API Connection
        </h3>
        <Button 
          onClick={testGmailAuth} 
          disabled={loading}
          variant="outline"
          className="border-primary/20 hover:bg-primary/10 hover:text-primary"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {loading ? 'Testing...' : 'Test Connection'}
        </Button>
      </div>

      <div className="p-6">
        {result ? (
          <div>
            <div className="flex items-center mb-4">
              {result.success ? (
                <div className="flex items-center text-green-600 font-medium">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  <span>Connection Successful</span>
                </div>
              ) : (
                <div className="flex items-center text-destructive font-medium">
                  <XCircle className="h-5 w-5 mr-2" />
                  <span>Connection Failed</span>
                </div>
              )}
            </div>
            
            {result.success ? (
              <div className="space-y-3">
                <div className="bg-muted/20 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-sm">Gmail Account</h4>
                  <p className="text-sm text-muted-foreground">{result.session?.email || 'Unknown'}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Access Token</h4>
                    <div className="flex items-center">
                      {result.session?.hasAccessToken ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive mr-1.5" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {result.session?.hasAccessToken ? 'Valid' : 'Missing'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-sm">Refresh Token</h4>
                    <div className="flex items-center">
                      {result.session?.hasRefreshToken ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive mr-1.5" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {result.session?.hasRefreshToken ? 'Valid' : 'Missing'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mt-4 bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                  <p className="text-sm text-green-800 dark:text-green-300">
                    Your Gmail account is connected and ready to use with Ghostmode.ai
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center bg-destructive/10 p-4 rounded-lg border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-destructive">{result.error || 'Unknown error'}</p>
                    {result.details && (
                      <p className="text-xs text-destructive/80 mt-1">
                        {JSON.stringify(result.details)}
                      </p>
                    )}
                  </div>
                </div>
                
                <Button 
                  onClick={() => signIn('google')}
                  className="w-full"
                >
                  Reconnect Google Account
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center text-center space-y-4">
            <p className="text-muted-foreground mb-2">
              Test your Gmail API connection to verify that authentication is working properly
            </p>
            <Button 
              onClick={testGmailAuth} 
              disabled={loading}
              variant="outline"
              className="border-primary/20 hover:bg-primary/10 hover:text-primary"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {loading ? 'Testing...' : 'Test Connection'}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
} 