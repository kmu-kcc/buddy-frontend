import React from 'react';
import styled from 'styled-components';

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
      <Content>
        {children}
      </Content>
    </Wrapper>
  );
};
