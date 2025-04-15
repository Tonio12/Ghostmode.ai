'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
      <div className="p-4 border rounded-lg">
        <p className="mb-4">Please sign in to test Gmail integration</p>
        <Button onClick={() => signIn('google')}>Sign in with Google</Button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Gmail API Test</h3>
      <Button 
        onClick={testGmailAuth} 
        disabled={loading}
        className="mb-4"
      >
        {loading ? 'Testing...' : 'Test Gmail Auth'}
      </Button>

      {result && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Test Results:</h4>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 