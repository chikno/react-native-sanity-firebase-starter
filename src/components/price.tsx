import * as React from 'react';

import { Text, View } from '@/ui';

type Props = {
  price: number;
  color?: string;
  className: string;
  textClassName: string;
};
export const Price = ({ price, className, textClassName }: Props) => {
  return (
    <View className={className}>
      <Text testID="price" className={textClassName}>
        {price} DH
      </Text>
    </View>
  );
};
