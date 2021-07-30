import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Button, Box, Check} from '../components';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 24px;
`;

export const Test = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  const [checked, setChecked] = useState(false);
  const handleCheck = useCallback(() => {
    setChecked(!checked);
  }, [checked, setChecked]);
  return (
    <Wrapper>
      <h2>Box</h2>
      <Box mb='4px' isFlex alignItems='center' justifyContent='center'
        color='#000' bg='#eee'>
        Basic Flex Box
      </Box>
      <Box isInlineBlock bg='#aaa' p='4px'>
        Basic Inline Box 1
      </Box>
      <Box ml='4px' isInlineBlock bg='#aacccc' p='4px'>
        Basic Inline Box 2
      </Box>
      <Box ml='4px' isInlineBlock bg='#3399cc' p='4px' color='#fff'>
        Basic Inline Box 3
      </Box>
      <h2>Button</h2>
      <Button mr='8px'>Button 1</Button>
      <Button onClick={handleClick}>{count} time clicked</Button>
      <h2>Check</h2>
      <Check onCheck={handleCheck} label='check' checked={checked} />
    </Wrapper>
  );
};
