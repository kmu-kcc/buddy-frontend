import React, {useCallback} from 'react';
import {Box, Button, Text} from '../../components';
import {Buddy} from '../../components/icons';

export const Complete = () => {
  const handleClick = useCallback(() => {
    window.location.href = '/';
  }, []);
  return (
    <Box isFlex width='100%' pt='100px' pb='96px' justifyContent='center'>
      <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
        <Buddy mb='150px' width='248px' height='140px' mr='17px' />
        <Text fontSize='24px'>가입신청이 완료되었습니다!</Text>
        <Button mt={['120px', '200px']} height='60px' fontSize='20px' onClick={handleClick}>메인으로 가기</Button>
      </Box>
    </Box>
  );
};
