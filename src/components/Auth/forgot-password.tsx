/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState, useRef, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@fortawesome/fontawesome-svg-core/styles.css';
import classes from './info-form.module.css';

function ForgotPassword() {
  const [signUpMessage, setSignUpMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const { data: session, status } = useSession();
  const userID = (session?.user as any)?.id;
  const router = useRouter();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function recoverPassword(
    email: any,
  ): Promise<any> {
    try {
      const response = await fetch('/api/passwordRecovery', {
        method: 'POST',
        body: JSON.stringify(
          {
            email,
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
    try {
      await recoverPassword(
        enteredEmail,
      );
      setLoadingMessage('');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className={classes.auth}>
      <h1>Recover your password</h1>
      <form onSubmit={passwordRecoverySubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="text" id="email" ref={emailInputRef} placeholder="Enter your email" />
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
            Email Me Password Reset Link
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPassword;
