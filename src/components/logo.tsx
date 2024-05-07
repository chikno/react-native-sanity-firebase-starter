import * as React from 'react';

import { Image } from '@/ui';

type Props = {
  className: string;
};
export const Logo = ({ className }: Props) => {
  const image = require('assets/logo.png');
  return <Image className={className} source={image} />;
};
