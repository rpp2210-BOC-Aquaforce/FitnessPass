/* eslint-disable camelcase */

'use client';

import { useEffect, useState } from 'react';
import supabase from '../lib/supabase';

export default function ClassSignUp({ class_id } : { class_id: number }) {
  const user_id = 1; // fake user_id for testing

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
    setSigned(true);
    try {
      const { data, error } = await supabase
        .from('user_classes')
        .insert([
          { user_id, class_id },
        ]);
      if (error) {
        return error;
      }
      if (data) {
        console.log(`signed up user ${user_id} in class ${class_id}`);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  };

  const cancelSignUp = async () => {
    setSigned(false);
    try {
      const { data, error } = await supabase
        .from('user_classes')
        .delete()
        .eq('user_id', user_id)
        .eq('class_id', class_id);

      if (error) {
        return error;
      }
      if (data) {
        console.log(`cancel sign up user ${user_id} in class ${class_id}`);
      }
    } catch (err) {
      console.error('Unexpected error: ', err);
    }
    return null;
  };

  return (
    <div>
      {signed
        ? (
          <>
            <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-slate-300 px-2 py-1 mt-2" disabled>Signed Up</button>
            <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-mint-orange px-2 py-1 mt-2" onClick={cancelSignUp}>Cancel</button>
          </>
        )
        : <button type="button" className="text-center text-white text-xs font-black uppercase tracking-wide rounded-md bg-mint-orange px-2 py-1 mt-2" onClick={signUp}>Sign Up</button>}
    </div>
  );
}
