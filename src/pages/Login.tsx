import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {Input, Button, Box, Check} from '../components';
import {Buddy} from '../components/icons';


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
    <Box isFlex width='100%' style={{padding: '16px 24px'}} justifyContent='center'>
      <Box isFlex width='390px' flexDirection='column' alignItems='center'>
        <Box isBlock mt='65px' mb='65px' >
          <Buddy width={70} height={106} color='#6D48E5' />
        </Box>
        <Box isBlock margin='10px'>
          <Input value={id} onChange={handleInputChange(setId)} placeholder='아이디' />
        </Box>
        <Box isBlock margin='10px'>
          <Input value={password} onChange={handleInputChange(setPassword)} placeholder='비밀번호' />
        </Box>
        <Box mt='65px' mb='40px'>
          <Button>로그인</Button>
        </Box>
        <Box isFlex width='100%'>
          <Box mr='auto'>
            <Link to='/test' style={{textDecoration: 'none'}}>회원가입하기</Link>
          </Box>
          <Box>
            <Link to='/test' style={{textDecoration: 'none'}}>아이디 찾기</Link>
          </Box>
          <Box ml='16px'>
            <Link to='/test' style={{textDecoration: 'none'}}>비밀번호 찾기</Link>
          </Box>
        </Box>
        <Box isFlex width='100%' mt='10px'>
          <Check ml='auto' boxShape='rectangle' mr='10px' onCheck={handleCheck} label='아이디 저장' checked={idSaved} />
        </Box>
      </Box>
    </Box>
  );
};
