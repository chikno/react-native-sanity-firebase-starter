import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { useCities } from '@/api';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { Button, ControlledInput, ControlledSelect, Text, View } from '@/ui';

const schema = z.object({
  displayName: z.string({
    required_error: 'Email is required',
  }),
  phoneNumber: z.string({
    required_error: 'Email is required',
  }),
  address: z.string({
    required_error: 'address is required',
  }),
  city: z.string({
    required_error: 'address is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

export type RegisterFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading: boolean;
};

export const RegisterForm = ({
  onSubmit = () => { },
  isLoading,
}: RegisterFormProps) => {
  useSoftKeyboardEffect();
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const variables = '*[_type == "cities"]{value, label, _id}';
  const { data } = useCities({ variables });
  return (
    <View className="w-full px-7">
      <ControlledInput
        control={control}
        name="displayName"
        placeholder="Full name *"
        showSoftInputOnFocus={true}
      />

      <ControlledInput
        showSoftInputOnFocus={true}
        control={control}
        name="email"
        placeholder="Email *"
      />
      <ControlledInput
        control={control}
        name="password"
        placeholder="Password *"
        secureTextEntry={true}
        showSoftInputOnFocus={true}
      />
      <ControlledInput
        control={control}
        name="phoneNumber"
        placeholder="Phone *"
        showSoftInputOnFocus={true}
      />
      <ControlledSelect
        placeholder="Ville"
        options={data}
        name="city"
        control={control}
      />
      <ControlledInput
        control={control}
        name="address"
        placeholder="Address *"
        showSoftInputOnFocus={true}
      />
      <Button
        testID="login-button"
        label="Register"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />

      <View className="mb-10 flex-row items-center justify-center">
        <Text className="font-NunitoSans text-md font-inter">
          Already have an account ?
        </Text>
        <Text
          testID="register-button"
          onPress={() => {
            router.push('/login');
          }}
          className="text-md ml-3 font-inter text-black underline"
        >
          Login
        </Text>
      </View>
      {/* <View className="flex-col content-center justify-center">
        <GoogleAuth />
        <AppleAuth />
      </View> */}
    </View>
  );
};
