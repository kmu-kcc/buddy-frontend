import React, {useCallback} from 'react';
import styled from 'styled-components';
import {
  color, ColorProps,
  space, SpaceProps,
  typography, TypographyProps,
} from 'styled-system';
import {Check as CheckIcon} from './icons/Check';

type StyleProps = ColorProps & SpaceProps & TypographyProps;

const Wrapper = styled.div<StyleProps & {checked: boolean; boxShape: 'circle' | 'rectangle'}>`
  ${space}
  width: fit-content;
  display: inline-flex;
  user-select: none;
  align-items: center;
  cursor: pointer;

  :hover {
    > div {
      border-color: #6D48E5;
      background-color: ${({checked}) => checked ? '#6D48E5' : '#EFEBFC'};
    }
  }

  > div {
    border-radius: ${({boxShape}) => boxShape === 'rectangle' ? '1px' : '50%'};
    border: 1px solid ${({checked}) => checked ? '#6D48E5' : '#CBC8BE'};
    background-color: ${({checked}) => checked ? '#6D48E5' : '#fff'};

    > svg {
      visibility: ${({checked}) => checked ? 'visible' : 'hidden'};
      margin: auto;
    }
  }

  > span {
    ${color}
    ${typography}

  }
`;

const Box = styled.div<{size: string;}>`
  box-sizing: border-box;
  height: ${({size}) => size};
  width: ${({size}) => size};
  display: inherit;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease-out;
`;

const Text = styled.span`
  margin-left: 6px;
`;

interface CheckProps extends SpaceProps, TypographyProps {
  size?: string;
  boxShape: 'circle' | 'rectangle';
  checked: boolean;
  label?: string | JSX.Element;
  onCheck?: (checked: boolean) => void;
}

const defaultProps = {
  size: '10px',
  color: '#454440',
  fontSize: '9px',
  lineHeight: '11px',
};

type Props = CheckProps & typeof defaultProps;

export const Check = (props: Props) => {
  const {checked, label, size, onCheck, ...styles} = props;
  const handleClick = useCallback(() => {
    if (onCheck) {
      onCheck(!checked);
    }
  }, [checked, onCheck]);

  return (
    <Wrapper checked={checked} onClick={handleClick} {...styles}>
      <Box size={size}>
        <CheckIcon width='60%' height='50%' color='#fff' />
      </Box>
      <Text>{label}</Text>
    </Wrapper>
  );
};

Check.defaultProps = defaultProps;
