import { google, gmail_v1 } from 'googleapis';
import { Session } from 'next-auth';
import { config } from '@/lib/config';

// Gmail API interface for our app
interface EmailDetails {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  date: string;
  body: string;
  labelIds?: string[];
  isUnread: boolean;
}

/**
 * Create a Gmail API client using the access token from the user's session
 */
export const getGmailClient = async (session: Session | null) => {
  if (!session?.accessToken) {
    throw new Error('No access token available');
  }

  const auth = new google.auth.OAuth2(
    config.env.google.id,
    config.env.google.secret
  );
  
  auth.setCredentials({
    access_token: session.accessToken,
    refresh_token: session.refreshToken,
  });

  return google.gmail({ version: 'v1', auth });
};

/**
 * Fetch a list of recent emails from the user's inbox
 */
export const getEmails = async (session: Session | null, maxResults = 10): Promise<EmailDetails[]> => {
  try {
    const gmail = await getGmailClient(session);
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      q: 'in:inbox',
    });

    const messages = response.data.messages || [];
    
    // If no messages, return empty array
    if (!messages.length) return [];
    
    // Fetch full message details for each message
    const fullMessages = await Promise.all(
      messages.map(async (message) => {
        if (!message.id) return null;
        
        const fullMessage = await gmail.users.messages.get({
          userId: 'me',
          id: message.id,
        });
        return fullMessage.data;
      })
    );

    // Filter out any null messages and map to our EmailDetails interface
    return fullMessages
      .filter((message): message is gmail_v1.Schema$Message => message !== null)
      .map((message) => {
        if (!message.id || !message.threadId) {
          throw new Error('Missing required message properties');
        }
        
        const headers = message.payload?.headers || [];
        const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
        const from = headers.find(h => h.name === 'From')?.value || 'Unknown';
        const date = headers.find(h => h.name === 'Date')?.value || '';
        
        // Get message body
        let body = '';
        if (message.payload?.body?.data) {
          // If body data is available directly
          body = Buffer.from(message.payload.body.data, 'base64').toString('utf-8');
        } else if (message.payload?.parts) {
          // Try to find text part in multipart message
          const textPart = message.payload.parts.find(part => 
            part.mimeType === 'text/plain' || part.mimeType === 'text/html'
          );
          if (textPart?.body?.data) {
            body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
          }
        }
        
        // Handle null labelIds
        const emailLabelIds = message.labelIds || [];
        
        return {
          id: message.id,
          threadId: message.threadId,
          snippet: message.snippet || '',
          subject,
          from,
          date,
          body,
          labelIds: emailLabelIds,
          isUnread: emailLabelIds.includes('UNREAD'),
        };
      });
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
};

export const sendAutoReply = async (
  session: Session | null, 
  threadId: string, 
  messageId: string, 
  to: string, 
  subject: string, 
  messageText: string
) => {
  try {
    const gmail = await getGmailClient(session);
    
    // Create the email content
    const emailLines = [
      `From: ${session?.user?.email || ''}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      'In-Reply-To: ' + messageId,
      'References: ' + messageId,
      '',
      messageText
    ];
    
    const email = emailLines.join('\r\n');
    
    // Encode the email in base64
    const encodedEmail = Buffer.from(email).toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
    
    // Send the email
    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedEmail,
        threadId
      }
    });
    
    return res.data;
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    throw error;
  }
};

/**
 * Generate AI response for an email
 * This is a placeholder - you'll want to connect to your AI service
 */
export const generateAIResponse = async (emailContent: string): Promise<string> => {
  // This is where you'd integrate with your AI service
  // For example, calling OpenAI API
  
  // Use the email content to generate a contextual response
  console.log('Generating AI response based on:', emailContent);
  
  // Placeholder implementation
  return `Thank you for your message! I've received your email and will get back to you as soon as possible.

This is an automated response from Ghostmode.ai.

Best regards,
[Your Name]`;
}; 