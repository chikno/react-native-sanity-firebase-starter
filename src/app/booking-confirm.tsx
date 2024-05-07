import { router, Stack } from 'expo-router';
import * as React from 'react';

import { _useSelectedService } from '@/core/booking';
import { Button, Text, View } from '@/ui';

type Props = {};

export const BookingConfirm = ({ }: Props) => {
  const selectedService = _useSelectedService(
    (response) => response?.selectedService
  );
  return (
    <View className="flex-1 items-center justify-center px-2">
      <Stack.Screen
        options={{
          headerBackVisible: false,
        }}
      />
      <Text className="mb-2 text-center text-xl font-bold">
        Kinémobile vous remercie pour votre réservation.
      </Text>
      <Text className="my-10 text-lg">
        Vous Devez confirmer votre réservation en envoyant le montant de{' '}
        {selectedService.price}
        {' DH'} au compte bancaire suivant :{' '}
      </Text>
      <Text className="text-xl font-bold">34345656454574574574574574574</Text>

      <Button
        textClassName="uppercase text-xl"
        className="my-12"
        label="Retour"
        onPress={() => {
          router.navigate('/');
        }}
      />
    </View>
  );
};

export default BookingConfirm;
