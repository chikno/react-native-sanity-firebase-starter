import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import type { CategoriesType, categoryType } from '@/api/categories/types';
import { Text, View } from '@/ui';

import CarouselItems from './carousel-items';
import { CategoryCard } from './category-card';
const PAGE_WIDTH = Dimensions.get('screen').width;
const COUNT = 2.5;
type propTypes = {
  header: string;
  categories: CategoriesType;
};

export const CarouselCategories = ({ header, categories }: propTypes) => {
  const renderItem = React.useCallback(({ item }: { item: categoryType }) => {
    return <CategoryCard {...item} />;
  }, []);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH / COUNT,
    height: 240,
    style: {
      width: PAGE_WIDTH,
    },
  } as const;

  return (
    <View className="mt-2 p-2">
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="px-2 text-left text-lg font-bold ">{header}</Text>
      </View>

      <Carousel
        {...baseOptions}
        loop
        autoPlay={false}
        autoPlayInterval={2000}
        data={categories}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CarouselItems;
