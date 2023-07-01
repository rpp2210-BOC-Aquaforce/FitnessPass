'use client';

import React from 'react';
import UserInfo from '../../../src/components/Auth/user-info';

function UserInfoUpdatePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 sm:p-8 ">
      <UserInfo />
    </main>
  );
}

export default UserInfoUpdatePage;
