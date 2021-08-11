import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {Box} from './Box';

const Wrapper = styled(Box)`
  width: 240px;
  height: 100vh;
  position: sticky;
  top: 0;
  left: 0;
  background-color: #6D48E5;
  border-radius: 0 20px 20px 0;
`;

export const Navigation = () => {
  const history = useHistory();
  const hidden = useMemo(() => {
    const pathname = history.location.pathname;

    if (pathname === '/login' || pathname === '/signup') {
      return true;
    }
    return false;
  }, [history.location.pathname]);

  return (
    <Wrapper display={hidden ? 'none' : 'block'}>
    </Wrapper>
  );
};
