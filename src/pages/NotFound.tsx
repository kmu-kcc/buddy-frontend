import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, Button, Text} from '../components';

export const NotFound = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <Box isFlex width='100%' height='100vh' flexDirection='column' alignItems='center' justifyContent='center'>
      <Text fontSize='38px'>요청하신 페이지를 찾을 수 없습니다.</Text>
      <Button mt='48px' height='60px' fontSize='20px' onClick={handleClick}>메인으로 가기</Button>
    </Box>
  );
};
