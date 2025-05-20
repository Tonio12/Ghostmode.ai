import { getOAuth1AuthLink } from '@/lib/twitter';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { url, oauthToken, oauthTokenSecret } = await getOAuth1AuthLink();

    // Store temporary tokens in cookies to use in callback
    const response = NextResponse.json({ url });
    response.cookies.set('twitterOauthToken', oauthToken, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10, // 10 minutes
    });
    response.cookies.set('twitterOauthTokenSecret', oauthTokenSecret, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 10,
    });

    return response;
  } catch (error) {
    console.error('Twitter auth error:', error);
    return NextResponse.json(
      { error: 'Failed to generate Twitter auth link' },
      { status: 500 }
    );
  }
}
