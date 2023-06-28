/* eslint-disable indent */
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { hash, compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import { supabase } from '@/lib';

export async function hashPassword(password: string) {
  const hashedPass = await hash(password, 15);
  return hashedPass;
}

export async function checkPassword(password: string, hashedPassword: string) {
  const validPass = await compare(password, hashedPassword);
  return validPass;
}

// interface User {
//   studio_id: string;
//   studio_email: string;
//   password: string;
// }

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    // maxAge: 1 * 24 * 60 * 60, // 1d
  },
  providers: [
    CredentialsProvider({
      credentials: {
        id: { label: 'ID', type: 'user_id', placeholder: '' },
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
        isStudio: { label: 'isStudio', type: 'boolean' },
      },

      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials!');
        }
        const userEmail = credentials.email;
        const studioUser = credentials.isStudio;

        console.log('credentials.isStudio', credentials.isStudio);

        if (studioUser === 'true') {
          const { data: users, error } = await supabase
          // const { data: users, error }: { data: User[] | null; error: any } = await supabase
          .from('studio_users')
          .select('studio_id, studio_email, password')
          .eq('studio_email', userEmail);
          // .returns<User[]>();

          if (users === null) {
            throw new Error('No user found!');
          }

          if (error) {
            console.log(error);
          }

          console.log('studio users', users);

          if (users && users.length === 0) {
            throw new Error('No user found!');
          }

          const isValidPassword = await checkPassword(credentials.password, users[0].password);

          if (!isValidPassword) {
            throw new Error('your password is incorrect!');
          }

          // return { id: result[id], email: result };
          // return { id: users[0].user_id, email: users[0].email };
          return { id: users[0].studio_id, email: users[0].studio_email, studioUser };
        }
        const { data: users, error } = await supabase
          .from('users')
          .select('user_id, email, password')
          .eq('email', userEmail);
        if (users === null) {
          throw new Error('No user found!');
        }

        if (error) {
          console.log(error);
        }

        console.log('regular users', users);
        if (users && users.length === 0) {
          throw new Error('No user found!');
        }

        const isValidPassword = await checkPassword(credentials.password, users[0].password);

        if (!isValidPassword) {
          throw new Error('your password is incorrect!');
        }

        console.log('users[0].user_id', users[0].user_id);
        return { id: users[0].user_id, email: users[0].email, studioUser };
        // return { ...users, studioUser };
        //  return { users };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    error: '/api/auth/error', // Specify the custom error handler
  },
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          studio_user: token.studio_user,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          studio_user: JSON.parse(u.studioUser),
        };
      }
      return token;
    },
    //
    async signIn({ account, profile }) {
      console.log('signin callback', { account, profile });
      if (account && account.provider === 'google') {
      // we can do DB queries here
        const { data: users, error } = await supabase
          .from('users')
          .select('user_id, email, password')
          .eq('email', profile && profile.email);

        // if (users === null) {
        //   throw new Error('No user found!');
        // }

        if (error) {
          console.log(error);
        }
        if (users && users.length === 0) {
          // window.location.href = `${process.env.NEXT_PUBLIC_URL}/login`;
          // throw new Error('No user found!');
          // res.redirect('/signup');
          return false;
        }

        // const isValidPassword = await checkPassword(credentials.password, users[0].password);

        // if (!isValidPassword) {
        //   throw new Error('your password is incorrect!');
        // }
        return true;
      }
      return true; // do other things for other providers
    },
  },
};
