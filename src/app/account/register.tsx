import { router, Stack } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import { useRegister } from '@/api/auth/use-register';
import { db } from '@/api/firebase';
import { Logo } from '@/components/logo';
import type { RegisterFormProps } from '@/components/register-form';
import { RegisterForm } from '@/components/register-form';
import { signIn } from '@/core';
import { _useSelectedService } from '@/core/booking';
import { showErrorMessage, View } from '@/ui';

const Register = () => {
  const selectedService = _useSelectedService(
    (response) => response?.selectedService
  );

  const { mutate: register, isLoading } = useRegister();
  const onSubmit: RegisterFormProps['onSubmit'] = (data) => {
    register(data, {
      onSuccess: async (userCredential) => {
        if (userCredential && userCredential?.user) {
          try {
            const doc = await addDoc(collection(db, 'users'), {
              uid: userCredential?.user?.uid,
              email: userCredential?.user.email,
              displayName: data?.displayName,
              phoneNumber: data?.phoneNumber,
              address: data?.address,
              city: data?.city,
            });

            signIn({
              access: userCredential._tokenResponse.idToken,
              refresh: userCredential._tokenResponse.refreshToken,
              user: {
                uid: userCredential?.user?.uid,
                email: userCredential?.user.email,
                displayName: data?.displayName,
                phoneNumber: data?.phoneNumber,
                city: data?.city,
                address: data?.address,
              },
            });
            selectedService ? router.push('/booking') : router.push('/');
            showMessage({
              type: 'success',
              message: 'Welcome' + userCredential.user.displayName,
            });
          } catch (err: any) {
            showErrorMessage(err.message);
          }
        } else {
          showErrorMessage('Error when creating user');
        }
      },
      onError: (err) => {
        showErrorMessage(err.message);
      },
    });
  };
  return (
    <View className="w-full flex-1 items-center justify-center px-8">
      <Stack.Screen
        options={{
          headerBackTitle: 'retour',
          title: 'register',
        }}
      />
      <Logo className="my-8 h-12 w-36" />
      <RegisterForm onSubmit={onSubmit} isLoading={isLoading} />
    </View>
  );
};

export default Register;
