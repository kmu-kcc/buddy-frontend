import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router-dom';
import {Box, Span} from '../components';
import {Activity, Organization, Fee, Profile} from '../components/icons';

const Wrapper = styled(Box)`
  height: 100vh;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #6D48E5;
  border-radius: 0 20px 20px 0;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const IconWrapper = styled(Box)`
  width: 100%;
  color: #fff;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.15s linear;

  :hover {
    background-color: #5635BF;
  }
`;

IconWrapper.defaultProps = {
  px: ['26px', '38px'],
  py: ['12px', '20px'],
};

const Logo = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/');
  }, [history]);
  return (
    <Box width={['80px', '120px']} height={['80px', '120px']} mb={['30px', '40px']} cursor='pointer' onClick={handleClick}>
      <img width='100%' src='/images/img_logo.png'></img>
    </Box>
  );
};

const ActivityTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/activity');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' onClick={handleClick}>
      <Activity width='20px' height='20px' color='#F9F3FF'></Activity>
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>활동 관리</Span>
    </IconWrapper>
  );
};

const OrganizationTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/organization/members');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt={['6px', '10px']} onClick={handleClick}>
      <Organization width='20px' height='20px' color='#F9F3FF'></Organization>
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>조직 관리</Span>
    </IconWrapper>
  );
};

const FeeTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/fee/account');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt={['6px', '10px']} onClick={handleClick}>
      <Fee width='20px' height='20px' color='#F9F3FF'></Fee>
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>회계 관리</Span>
    </IconWrapper>
  );
};

const ProfileTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/user');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt={['6px', '10px']} onClick={handleClick}>
      <Profile width='20px' height='20px' color='#F9F3FF'></Profile>
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>내 정보</Span>
    </IconWrapper>
  );
};

export const Navigation = () => {
  const location = useLocation();
  const hidden = useMemo(() => {
    const pathname = location.pathname;
    console.log('pathname updated', pathname);

    if (!pathname.startsWith('/organization') && (pathname.match(/\/signin/gi) || pathname.match(/\/signup/gi))) {
      return true;
    }
    return false;
  }, [location.pathname]);

  return (
    <Wrapper display={hidden ? 'none' : 'flex'} minWidth={['180px', '240px']} px={['8px', '15px']}>
      <Logo />
      <ActivityTab />
      <OrganizationTab />
      <FeeTab />
      <ProfileTab />
    </Wrapper>
  );
};
