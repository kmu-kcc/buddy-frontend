import React, {useMemo} from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  scale?: number;
  color?: string;
}

export const Check = (props: Props) => {
  const {color, scale = 1, ...styles} = props;
  const width = useMemo(() => 6 * scale, [scale]);
  const height = useMemo(() => 5 * scale, [scale]);

  return (
    <Icon width={width} height={height} viewBox='0 0 6 5' {...styles}>
      <path d='M0.5 2L2.5 4L5.5 0.5' stroke={color ?? '#fff'} strokeLinecap='round' strokeLinejoin='round' />
    </Icon>
  );
};
