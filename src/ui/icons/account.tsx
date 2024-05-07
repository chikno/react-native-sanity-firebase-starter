import * as React from 'react';
import { Circle, Defs, Path, Svg, type SvgProps } from 'react-native-svg';

export const Account = ({
  width = '24px',
  height = '24px',
  color = '#ccc',
  ...props
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    id="Layer_1"
    data-name="Layer 1"
  >
    <Defs />
    <Circle
      strokeWidth={2}
      fill={'none'}
      stroke={color}
      cx="12"
      cy="7.25"
      r="5.73"
    />
    <Path
      strokeWidth={2}
      fill={'none'}
      stroke={color}
      d="M1.5,23.48l.37-2.05A10.3,10.3,0,0,1,12,13h0a10.3,10.3,0,0,1,10.13,8.45l.37,2.05"
    />
  </Svg>
);
