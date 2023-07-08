import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getStudioLocations } from '@/lib/studio-classes';
import { AddClassForm } from '@/components/index';

export const revalidate = 60;

export default async function AddClass() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  const studioID = (session?.user as any)?.id;

  // To be refactored -- if no studio locations, give curtosey message to add studio location
  const studioLocations = await getStudioLocations(studioID);

  return (
    <main className="flex min-h-screen flex-col items-center p-3 sm:p-8">
      <div
        className="flex flex-col items-center mt-2 pt-2 pb-2 space-y-4 bg-white shadow-md rounded-lg w-full"
      >
        <AddClassForm studioLocs={studioLocations} studioID={studioID} />
      </div>
    </main>
  );
}
