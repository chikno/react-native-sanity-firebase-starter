import * as React from 'react';

import { colors, Text, View } from '@/ui';
import { Check } from '@/ui/icons';

type Props = {
  details: string[];
};
export const Details = ({ details }: Props) => {
  return (
    <>
      {details?.map((detail: string, index: number) => {
        return (
          <View
            key={index}
            className="mb-2  flex-row gap-2 bg-slate-200 px-2 py-3"
          >
            <Check color={colors.primary[900]} />
            <Text>{detail}</Text>
          </View>
        );
      })}
    </>
  );
};
