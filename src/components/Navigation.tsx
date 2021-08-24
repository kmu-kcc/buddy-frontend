import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory, useLocation} from 'react-router-dom';
import {Box, Span, Text} from '../components';
import {Activity, Organization, Fee, Profile} from '../components/icons';

const Wrapper = styled(Box)`
  width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #6D48E5;
  border-radius: 0 20px 20px 0;
  padding: 32px 0;
`;

const IconWrapper = styled(Box)`
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s linear;

  :hover {
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 20px 20px 20px 20px;
  }

  > p {
    margin: 0;
    font-weight: 700;
  }
`;

const Logo = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/signin');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='center' px='60px' py='20px' onClick={handleClick}>
      <img src='/images/img_logo.png'></img>
    </IconWrapper>
  );
};

const ActivityTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/activity/list');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' mt='20px' px='60px' py='20px' onClick={handleClick}>
      <Activity mb='8px' width='20px' height='20px' color='#F9F3FF'></Activity>
      <Span ml='10px'>
        <Text fontSize='20px' lineHeight='25px' color='#F9F3FF' >활동 관리</Text>
      </Span>
    </IconWrapper>
  );
};

const OrganizationTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/organization/members');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' px='60px' py='20px' onClick={handleClick}>
      <Organization mb='8px' width='20px' height='20px' color='#F9F3FF'></Organization>
      <Span ml='10px'>
        <Text fontSize='20px' lineHeight='25px' color='#F9F3FF' >조직 관리</Text>
      </Span>
    </IconWrapper>
  );
};

const FeeTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/fee/account');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' px='60px' py='20px' onClick={handleClick}>
      <Fee mb='8px' width='20px' height='20px' color='#F9F3FF'></Fee>
      <Span ml='10px'>
        <Text fontSize='20px' lineHeight='25px' color='#F9F3FF' >회계 관리</Text>
      </Span>
    </IconWrapper>
  );
};

const ProfileTab = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/user');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='flexStart' px='60px' py='20px' onClick={handleClick}>
      <Profile mb='8px' width='20px' height='20px' color='#F9F3FF'></Profile>
      <Span ml='10px'>
        <Text fontSize='20px' lineHeight='25px' color='#F9F3FF' >내 정보</Text>
      </Span>
    </IconWrapper>
  );
};

export const Navigation = () => {
  const location = useLocation();
  const hidden = useMemo(() => {
    const pathname = location.pathname;
    console.log('pathname updated', pathname);

    if (pathname.match(/\/signin/gi) || pathname.match(/\/signup/gi)) {
      return true;
    }
    return false;
  }, [location.pathname]);

  return (
    <Wrapper display={hidden ? 'none' : 'block'}>
      <Logo />
      <ActivityTab />
      <OrganizationTab />
      <FeeTab />
      <ProfileTab />
    </Wrapper>
  );
};
