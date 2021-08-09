import React from 'react';
import styled from 'styled-components';
import {
  background, BackgroundProps,
  color, ColorProps,
  height, HeightProps,
  space, SpaceProps,
  width, WidthProps,
} from 'styled-system';

type StyleProps = BackgroundProps & ColorProps & HeightProps & SpaceProps & WidthProps;

const Wrapper = styled.button<StyleProps>`
  ${width}
  ${height}
  ${space}
  ${background}
  ${color}
  border: 2px solid #6D48E5;
  border-radius: 37px;
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  cursor: pointer;
  transition: all 0.15s ease-out;

  :focus, :hover {
    filter: brightness(115%);
  }
`;

interface ButtonProps extends StyleProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

const defaultProps = {
  background: '#6D48E5',
  color: '#fff',
  height: '48px',
  px: '47px',
  py: '12px',
};

type Props = ButtonProps & typeof defaultProps;

export const Button = (props: Props) => {
  const {children, onClick, ...styles} = props;

  return (
    <Wrapper onClick={onClick} {...styles}>
      {children}
    </Wrapper>
  );
};

Button.defaultProps = defaultProps;
