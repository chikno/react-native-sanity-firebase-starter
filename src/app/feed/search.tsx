import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import * as React from 'react';

import type { ServiceType } from '@/api';
import { Card } from '@/components/card';
import { _useSearch } from '@/core/search';
import { EmptyList, ScrollView, View } from '@/ui';

const Search = () => {
  const renderItem = React.useCallback(({ item }: { item: ServiceType }) => {
    return <Card isBooking={false} {...item} />;
  }, []);
  const [data, setData] = React.useState([]);

  const response = _useSearch((response) => response);

  React.useEffect(() => {
    setData(response?.searchStore?.searchResult);
  }, [response?.searchStore?.searchResult]);
  return (
    <ScrollView>
      <Stack.Screen
        options={{ title: 'Search Result', headerBackTitle: 'Retour' }}
      />

      <View className="flex-1">
        <FlashList
          data={data}
          renderItem={renderItem}
          keyExtractor={(_, index) => `item-${index}`}
          ListEmptyComponent={<EmptyList isLoading={false} />}
          numColumns={2}
          estimatedItemSize={300}
        />
      </View>
    </ScrollView>
  );
};

export default Search;
