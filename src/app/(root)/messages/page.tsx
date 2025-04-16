'use client';

import React, { useEffect, useState } from 'react';
import { fetchEmails, sendEmailReply } from '@/lib/actions/gmail';
import { Button } from '@/components/ui/button';
import { Inbox, RefreshCw, Mail, MailX, MessageSquare, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { GmailTest } from '@/components/gmail-test';
import { AIReplyGenerator } from '@/components/ai-reply-generator';
import { motion } from 'motion/react';
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text';
import { DotPattern } from '@/components/magicui/dot-pattern';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/magicui/fade-in';
import { cn } from '@/lib/utils';

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
  const [replyContent, setReplyContent] = useState<string>('');

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
    if (!selectedEmail || !replyContent) return;
    
    setReplying(true);
    try {
      const result = await sendEmailReply(
        selectedEmail.threadId,
        selectedEmail.id,
        selectedEmail.from,
        `Re: ${selectedEmail.subject}`,
        replyContent
      );
      
      if (result.success) {
        toast.success("Auto-reply sent", {
          description: "Your AI-generated reply was sent successfully."
        });
        // Clear the reply content after sending
        setReplyContent('');
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

  const handleReplyGenerated = (reply: string) => {
    setReplyContent(reply);
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <FadeIn className="mb-8 relative rounded-xl overflow-hidden">
        <div className="absolute inset-0">
          <DotPattern
            className={cn(
              'opacity-30 text-primary/20',
              '[mask-image:linear-gradient(to_right,transparent,black_30%,black_70%,transparent)]'
            )}
            glow={true}
          />
        </div>
        
        <motion.div 
          className="relative z-10 py-6 px-4 md:p-8 bg-gradient-to-r from-background via-background/95 to-background"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GmailTest />
        </motion.div>
      </FadeIn>
      
      <FadeIn 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            <AnimatedGradientText>Messages</AnimatedGradientText>
          </h1>
          <p className="text-muted-foreground">View and manage your emails</p>
        </div>
        <Button 
          onClick={loadEmails} 
          disabled={loading}
          className="shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </FadeIn>

      {error && (
        <FadeIn 
          className="bg-destructive/10 text-destructive p-6 rounded-xl mb-8 border border-destructive/20 shadow-sm"
        >
          <p className="font-medium">{error}</p>
          <p className="text-sm mt-2">
            {error.includes('Not authenticated') 
              ? 'Please connect your Google account to access your emails.' 
              : 'Try refreshing the page or connecting your account again.'}
          </p>
        </FadeIn>
      )}

      <FadeIn 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        threshold={0.1}
      >
        <FadeIn 
          className="col-span-1 border rounded-xl shadow-sm bg-card"
          direction="left"
          delay={0.2}
        >
          <div className="p-4 border-b flex items-center">
            <Inbox className="h-5 w-5 mr-2 text-primary" />
            <h2 className="font-semibold">Inbox</h2>
          </div>
          <div className="overflow-y-auto max-h-[70vh]">
            {loading ? (
              <div className="p-8 text-center">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">Loading your emails...</p>
              </div>
            ) : emails.length === 0 ? (
              <div className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-4 text-muted-foreground font-medium">No emails found</p>
                <p className="text-sm text-muted-foreground mt-1">Your inbox is currently empty</p>
              </div>
            ) : (
              <FadeInStagger staggerDelay={0.03}>
                <ul className="divide-y">
                  {emails.map((email) => (
                    <FadeInStaggerItem
                      key={email.id} 
                      className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                        selectedEmail?.id === email.id ? 'bg-primary/5 border-l-2 border-primary' : ''
                      } ${email.isUnread ? 'font-medium' : ''}`}
                      onClick={() => setSelectedEmail(email)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-medium truncate flex-1">{email.from.split('<')[0]}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {new Date(email.date).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm truncate font-medium">{email.subject}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{email.snippet}</p>
                    </FadeInStaggerItem>
                  ))}
                </ul>
              </FadeInStagger>
            )}
          </div>
        </FadeIn>

        <FadeIn 
          className="col-span-1 md:col-span-2 border rounded-xl shadow-sm bg-card h-fit"
          direction="right"
          delay={0.3}
        >
          {selectedEmail ? (
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-medium">{selectedEmail.subject}</h2>
                  <p className="text-sm mt-1">
                    From: <span className="text-muted-foreground">{selectedEmail.from}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(selectedEmail.date).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="whitespace-pre-line">{selectedEmail.snippet}...</p>
              </div>
              
              <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-2">
                <FadeIn
                  delay={0.2}
                  threshold={0.3}
                >
                  <AIReplyGenerator 
                    emailContent={`Subject: ${selectedEmail.subject}\nFrom: ${selectedEmail.from}\n\n${selectedEmail.snippet}`}
                    onReplyGenerated={handleReplyGenerated}
                  />
                </FadeIn>
                
                <FadeIn 
                  className="space-y-4"
                  delay={0.3}
                  threshold={0.3}
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">Your Reply</h3>
                  </div>
                  
                  {replyContent ? (
                    <>
                      <div className="border p-4 rounded-lg bg-muted/30 whitespace-pre-line h-[200px] overflow-y-auto">
                        {replyContent}
                      </div>
                      <Button 
                        onClick={handleAutoReply} 
                        disabled={replying}
                        className="w-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                        size="lg"
                      >
                        {replying ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : 'Send Auto-Reply'}
                      </Button>
                    </>
                  ) : (
                    <div className="border rounded-lg p-8 bg-muted/10 flex flex-col items-center justify-center h-[250px]">
                      <MessageSquare className="h-12 w-12 text-muted-foreground opacity-40 mb-4" />
                      <p className="text-muted-foreground text-center">
                        Generate a reply using the options on the left
                      </p>
                      <div className="mt-4">
                        <ChevronRight className="h-5 w-5 text-primary animate-bounce" />
                      </div>
                    </div>
                  )}
                </FadeIn>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <MailX className="h-16 w-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-medium">No message selected</h3>
              <p className="text-muted-foreground text-sm">
                Select an email from the inbox to view its content
              </p>
            </div>
          )}
        </FadeIn>
      </FadeIn>
    </div>
  );
} 