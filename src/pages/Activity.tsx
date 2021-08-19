import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Text, Button, Box, SearchInput} from '../components';

const FloatButton = styled(Button)`
  width: 245px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Activity = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
  return (
    <Box width='100%' py='48px' px='60px'>
      <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동</Text>
      <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
      <FloatButton>새로운 활동 추가하기</FloatButton>
    </Box>
  );
};
