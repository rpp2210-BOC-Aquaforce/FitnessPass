/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { checkPassword } from '../../../lib/auth';
import supabase from '../../../lib/supabase';

export default NextAuth({
  session: {
    strategy: 'jwt',
    // maxAge: 1 * 24 * 60 * 60, // 1d
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials!');
        }
        const email = credentials.email;
        const { data: users, error } = await supabase
          .from('users')
          .select('email, password')
          .eq('email', email);
        console.log('user in auth', users);
        if (error) {
          return null;
        }
        if (users.length === 0) {
          throw new Error('No user found!');
        }

        const isValidPassword = await checkPassword(credentials.password, users[0].password);

        if (!isValidPassword) {
          throw new Error('your password is incorrect!');
        }
        // if return obnject inside authroize, then we let NextAuth know that authroization succeed
        return { email: users[0].email };
        // info stored in session token
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
});
