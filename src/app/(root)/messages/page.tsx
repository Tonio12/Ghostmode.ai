'use client';

import React, { useEffect, useState } from 'react';
import { fetchEmails, sendAIReply } from '@/lib/actions/gmail';
import { Button } from '@/components/ui/button';
import { Inbox, RefreshCw, Mail, MailX } from 'lucide-react';
import { toast } from 'sonner';
import { GmailTest } from '@/components/gmail-test';

interface Email {
  id: string;
  threadId: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  isUnread: boolean;
}

export default function MessagesPage() {
  const [loading, setLoading] = useState(true);
  const [emails, setEmails] = useState<Email[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    loadEmails();
  }, []);

  async function loadEmails() {
    setLoading(true);
    try {
      const result = await fetchEmails(20);
      if (result.success && result.emails) {
        setEmails(result.emails as Email[]);
        setError(null);
      } else if (result.error) {
        setError(result.error || 'Failed to load emails');
      }
    } catch (err) {
      setError('Failed to load emails');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAutoReply() {
    if (!selectedEmail) return;
    
    setReplying(true);
    try {
      const result = await sendAIReply(
        selectedEmail.threadId,
        selectedEmail.id,
        selectedEmail.from,
        `Re: ${selectedEmail.subject}`,
        selectedEmail.snippet
      );
      
      if (result.success) {
        toast.success("Auto-reply sent", {
          description: "Your AI-generated reply was sent successfully."
        });
      } else {
        toast.error("Failed to send auto-reply", {
          description: result.error || "An unknown error occurred"
        });
      }
    } catch (error) {
      console.error("Error sending auto-reply:", error);
      toast.error("Error", {
        description: "Failed to send auto-reply. Please try again."
      });
    } finally {
      setReplying(false);
    }
  }

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="mb-6">
        <GmailTest />
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">View and manage your emails</p>
        </div>
        <Button onClick={loadEmails} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          <p>{error}</p>
          <p className="text-sm mt-2">
            {error.includes('Not authenticated') 
              ? 'Please connect your Google account to access your emails.' 
              : 'Try refreshing the page or connecting your account again.'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 border rounded-lg">
          <div className="p-3 border-b">
            <h2 className="font-semibold flex items-center">
              <Inbox className="h-4 w-4 mr-2" />
              Inbox
            </h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Loading your emails...</p>
              </div>
            ) : emails.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">No emails found</p>
              </div>
            ) : (
              <ul className="divide-y">
                {emails.map((email) => (
                  <li 
                    key={email.id} 
                    className={`p-3 hover:bg-muted/50 cursor-pointer ${
                      selectedEmail?.id === email.id ? 'bg-muted/50' : ''
                    } ${email.isUnread ? 'font-medium' : ''}`}
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex justify-between">
                      <p className="text-sm font-medium truncate">{email.from.split('<')[0]}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(email.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm truncate">{email.subject}</p>
                    <p className="text-xs text-muted-foreground truncate">{email.snippet}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 border rounded-lg">
          {selectedEmail ? (
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-medium">{selectedEmail.subject}</h2>
                  <p className="text-sm">
                    From: <span className="text-muted-foreground">{selectedEmail.from}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(selectedEmail.date).toLocaleString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleAutoReply}
                    disabled={replying}
                  >
                    {replying ? 'Sending...' : 'Auto-Reply'}
                  </Button>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="whitespace-pre-line">{selectedEmail.snippet}...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <MailX className="h-16 w-16 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No message selected</h3>
              <p className="text-muted-foreground text-sm">
                Select an email from the inbox to view its content
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 