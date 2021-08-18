import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {color, ColorProps, space, SpaceProps} from 'styled-system';
import {Link} from 'react-router-dom';
import {Input, Button, Box, Check} from '../components';
import {Buddy} from '../components/icons';

const LinkText = styled(Link)<SpaceProps & ColorProps>`
  text-decoration: none;
  ${space}
  ${color}
`;

LinkText.defaultProps = {
  color: '#363634',
};

export const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  const [idSaved, setIdSaved] = useState(false);

  const handleCheck = useCallback(() => {
    setIdSaved(!idSaved);
  }, [idSaved, setIdSaved]);

  return (
    <Box isFlex width='100%' justifyContent='center'>
      <Box isFlex width='338px' flexDirection='column' alignItems='center' pt='96px'>
        <Box isBlock mb='64px' >
          <Buddy width='70px' height='106px' color='#6D48E5' />
        </Box>
        <Input width='100%' height='63px' value={id} onChange={handleInputChange(setId)} placeholder='아이디' />
        <Input mt='20px' type='password' width='100%' height='63px' value={password} onChange={handleInputChange(setPassword)} placeholder='비밀번호' />
        <Button mt='65px' width='100%' height='70px'>로그인</Button>
        <Check mt='24px' mr='auto' boxShape='circle' size='20px' fontSize='16px' lineHeight='19px' onCheck={handleCheck} label='아이디 저장' checked={idSaved} />
        <Box isFlex mt='40px' width='100%'>
          <LinkText to='/signup' color='#6D48E5'>회원가입</LinkText>
          <LinkText to='/test' ml='auto'>아이디 찾기</LinkText>
          <LinkText to='/test' ml='16px'>비밀번호 찾기</LinkText>
        </Box>
      </Box>
    </Box>
  );
};
