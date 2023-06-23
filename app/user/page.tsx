// import supabase from '../../lib/supabase';
import Link from 'next/link';

// import Favorites from '../favorites/page';
// import UserProfile from '../profile/page';

export default async function Users() {
  // const { data: test, error } = await supabase
  //   .from('test')
  //   .select('textrow');
  // return <pre>{JSON.stringify({ data: test, error }, null, 2)}</pre>;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     Users
      <Link href="/user/123/profile">
        <button type="button" className="relative sm:inset-x-20 inset-y-4 text-5xl">My Profile</button>
      </Link>
    </main>
  );

}
