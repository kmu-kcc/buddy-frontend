import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';

const Wrapper = styled.div<SpaceProps>`
  display: inline-block;
  position: relative;
  user-select: none;
  ${space}
`;

const Toggle = styled.div<{toggled: boolean;}>`
  display: flex;
  width: 42px;
  height: 18px;
  align-items: center;
  border-radius: 15px;
  cursor: pointer;
  background-color: ${({toggled}) => toggled ? '#6D48E5': '#E5E5E5'};
  transition: all 0.2s ease;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 14px;
    height: 14px;
    background: #ffffff;
    transform: ${({toggled}) => !toggled ? 'translateX(10%)': 'translateX(185%)'};
    transition: all 0.2s ease;
  }
`;

interface Props extends SpaceProps {
  active?: boolean;
  initialActive?: boolean;
  onToggleClick?: (Toggled: boolean) => void;
}

export const ToggleSwitch = (props: Props) => {
  const {onToggleClick, initialActive = false, ...styles} = props;
  const [active, setToggle] = useState(initialActive);
  const handleToggleClick = useCallback(() => {
    setToggle(!active);
    if (onToggleClick) {
      onToggleClick(!active);
    }
  }, [active, setToggle, onToggleClick]);

  useEffect(() => {
    if (props.active !== undefined && active !== props.active) {
      console.log('change toggle state to', props.active);
      setToggle(props.active);
    }
  }, [props.active, active]);

  return (
    <Wrapper {...styles}>
      <Toggle toggled={active} onClick={handleToggleClick} />
    </Wrapper>
  );
};
