import './globals.css';
import { Nav } from '@/components';
import { NextAuthProvider, ContextProvider } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <ContextProvider>
            <Nav />
            {children}
          </ContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
