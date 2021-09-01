import React from 'react';
import {Box, Text} from '.';
import {Buddy} from './icons';

export const Loading = () => {
  return (
    <Box isFlex width='100%' height='100%' pt='100px' pb='96px' justifyContent='center'>
      <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
        <Buddy mb='150px' width='248px' height='140px' mr='17px' />
        <Text fontSize='24px'>Loading...</Text>
      </Box>
    </Box>
  );
};
