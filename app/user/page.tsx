import supabase from '../../lib/supabase';

export default async function Posts() {
  const { data: test, error } = await supabase
    .from('test')
    .select('textrow');

  return <pre>{JSON.stringify({ data: test, error }, null, 2)}</pre>;
}
