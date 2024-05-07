import { Link, router } from 'expo-router';
import React from 'react';

import type { ServiceType } from '@/api';
import { useAuth } from '@/core';
import { _useSelectedService } from '@/core/booking';
import { Image, Text, TouchableOpacity, View } from '@/ui';

import { BookButton } from './book-button';
import { Duration } from './duration';
import { Price } from './price';

type Props = ServiceType;
export const Card = (props: Props) => {
  const { _id, name, category, image, price, duration, isBooking } = props;

  const setService = _useSelectedService((state: any) => state.setService);
  const token = useAuth.use.token();
  const onSelect = (service: ServiceType) => {
    setService(service);
    !token ? router.push('/(app)/login') : router.push('/booking');
  };

  return (
    <Link className="w-full" href={`/feed/${_id}`} asChild>
      <TouchableOpacity>
        <View className="m-2  overflow-hidden  rounded-xl border   border-neutral-300 dark:bg-neutral-900">
          <View className=" absolute right-0 top-0 z-30 rounded-md bg-primary-900 shadow-md">
            <Text className=" p-2 text-xs font-bold text-white">
              {category}
            </Text>
          </View>
          <Image
            className="contain h-36 w-full overflow-hidden rounded-t-xl"
            contentFit="cover"
            source={{
              uri: image,
            }}
          />
          <View className=" w-full bg-primary-900 p-2">
            <Text className="text-md py-1 font-inter font-bold text-white">
              {name}
            </Text>
          </View>
          <View className="0 w-full flex-row  justify-between p-0 ">
            <View className="flex-row  justify-around">
              <Duration
                duration={duration}
                color={'black'}
                className="flex-row items-center justify-center gap-1 bg-white p-2"
                textClassName={
                  'text-sm text-center font-inter font-bold text-black'
                }
              />
              <Price
                price={price}
                color={'black'}
                className=" flex-row items-center justify-center gap-1 bg-white p-2"
                textClassName={
                  'text-sm text-center font-inter font-bold text-black'
                }
              />
            </View>
          </View>
          {!isBooking && (
            <BookButton
              className="w-full"
              onSelect={() => {
                onSelect(props);
              }}
            />
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
};
