'use server';

import { supabase } from '@/lib';
import { revalidatePath } from 'next/cache';
import {
  UserClassFunction,
  UserClass,
  Class,
} from '@/lib/types';

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

export const deleteUserClass: UserClassFunction = async ({ userId, classId }) => {
  console.log(`Deleting user class for user #${userId} and class #${classId}`);

  const { error } = await supabase
    .from('user_classes')
    .delete()
    .eq('user_id', userId)
    .eq('class_id', classId);

  if (error) {
    console.error('Supabase Error: ', error);
  }

  revalidatePath(`/user/${userId}`);
};

export const createUserClass: UserClassFunction = async ({ userId, classId }) => {
  console.log(`Creating user class for user #${userId} and class #${classId}`);

  const { error } = await supabase
    .from('user_classes')
    .insert([
      {
        user_id: userId,
        class_id: classId,
        class_rating: null,
        favorite: false,
      },
    ]);

  if (error) {
    console.error('Supabase Error: ', error);
  }

  revalidatePath(`/user/${userId}`);
};

export const updateUserClass: UserClassFunction = async ({
  userId, classId, _delete, create, key, value,
}) => {
  if (create) {
    return createUserClass({ userId, classId });
  }
  if (_delete) {
    return deleteUserClass({ userId, classId });
  }

  if (!key) {
    console.error('Missing key in updateUserClass');
    return null;
  }
  console.log(`Updating ${key} in user class #${classId} with ${value}`);

  const { error } = await supabase
    .from('user_classes')
    .update({ [key]: value })
    .eq('class_id', classId);

  if (error) {
    console.error('Supabase Error: ', error);
  }

  revalidatePath(`/user/${userId}`);
  return null;
};

export const getUserClasses = async (userId: number) => {
  try {
    const { data, error } = await supabase
      .from('user_classes')
      .select(`
        *,
        classes(*,locations(*,studio_users(photo)))
      `)
      .eq('user_id', userId)
      .returns<UserClass[]>();

    if (error) {
      throw error;
    }

    const classes = data.map((userClass: UserClass) => {
      const { classes: classData } = userClass;
      const { locations: loc } = classData;
      const { studio_users: studio } = loc;
      return {
        ...classData,
        userId: userClass.user_id,
        locations: {
          ...loc,
          photo_url: studio?.photo,
        },
        favorite: userClass.favorite,
        classRating: userClass.class_rating,
      };
    });

    return classes.sort(
      (a: Class, b: Class) => a.date.localeCompare(b.date),
    );
  } catch (error) {
    return null;
  }
};

export const getNonUserClasses = async (userClassIds: number[]) => {
  try {
    const userClassIdsString = `(${userClassIds.join(', ')})`;
    const currentDate = new Date();
    const currentTime = currentDate.toISOString().split('T')[1]; // Get current time
    currentDate.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds and milliseconds

    const { data: classesData, error: classesError } = await supabase
      .from('classes')
      .select(`
        *,
        locations(*,studio_users(photo))
      `)
      .gte('date', currentDate.toISOString().split('T')[0]) // Compare date
      .gte('time', currentTime) // Compare time
      .not('class_id', 'in', userClassIdsString)
      .returns<Class[]>();

    if (classesError) {
      throw classesError;
    }

    const classes = classesData.map((classData: Class) => {
      const { locations: loc } = classData;
      const { studio_users: studio } = loc;
      return {
        ...classData,
        locations: {
          ...loc,
          photo_url: studio?.photo,
        },
      };
    });

    return classes.sort(
      (a: Class, b: Class) => a.date.localeCompare(b.date),
    );
  } catch (error) {
    return null;
  }
};
