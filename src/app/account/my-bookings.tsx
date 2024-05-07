import { FlashList } from '@shopify/flash-list';
import { Stack } from 'expo-router';
import * as React from 'react';

import type { BookingType } from '@/api/booking';
import { useGetUserBookings } from '@/api/booking/use-get-user-bookings';
import { BookingCard } from '@/components/booking-card';
import { useAuth } from '@/core';
import { ActivityIndicator, EmptyList, Text, View } from '@/ui';

type Props = {};
const MyBookings = ({ }: Props) => {
  const renderItem = React.useCallback(({ item }: { item: BookingType }) => {
    return <BookingCard {...item} />;
  }, []);
  const token = useAuth.use.token();
  const variables = { email: token.user.email };

  const { data, isLoading, isError } = useGetUserBookings({ variables });
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
      <Stack.Screen
        options={{
          headerBackTitle: 'retour',
          title: 'Mes réservations',
        }}
      />
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        numColumns={1}
        ListEmptyComponent={<EmptyList isLoading={isLoading} />}
        estimatedItemSize={300}
      />
    </View>
  );
};

export default MyBookings;
