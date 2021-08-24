import React from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  width?: string;
  height?: string;
  color?: string;
}

export const Profile = (props: Props) => {
  const {width = '20px', height = '20px', color = '#F9F3FF', ...styles} = props;

  return (
    <Icon width={width} height={height} viewBox='0 0 20 20' fill='none' {...styles}>
      <path fill={color} d='M16.7356 2.09195V16.7356H2.09195V2.09195H16.7356ZM16.7356 0H2.09195C0.941379 0 0 0.941379 0 2.09195V16.7356C0 17.8862 0.941379 18.8276 2.09195 18.8276H16.7356C17.8862 18.8276 18.8276 17.8862 18.8276 16.7356V2.09195C18.8276 0.941379 17.8862 0 16.7356 0Z' />
      <path fill={color} d='M11.5059 14.6437H4.18408V12.5517H11.5059V14.6437ZM14.6439 10.4598H4.18408V8.36781H14.6439V10.4598ZM14.6439 6.27585H4.18408V4.1839H14.6439V6.27585Z' />
    </Icon>
  );
};
