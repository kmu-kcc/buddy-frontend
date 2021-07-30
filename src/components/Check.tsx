import React from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';

const Text = styled.span`
  height: 11px;
  color: #454440;
  font-style: normal;
  font-weight: normal;
  font-size: 9px;
  line-height: 11px;
  margin-left: 6px;
`;

const Checkbox = styled.div<{isChecked: boolean;}>`
  height: 10px;
  width: 10px;
  border-radius: 1px;
  border: 1px solid ${({isChecked}) => isChecked ? '#6D48E5' : '#CBC8BE'};
  display: inline-block;
  background-color: ${({isChecked}) => isChecked ? '#6D48E5' : '#fff'};
`;

const Wrapper = styled.div<SpaceProps & {isChecked: boolean;}>`
  ${space}
  user-select: none;
  width: fit-content;
  display: inline-flex;
  align-items: flex-start;
  cursor: pointer;


  :hover {
    > div {
      border-color: '#6D48E5';
      background-color: ${({isChecked}) => isChecked ? '#6D48E5' : '#EFEBFC'};
    }
  }
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
    <Wrapper isChecked={checked} onClick={onCheck} {...styles}>
      <Checkbox isChecked={checked} />
      <Text>{label}</Text>
    </Wrapper>
  );
};
