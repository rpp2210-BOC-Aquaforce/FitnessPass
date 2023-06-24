import { Search } from '../../components/index';

export default async function Posts() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Search />
    </main>
  );
}
