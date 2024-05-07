import { Stack } from 'expo-router';
import * as React from 'react';

import { Text, View } from '@/ui';

type Props = {};
const MyProfile = ({ }: Props) => {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          headerBackTitle: 'retour',
          title: 'Mon compte',
        }}
      />
      <Text className="text-base">MyProfile Component</Text>
    </View>
  );
};

export default MyProfile;
