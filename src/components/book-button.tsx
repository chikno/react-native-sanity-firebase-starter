import * as React from 'react';

import { Button } from '@/ui';

type Props = {
  onSelect: () => void;
  className: string;
};
export const BookButton = ({ onSelect, className }: Props) => {
  return (
    <Button
      onPress={onSelect}
      size="sm"
      className={className}
      textClassName="text-white uppercase"
      variant="default"
      label="Je résérve"
    />
  );
};
