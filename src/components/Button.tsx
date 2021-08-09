import React from 'react';
import styled from 'styled-components';
import {background, BackgroundProps, space, SpaceProps} from 'styled-system';

const Wrapper = styled.button<SpaceProps & BackgroundProps>`
  height: 48px;
  ${space}
  ${background}
  color: #fff;
  border: 2px solid #6D48E5;
  border-radius: 37px;
  padding-top: 12px;
  padding-bottom: 13px;
  padding-left: 47px;
  padding-right: 47px;
  font-size: 18px;
  font-weight: 700;
  line-height: 23px;
  cursor: pointer;
  transition: all 0.15s ease-out;

  :focus, :hover {
    filter: brightness(115%);
  }
`;

interface Props extends SpaceProps, BackgroundProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: Props) => {
  const {children, background, onClick, ...styles} = props;

  return (
    <Wrapper background={background ?? '#6D48E5'} onClick={onClick} {...styles}>
      {children}
    </Wrapper>
  );
};
