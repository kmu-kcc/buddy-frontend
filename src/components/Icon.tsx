import React from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';
import {cursor, CursorProps} from '../utils/cursor';

const Svg = styled.svg`
  box-sizing: border-box;
  ${space}
  ${cursor}
  transition: all 0.15s ease-out;
`;

export interface IconProps extends SpaceProps, CursorProps {
  width: string;
  height: string;
  viewBox?: string;
  fill?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const Icon = (props: IconProps) => {
  const {children, ...styles} = props;
  return (
    <Svg {...styles}>
      <g fill='none' fillRule='evenodd'>
        {children}
      </g>
    </Svg>
  );
};
