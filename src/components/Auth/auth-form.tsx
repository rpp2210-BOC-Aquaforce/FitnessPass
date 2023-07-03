/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import classes from './auth-form.module.css';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isStudio, setIsStudio] = useState(false);
  const [signInMessage, setSignInMessage] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [spin, setSpin] = useState(false);
  const { data: session, status } = useSession();
  const userIdentifier = (session?.user as any)?.id;
  const router = useRouter();
  const callbackUrl = `${process.env.NEXT_PUBLIC_URL}`;

  // useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/');
  //   },
  // });

  console.log('session =>', session);
  console.log('status =>', status);

  // useEffect(() => {
  //   if (status === 'loading') {
  //     setLoadingMessage('please wait...');
  //   }
  // }, [status, session]);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const studioNameInputRef = useRef<HTMLInputElement>(null);
  const studioPhotoInputRef = useRef<HTMLInputElement>(null);

  // const entererdEmail = emailInputRef.current.value;
  // const entererdPassword = passwordInputRef.current.value;

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
    setSignInMessage('');
    setLoadingMessage('');
  }

  function studioSwitchAuthModeHandler() {
    setIsStudio((prevState) => !prevState);
    setSignInMessage('');
    setLoadingMessage('');
  }

  async function createUser(
    email: any,
    password: any,
    studioName: any,
    studioPhoto: any,
  ): Promise<any> {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        body: JSON.stringify({
          email, password, isStudio, studioName, studioPhoto,
        }),
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
      return null;
    }
  }

  async function formSubmitHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setSignInMessage('');
    setLoadingMessage('Please wait while we handle your request...');

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    const enteredStudioName = studioNameInputRef.current?.value;
    const enteredStudioPhoto = studioPhotoInputRef.current?.value;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        isStudio,
        callbackUrl,
      });
      setLoadingMessage('');
      // the second argument as a whole is received in [...nextauth].js
      // is the 'credentials' arg for authorize function
      if (result && result.error) {
        setSignInMessage(result.error);
      }

      if (result && !result.error && isStudio) {
        router.replace(`/studio/${userIdentifier}`);
      }
      if (result && !result.error && !isStudio) {
        router.replace(`/user/${userIdentifier}/profile`);
      }
    } else {
      const result = await createUser(
        enteredEmail,
        enteredPassword,
        enteredStudioName,
        enteredStudioPhoto,
      );
      setLoadingMessage('');
      console.log('result signup!!', result);
      if (result.message === 'New user account created! Please wait while we redirect you ...') {
        const signInResult = await signIn('credentials', {
          redirect: false,
          email: enteredEmail,
          password: enteredPassword,
          isStudio,
          callbackUrl,
        });
        setLoadingMessage('');
        if (status === 'loading') {
          setLoadingMessage('loading...');
        } else {
          setLoadingMessage('');
        }
        // the second argument as a whole is received in [...nextauth].js
        // is the 'credentials' arg for authorize function
        if (signInResult && signInResult.error) {
          setSignInMessage(signInResult.error);
        }
        if (signInResult && !signInResult.error && isStudio) {
          router.replace(`/studio/${userIdentifier}`);
        }
        if (signInResult && !signInResult.error && !isStudio) {
          router.replace('/login/userInfoUpdate'); // ======================>route to user_info form letting user fill out their info
        }
      }
    }
  }

  async function googleSignInHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();
    try {
      await signIn('google', { callbackUrl });
      // const result = await signIn('google',  { callbackUrl });
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  }

  useEffect(() => {
    if (loadingMessage !== '' || signInMessage === 'New user account created! Please wait while we redirect you ...') {
      setSpin(true);
    } else {
      setSpin(false);
    }
  }, [loadingMessage, signInMessage]);

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
        {isStudio && !isLogin
        && (
        <div className={classes.control}>
          <label htmlFor="studioName">Studio Name</label>
          <input type="text" id="studioName" required ref={studioNameInputRef} placeholder="Enter studio name" />
        </div>
        )}
        {isStudio && !isLogin
        && (
        <div className={classes.control}>
          <label htmlFor="studioPhoto">Photo</label>
          <input type="text" id="studioPhoto" required ref={studioPhotoInputRef} placeholder="Enter studio photo" />
        </div>
        )}
        <div className={classes.actions}>
          <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
          <div>
            <button type="button" onClick={googleSignInHandler}>
              <span>
                Log in with Google
              </span>
            </button>
            <button
              type="button"
              className={classes.toggle}
              onClick={studioSwitchAuthModeHandler}
            >
              {isStudio ? 'Switch to Member Login' : 'Switch to Studio Login'}
            </button>
          </div>
          { spin && <FontAwesomeIcon icon={faSpinner} spin style={{ color: '#2EC4B6' }} /> }
          <div className={classes.message}>
            {signInMessage && <p>{signInMessage}</p>}
          </div>
          <div className={classes.message}>
            {loadingMessage !== '' ? <p>{loadingMessage}</p> : '' }
          </div>
          { !isStudio && (
          <Link href="/user/1/search" className={classes.guest}>
            Continue as Guest
          </Link>
          )}
        </div>
      </form>

    </section>
  );
}

export default AuthForm;
