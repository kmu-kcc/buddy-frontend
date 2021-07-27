import React from 'react';
import styled from 'styled-components';
import {Layout as LayoutWrapper} from 'antd';
import {Header} from './Header';

const Wrapper = styled(LayoutWrapper)`
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
