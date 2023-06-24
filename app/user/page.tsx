import { Search } from '../../components/index';

export default async function Posts() {
<<<<<<< HEAD
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Search />
    </main>
  );
=======
  const { data: test, error } = await supabase
    .from('classes')
    .select('name');

  return <pre>{JSON.stringify({ data: test, error }, null, 2)}</pre>;
>>>>>>> f782983551ce158c8f21081d26e57e66f6fa6933
}
