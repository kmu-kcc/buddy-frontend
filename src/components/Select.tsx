import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {SpaceProps, FlexProps, WidthProps, HeightProps} from 'styled-system';
import {Box} from './Box';
import {Arrow} from './icons';

const Wrapper = styled(Box)`
  display: inline-block;
  position: relative;
  user-select: none;
`;

const SelectionWrapper = styled(Box)<{selected: boolean;}>`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  font-size: 18px;
  font-weight: 500;
  line-height: 23px;
  color: ${({selected}) => selected ? '#454440' : '#CBC8BE'};
  padding-left: 24px;
  padding-right: 18px;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #CBC8BE;
  cursor: pointer;

  :hover {
    border-color: #CEC2F6;
  }

  > span {
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const OptionWrapper = styled(Box)`
  height: auto;
  max-height: 264px;
  position: absolute;
  top: ${({height}) => `calc(${height} + 10px)`};
  left: 0;
  right: 0;
  z-index: 1;
  overflow-y: overlay;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #E5E5E5;
  filter: drop-shadow(0px 5px 9px #E5E5E5);

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    border-top-width: 14px;
    border-bottom-width: 14px;
    background-color: #CBC8BE;
    background-clip: padding-box;
  }
`;

const OptionItem = styled.option<{selected: boolean;}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  padding: 12px 0;
  cursor: pointer;
  transition: all, 0.15s ease-out;
  margin-top: -1px;
  border-top: 1px solid #E5E5E5;
  color: ${({selected}) => selected ? '#6D48E5' : '#65635D'};
  background-color: ${({selected}) => selected ? '#EFEBFC' : '#fff'};

  :hover {
    background-color: ${({selected}) => selected ? '#EFEBFC' : 'rgba(141, 140, 133, 0.2)'};
  }
`;

interface SelectProps extends SpaceProps, FlexProps, WidthProps, HeightProps {
  children: JSX.Element[];
  placeholder?: string;
  initialSelection?: number;
  onSelect?: (index: number, value: string) => void;
}

const defaultProps = {
  height: '48px',
};

type Props = SelectProps & typeof defaultProps;

export const Select = (props: Props) => {
  const {children, height, placeholder, onSelect, initialSelection, ...styles} = props;
  const [selected, setSelected] = useState(initialSelection ?? -1);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectionClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleOptionClick = useCallback((index: number, value: string) => () => {
    setSelected(index);
    setOpen(false);
    if (onSelect) {
      onSelect(index, value);
    }
  }, [setSelected, setOpen, onSelect]);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    //  outside click
    if (ref && !ref.current?.contains(event.target as any)) {
      setOpen(false);
    }
  }, [ref]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <Wrapper ref={ref} height={height} {...styles}>
      <SelectionWrapper selected={selected >= 0} onClick={handleSelectionClick}>
        <span>{selected === -1 ? placeholder : children[selected].props.children}</span>
        <Arrow rotate={open ? 180 : 0} />
      </SelectionWrapper>
      {open ? (
        <OptionWrapper height={height}>
          {children.map((option, i) => (
            <OptionItem key={i} selected={selected === i} onClick={handleOptionClick(i, option.props.children)}>
              {option.props.children}
            </OptionItem>
          ))}
        </OptionWrapper>
      ) : null}
    </Wrapper>
  );
};

Select.defaultProps = defaultProps;
