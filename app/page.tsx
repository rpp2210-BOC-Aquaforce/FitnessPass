import { Ping } from '../components/index';
import { Test } from '../components/test';

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export default async function Home() {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/12');
  const todo = (await res.json()) as Todo;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>
        Hello,
        {' '}
        {todo?.title || 'World'}
      </h1>
      <p>
        Todo item #:
        {' '}
        {todo.id || '1'}
      </p>
      <Ping />
    </main>
  );
}
