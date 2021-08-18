import React, {useMemo} from 'react';
import styled from 'styled-components';
import {
  compose, color, ColorProps,
  flex, FlexProps,
  height, HeightProps,
  space, SpaceProps,
  typography, TypographyProps,
  width, WidthProps,
} from 'styled-system';

const Wrapper = styled.input<InputProps>`
  box-sizing: border-box;
  ${compose(
      color,
      flex,
      space,
      height,
      width,
      typography,
  )}
  border: 1px solid ${({error, empty}) => error ? '#FF9A83' : empty ? '#CBC8BE' : '#8D71EB'};
  border-radius: 15px;

  ::placeholder {
    color: #CBC8BE;
  }

  :focus {
    border: 1px solid #8D71EB;
    outline: none;
  }
`;

interface InputProps extends ColorProps, FlexProps, SpaceProps, HeightProps, WidthProps, TypographyProps {
  type?: string;
  disabled?: boolean;
  value: string;
  max?: number;
  min?: number;
  maxlength?: number;
  error?: boolean;
  empty?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const defaultProps = {
  width: '296px',
  height: '48px',
  p: '12px 24px',
  color: '#454440',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '23px',
};

type Props = InputProps & typeof defaultProps;

export const Input = (props: Props) => {
  const {value} = props;
  const empty = useMemo(() => value === '', [value]);
  return <Wrapper empty={empty} {...props} />;
};

Input.defaultProps = defaultProps;
