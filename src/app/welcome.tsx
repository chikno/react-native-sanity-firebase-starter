import { useRouter } from 'expo-router';
import React from 'react';

import { useSelectedPrestation } from '@/core';
import { clearAll } from '@/core/storage';
import { FocusAwareStatusBar, Image, Text, TouchableOpacity, View } from '@/ui';
import { ArrowRight } from '@/ui/icons';

const Welcome = () => {
  clearAll();
  const router = useRouter();
  const { setSelectedPrestation, selectedPrestation } = useSelectedPrestation();
  return (
    <View className="flex-1">
      <FocusAwareStatusBar />
      <TouchableOpacity
        onPress={() => {
          setSelectedPrestation('domicile');
          router.push('/(app)');
        }}
        testID="domicile"
        className="relative h-3/4 "
      >
        <Image
          className="h-full"
          source={{
            uri: 'https://www.lesnouveauxkines.fr/wp-content/uploads/domicile_kine_mars.jpg',
          }}
        />
        <View className="bottom-50 absolute -right-0  h-8 w-36 flex-1 flex-row items-center justify-center bg-black text-center">
          <Text className="mr-2  font-bold uppercase text-white">
            A domicile
          </Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setSelectedPrestation('cabinet');
          router.push('/(app)');
        }}
        testID="cabinet"
        className="pb relative h-1/4"
      >
        <Image
          className="h-full"
          source={{
            uri: 'https://www.eureduc.eu/wp-content/uploads/presso-kine.jpg',
          }}
        />
        <View className="bottom-50 absolute -right-0  h-8 w-36 flex-1 flex-row items-center justify-center bg-black text-center">
          <Text className="mr-2  font-bold uppercase text-white">
            Au cabinet
          </Text>
          <ArrowRight />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
