import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router-dom';
import {Box, Span} from '../components';
import {Activity, Organization, Fee, Profile} from '../components/icons';

const Wrapper = styled(Box)`
  width: 240px;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #6D48E5;
  border-radius: 0 20px 20px 0;
  padding: 60px 15px;
`;

const IconWrapper = styled(Box)`
  width: 100%;
  padding-left: 38px;
  padding-top: 20px;
  padding-bottom: 20px;
  color: #fff;
  cursor: pointer;
  border-radius: 15px;
  transition: all 0.15s linear;

  :hover {
    background-color: #5635BF;
  }
`;

const Logo = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/');
  }, [history]);
  return (
    <Box width='120px' height='120px' mb='40px' cursor='pointer' onClick={handleClick}>
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
      <Activity mb='8px' width='20px' height='20px' color='#F9F3FF'></Activity>
      <Span ml='18px' fontSize='22px' fontWeight={400} lineHeight='26px' color='#F9F3FF'>활동 관리</Span>
    </IconWrapper>
  );
};

const OrganizationTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/organization/members');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt='10px' onClick={handleClick}>
      <Organization mb='8px' width='20px' height='20px' color='#F9F3FF'></Organization>
      <Span ml='18px' fontSize='22px' lineHeight='26px' color='#F9F3FF'>조직 관리</Span>
    </IconWrapper>
  );
};

const FeeTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/fee/account');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt='10px' onClick={handleClick}>
      <Fee mb='8px' width='20px' height='20px' color='#F9F3FF'></Fee>
      <Span ml='18px' fontSize='22px' lineHeight='26px' color='#F9F3FF'>회계 관리</Span>
    </IconWrapper>
  );
};

const ProfileTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/user');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt='10px' onClick={handleClick}>
      <Profile mb='8px' width='20px' height='20px' color='#F9F3FF'></Profile>
      <Span ml='18px' fontSize='22px' lineHeight='26px' color='#F9F3FF'>내 정보</Span>
    </IconWrapper>
  );
};

export const Navigation = () => {
  const location = useLocation();
  const hidden = useMemo(() => {
    const pathname = location.pathname;
    console.log('pathname updated', pathname);

    if (!pathname.match(/\/auth/gi)) {
      return true;
    }
    return false;
  }, [location.pathname]);

  return (
    <Wrapper display={hidden ? 'none' : 'flex'}>
      <Logo />
      <ActivityTab />
      <OrganizationTab />
      <FeeTab />
      <ProfileTab />
    </Wrapper>
  );
};
