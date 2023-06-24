// 'use client';

// import Link from 'next/link';
// import './globals.css';

// export default function RootLayout({

//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   return (
//     <html lang="en">
//       <body>
//         <main>
//           <nav>
//             <Link href="/"
// className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
//               Home
//             </Link>
//             <Link href="/auth"
// className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
//               SignIn
//             </Link>
//             <Link href="/studio"
// className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
//               Studios
//             </Link>
//             <Link href="/user"
// className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
//               Users
//             </Link>
//           </nav>
//           {children}
//         </main>
//       </body>
//     </html>
//   );
// }

'use client';

import Link from 'next/link';
import { useSession, SessionProvider, signOut } from 'next-auth/react';
import './globals.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace('/');
    }
  }, [session, router]);

  const clickHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    signOut();
  };

  return (
    <html lang="en">
      <body>
        <main>
          <nav>
            {session && session.user && <p>{`Welcome! ${session.user.email}`}</p>}
            <Link href="/" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
              Home
            </Link>
            {!session && (
            <Link href="/auth" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
              SignIn
            </Link>
            )}
            {session && (
              <>
                <Link href="/studio" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
                  Studios
                </Link>
                <Link href="/user" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
                  Users
                </Link>
              </>
            )}
            {session && (
            <button type="button" onClick={clickHandler} className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
              logout
            </button>
            )}
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
}
