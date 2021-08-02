import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Button, Box, Textarea, Input, Select} from '../components';
import {Arrow} from '../components/icons';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 24px;
`;

export const Test = () => {
  const [count, setCount] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [inputTextValue, setInputTextValue] = useState('');
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  const handleTextareaChange =
  useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  }, [setTextValue]);
  const handleInputChange =
  useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
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
      <h2>Textarea</h2>
      <Textarea onChange={handleTextareaChange} mr='8px'
        value={textValue} placeholder='Textarea 1' />
      <Textarea mr='8px' value='' error />
      <h2>Input</h2>
      <Input onChange={handleInputChange} mr='8px'
        value={inputTextValue} placeholder='Input 1' />
      <Input mr='8px' value='' error />
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
    </Wrapper>
  );
};
