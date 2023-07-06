/* eslint-disable camelcase */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { redirect } from 'next/navigation';
import supabase from '../lib/supabase';

export default function ClassSignUp({ class_id, user_id } : { class_id: number, user_id: any }) {
  const router = useRouter();

  const [signed, setSigned] = useState<boolean>(false);

  const checkSignUp = async () => {
    try {
      const { data: user_classes, error } = await supabase
        .from('user_classes')
        .select('*')
        .eq('user_id', user_id)
        .eq('class_id', class_id);
      if (error) {
        return error;
      }
      if (user_classes.length) {
        setSigned(true);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  };

  useEffect(() => {
    checkSignUp();
  }, []);

  const signUp = async () => {
    if (user_id === 'undefined') {
      router.push('/login');
      return;
    }
    try {
      const { data, error } = await supabase
        .from('user_classes')
        .insert([{ user_id, class_id },
        ])
        .select();
      if (error) {
        console.error(error);
      }
      setSigned(true);
      console.log(`signed up user ${user_id} in class ${class_id}`, data);
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
  };

  const cancelSignUp = async () => {
    try {
      const { data, error } = await supabase
        .from('user_classes')
        .delete()
        .eq('user_id', user_id)
        .eq('class_id', class_id);

      if (error) {
        return error;
      }
      setSigned(false);
      console.log(`cancel user ${user_id} in class ${class_id}`, data);
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  };

  return (
    <div data-testid="class-signup-component">
      {signed
        ? (
          <>
            <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-mint-orange px-2 py-1 mt-2" disabled>Signed Up</button>
            <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-slate-300 px-2 py-1 mt-2" onClick={cancelSignUp}>Cancel</button>
          </>
        )
        : <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-orange px-2 py-1 mt-2 mr-2" onClick={signUp}>Sign Up</button>}
    </div>
  );
}
