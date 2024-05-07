import React from 'react';

import { useAuth } from '@/core';

import Login from '../account';
import MyAccount from '../account/my-account';

const Account = () => {
  const token = useAuth.use.token();
  return <>{!token ? <Login /> : <MyAccount />}</>;
};

export default Account;
