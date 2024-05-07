import * as Google from 'expo-auth-session/providers/google';
import React from 'react';

import { Button, View } from '@/ui';
import { IconGoogle } from '@/ui/icons';

const GoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '152676342823-hhf90fu4mbg10u5agip0kfgk4v04lv6a.apps.googleusercontent.com',
    iosClientId:
      '152676342823-hhf90fu4mbg10u5agip0kfgk4v04lv6a.apps.googleusercontent.com',
    androidClientId:
      '727336402817-b05josa51jpkdjfutvt6ljd3vhcrpqf0.apps.googleusercontent.com',
    webClientId:
      '727336402817-grh57a5nn1hgg12t4etri5q6cauu2a25.apps.googleusercontent.com',
  });

  // React.useEffect(() => {
  //   if (response?.type === 'success') {
  //     onGoogleLogin(response.authentication);
  //   }
  // }, [response, onGoogleLogin]);

  return (
    <View>
      <Button
        disabled={!request}
        label="Google Sign in"
        onPress={() => promptAsync()}
        className="w-full"
        textClassName="text-lg ml-2 p-0"
      />
      <View className="absolute left-14 top-3">
        <IconGoogle />
      </View>
    </View>
  );
};

export default GoogleAuth;
