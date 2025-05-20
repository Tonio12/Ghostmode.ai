import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import db from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { loginOAuth1 } from '@/lib/twitter';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const oauthToken = searchParams.get('oauth_token');
    const oauthVerifier = searchParams.get('oauth_verifier');

    if (!oauthToken || !oauthVerifier) {
      return NextResponse.json(
        { error: 'Missing oauth_token or oauth_verifier' },
        { status: 400 }
      );
    }

    const storedToken = request.cookies.get('twitterOauthToken')?.value;
    const storedSecret = request.cookies.get('twitterOauthTokenSecret')?.value;

    if (!storedToken || !storedSecret || storedToken !== oauthToken) {
      return NextResponse.json(
        { error: 'OAuth token mismatch or secret not found' },
        { status: 400 }
      );
    }

    // Exchange for permanent tokens
    const {
      client: loggedClient,
      accessToken,
      accessSecret,
    } = await loginOAuth1(oauthToken, storedSecret, oauthVerifier);

    // Fetch user profile (v1 verifyCredentials)
    const twitterUser = await loggedClient.v1.verifyCredentials();

    // Ensure session user exists
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'User session not found' },
        { status: 401 }
      );
    }

    // Persist tokens & twitter profile
    await db
      .update(users)
      .set({
        twitterId: twitterUser.id_str,
        twitterUsername: twitterUser.screen_name,
        twitterAccessToken: accessToken,
        twitterRefreshToken: accessSecret,
        twitterAccessTokenExpires: null,
      })
      .where(eq(users.id, session.user.id));

    // Cleanup cookies
    const response = NextResponse.redirect(new URL('/accounts', request.url));
    response.cookies.set('twitterOauthToken', '', { maxAge: 0, path: '/' });
    response.cookies.set('twitterOauthTokenSecret', '', {
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Twitter callback error:', error);
    return NextResponse.json(
      { error: 'Failed to complete Twitter authentication' },
      { status: 500 }
    );
  }
}
