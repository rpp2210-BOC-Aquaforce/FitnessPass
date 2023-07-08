import './globals.css';
import { Nav, BottomNav } from '@/components';
import { NextAuthProvider } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Nav />
          <div className="pb-[76px]">
            {children}
          </div>
          <BottomNav />
        </NextAuthProvider>
      </body>
    </html>
  );
}
