/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */

'use client';

import { Search } from '@/components/index';

export default function Page(props: { params: { userID: any; }; }) {
  // useEffect(() => {
  //   const { data } = getQueryParams(window.location.search);
  // }, []);
  const user_id = props.params.userID;

  return (
    <div>
      <Search user_id={user_id} />
    </div>
  );
}
