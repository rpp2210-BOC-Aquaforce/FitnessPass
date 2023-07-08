/* eslint-disable camelcase */

'use client';

import React, { useEffect, useState } from 'react';
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
        throw error;
      }
      if (user_classes.length) {
        setSigned(true);
      }
    } catch (err) {
      return err;
    }
    return null;
  };

  useEffect(() => {
    checkSignUp();
  }, []);

  const signUp = async () => {
    if (user_id === '1') {
      router.push('/login');
    } else {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, error } = await supabase
          .from('user_classes')
          .insert([{ user_id, class_id },
          ])
          .select();
        if (error) {
          throw error;
        }
        setSigned(true);
        console.log(`signed up user ${user_id} in class ${class_id}`, data);
        // Send email to user
        const response = await fetch('/api/sendgrid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ user: user_id, class: class_id }), // Pass any required data
        });

        if (response.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Failed to send email');
        }
      } catch (err) {
        console.error('Unexpected error: ', err);
      }
    }
    return null;
  };

  const cancelSignUp = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await supabase
        .from('user_classes')
        .delete()
        .eq('user_id', user_id)
        .eq('class_id', class_id);

      if (error) {
        throw error;
      }
      setSigned(false);
    } catch (err) {
      return err;
    }
    return null;
  };

  return (
    <div>
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
