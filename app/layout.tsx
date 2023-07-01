import './globals.css';
import { Nav } from '@/components';
import NextAuthProvider from './providers/AuthProvider';

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
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
