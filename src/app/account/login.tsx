import { router } from 'expo-router';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import { useLogin } from '@/api/auth/use-login';
import type { LoginFormProps } from '@/components/login-form';
import LoginForm from '@/components/login-form';
import { Logo } from '@/components/logo';
import { useAuth } from '@/core';
import { _useSelectedService } from '@/core/booking';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar, showErrorMessage, View } from '@/ui';

const Account = () => {
  const token = useAuth.use.token();
  console.log(token);
  useSoftKeyboardEffect();
  const signIn = useAuth.use.signIn();
  const selectedService = _useSelectedService(
    (response) => response?.selectedService
  );
  const { mutate: login, isLoading } = useLogin();
  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    login(data, {
      onSuccess: (userCredential) => {
        if (userCredential && userCredential.user) {
          signIn({
            access: userCredential._tokenResponse.idToken,
            refresh: userCredential._tokenResponse.refreshToken,
            user: userCredential.user,
          });
          userCredential && userCredential.user && selectedService
            ? router.push('/booking')
            : router.push('/');
          showMessage({
            type: 'success',
            message: 'Signed IN',
          });
        }
      },
      onError: (err) => {
        console.log(err);
        showErrorMessage(err.message);
      },
    });
  };
  return (
    <View className="w-full flex-1 items-center justify-center px-8">
      <FocusAwareStatusBar />
      <Logo className="h-12 w-36" />
      <LoginForm onSubmit={onSubmit} isLoading={isLoading} />
    </View>
  );
};

export default Account;
