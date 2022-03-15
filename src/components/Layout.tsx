import React from 'react';
import preval from 'preval.macro';
import {useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {ToastContainer} from 'react-toastify';
import Tooltip from 'react-tooltip';
import {format} from 'date-fns';
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
  flex-direction: column;
  min-height: 100vh;

  > div {
    flex: 1;
    min-height: calc(100% - 30px);
  }
`;

const BuildText = styled.p`
  height: 30px;
  margin: 0;
  padding: 8px;
  text-align: right;
  color: #ccc;
  user-select: none;
  font-size: 14px;
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
        <BuildText>Build Date: {format(preval`module.exports = Date.now()`, 'yyyy-MM-dd')}</BuildText>
      </Content>
      <ToastContainer position='top-center' />
      <Tooltip effect='solid' />
    </Wrapper>
  );
};
