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
        const studioUser = JSON.parse(credentials.isStudio);

        // console.log('credentials.isStudio', credentials.isStudio);

        if (studioUser === true) {
          const { data: users, error } = await supabase
          // const { data: users, error }: { data: User[] | null; error: any } = await supabase
            .from('studio_users')
            .select('studio_id, studio_email, password')
            .eq('studio_email', userEmail);

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

        if (users && users.length === 0) {
          throw new Error('No user found!');
        }

        const isValidPassword = await checkPassword(credentials.password, users[0].password);

        if (!isValidPassword) {
          throw new Error('your password is incorrect!');
        }

        return { id: users[0].user_id, email: users[0].email, studioUser };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    error: '/auth/error',
  },
  callbacks: {
    async signIn({
      account, profile,
    }) {
      // console.log('signin callback', {
      //   user, account, profile, email, credentials,
      // });
      if (account && account.provider === 'google') {
        const { data: members, error: memberError } = await supabase
          .from('users')
          .select('user_id, email, password')
          .eq('email', profile && profile.email);

        const { data: studio, error: studioError } = await supabase
          .from('studio_users')
          .select('studio_id, studio_email, password')
          .eq('studio_email', profile && profile.email);

        if (memberError) {
          console.log(memberError);
          return false;
        }
        if (studioError) {
          console.log(memberError);
          return false;
        }

        // if not find , add to DB
        if (members.length === 0 && studio.length === 0) {
          return false;
        }

        return true;
      }
      return true;
    },
    session: async ({ session, token }) => {
      // console.log('Session Callback1', { session, user, token });
      if (token.provider === 'credentials') {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            studio_user: token.studio_user,
          },
        };
      }
      let studioUser = true;
      let id;
      const { data: members, error: memberError } = await supabase
        .from('users')
        .select('user_id, email, password')
        .eq('email', token.email);

      if (memberError) {
        console.log(memberError);
      }

      if (members && members.length !== 0) {
        studioUser = false;
        id = members[0]?.user_id;
      } else {
        const { data: studio, error: studioError } = await supabase
          .from('studio_users')
          .select('studio_id, studio_email, password')
          .eq('studio_email', token.email);

        if (studioError) {
          console.log(memberError);
        }

        if (studio && studio.length !== 0) {
          studioUser = true;
          id = studio[0]?.studio_id;
        }
      }
      return {
        ...session,
        user: {
          ...session.user,
          id,
          studio_user: studioUser,
        },
      };
    },

    jwt: ({
      token, user, account,
    }) => {
      // console.log('JWT Callback', {
      //   token, user, account, profile,
      // });
      const u = user as unknown as any;
      if (user) {
        return {
          ...token,
          ...account,
          id: u.id,
          studio_user: u.studioUser,
        };
      }
      return token;
    },
  },
};
