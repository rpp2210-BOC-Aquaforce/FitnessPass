'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
  } & Session['user'];
}

export default function Nav() {
  const { data: session } = useSession() as { data: CustomSession | null };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/login` });
  };

  const renderLink = (href: string, text: string) => (
    <Link href={href} className="p-4 bg-mint-orange hover:bg-solid-orange duration-500 transition-all">
      {text}
    </Link>
  );

  return (
    <>
      <nav className="flex flex-wrap min-h-[56px]">
        {!session && renderLink('/login', 'Log In')}
        {session && (
        <>
          {renderLink(`/studio/${session.user?.id}`, 'Studios')}
          {renderLink('/user/1/profile', 'My Profile (user)')}
          <button
            type="button"
            onClick={handleLogout}
            className="flex p-4 h-auto w-auto bg-seafoam/20 hover:bg-solid-orange duration-500 transition-all"
          >
            Logout
          </button>
        </>
        )}
      </nav>
      {/* {session?.user && <p>{`Welcome ${session.user.email}!`}</p>} */}
    </>
  );
}
