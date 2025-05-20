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

    // Check if user exists in DB before updating
    try {
      // Find user by email instead of ID
      const userEmail = session.user?.email;

      if (!userEmail) {
        console.log("No email in session, can't find user");
        return NextResponse.json(
          { error: 'No email in session' },
          { status: 400 }
        );
      }

      console.log('Looking for user with email:', userEmail);

      const userRecord = await db
        .select()
        .from(users)
        .where(eq(users.email, userEmail))
        .limit(1);

      console.log('Found user in database:', {
        exists: userRecord.length > 0,
        email: userEmail,
        dbId: userRecord.length ? userRecord[0].id : null,
        sessionId: session.user.id,
      });

      // No matching user found
      if (!userRecord.length) {
        return NextResponse.json(
          { error: 'User not found with this email' },
          { status: 404 }
        );
      }

      // Use the database ID, not session ID
      const userId = userRecord[0].id;

      // Persist tokens & twitter profile
      console.log('Saving Twitter tokens to DB for user ID:', userId);
      console.log('Twitter info:', {
        twitterId: twitterUser.id_str,
        twitterUsername: twitterUser.screen_name,
        accessTokenLength: accessToken?.length,
      });

      await db
        .update(users)
        .set({
          twitterId: twitterUser.id_str,
          twitterUsername: twitterUser.screen_name,
          twitterAccessToken: accessToken,
          twitterRefreshToken: accessSecret,
          twitterAccessTokenExpires: null,
        })
        .where(eq(users.id, userId)); // Use DB ID

      // Verify the update worked
      const updatedUser = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      console.log('After update:', {
        twitterSaved: !!updatedUser[0]?.twitterAccessToken,
        tokenLength: updatedUser[0]?.twitterAccessToken?.length,
      });
    } catch (error) {
      console.error('Error checking if user exists:', error);
    }

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
