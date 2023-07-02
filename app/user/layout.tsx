import { UserNav } from '@/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserNav />
      {children}
    </>
  );
}
