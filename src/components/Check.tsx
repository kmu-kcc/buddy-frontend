import React from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';
import {Check as CheckIcon} from './icons/Check';

const Wrapper = styled.div<SpaceProps & {checked: boolean;}>`
  ${space}
  width: fit-content;
  display: inline-flex;
  user-select: none;
  align-items: flex-start;
  cursor: pointer;

  :hover {
    > div {
      border-color: #6D48E5;
      background-color: ${({checked}) => checked ? '#6D48E5' : '#EFEBFC'};
    }
  }

  > div {
    border: 1px solid ${({checked}) => checked ? '#6D48E5' : '#CBC8BE'};
    background-color: ${({checked}) => checked ? '#6D48E5' : '#fff'};

    > svg {
      visibility: ${({checked}) => checked ? 'visible' : 'hidden'};
      margin: auto;
    }
  }
`;

const Box = styled.div`
  box-sizing: border-box;
  height: 10px;
  width: 10px;
  display: inherit;
  align-items: center;
  justify-content: center;
  border-radius: 1px;
  transition: all 0.15s ease-out;
`;

const Text = styled.span`
  color: #454440;
  font-size: 9px;
  line-height: 11px;
  margin-left: 6px;
`;

interface Props extends SpaceProps {
  checked: boolean;
  label?: String;
  children?: React.ReactNode;
  onCheck?: () => void;
}

export const Check = (props: Props) => {
  const {label, onCheck, checked, ...styles} = props;
  return (
    <Wrapper checked={checked} onClick={onCheck} {...styles}>
      <Box>
        <CheckIcon color='#fff' />
      </Box>
      <Text>{label}</Text>
    </Wrapper>
  );
};
