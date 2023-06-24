import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { checkPassword } from '../../../lib/auth';
import supabase from '../../../lib/supabase';

interface User {
  user_id: string;
  email: string;
  password: string;
}

export default NextAuth({
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
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Missing credentials!');
        }
        const userEmail = credentials.email;
        const { data: users, error }: { data: User[] | null; error: any } = await supabase
          .from('users')
          .select('email, password')
          .eq('email', userEmail)
          .returns<User[]>();

        if (users === null) {
          throw new Error('No user found!');
        }

        if (error) {
          console.log(error);
        }

        if (users && users.length === 0) {
          throw new Error('No user found!');
        }

        const isValidPassword = await checkPassword(credentials.password, users[0].password);

        if (!isValidPassword) {
          throw new Error('your password is incorrect!');
        }
        // if return obnject inside authroize,
        // then we let NextAuth know that authroization succeed
        return { id: users[0].user_id, email: users[0].email };
        // info stored in session token
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
});
