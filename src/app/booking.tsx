import { router, Stack } from 'expo-router';
import * as React from 'react';

import type { BookingType } from '@/api/booking';
import { useAddBooking } from '@/api/booking';
import { BookingForm } from '@/components/booking-form';
import { Card } from '@/components/card';
import { useAuth } from '@/core';
import { _useSelectedService } from '@/core/booking';
import { ScrollView, Text } from '@/ui';

type Props = {};
const Booking = ({ }: Props) => {
  const selectedService = _useSelectedService(
    (response) => response?.selectedService
  );
  const token = useAuth.use.token();
  const { mutate: placeBooking, isLoading } = useAddBooking();
  const onSubmit = (data: BookingType) => {
    data.prestation = domicileSelected ? 'domicile' : 'cabinet';
    data.service = selectedService;
    placeBooking(data, {
      onSuccess: (response) => {
        console.log(response);
        if (response) {
          router.navigate('/booking-confirm');
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const CitiesWithDomicile = ['casablanca', 'rabat'];
  const [domicileSelected, setDomicileSelected] = React.useState(true);
  const [cabinetSelected, setCabinetSelected] = React.useState(false);
  const [domicileDisabled, setDomicileDisabled] = React.useState(false);

  const onSelect = (value: string | number) => {
    if (!CitiesWithDomicile.includes(value)) {
      setDomicileDisabled(true);
      setCabinetSelected(true);
      setDomicileSelected(false);
    } else {
      setDomicileDisabled(false);
    }
  };

  const onChangeDomicile = () => {
    setDomicileSelected(!domicileSelected);
    setCabinetSelected(false);
  };

  const onChangeCabinet = () => {
    setCabinetSelected(!cabinetSelected);
    setDomicileSelected(false);
  };
  return (
    <ScrollView
      className="w-full flex-1 px-10 py-5"
      // eslint-disable-next-line react-native/no-inline-styles
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Stack.Screen
        options={{
          title: 'Je reserve',
          headerBackTitle: 'Retour',
        }}
      />
      <Text className="mb-5  text-xl">Résumé de ma réservation</Text>
      <Card isBooking={true} {...selectedService} />
      <BookingForm
        isLoading={isLoading}
        onChangeDomicile={onChangeDomicile}
        onChangeCabinet={onChangeCabinet}
        onSelect={onSelect}
        domicileSelected={domicileSelected}
        cabinetSelected={cabinetSelected}
        domicileDisabled={domicileDisabled}
        onSubmit={onSubmit}
        user={token.user}
      />
    </ScrollView>
  );
};

export default Booking;
