/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { signOut, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [signInMessage, setSignInMessage] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // if (status === 'authenticated') {
  //   router.push('/');
  // }

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // const entererdEmail = emailInputRef.current.value;
  // const entererdPassword = passwordInputRef.current.value;

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  // eslint-disable-next-line consistent-return
  async function createUser(email: any, password: any) {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      console.log(result);
      setSignInMessage(result.message);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function formSubmitHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      // the second argument as a whole is received in [...nextauth].js
      // is the 'credentials' arg for authorize function
      if (result && !result.error) {
        router.replace('/');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Member Login' : 'Sign Up'}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <p>Or sign up with</p>
          <button type="button" onClick={() => signIn('google')}> Google </button>
          {signInMessage && <p>{signInMessage}</p>}
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
