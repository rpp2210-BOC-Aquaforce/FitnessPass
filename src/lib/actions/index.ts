'use server';

import { supabase } from '@/lib';
import { revalidatePath } from 'next/cache';
import { UpdateUserClassArgs } from '@/lib/types';

export async function updateRating({ userId, classId, rating } :
  { userId: string, classId: number, rating: number }) {
  console.log('RATINGS server action!', classId);

  const { error } = await supabase
    .from('user_classes')
    .update({ class_rating: rating })
    .eq('class_id', classId);

  if (error) {
    console.error('Supabase Error: ', error);
  }

  revalidatePath(`/user/${userId}`);
}

export async function updateUserClass({
  userId, classId, key, value,
} : UpdateUserClassArgs) {
  console.log(`Updating ${key} in user class #${classId} with ${value}`);

  const { error } = await supabase
    .from('user_classes')
    .update({ [key]: value })
    .eq('class_id', classId);

  if (error) {
    console.error('Supabase Error: ', error);
  }

  revalidatePath(`/user/${userId}`);
}
