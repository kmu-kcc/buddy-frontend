import React, {useMemo} from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  width?: string;
  height?: string;
  color?: string;
  rotate?: number;
}

export const Arrow = (props: Props) => {
  const {width = '16px', height = '11px', color, rotate = 0, ...styles} = props;
  const rotateStyle = useMemo(() => ({transform: `rotate(${rotate}deg)`}), [rotate]);

  return (
    <Icon width={width} height={height} viewBox='0 0 16 11' style={rotateStyle} {...styles}>
      <path d='M1 1L8 10L15 1' stroke={color ?? '#6D48E5'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </Icon>
  );
};
