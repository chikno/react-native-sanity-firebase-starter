import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

export const Check = ({ color = '#fff' }: SvgProps) => (
  <Svg fill={color} width="20px" height="20px" viewBox="0 0 1920 1920">
    <Path
      d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z"
      fill-rule="evenodd"
    />
  </Svg>
);
