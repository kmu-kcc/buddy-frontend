import React from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';


const Wrapper = styled.input<SpaceProps & Props>`
  box-sizing: border-box;
  width: 433px;
  height: 59px;
  border: 1px solid ${({error, empty}) => error ?
  '#FF9A83' : empty ? '#CBC8BE' : '#8D71EB'};
  padding: 12px 24px;
  border-radius: 15px;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  float: right;
  margin-bottom: 100px;
  color: #CBC8BE;
  ::placeholder {
    color: #CBC8BE;
  }
  ${space}
  :focus {
    border: 1px solid #8D71EB;
    outline: none;
    color: #454440;
  }
`;

interface Props extends SpaceProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  empty?: boolean;
  placeholder?: string;
}


export const SearchInput = (props: Props) => {
  const {value} = props;
  const empty = value === '';
  return <Wrapper empty={empty} {...props} />;
};
