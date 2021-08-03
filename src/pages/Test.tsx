import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Button, Box, Select, ToggleSwitch} from '../components';
import {Arrow} from '../components/icons';

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
      <h2>Select</h2>
      <Select width='200px' placeholder='Select 1'>
        <option>Selection 1</option>
        <option>Selection 2</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
        <option>Selection 3</option>
      </Select>
      <Select ml='4px' width='200px' placeholder='Long Long Long Select 2'>
        <option>Selection 1</option>
        <option>Selection 2</option>
      </Select>
      <Select ml='4px' width='200px' placeholder='Select 3' initialSelection={2}>
        <option>Selection 1</option>
        <option>Selection 2</option>
        <option>Selection 3</option>
      </Select>
      <h2>Icon</h2>
      <Arrow scale={1} cursor='pointer' />
      <h2>Toggle</h2>
      <ToggleSwitch />
    </Wrapper>
  );
};
