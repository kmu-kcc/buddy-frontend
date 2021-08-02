import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {
  border, BorderProps,
  space, SpaceProps,
  width, WidthProps,
  maxWidth, MaxWidthProps,
  minWidth, MinWidthProps,
} from 'styled-system';
import {Arrow} from './icons';

const Wrapper = styled.div<SpaceProps & WidthProps & MaxWidthProps & MinWidthProps>`
  display: inline-block;
  position: relative;
  user-select: none;
  ${width}
  ${maxWidth}
  ${minWidth}
  ${space}
`;

const SelectionWrapper = styled.div<{selected: boolean;}>`
  display: flex;
  flex: 1;
  height: 48px;
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

const OptionWrapper = styled.div`
  position: absolute;
  top: 58px;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #E5E5E5;
  overflow: hidden;
  filter: drop-shadow(0px 5px 9px #E5E5E5);
`;

const OptionItem = styled.option<BorderProps & {selected: boolean;}>`
  ${border}
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

interface Props extends SpaceProps, WidthProps, MaxWidthProps, MinWidthProps {
  children: JSX.Element[];
  placeholder?: string;
  initialSelection?: number;
  onSelect?: (index: number) => void;
}

export const Select = (props: Props) => {
  const {children, placeholder, onSelect, ...styles} = props;
  const [selected, setSelected] = useState(-1);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectionClick = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleOptionClick = useCallback((index: number) => () => {
    setSelected(index);
    setOpen(false);
    if (onSelect) {
      onSelect(index);
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
  }, []);

  return (
    <Wrapper ref={ref} {...styles}>
      <SelectionWrapper selected={selected >= 0} onClick={handleSelectionClick}>
        <span>{selected === -1 ? placeholder : children[selected].props.children}</span>
        <Arrow rotate={open ? 180 : 0} />
      </SelectionWrapper>
      {open ? (
        <OptionWrapper>
          {children.map((option, i) => (
            <OptionItem key={i} selected={selected === i} onClick={handleOptionClick(i)}>
              {option.props.children}
            </OptionItem>
          ))}
        </OptionWrapper>
      ) : null}
    </Wrapper>
  );
};
