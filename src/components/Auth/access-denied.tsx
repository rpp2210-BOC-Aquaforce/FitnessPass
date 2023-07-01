/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import Link from 'next/link';
import classes from './auth-form.module.css';

function AccessDenied() {
  return (
    <div>
      <section className={classes.auth}>
        <br />
        <br />
        <div className={classes.control}>
          <p>Thanks for using FinessPass</p>
        </div>
        <div className={classes.control}>
          <p>You have not registered with us yet.</p>
        </div>
        <div className={classes.control}>
          <p>Please sign up or use a different email to sign in. </p>
        </div>
        <div className={classes.actions}>
          <button type="button">
            <Link href="/login">
              Click here to sign up or sign in with a different account
            </Link>
          </button>
          <Link href="/" className={classes.guestError}>
            Continue as Guest
          </Link>
        </div>
      </section>
    </div>
  );
}
export default AccessDenied;
