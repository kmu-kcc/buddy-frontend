import React from 'react';
import styled from 'styled-components';
import {
  compose, background, BackgroundProps,
  border, BorderProps,
  color, ColorProps,
  flex, FlexProps,
  height, HeightProps,
  space, SpaceProps,
  typography, TypographyProps,
  width, WidthProps,
} from 'styled-system';

type StyleProps = BorderProps & BackgroundProps & ColorProps & FlexProps & HeightProps & SpaceProps & TypographyProps & WidthProps;

const Wrapper = styled.button<StyleProps>`
  box-sizing: border-box;
  ${compose(
      width,
      height,
      flex,
      space,
      background,
      color,
      typography,
      border,
  )}
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
  border: '2px solid #6D48E5',
  borderRadius: '37px',
  color: '#fff',
  height: '48px',
  fontSize: '18px',
  fontWeight: 700,
  lineHeight: '23px',
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
