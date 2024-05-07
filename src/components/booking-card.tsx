import * as React from 'react';

import type { BookingType } from '@/api/booking';
import { Button, View } from '@/ui';
import { Account, Pin, Time } from '@/ui/icons';

import { Card } from './card';
import { Item } from './settings/item';
import { ItemsContainer } from './settings/items-container';

type Props = BookingType;
export const BookingCard = ({
  address,
  city,
  date,
  prestation,
  displayName,
  service,
}: Props) => {
  const [showDetails, setShowDetails] = React.useState(false);
  return (
    <View className="relative my-5 p-3">
      <Card isBooking={true} {...service} />

      <Button
        label="Details"
        onPress={() => {
          setShowDetails(!showDetails);
        }}
        className=" flex items-center justify-center"
      />
      {showDetails && (
        <View className="flex-1  pb-4 ">
          <ItemsContainer>
            <Item text={displayName} icon={<Account color={'black'} />} />
            <Item
              text={address + ' - ' + prestation + ' - ' + city}
              icon={<Pin width={32} height={32} color={'black'} />}
            />
            <Item text={date} icon={<Time color={'black'} />} />
          </ItemsContainer>
        </View>
      )}
    </View>
  );
};
