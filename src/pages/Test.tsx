import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Button} from '../components';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 24px;
`;

export const Test = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  return (
    <Wrapper>
      <h2>Button</h2>
      <Button mr="8px">Button 1</Button>
      <Button onClick={handleClick}>{count} time clicked</Button>
    </Wrapper>
  );
};
