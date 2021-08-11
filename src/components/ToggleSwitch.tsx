import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  user-select: none;
`;

const Toggle = styled.div<SpaceProps & {isToggle: boolean;}>`
  display: flex;
  width: 42px;
  height: 18px;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${({isToggle}) => isToggle ? '#E5E5E5': '#6D48E5'};
  transition: all 0.2s ease 0s;
  ${space}

  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: #ffffff;
    transform: ${({isToggle}) => isToggle ? 'translateX(10%)': 'translateX(185%)'};
    transition: all 0.2s ease 0s;
  }
`;

interface Props extends SpaceProps{
  ontoggleClick?: (Toggled : boolean) => void;
}


export const ToggleSwitch = (props: Props) => {
  const {ontoggleClick, ...styles} = props;
  const [Active, setToggle] = useState(false);
  const handleToggleClick = useCallback(() => {
    setToggle(!Active);
    if (ontoggleClick) {
      ontoggleClick(!Active);
    }
  }, [Active, setToggle, ontoggleClick]);
  return (
    <Wrapper>
      <Toggle
        isToggle={Active} {...styles} onClick={handleToggleClick}>
      </Toggle>
    </Wrapper>
  );
};
