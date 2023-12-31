// import { SearchBar, Authform } from '@/components/index';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const userId = (session?.user as any)?.id;
  const isStudio = (session?.user as any)?.studio_user;

  if (isStudio) {
    redirect(`/studio/${userId}`);
  } else if (isStudio === false) {
    redirect(`/user/${userId}/profile`);
  } else {
    redirect('/login');
    // return (
    //   <main className="flex flex-col items-center justify-between p-24">
    //     {/* <SearchBar /> */}
    //     <Authform />
    //     <h1>
    //       Welcome To FitnessPass!
    //     </h1>
    //   </main>
    // );
  }
}
