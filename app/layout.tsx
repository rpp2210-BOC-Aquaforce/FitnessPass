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
            <Link href="/" className="p-4 bg-mint-orange hover:bg-solid-orange duration-500 transition-all">
              Home
            </Link>
            {/* Route Needs to Be Dynamic */}
            <Link href="/studio/1234" className="p-4 bg-mint-orange hover:bg-solid-orange duration-500 transition-all">
              Studios
            </Link>
            <Link href="/user" className="p-4 bg-mint-orange hover:bg-solid-orange duration-500 transition-all">
              Users
            </Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
