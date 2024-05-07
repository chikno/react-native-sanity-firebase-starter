import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import type { ServiceType } from '@/api';
import { useServices } from '@/api';
import { Card } from '@/components/card';
import {
  ActivityIndicator,
  ControlledInput,
  EmptyList,
  Text,
  View,
} from '@/ui';
import { Search } from '@/ui/icons';

const Services = () => {
  const { control, getValues } = useForm();
  const renderItem = React.useCallback(({ item }: { item: ServiceType }) => {
    return <Card {...item} />;
  }, []);

  const handleFilter = () => {
    const value = getValues('filter');
  };

  const variables =
    '*[ _type == "services"] {_id, name , "category": category->name , "image":image.asset->url, isHero, price , duration }';
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
        options={{
          title: 'Nos service',
          headerBackTitle: 'Accueil',
        }}
      />
      <View className="flex-1">
        <View className="p-2">
          <ControlledInput
            onKeyPress={handleFilter}
            placeholder="Filter les service"
            name="filter"
            control={control}
          />
          <Search color={'black'} className="absolute right-4 top-4" />
        </View>

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

export default Services;
