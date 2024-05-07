import { router, Stack, useLocalSearchParams } from 'expo-router';
import * as React from 'react';

import { useService } from '@/api/services/use-service';
import { BookButton } from '@/components/book-button';
import { Details } from '@/components/details';
import { Duration } from '@/components/duration';
import { Price } from '@/components/price';
import { useAuth } from '@/core';
import { _useSelectedService } from '@/core/booking';
import {
  ActivityIndicator,
  FocusAwareStatusBar,
  Image,
  ScrollView,
  Text,
  View,
} from '@/ui';
import { Pin } from '@/ui/icons';

export default function Service() {
  const local = useLocalSearchParams<{ id: string }>();
  const variables = `*[_type == 'services' && _id == '${local.id}'][0]{_id, name , "category": category->name , "image":image.asset->url, isHero, price , duration , "description": description[].children[].text , details, "city":city[]->value, prestation}`;
  const { data, isLoading, isError } = useService({ variables });
  const setService = _useSelectedService((state: any) => state.setService);
  const token = useAuth.use.token();
  const onSelect = () => {
    setService(data);
    !token ? router.push('/(app)/login') : router.push('/booking');
  };
  if (isLoading) {
    return (
      <View className="flex-1 justify-center  p-3">
        <Stack.Screen
          options={{ title: 'Loading...', headerBackTitle: 'Retour' }}
        />
        <FocusAwareStatusBar />
        <ActivityIndicator />
      </View>
    );
  }
  if (isError) {
    return (
      <View className="flex-1 justify-center p-3">
        <Stack.Screen options={{ title: 'Error', headerBackTitle: 'Retour' }} />
        <FocusAwareStatusBar />
        <Text className="text-center">Error loading post</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView className="mb-20 flex-1 ">
        <Stack.Screen
          options={{ title: data?.name, headerBackTitle: 'Retour' }}
        />
        <FocusAwareStatusBar />
        <View className="relative">
          <Image
            className="aspect-video w-full rounded-md"
            source={data?.image}
          />
          <View className="absolute right-0 flex-row justify-between rounded-md shadow-md ">
            <Duration
              duration={data?.duration}
              color={'black'}
              className="flex-row items-center justify-center gap-1 bg-white p-2 "
              textClassName={
                'text-md text-center font-inter font-bold text-black'
              }
            />
            <Price
              price={data?.price}
              color={'black'}
              className=" flex-row items-center justify-center gap-1 bg-white p-2"
              textClassName={
                'text-md text-center font-inter font-bold text-black'
              }
            />
          </View>
          <View className="absolute left-0 flex-row justify-between rounded-md  bg-primary-900 shadow-md">
            <Text className=" p-2 text-xl font-bold text-white">
              {data?.category}
            </Text>
          </View>
        </View>

        <Text className="p-2 text-xl font-bold text-primary-900">
          {data?.name}
        </Text>
        <Text className="text-md p-2 text-black">{data?.description}</Text>

        <View className="mt-4 flex  px-2">
          <Details details={data?.details?.myArray} />
        </View>

        <View className="mb-2 flex h-36  flex-col  items-center justify-center   bg-primary-100 text-white">
          <Pin width={36} height={36} />
          {data?.city &&
            data?.city.map((city: string, index: number) => {
              return (
                <Text className="text-md my-2 uppercase" key={index}>
                  {city}
                </Text>
              );
            })}
        </View>
        <View className="flex h-36  flex-col  items-center justify-center bg-primary-100 text-white">
          <Pin width={36} height={36} />
          {data?.prestation &&
            data?.prestation.map((prestation: string, index: number) => {
              return (
                <Text className="text-md my-2 uppercase" key={index}>
                  {prestation}
                </Text>
              );
            })}
        </View>
      </ScrollView>

      <BookButton
        className="absolute bottom-4 left-14 h-12 w-3/4 "
        onSelect={onSelect}
      />
    </>
  );
}
