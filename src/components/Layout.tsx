import React from 'react';
import styled from 'styled-components';
import {Layout as LayoutWrapper} from 'antd';
import {Header} from './Header';

const Content = styled.div`
  align-items: center;
  justify-content: center;
`;

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const {children} = props;
  return (
    <LayoutWrapper>
      <Header />
      <Content>
        {children}
      </Content>
    </LayoutWrapper>
  );
};

export default Layout;
