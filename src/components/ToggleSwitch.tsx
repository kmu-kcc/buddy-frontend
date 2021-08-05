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

const Toggle = styled.div<{isToggle: boolean;}>`
  display: flex;
  width: 42px;
  height: 18px;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${({isToggle}) => isToggle ? '#E5E5E5': '#6D48E5'};
  transition : 0.2s;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transform: ${({isToggle}) => isToggle ? 'translateX(10%)': 'translateX(185%)'};
    transition: all 0.2s 0s;
  }
`;

interface Props extends SpaceProps, WidthProps, MaxWidthProps, MinWidthProps {
    children?: JSX.Element;
    handleToggleClick?: () => void;
}

export const ToggleSwitch = (props: Props) => {
  const {...styles} = props;
  const [isToggle, setToggle] = useState(false);
  const handleToggleClick = useCallback(() => {
    setToggle(!isToggle);
  }, [isToggle, setToggle]);
  return (
    <Wrapper {...styles}>
      <Toggle isToggle={isToggle} onClick={handleToggleClick} />
    </Wrapper>
  );
};
