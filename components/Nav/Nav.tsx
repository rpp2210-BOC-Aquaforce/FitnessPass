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
    <Link href={href} className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
      {text}
    </Link>
  );

  return (
    <nav>
      {session?.user && <p>{`Welcome! ${session.user.email}`}</p>}
      {renderLink('/', 'Home')}
      {!session && renderLink('/auth', 'SignIn')}
      {session && (
        <>
          {renderLink('/studio', 'Studios')}
          {renderLink('/user', 'Users')}
          <button
            type="button"
            onClick={handleLogout}
            className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
