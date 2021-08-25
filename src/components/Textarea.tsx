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

const Wrapper = styled.textarea<TextareaProps>`
  box-sizing: border-box;
  ${compose(
      color,
      flex,
      width,
      height,
      space,
      typography,
  )}
  resize: none;
  background: #fff;
  border: 1px solid ${({error, empty}) => error ? '#FF9A83' : empty ? '#CBC8BE' : '#8D71EB'};
  border-radius: 15px;

  ::placeholder {
    color: #CBC8BE;
  }

  :focus, :hover {
    border-color: #CEC2F6;
    outline: none;
  }
`;

interface TextareaProps extends ColorProps, FlexProps, SpaceProps, HeightProps, WidthProps, TypographyProps {
  value: string;
  error?: boolean;
  empty?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const defaultProps = {
  width: '296px',
  height: '191px',
  color: '#454440',
  p: '18px 24px',
  fontWEight: 500,
  fontSize: '18px',
  lineHeight: '23px',
};

type Props = TextareaProps & typeof defaultProps;

export const Textarea = (props: Props) => {
  const {value} = props;
  const empty = useMemo(() => value === '', [value]);
  return <Wrapper empty={empty} {...props} />;
};

Textarea.defaultProps = defaultProps;
