import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';
import {Link} from 'react-router-dom';
import {Input, Button, Box, Check} from '../components';
import {Buddy} from '../components/icons';

const LinkText = styled(Link)<SpaceProps>`
  color:#363634;
  text-decoration: none;
  ${space}
`;

export const Login = () => {
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
      <Box isFlex width='338px' flexDirection='column' alignItems='center' pt='120px'>
        <Box isBlock mb='64px' >
          <Buddy width='70px' height='106px' color='#6D48E5' />
        </Box>
        <Input width='100%' value={id} onChange={handleInputChange(setId)} placeholder='아이디' />
        <Input mt='20px' width='100%' value={password} onChange={handleInputChange(setPassword)} placeholder='비밀번호' />
        <Check mt='16px' mr='auto' boxShape='circle' size='20px' fontSize='16px' lineHeight='19px' onCheck={handleCheck} label='아이디 저장' checked={idSaved} />
        <Button mt='45px' mb='40px' width='100%'>로그인</Button>
        <Box isFlex width='100%'>
          <LinkText to='/signup'>회원가입</LinkText>
          <LinkText to='/test' ml='auto'>아이디 찾기</LinkText>
          <LinkText to='/test' ml='16px'>비밀번호 찾기</LinkText>
        </Box>
      </Box>
    </Box>
  );
};
