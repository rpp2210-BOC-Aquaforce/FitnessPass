import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <nav>
            <Link href="/" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
              Home
            </Link>
            <Link href="/studio" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
              Studios
            </Link>
            <Link href="/user" className="p-4 bg-slate-500/20 hover:bg-slate-200 duration-500 transition-all">
              Users
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
