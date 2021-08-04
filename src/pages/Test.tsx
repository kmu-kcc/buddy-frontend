import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Button, Box, Check, Select} from '../components';
import {Arrow, Check as CheckIcon} from '../components/icons';

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
  const [checked1, setChecked1] = useState(false);
  const handleChc = useCallback(() => {
    setChecked1(!checked1);
  }, [checked, setChecked1]);
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
      <Check mr='4px' onCheck={handleCheck} label='check' checked={checked} />
      <Check mr='4px' onCheck={handleChc} label='adding' checked={checked1} />
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
      <Box isInlineFlex minWidth='100px' height='70px' flexDirection='column' alignItems='center'>
        <Arrow scale={1.5} color='#000' />
        <p>Arrow (1.5x)</p>
      </Box>
      <Box isInlineFlex minWidth='100px' height='70px' flexDirection='column' alignItems='center'>
        <CheckIcon scale={3} color='#000' />
        <p>Check (3x)</p>
      </Box>
    </Wrapper>
  );
};
