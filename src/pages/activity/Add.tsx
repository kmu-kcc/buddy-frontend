import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Text, Button, Box, Input} from '../../components';

const FloatButton = styled(Button)`
  width: 245px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Add = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동추가</Text>
      </Box>
      <Box isFlex mt='56px'>
        <Text>활동 제목</Text>
        <Input onChange={handleInputChange} value={InputTextValue} ml='29px' width='auto' />
      </Box>
      <Box>
        <Text>기간</Text>
      </Box>
      <Box>
        <Text>참여자</Text>
      </Box>
      <Box isFlex flexDirection='column'>
        <Text>본문</Text>
        <Box></Box>
      </Box>
      <FloatButton>저장하기</FloatButton>
    </Box>
  );
};
