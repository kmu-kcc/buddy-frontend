import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {Box, Span} from '../components';
import {Activity, Organization, Fee, Profile, Exit} from '../components/icons';
import {clearCredentials} from '../common/credentials';

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
  padding-bottom: 30px;
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
  const {user} = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const location = useLocation();
  const active = useMemo(() => location.pathname.startsWith('/activity'), [location.pathname]);
  const handleClick = useCallback(() => {
    history.push('/activity');
  }, [history]);

  //  show activity menu only for activity manager
  if (!user?.role?.activity_management) {
    return null;
  }

  return (
    <IconWrapper isFlex alignItems='flexStart' mb={['6px', '10px']} bg={active ? '#5635BF' : 'none'} onClick={handleClick}>
      <Activity width='20px' height='20px' color='#F9F3FF' />
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>활동 관리</Span>
    </IconWrapper>
  );
};

const OrganizationTab = () => {
  const history = useHistory();
  const location = useLocation();
  const active = useMemo(() => location.pathname.startsWith('/organization'), [location.pathname]);
  const handleClick = useCallback(() => {
    history.push('/organization/members');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mb={['6px', '10px']} bg={active ? '#5635BF' : 'none'} onClick={handleClick}>
      <Organization width='20px' height='20px' color='#F9F3FF' />
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>조직 관리</Span>
    </IconWrapper>
  );
};

const FeeTab = () => {
  const history = useHistory();
  const location = useLocation();
  const active = useMemo(() => location.pathname.startsWith('/fee'), [location.pathname]);
  const handleClick = useCallback(() => {
    history.push('/fee/account');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mb={['6px', '10px']} bg={active ? '#5635BF' : 'none'} onClick={handleClick}>
      <Fee width='20px' height='20px' color='#F9F3FF' />
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>회계 관리</Span>
    </IconWrapper>
  );
};

const ProfileTab = () => {
  const history = useHistory();
  const location = useLocation();
  const active = useMemo(() => location.pathname.startsWith('/user'), [location.pathname]);
  const handleClick = useCallback(() => {
    history.push('/user');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' bg={active ? '#5635BF' : 'none'} onClick={handleClick}>
      <Profile width='20px' height='20px' color='#F9F3FF' />
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>내 정보</Span>
    </IconWrapper>
  );
};

const SignOut = () => {
  const handleClick = useCallback(() => {
    clearCredentials();
    location.href = '/';
  }, []);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt='auto' onClick={handleClick}>
      <Exit width='20px' height='20px' color='#F9F3FF' />
      <Span ml={['10px', '18px']} fontSize={['18px', '22px']} lineHeight={['22px', '26px']} color='#F9F3FF'>로그아웃</Span>
    </IconWrapper>
  );
};

export const Navigation = () => {
  const location = useLocation();
  const hidden = useMemo(() => {
    const pathname = location.pathname;

    if (pathname.match(/\/auth/gi) || pathname === '/') {
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
      <SignOut />
    </Wrapper>
  );
};
