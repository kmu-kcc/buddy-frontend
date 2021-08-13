import React, {useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {Box} from './Box';
import {Buddy} from './icons/Buddy';

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
  }

  > p {
    margin: 0;
    font-weight: 700;
  }
`;

const Logo = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/');
  }, [history]);
  return (
    <IconWrapper isFlex alignItems='center' px='32px' py='20px' fontSize='28px' onClick={handleClick}>
      <Buddy mr='16px' width='36px' height='50px' color='#fff' />
      <p>Buddy</p>
    </IconWrapper>
  );
};

export const Navigation = () => {
  const history = useHistory();
  const hidden = useMemo(() => {
    const pathname = history.location.pathname;

    if (pathname.match(/\/login/gi) || pathname.match(/\/signup/gi)) {
      return true;
    }
    return false;
  }, [history.location.pathname]);

  return (
    <Wrapper display={hidden ? 'none' : 'block'}>
      <Logo />
    </Wrapper>
  );
};
