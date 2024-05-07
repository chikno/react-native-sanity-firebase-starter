import { FlashList } from '@shopify/flash-list';
import * as React from 'react';

import { useCategories } from '@/api';
import type { categoryType } from '@/api/categories/types';
import { ActivityIndicator, EmptyList, ScrollView, Text, View } from '@/ui';

import { CarouselCategories } from './carousel-categories';
import { CategoryCard } from './category-card';

type Props = {
  isCarousel: boolean;
};
export const CategoriesList = ({ isCarousel }: Props) => {
  const renderItem = React.useCallback(({ item }: { item: categoryType }) => {
    return <CategoryCard {...item} />;
  }, []);
  const variables =
    '*[_type == "categories" ]{_id, "image":image.asset->url, name , "description": description[].children[].text}';

  const { data, isLoading, isError } = useCategories({ variables });

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
    <>
      {isCarousel ? (
        <CarouselCategories
          categories={data}
          header="Nos catégories de service"
        />
      ) : (
        <ScrollView className="px-4">
          <Text className=" text-left text-lg font-bold ">
            Nos catégories de Service :{' '}
          </Text>
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={(_, index) => `item-${index}`}
            numColumns={2}
            ListEmptyComponent={<EmptyList isLoading={isLoading} />}
            estimatedItemSize={300}
          />
        </ScrollView>
      )}
    </>
  );
};
