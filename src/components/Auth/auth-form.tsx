/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { signOut, useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isStudio, setIsStudio] = useState(true);
  const [signInMessage, setSignInMessage] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();
  const callbackUrl = `${process.env.NEXT_PUBLIC_URL}`;

  // useEffect(() => {
  //   if (status === 'loading') {
  //     setLoadingMessage('please wait...');
  //   }
  // }, [status, session]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  // const entererdEmail = emailInputRef.current.value;
  // const entererdPassword = passwordInputRef.current.value;

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  function studioSwitchAuthModeHandler() {
    setIsStudio((prevState) => !prevState);
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
    setSignInMessage('');
    setLoadingMessage('Please wait while we handle your request...');

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        callbackUrl,
      });
      setLoadingMessage('');
      // the second argument as a whole is received in [...nextauth].js
      // is the 'credentials' arg for authorize function
      if (result && result.error) {
        setSignInMessage(result.error);
      }

      if (result && !result.error) {
        router.replace('/');
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword);
        setLoadingMessage('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <section className={classes.auth}>
      { !isStudio && <h1>{isLogin ? 'Member Login' : 'Member Sign Up'}</h1>}
      { isStudio && <h1>{isLogin ? 'Studio Login' : 'Studio Sign Up'}</h1>}
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} placeholder="Enter your email" />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordInputRef} placeholder="Enter your password (at least 7 characters)" />
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
          <button
            type="button"
            className={classes.toggle}
            onClick={studioSwitchAuthModeHandler}
          >
            {isStudio ? 'Switch to Member Login' : 'Switch to Studio Login'}
          </button>
          <div>
            <button type="button" onClick={() => signIn('google', { callbackUrl })}>
              <span>
                Log in with Google
              </span>
            </button>
          </div>
          <div className={classes.message}>
            {signInMessage && <p>{signInMessage}</p>}
          </div>
          <div className={classes.message}>
            {loadingMessage !== '' ? <p>{loadingMessage}</p> : '' }
          </div>
          <Link href="/" className={classes.guest}>
            Continue as Guest
          </Link>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
