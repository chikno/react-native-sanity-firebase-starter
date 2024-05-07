import * as React from 'react';

import { Text, View } from '@/ui';
import { Time } from '@/ui/icons';

type Props = {
  duration: string;
  color: string;
  className: string;
  textClassName: string;
};
export const Duration = ({
  duration,
  color,
  className,
  textClassName,
}: Props) => {
  return (
    <View className={className}>
      <Text testID="duration" className={textClassName}>
        {duration}
      </Text>
      <Time color={color} />
    </View>
  );
};
