import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {
  color, ColorProps,
  FlexProps, HeightProps, WidthProps,
  SpaceProps, MaxWidthProps,
  typography, TypographyProps,
} from 'styled-system';
import {Box} from './Box';

interface WrapperProps extends FlexProps, SpaceProps, HeightProps, WidthProps, MaxWidthProps {
  error?: boolean;
  empty?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  logo?: JSX.Element;
}

const Wrapper = styled(Box)<WrapperProps>`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({error, empty}) => error ? '#FF9A83' : empty ? '#CBC8BE' : '#8D71EB'};
  border-radius: 15px;
  overflow: hidden;

  ::placeholder {
    color: #CBC8BE;
  }
  :focus {
    border: 1px solid #8D71EB;
    outline: none;
  }
`;

const InnerInput = styled.input<InputProps>`
  ${typography}
  ${color}
  width: 100%;
  height: 100%;
  padding: 12px 24px;
  border: none;
  outline: 0;
  box-sizing: border-box;
`;

interface InputProps extends TypographyProps, SpaceProps, ColorProps {
  type?: string;
  disabled?: boolean;
  value: string;
  max?: number;
  min?: number;
  maxlength?: number;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: () => void;
}

const defaultProps = {
  width: '296px',
  height: '48px',
  color: '#454440',
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '23px',
};

type Props = InputProps & WrapperProps & typeof defaultProps;

export const Input = (props: Props) => {
  const {logo, value, color, p, onEnterPress, width, height, ...styles} = props;
  const empty = useMemo(() => value === '', [value]);
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (onEnterPress && event.key === 'Enter') {
      onEnterPress();
    }
  }, [onEnterPress]);

  return (
    <Wrapper width={width} height={height} empty={empty} {...styles}>
      {logo}
      <InnerInput color={color} value={value} empty={empty} p={p} onKeyDown={handleKeyDown} {...styles} />
    </Wrapper>
  );
};

Input.defaultProps = defaultProps;
