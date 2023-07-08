/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import classes from './info-form.module.css';

function ResetPassword() {
  const [signUpMessage, setSignUpMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const { data: session, status } = useSession();
  const userID = (session?.user as any)?.id;

  const searchParams = useSearchParams();
  const emailParam = searchParams?.get('email');

  // console.log('email', emailParam);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function recoverPassword(
    email: any,
    password: any,
  ): Promise<any> {
    try {
      // console.log('email, passs', email, password);
      const response = await fetch('/api/passwordReset', {
        method: 'POST',
        body: JSON.stringify(
          {
            emailParam,
            password,
          },
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setSignUpMessage(result.message);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function passwordRecoverySubmitHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setSignUpMessage('');
    setLoadingMessage('Please wait...');

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    try {
      const result = await recoverPassword(
        enteredEmail,
        enteredPassword,
      );
      setLoadingMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>Reset your password</h1>
      <form onSubmit={passwordRecoverySubmitHandler}>
        <div className={classes.control}>
          <label>{emailParam}</label>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your new password</label>
          <input type="password" id="password" ref={passwordInputRef} placeholder="Enter your new password" />
        </div>
        { loadingMessage === 'Please wait...' ? <FontAwesomeIcon icon={faSpinner} spin style={{ color: '#2EC4B6' }} /> : null}
        <div className={classes.actions}>
          <div className={classes.message}>
            {signUpMessage && <p>{signUpMessage}</p>}
          </div>
          <div className={classes.message}>
            {loadingMessage !== '' ? <p>{loadingMessage}</p> : '' }
          </div>
        </div>
        <div className={classes.actions}>
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default ResetPassword;
