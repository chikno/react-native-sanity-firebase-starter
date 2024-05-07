import * as React from 'react';

import { useService } from '@/api/services/use-service';
import { ActivityIndicator, Image, Text, View } from '@/ui';
import { ArrowRight } from '@/ui/icons';

export const HeroService = () => {
  const variables =
    '*[ _type == "services" && (isHero == true)][0]{name , "category": category->name , "image":image.asset->url, isHero, price , duration } ';
  const { data, isLoading, isError } = useService({ variables });

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text> Error Loading data </Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View className="flex-1">
      <View className="relative">
        <Image className="contain h-64" source={data.image} />
        <View className="absolute bottom-0  z-20 flex w-full justify-center">
          <Text className=" bg-primary-900 py-3 text-center font-inter text-xl font-bold text-white">
            {data.name}
          </Text>
          <ArrowRight color={'white'} />
        </View>
      </View>
    </View>
  );
};
