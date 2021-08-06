import React, {useCallback, useState} from 'react';
import {Input, Button, Box, Check} from '../components';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {Buddy} from '../components/icons';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 24px;
`;

export const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  const [check, setCheck] = useState(false);

  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check, setCheck]);

  return (
    <Wrapper>
      <Box isFlex width='100%' justifyContent='center'>
        <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
          <Box isBlock>
            <Buddy mt='65px' mb='65px' width={70} height={106} color='#6D48E5' />
          </Box>
          <Box isBlock margin='10px'>
            <Input value={id} onChange={handleInputChange(setId)} placeholder='아이디' />
          </Box>
          <Box isBlock margin='10px'>
            <Input value={password} onChange={handleInputChange(setPassword)} placeholder='비밀번호' />
          </Box>
          <Button mt='65px' mb='40px'>로그인</Button>
          <Box isInlineFlex style={{height: '30px'}}>
            <Link to='/test' style={{textDecoration: 'none'}}>회원가입하기</Link>
            <span style={{padding: '60px'}}></span>
            <Link to='/test' style={{textDecoration: 'none'}}>아이디 찾기</Link>
            <span style={{padding: '4px'}}></span>
            <Link to='/test' style={{textDecoration: 'none'}}>비밀번호 찾기</Link>
          </Box>
          <Box isBlock>
            <span style={{padding: '160px'}}></span>
            <Check boxShape='rectangle' mr='10px' onCheck={handleCheck} label='아이디 저장' checked={check} />
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};
