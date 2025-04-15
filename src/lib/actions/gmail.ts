'use server';

import { auth } from '@/auth';
import { getEmails, sendAutoReply } from '@/lib/gmail';
import { config } from '../config';

/**
 * Server action to fetch emails from Gmail
 */
export async function fetchEmails(maxResults = 10) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    const emails = await getEmails(session, maxResults);
    return { success: true, emails };
  } catch (error) {
    console.error('Error fetching emails:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Server action to send an AI-generated auto-reply
 */
export async function sendAIReply(threadId: string, messageId: string, to: string, subject: string, originalContent: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // Generate AI response using our API
    const response = await fetch(`${config.env.appUrl}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        emailContent: originalContent,
        tone: 'professional'
      }),
    });

    console.log(response)
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate AI reply');
    }
    
    const data = await response.json();
    const aiResponse = data.reply;
    
    // Send the auto-reply
    const result = await sendAutoReply(
      session,
      threadId,
      messageId,
      to,
      subject,
      aiResponse
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Error sending AI reply:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Server action to get auto-reply settings
 */
export async function getAutoReplySettings() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // This would fetch from your database
    // For now, returning mock data
    return { 
      success: true, 
      settings: {
        enabled: false,
        template: 'Thank you for your message! I will get back to you as soon as possible.\n\nBest regards,\n[Your Name]',
        autoReplyAfter: 10, // minutes
      } 
    };
  } catch (error) {
    console.error('Error fetching auto-reply settings:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Server action to update auto-reply settings
 */
export async function updateAutoReplySettings(settings: {
  enabled: boolean;
  template: string;
  autoReplyAfter: number;
}) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // This would update your database
    // For now, just returning success
    return { success: true, settings };
  } catch (error) {
    console.error('Error updating auto-reply settings:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Server action to send an email reply without generating a new AI reply
 */
export async function sendEmailReply(threadId: string, messageId: string, to: string, subject: string, messageText: string) {
  try {
    const session = await auth();
    if (!session) {
      throw new Error('Not authenticated');
    }
    
    // Send the email directly
    const result = await sendAutoReply(
      session,
      threadId,
      messageId,
      to,
      subject,
      messageText
    );
    
    return { success: true, result };
  } catch (error) {
    console.error('Error sending email reply:', error);
    return { success: false, error: (error as Error).message };
  }
} 