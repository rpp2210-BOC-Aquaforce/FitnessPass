import { Ping, Search } from '../components/index';

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export default async function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Search />
      <h1>
        Welcome To FitnessPass!
      </h1>
    </main>
  );
}
