import React from 'react';
import styled from 'styled-components';
import {Header} from './Header';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #fff;
`;

const Content = styled.div`
    display: flex;
`;

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {children} = props;
  return (
    <Wrapper>
      <Header />
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};
