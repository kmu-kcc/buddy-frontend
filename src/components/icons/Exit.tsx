import React from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  width?: string;
  height?: string;
  color?: string;
}

export const Exit = (props: Props) => {
  const {width = '14px', height = '14px', color = '#fff', ...styles} = props;

  return (
    <Icon width={width} height={height} viewBox='0 0 14 14' fill='none' {...styles}>
      <path fill={color} d='M10.8889 3.88889L9.79222 4.98556L11.0211 6.22222H4.66667V7.77778H11.0211L9.79222 9.00667L10.8889 10.1111L14 7L10.8889 3.88889ZM1.55556 1.55556H7V0H1.55556C0.7 0 0 0.7 0 1.55556V12.4444C0 13.3 0.7 14 1.55556 14H7V12.4444H1.55556V1.55556Z' />
    </Icon>
  );
};
