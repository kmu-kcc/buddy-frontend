import React from 'react';
import {SpaceProps} from 'styled-system';
import {Icon} from '../Icon';
import {CursorProps} from '../../utils/cursor';

interface Props extends SpaceProps, CursorProps {
  width?: string;
  height?: string;
  color?: string;
}

export const Search = (props: Props) => {
  const {width = '28px', height = '28px', color = '#CBC8BE', ...styles} = props;
  return (
    <Icon width={width} height={height} viewBox='0 0 28 28' {...styles}>
      <path stroke={color} strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'
        d='M26 26L20.3335 20.3234L26 26ZM23.4737 12.7368C23.4737 15.5844 22.3425 18.3154 20.3289 20.3289C18.3154 22.3425 15.5844 23.4737 12.7368 23.4737C9.88925 23.4737 7.1583 22.3425 5.14475 20.3289C3.1312 18.3154 2 15.5844 2 12.7368C2 9.88925 3.1312 7.1583 5.14475 5.14475C7.1583 3.1312 9.88925 2 12.7368 2C15.5844 2 18.3154 3.1312 20.3289 5.14475C22.3425 7.1583 23.4737 9.88925 23.4737 12.7368V12.7368Z' />
    </Icon>
  );
};
