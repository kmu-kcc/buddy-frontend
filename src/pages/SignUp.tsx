import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Input, Select, Button, Box} from '../components';
import {Buddy} from '../components/icons';

const Text = styled.p`
  margin-left: 19px;
  color: #6D48E5;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  white-space: nowrap;
`;

export const SignUp: React.FC = () => {
  const [id, setId] = useState('');
  const [major, setMajor] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);

  return (
    <Box isFlex width='100%' pt='100px' pb='96px' justifyContent='center'>
      <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
        <Box>
          <Buddy mb='100px' width='248px' height='140px' />
        </Box>
        <Box isFlex>
          <Box>
            <Input width='390px' height='63px' value={studentNumber} onChange={handleInputChange(setStudentNumber)} placeholder='학번 (ID)' />
            <Text>영어와 숫자만 8~9자</Text>
          </Box>
          <Box ml='174px'>
            <Input width='390px' height='63px' value={email} onChange={handleInputChange(setEmail)} type='email' placeholder='이메일' />
          </Box>
        </Box>
        <Box isFlex>
          <Box>
            <Input width='390px' height='63px' value={id} onChange={handleInputChange(setId)} placeholder='이름' />
            <Text>한글만, 최대 10자</Text>
          </Box>
          <Box ml='174px'>
            <Input width='390px' height='63px' value={phoneNumber} onChange={handleInputChange(setPhoneNumber)} type='tel' placeholder='전화번호' />
            <Text>예) 01012345678</Text>
          </Box>
        </Box>
        <Box isFlex>
          <Box>
            <Select placeholder='소속대학' width='390px' height='63px'>
              <option value='글로벌인문지역대학'>글로벌인문지역대학</option>
              <option value='사회과학대학'>사회과학대학</option>
              <option value='법과대학'>법과대학</option>
              <option value='경상대학'>경상대학</option>
              <option value='경영대학'>경영대학</option>
              <option value='창의공과대학'>창의공과대학</option>
              <option value='과학기술대학'>과학기술대학</option>
              <option value='예술대학'>예술대학</option>
              <option value='체육대학'>체육대학</option>
              <option value='조형대학'>조형대학</option>
              <option value='소프트웨어융합대학'>소프트웨어융합대학</option>
              <option value='건축대학'>건축대학</option>
              <option value='자동차융합대학'>자동차융합대학</option>
            </Select>
          </Box>
          <Box ml='174px'>
            <Input width='390px' height='63px' value={major} onChange={handleInputChange(setMajor)} placeholder='소속학과' />
            <Text>한글만, 최대 15자</Text>
          </Box>
        </Box>
        <Box isFlex>
          <Box isFlex height='63px'>
            <Select placeholder='재학여부' width='390px' height='63px'>
              <option>재학</option>
              <option>휴학</option>
              <option>졸업</option>
              <option>기타</option>
            </Select>
          </Box>
          <Box ml='174px'>
            <Select placeholder='학년' width='390px' height='63px'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Select>
          </Box>
        </Box>
        <Box isFlex mt='71px' height='20px'>
          <Text></Text>
        </Box>
        <Button mt='30px' width='388px' height='70px'>회원가입</Button>
      </Box>
    </Box>
  );
};
