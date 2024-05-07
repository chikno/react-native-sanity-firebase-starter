import { Link } from 'expo-router';
import * as React from 'react';

import type { categoryType } from '@/api/categories/types';
import { Image, Text, TouchableOpacity, View } from '@/ui';

export const CategoryCard = ({ _id, name, image }: categoryType) => {
  return (
    <Link className="w-11/12" href={`/categories/${name}`} asChild>
      <TouchableOpacity className="my-5 flex flex-col items-center ">
        <Image
          className="aspect-square w-full rounded-full object-cover"
          source={image}
        />
        <View className="h-full  p-2  shadow-sm">
          <Text
            numberOfLines={2}
            className="mb-2 text-xl font-bold  text-black dark:text-white"
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
