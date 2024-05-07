import { FlashList } from '@shopify/flash-list';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import type { ServiceType } from '@/api';
import { useServices } from '@/api';
import { Card } from '@/components/card';
import { ActivityIndicator, EmptyList, Text, View } from '@/ui';

export default CategoryServices = () => {
  const renderItem = React.useCallback(({ item }: { item: ServiceType }) => {
    return <Card {...item} />;
  }, []);
  const local = useLocalSearchParams<{ id: string }>();

  const variables = `*[ _type == "services" && category->name == '${local.id}']{_id, name , "category": category->name , "image":image.asset->url, isHero, price , duration, "city":city[]->value }`;
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
    <>
      <Stack.Screen
        options={{ title: local.id.toUpperCase(), headerBackTitle: 'Accueil' }}
      />
      <View className="flex-1">
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          numColumns={2}
          ListEmptyComponent={<EmptyList isLoading={isLoading} />}
          estimatedItemSize={300}
        />
      </View>
    </>
  );
};
