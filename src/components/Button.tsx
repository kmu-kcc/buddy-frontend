import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';

const Wrapper = styled.button<SpaceProps & {isClicked: boolean;}>`
  height: 48px;
  color: #8D8C85;
  background-color: ${({isClicked}) => isClicked ? '#6D48E5' : '#fff'};
  border: 2px solid #8D8C85;
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
  ${space}

  :focus,:hover {
    border-color: #6D48E5;
    color: ${({isClicked}) => isClicked ? '#fff' : '#6D48E5'};
  }
`;

interface Props extends SpaceProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: Props) => {
  const {children, onClick, ...styles} = props;

  const [isClicked, setClicked] = useState(false);
  const toggleClicked = useCallback((state: boolean) => () => {
    setClicked(state);
  }, [setClicked]);
  return (
    <Wrapper
      onMouseDown={toggleClicked(true)}
      onMouseUp={toggleClicked(false)}
      onClick={onClick} {...styles} isClicked={isClicked}>
      {children}
    </Wrapper>
  );
};
