import React from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';

const Wrapper = styled.textarea<SpaceProps & Props>`
  box-sizing: border-box;
  height: 191px;
  resize: none;
  padding: 18px 24px;
  background: #fff;
  border: 1px solid ${({error, empty}) => error ?
  '#FF9A83' : empty ? '#CBC8BE' : '#8D71EB'};
  border-radius: 15px;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  color: #454440;
  ::placeholder {
    color: #CBC8BE;
  }
  ${space}
  :focus, :hover {
    border-color: #CEC2F6;
    outline: none;
    border-radius: 15px;
  }
`;

interface Props extends SpaceProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: boolean;
  empty?: boolean;
  placeholder?: string;
}

export const Textarea = (props: Props) => {
  const {value} = props;
  const empty = value === '';
  return <Wrapper empty={empty} {...props} />;
};
