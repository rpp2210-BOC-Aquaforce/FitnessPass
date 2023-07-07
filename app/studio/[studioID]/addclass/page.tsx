import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getStudioLocations } from '@/lib/studio-classes'; // Change
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
    <div>
      <AddClassForm studioLocs={studioLocations} studioID={studioID} />
    </div>
  );
}
