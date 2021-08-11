import React from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  width?: string;
  height?: string;
  color?: string;
}

export const Check = (props: Props) => {
  const {color = '#fff', width = '6px', height = '5px', ...styles} = props;

  return (
    <Icon width={width} height={height} viewBox='0 0 6 5' {...styles}>
      <path d='M0.5 2L2.5 4L5.5 0.5' stroke={color} strokeLinecap='round' strokeLinejoin='round' />
    </Icon>
  );
};
