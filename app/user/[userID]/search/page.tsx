/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

'use client';

import { Search } from '@/components/index';

export default function Page(props: { params: { userID: any; }; }) {
  const user_id = props.params.userID;
console.log('user_id', user_id)
  return (
    <div>
      <Search user_id={user_id} />
    </div>
  );
}
