/* eslint-disable react/destructuring-assignment */
/* eslint-disable camelcase */

'use client';

import { Search } from '@/components/index';
import React from 'react';

export default function Page(props: { params: { userID: any; }; }) {
  const user_id = props.params.userID;
  const onSearch = () => null;

  return (
    <div>
      <Search user_id={user_id} onSearch={onSearch} />
    </div>
  );
}
