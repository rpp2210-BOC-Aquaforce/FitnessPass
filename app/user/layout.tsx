// import { UserNav, BottomNav } from '@/components';
import { BottomNav } from '@/components';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pb-[76px]">
        {children}
      </div>
      <BottomNav />
    </>
  );
}
