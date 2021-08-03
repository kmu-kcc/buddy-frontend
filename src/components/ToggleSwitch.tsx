import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {
  space, SpaceProps,
  width, WidthProps,
  maxWidth, MaxWidthProps,
  minWidth, MinWidthProps,
} from 'styled-system';

const Wrapper = styled.div<SpaceProps & WidthProps & MaxWidthProps & MinWidthProps>`
  display: inline-block;
  position: relative;
  user-select: none;
  ${width}
  ${maxWidth}
  ${minWidth}
  ${space}
`;

const Toggle = styled.div<{onToggle: boolean;}>`
  display: block;
  width: 42px;
  height: 22px;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  vertical-align: middle;
  background-color: ${({onToggle}) => onToggle ? '#EFEBFC': '#6D48E5'};
  transition : 0.2s;
`;

const ToggleBall = styled.div<{onToggle:boolean}>`
  display: block;
  width: 18px;
  height: 20px;
  border-radius: 50%;
  background-color: #ffff;
  vertical-align: middle;
  transform: ${({onToggle}) => onToggle ? 'translateX(-20%)': 'translateX(120%)'};
  box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
  transition : 0.2s;
`;

interface Props extends SpaceProps, WidthProps, MaxWidthProps, MinWidthProps {
    children?: JSX.Element;
  }

export const ToggleSwitch = (props: Props) => {
  const {...styles} = props;
  const [isToggle, setToggle] = useState(false);
  const handleToggleClick = useCallback(() => {
    setToggle(!isToggle);
  }, [isToggle, setToggle]);
  return (
    <Wrapper {...styles}>
      <Toggle onToggle={isToggle} onClick={handleToggleClick}>
        <ToggleBall onToggle={isToggle} onClick={handleToggleClick} />
      </Toggle>
    </Wrapper>
  );
};
