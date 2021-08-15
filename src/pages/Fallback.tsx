import React, {useCallback} from 'react';
import {Box, Button, Text} from '../components';

export const Fallback = () => {
  const handleClick = useCallback(() => {
    window.location.href = '/';
  }, []);
  return (
    <Box isFlex width='100%' height='100vh' flexDirection='column' alignItems='center' justifyContent='center'>
      <Text fontSize='24px'>An unexpected error occurred.</Text>
      <Button mt='48px' height='60px' fontSize='20px' onClick={handleClick}>메인으로 가기</Button>
    </Box>
  );
};
