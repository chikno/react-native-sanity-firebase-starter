import React from 'react';

import { useServices } from '@/api';
import CarouselItems from '@/components/carousel-items';
import { CategoriesList } from '@/components/categories-list';
import { Search } from '@/components/search';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/ui';

export default function Feed() {
  const variables =
    '*[ _type == "services" && (isPopular == true)] {_id, name , "category": category->name , "image":image.asset->url, isHero, price , duration, "city":city[]->value, prestation }';
  const { data, isLoading, isError } = useServices({ variables });
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
    <ScrollView className="flex-1 bg-primary-100">
      <FocusAwareStatusBar />
      <Search />
      <CategoriesList isCarousel={true} />
      <CarouselItems header="Services Populaires" services={data} />
    </ScrollView>
  );
}
