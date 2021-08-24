import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Text, Button, Box, Input, Textarea, Select} from '../../components';

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

  const [InputPlaceValue, setInputPlaceValue] = useState('');
  const handlePlaceChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPlaceValue(event.target.value);
  }, [setInputPlaceValue]);

  const [InputStartValue, setInputStartValue] = useState('');
  const handleStartChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputStartValue(event.target.value);
  }, [setInputStartValue]);
  const [InputEndValue, setEndTextValue] = useState('');
  const handleEndChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setEndTextValue(event.target.value);
  }, [setEndTextValue]);

  const [descriptionValue, setDescriptionValue] = useState('');
  const handleDescriptionareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  }, [setDescriptionValue]);
  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동추가</Text>
      </Box>
      <Box isFlex mt='56px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>활동 제목</Text>
        <Input onChange={handleInputChange} value={InputTextValue} ml='29px' width='1036px' />
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>장소</Text>
        <Input onChange={handlePlaceChange} value={InputPlaceValue} ml='29px' width='1036px' />
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>할동 종류</Text>
        <Select ml='29px' width='200px'>
          <option>창립제</option>
          <option>스터디</option>
          <option>기타</option>
        </Select>
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>기간</Text>
        <Input onChange={handleStartChange} value={InputStartValue} width='208px' ml='29px' mr='20px'></Input>
        <p> ~ </p>
        <Input onChange={handleEndChange} value={InputEndValue} width='208px' ml='20px'></Input>
      </Box>
      <Box mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>참여자</Text>
      </Box>
      <Box isFlex flexDirection='column' mt='60px'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>본문</Text>
        <Textarea onChange={handleDescriptionareaChange} value={descriptionValue} width='1148px' height='838px' mt='20px'></Textarea>
      </Box>
      <FloatButton>저장하기</FloatButton>
    </Box>
  );
};
