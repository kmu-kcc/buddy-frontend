import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {
  compose, color, ColorProps,
  flex, FlexProps,
  height, HeightProps,
  space, SpaceProps,
  typography, TypographyProps,
  width, WidthProps,
} from 'styled-system';
import {Box} from './Box';

const Wrapper = styled(Box)<WrapperProps>`
  ${compose(
      color,
      flex,
      space,
      height,
      width,
  )}
  display: flex;
  align-items: center;
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

interface WrapperProps extends ColorProps, FlexProps, SpaceProps, HeightProps, WidthProps{
  type?: string;
  disabled?: boolean;
  value: string;
  max?: number;
  min?: number;
  error?: boolean;
  empty?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logo?: JSX.Element;
}

const InnerInput = styled.input<InputProps>`
  ${typography}
  border: 0;
  outline: 0;
  box-sizing: border-box;
`;

interface InputProps extends TypographyProps {
  type?: string;
  disabled?: boolean;
  value: string;
  max?: number;
  min?: number;
  maxlength?: number;
  placeholder?: string;
  empty?: boolean;
  error?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: () => void;
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

type Props = InputProps & WrapperProps & typeof defaultProps;

export const Input = (props: Props) => {
  const {value, logo, onEnterPress} = props;
  const empty = useMemo(() => value === '', [value]);
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (onEnterPress && event.key === 'Enter') {
      onEnterPress();
    }
  }, [onEnterPress]);

  return (
    <Wrapper empty={empty} {...props}>
      {logo}
      <InnerInput empty={empty} onKeyDown={handleKeyDown} {...props} />
    </Wrapper>
  );
};

Input.defaultProps = defaultProps;
