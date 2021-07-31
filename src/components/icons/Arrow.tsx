import React, {useMemo} from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  color?: string;
  scale?: number;
  rotate?: number;
}

export const Arrow = (props: Props) => {
  const {scale = 1, color, rotate = 0, ...styles} = props;
  const width = useMemo(() => 16 * scale, [scale]);
  const height = useMemo(() => 11 * scale, [scale]);
  const viewBox = useMemo(() => `0 0 ${width} ${height}`, [width, height]);
  const rotateStyle = useMemo(() => ({transform: `rotate(${rotate}deg)`}), [rotate]);

  return (
    <Icon width={width} height={height} viewBox={viewBox} fill='none' style={rotateStyle} {...styles}>
      <path d='M1 1L8 10L15 1' stroke={color ?? '#6D48E5'} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
    </Icon>
  );
};
