import { Link } from 'expo-router';
import React from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import type { ServicesType, ServiceType } from '@/api';
import { Text, View } from '@/ui';
import { ArrowRight } from '@/ui/icons';

import { Card } from './card';
const PAGE_WIDTH = Dimensions.get('screen').width;
const COUNT = 1.5;
type propTypes = {
  header: string;
  services: ServicesType;
};

const CarouselItems = ({ header, services }: propTypes) => {
  const renderItem = React.useCallback(({ item }: { item: ServiceType }) => {
    return <Card {...item} />;
  }, []);
  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH / COUNT,
    height: 300,
    style: {
      width: PAGE_WIDTH,
    },
  } as const;

  return (
    <View className="mt-2 p-2">
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="px-2 text-left text-lg font-bold ">{header}</Text>
        <Link
          href={'/feed/services'}
          className="flex-row items-center justify-center"
        >
          <Text className="mr-2">Voir Tous</Text>
          <ArrowRight width={12} height={12} color={'black'} />
        </Link>
      </View>

      <Carousel
        {...baseOptions}
        loop
        autoPlay={false}
        autoPlayInterval={2000}
        data={services}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CarouselItems;
