'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Session } from 'next-auth';

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    studio_user?: boolean;
  } & Session['user'];
}

export default function Nav() {
  const { data: session } = useSession() as { data: CustomSession | null };

  // console.log('session', session);

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/login` });
  };

  const renderLink = (href: string, text: string) => (
    <Link href={href} className="p-4 bg-mint-orange hover:bg-solid-orange duration-500 transition-all">
      {text}
    </Link>
  );

  const userId = session?.user?.id;

  return (
    <>
      <nav className="flex flex-wrap min-h-[56px] justify-between ">
        {!session && renderLink('/login', 'Log In')}
        {session && (
        <>
          <button
            type="button"
            onClick={handleLogout}
            className="flex p-4 h-auto w-auto bg-seafoam/20 hover:bg-solid-orange duration-500 transition-all"
          >
            Logout
          </button>
          <Link href={`/${session.user?.studio_user ? `studio/${userId ?? '1'}` : `user/${userId ?? '1'}/profile`}`} className="m-2 text-seafoam">
            My Profile
            <FontAwesomeIcon icon={faUser} className="pl-2 pr-3" />
          </Link>
        </>
        )}
      </nav>
      {/* {session?.user && <p>{`Welcome ${session.user.email}!`}</p>} */}
    </>
  );
}
