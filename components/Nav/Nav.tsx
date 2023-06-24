'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Nav() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    signOut();
  };

  const renderLink = (href: string, text: string) => (
    <Link href={href} className="p-4 bg-mint-orange hover:bg-solid-orange duration-500 transition-all">
      {text}
    </Link>
  );

  return (
    <>
      <nav className="flex flex-wrap">
        {renderLink('/', 'Home')}
        {!session && renderLink('/auth', 'Log In')}
        {session && (
        <>
          {renderLink('/studio/1234', 'Studios')}
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
      {session?.user && <p>{`Welcome ${session.user.email}!`}</p>}
    </>
  );
}
