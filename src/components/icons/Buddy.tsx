import React from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Buddy = (props: Props) => {
  const {width = 80, height = 116, color = '#6D48E5', ...styles} = props;

  return (
    <Icon width={width} height={height} viewBox='0 0 80 116' {...styles}>
      <path stroke={color} strokeWidth='9' strokeMiterlimit='1' d='M74.9935 40.3333C74.9935 20.8207 59.322 5 39.9935 5C20.6649 5 5 20.8207 5 40.3333V75.6667V111H40C59.3286 111 75 95.1793 75 75.6667C75 69.2305 73.2855 63.2023 70.3064 58.0033C73.279 52.8043 74.9935 46.7695 74.9935 40.3333Z' />
    </Icon>
  );
};
