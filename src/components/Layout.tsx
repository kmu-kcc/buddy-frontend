import React from 'react';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {ToastContainer} from 'react-toastify';
import {Box} from './Box';
import {Text} from './Text';
import {Buddy} from './icons';
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

const Loading = () => {
  return (
    <Box isFlex height='100vh' alignItems='center' justifyContent='center'>
      <Buddy width='50px' />
      <Text ml='24px' fontSize='32px'>Loading...</Text>
    </Box>
  );
};

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const location = useLocation();
  const {children} = props;
  return (
    <Wrapper>
      <Navigation />
      <Content>
        {location.pathname === '/' && <Loading />}
        {children}
      </Content>
      <ToastContainer position='top-center' />
    </Wrapper>
  );
};
