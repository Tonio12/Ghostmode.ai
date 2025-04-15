import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getGmailClient } from '@/lib/gmail';
import { GaxiosError } from 'gaxios';

interface ErrorWithMessage {
  message: string;
  code?: string;
  status?: number;
}

export async function POST() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const gmail = await getGmailClient(session);
    
    // Test the Gmail API by getting the user's profile
    const profile = await gmail.users.getProfile({
      userId: 'me'
    });

    return NextResponse.json({
      success: true,
      message: 'Gmail API connection successful',
      profile: profile.data,
      session: {
        hasAccessToken: !!session.accessToken,
        hasRefreshToken: !!session.refreshToken,
        email: session.user?.email
      }
    });
  } catch (error) {
    console.error('Gmail API test error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorResponse: ErrorWithMessage = {
      message: errorMessage,
      code: error instanceof GaxiosError ? error.code : undefined,
      status: error instanceof GaxiosError ? error.response?.status : 500
    };

    return NextResponse.json(
      { 
        success: false,
        error: errorResponse.message,
        details: errorResponse
      },
      { status: errorResponse.status || 500 }
    );
  }
} 