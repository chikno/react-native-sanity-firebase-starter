import * as React from 'react';

import { Radio } from '@/ui';

type Props = {
  label: string;
  onChange: () => void;
  selected: boolean;
};
export const RadioBox = ({ label, onChange, selected }: Props) => {
  return (
    <Radio.Root
      checked={selected}
      onChange={onChange}
      accessibilityLabel="radio button"
      className="pb-2"
    >
      <Radio.Icon checked={selected} />
      <Radio.Label text={label} />
    </Radio.Root>
  );
};
