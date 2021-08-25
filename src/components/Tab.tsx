import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {WidthProps, SpaceProps} from 'styled-system';
import {Box, Text} from './index';

const TabItemWrapper = styled(Box)`
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 10px;
  padding-bottom: 8px;
  margin-bottom: -2px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s ease-in-out;

  :hover {
    border-bottom: 2px solid #6D48E5;
  }
  `;

interface TabItemProps extends SpaceProps {
  children: string;
  onClick: () => void;
}

const TabItem = ({children, onClick, ...styles}: TabItemProps) => {
  return (
    <TabItemWrapper onClick={onClick} {...styles}>
      <Text fontSize='20px' fontWeight={500} lineHeight='25px'>{children}</Text>
    </TabItemWrapper>
  );
};

const TabWrapper = styled(Box)<{tabIndex: number;}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid #E5E5E5;
  transition: all 0.15s ease-out;
  outline: none;

  > div:nth-child(${({tabIndex}) => tabIndex + 1}) {
    border-bottom-color: #6D48E5;
    > p {
      color: #6D48E5;
    }
  }
`;

interface TabProps extends SpaceProps, WidthProps {
  tabs: string[];
  initialTab?: number;
  onTabChange?: (index: number) => void;
}

const defaultProps = {
  width: 'fit-content',
};

type Props = TabProps & typeof defaultProps;

export const Tab = (props: Props) => {
  const {tabs, initialTab = 0, onTabChange, ...styles} = props;
  const [tabIndex, setTabIndex] = useState(initialTab);
  const handleTabClick = useCallback((index: number) => () => {
    if (tabIndex === index) return;
    setTabIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  }, [onTabChange, tabIndex]);

  return (
    <TabWrapper tabIndex={tabIndex} {...styles}>
      {tabs.map((tab, index) => (
        <TabItem key={tab} ml={index > 0 ? '26px' : 0} onClick={handleTabClick(index)}>{tab}</TabItem>
      ))}
    </TabWrapper>
  );
};

Tab.defaultProps = defaultProps;
