'use server';

import { randomBytes, createHash } from 'crypto';
import { config } from './config';

function base64url(buffer: Buffer) {
  return buffer
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export async function getAuthLink() {
  const clientId = process.env.NEXT_PUBLIC_TWITTER_ID;
  if (!clientId) {
    throw new Error('NEXT_PUBLIC_TWITTER_ID env var is missing');
  }

  const callbackUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/twitter`
    : 'http://localhost:3000/api/auth/callback/twitter';

  // PKCE setup
  const codeVerifier = base64url(randomBytes(32));
  const codeChallenge = base64url(
    createHash('sha256').update(codeVerifier).digest()
  );

  const state = base64url(randomBytes(16));

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: callbackUrl,
    scope: 'tweet.read users.read offline.access dm.read dm.write',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  const url = `https://twitter.com/i/oauth2/authorize?${params.toString()}`;

  return { url, codeVerifier, state };
}

/**
 * Step 1 – generate a 3-legged OAuth1.0a auth URL.
 * Returns { url, oauthToken, oauthTokenSecret }
 */
export async function getOAuth1AuthLink() {
  const { TwitterApi } = await import('twitter-api-v2/dist/cjs/index.js');

  const appKey = config.env.twitter.id;
  const appSecret = config.env.twitter.secret;
  if (!appKey || !appSecret) {
    throw new Error(
      'TWITTER_API_KEY / TWITTER_API_SECRET env vars are missing'
    );
  }

  const callbackUrl = process.env.NEXT_PUBLIC_APP_URL
    ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/twitter`
    : 'http://localhost:3000/api/auth/callback/twitter';

  const client = new TwitterApi({ appKey, appSecret });

  const {
    url,
    oauth_token: oauthToken,
    oauth_token_secret: oauthTokenSecret,
  } = await client.generateAuthLink(callbackUrl, { linkMode: 'authenticate' });

  return { url, oauthToken, oauthTokenSecret };
}

/**
 * Step 2 – exchange request token + verifier for user tokens.
 * Returns { loggedClient, accessToken, accessSecret }
 */
export async function loginOAuth1(
  oauthToken: string,
  oauthTokenSecret: string,
  oauthVerifier: string
) {
  const { TwitterApi } = await import('twitter-api-v2/dist/cjs/index.js');

  const appKey = config.env.twitter.id;
  const appSecret = config.env.twitter.secret;
  if (!appKey || !appSecret) {
    throw new Error(
      'TWITTER_API_KEY / TWITTER_API_SECRET env vars are missing'
    );
  }

  const tempClient = new TwitterApi({
    appKey,
    appSecret,
    accessToken: oauthToken,
    accessSecret: oauthTokenSecret,
  });

  return tempClient.login(oauthVerifier);
}
