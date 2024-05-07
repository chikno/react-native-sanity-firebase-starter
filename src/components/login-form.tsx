import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/ui';

const schema = z.object({
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

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
  isLoading: boolean;
};

const LoginForm = ({ onSubmit = () => { }, isLoading }: LoginFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  return (
    <View className="w-full px-7">
      <ControlledInput
        testID="email-input"
        control={control}
        name="email"
        label="Email"
      />
      <ControlledInput
        testID="password-input"
        control={control}
        name="password"
        label="Password"
        placeholder="***"
        secureTextEntry={true}
      />
      <Button
        testID="login-button"
        label="Login"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}
      />

      <View className="mb-10 flex-row items-center justify-center">
        <Text className="text-md font-inter">Dont have an account ?</Text>
        <Text
          testID="register-button"
          onPress={() => {
            router.push('/account/register');
          }}
          className="text-md ml-3 font-inter text-black underline"
        >
          Create an account
        </Text>
      </View>
      {/* <View className="flex-col content-center justify-center">
        <GoogleAuth />
        <AppleAuth />
      </View> */}
    </View>
  );
};

export default LoginForm;
