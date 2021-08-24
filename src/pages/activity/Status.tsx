import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Text, Button, Box, Textarea} from '../../components';

const FloatButton = styled(Button)`
  width: 245px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const UnderBar = styled.div`
  box-sizing: border-box;
  max-width: 1147px;
  height: 0px;
  margin-top: 20px;
  margin-bottom: 47px;
  border: 1px solid #939393
`;

export const Status = () => {
  const [descriptionValue, setDescriptionValue] = useState('');
  const handleDescriptionareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  }, [setDescriptionValue]);
  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동관리</Text>
      </Box>
      <Box isFlex justifyContent='space-between' pt='60px' maxWidth='1147px'>
        <Text color='#454440' fontSize='20px' lineHeight='24px'>Name</Text>
        <Text color='#AAAAAA' fontSize='14px' lineHeight='17px' pl='44px'>Date</Text>
      </Box>
      <Box isFlex pt='20px'>
        <Text color='#AAAAAA' fontSize='16px' lineHeight='20px'>분류</Text>
        <Text color='#454440' fontSize='16px' lineHeight='20px' pl='44px'>봉사활동</Text>
      </Box>
      <Box isFlex pt='7px'>
        <Text color='#AAAAAA' fontSize='16px' lineHeight='20px'>참여자</Text>
        <Text color='#454440' fontSize='16px' lineHeight='20px' pl='29px'>김수환중위,,,, 보고싶다 수환이형,,,</Text>
      </Box>
      <UnderBar />
      <Textarea onChange={handleDescriptionareaChange} value={descriptionValue} width='1147px' height='838px'></Textarea>
      <FloatButton>새로운 활동 추가하기</FloatButton>
    </Box>
  );
};
