'use server';

import { signIn } from '@/auth';
import db from '@/db';
import { users } from '@/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

const signInWithCredentials = async (
  credentials: Pick<AuthCredentials, 'email' | 'password'>
) => {
  const { email, password } = credentials;

  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch {
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};

const signUp = async (credentials: AuthCredentials) => {
  const { email, password, fullName } = credentials;

  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length > 0) {
    console.log('User already exists');
    return {
      success: false,
      error: 'User already exists',
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      email,
      fullName,
      password: hashedPassword,
    });

    await signInWithCredentials({
      email,
      password,
    });

    return {
      success: true,
      message: 'User created successfully',
    };
  } catch (err) {
    console.log('Something went wrong: ', err);
    return {
      success: false,
      error: 'Something went wrong',
    };
  }
};

export { signInWithCredentials, signUp };
