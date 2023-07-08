/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import {
  useState, useRef, ChangeEvent, LegacyRef,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/lib';
import '@fortawesome/fontawesome-svg-core/styles.css';
import classes from './info-form.module.css';

function UserInfo() {
  const [signUpMessage, setSignUpMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState('');
  const [spin, setSpin] = useState(false);
  const [photoURL, setPhotoURL] = useState('');
  const { data: session, status } = useSession();
  const userID = (session?.user as any)?.id;
  const router = useRouter();

  // console.log('session =>', session);
  // console.log('status =>', status);

  // useEffect(() => {
  //   if (status === 'loading') {
  //     setLoadingMessage('please wait...');
  //   }
  // }, [status, session]);

  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const stateInputRef = useRef<HTMLInputElement>(null);
  const zipInputRef = useRef<HTMLInputElement>(null);
  const ecNameInputRef = useRef<HTMLInputElement>(null);
  const ecPhoneInputRef = useRef<HTMLInputElement>(null);
  let photoInputRef: LegacyRef<HTMLInputElement> | undefined;

  async function UpdateUserInfo(
    firstName: any,
    lastName: any,
    phone: any,
    age: any,
    street: any,
    city: any,
    state: any,
    zip: any,
    ecName: any,
    ecPhone: any,
    photo: any,
  ): Promise<any> {
    try {
      const response = await fetch('/api/userInfoUpdate', {
        method: 'POST',
        body: JSON.stringify(
          {
            firstName,
            lastName,
            phone,
            age,
            street,
            city,
            state,
            zip,
            ecName,
            ecPhone,
            photo,
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

  async function signUpInfoSubmitHandler(event: { preventDefault: () => void; }) {
    event.preventDefault();
    setSignUpMessage('');
    setSpin(true);
    setLoadingMessage('Please wait...');

    const enteredFirstName = firstNameInputRef.current?.value;
    const enteredLastName = lastNameInputRef.current?.value;
    const enteredphone = phoneInputRef.current?.value;
    const enteredAge = ageInputRef.current?.value;
    const enteredStreet = streetInputRef.current?.value;
    const enteredCity = cityInputRef.current?.value;
    const enteredState = stateInputRef.current?.value;
    const enteredZip = zipInputRef.current?.value;
    const enteredEcName = ecNameInputRef.current?.value;
    const enteredEcPhone = ecPhoneInputRef.current?.value;

    try {
      const result = await UpdateUserInfo(
        enteredFirstName,
        enteredLastName,
        enteredphone,
        enteredAge,
        enteredStreet,
        enteredCity,
        enteredState,
        enteredZip,
        enteredEcName,
        enteredEcPhone,
        photoURL,
      );
      setLoadingMessage('');
      if (result.message === 'Your profile has been updated!') {
        router.push(`/user/${userID}/profile`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function photoUploadHandler(e: ChangeEvent<HTMLInputElement>) {
    setLoadingMessage('Uploading photo...');
    let file;
    if (e.target.files) {
      // eslint-disable-next-line prefer-destructuring
      file = e.target.files[0];
    }
    const { data } = await supabase.storage.from('images').upload(`public${uuidv4()}${file?.name}`, file as File);
    setPhotoURL(`https://javqvsvajexkcxuhgiiw.supabase.co/storage/v1/object/public/images/${data?.path}`);
    setLoadingMessage('Photo uploaded!');
  }

  return (
    <section className={classes.auth}>
      <h4>Please provide the following user information to complete the sign-up process.</h4>
      <form onSubmit={signUpInfoSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" ref={firstNameInputRef} placeholder="Enter your first name" />
        </div>
        <div className={classes.control}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" ref={lastNameInputRef} placeholder="Enter your last name" />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Phone Number</label>
          <input type="text" id="phone" ref={phoneInputRef} placeholder="Enter your phone number" />
        </div>
        <div className={classes.control}>
          <label htmlFor="age">Age</label>
          <input type="number" id="age" ref={ageInputRef} placeholder="Enter your age" />
        </div>
        <div className={classes.control}>
          <label htmlFor="street">Street Address</label>
          <input type="text" id="street" ref={streetInputRef} placeholder="Enter your street address" />
        </div>
        <div className={classes.control}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} placeholder="Enter your city" />
        </div>
        <div className={classes.control}>
          <label htmlFor="state">State</label>
          <input type="text" id="state" ref={stateInputRef} placeholder="Enter your state" />
        </div>
        <div className={classes.control}>
          <label htmlFor="zip">Zip</label>
          <input type="text" id="zip" ref={zipInputRef} placeholder="Enter your zip" />
        </div>
        <div className={classes.control}>
          <label htmlFor="ecName">Emergency Contact</label>
          <input type="text" id="ecName" ref={ecNameInputRef} placeholder="Enter your emergency contact" />
        </div>
        <div className={classes.control}>
          <label htmlFor="ecPhone">Emergency Phone Number</label>
          <input type="text" id="ecPhone" ref={ecPhoneInputRef} placeholder="Enter your emergency phone number" />
        </div>
        <div className={classes.control}>
          <label htmlFor="photo">Photo</label>
          <input type="file" accept="image/*" id="photo" placeholder="Upload your photo" onChange={(e) => photoUploadHandler(e)} />
        </div>
        { spin && <FontAwesomeIcon icon={faSpinner} spin style={{ color: '#2EC4B6' }} /> }
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

export default UserInfo;
