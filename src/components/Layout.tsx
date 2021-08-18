import React from 'react';
import styled from 'styled-components';
import {Box} from './Box';
import {Navigation} from './Navigation';

const Wrapper = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #fff;
  position: relative;
`;

const Content = styled(Box)`
  flex: 1;
`;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {children} = props;
  return (
    <Wrapper>
      <Navigation />
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};
