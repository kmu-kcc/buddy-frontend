import React, {useCallback, useState} from 'react';
import {Input, Select, Button, Box} from '../components';
import styled from 'styled-components';

const Text = styled.p`
  color: #6D48E5;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
`;

export const SignUp: React.FC = () => {
  const [inputIDValue, setInputIDValue] = useState('');
  const handleIDChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputIDValue(event.target.value);
  }, [setInputIDValue]);
  const [inputPasswordValue, setInputPasswordValue] = useState('');
  const handlePasswordValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPasswordValue(event.target.value);
  }, [setInputPasswordValue]);
  const [inputMajorValue, setInputMajorValue] = useState('');
  const handleMajorValue = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMajorValue(event.target.value);
  }, [setInputMajorValue]);
  const [inputPhoneNumber, setPhoneNumber] = useState('');
  const handlePhoneNumber = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  }, [setPhoneNumber]);
  const [inputMailAddress, setMailAddress] = useState('');
  const handleMailAddress = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMailAddress(event.target.value);
  }, [setMailAddress]);
  const [inputStudentNumber, setStudentNumber] = useState('');
  const handleStudentNumber = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentNumber(event.target.value);
  }, [setStudentNumber]);
  return (
    <Box isFlex width='100%' justifyContent='center'>
      <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
        <Box isFlex>
          <Box>
            <Input value={inputIDValue} onChange={handleIDChange} placeholder='이름' />
            <Text>한글만,최대10자</Text>
          </Box>
          <Box ml='174px'>
            <Input value={inputPasswordValue} onChange={handlePasswordValue} placeholder='비밀번호' />
            <Text>영어 대문자,숫자,특수문자 각 1개 이상 혼용, 전체 8글자 이상</Text>
          </Box>
        </Box>
        <Box isFlex>
          <Box>
            <Select placeholder='소속대학' width='390px'>
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
            <Input value={inputMajorValue} onChange={handleMajorValue} placeholder='소속학과' />
            <Text>한글만, 최대 15자</Text>
          </Box>
        </Box>
        <Box isFlex>
          <Box>
            <Input value={inputStudentNumber} onChange={handleStudentNumber} placeholder='학번' />
            <Text>영어와 숫자만 8~9자</Text>
          </Box>
          <Box ml='174px'>
            <Select placeholder='학년' width='390px'>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Select>
          </Box>
        </Box>
        <Box isFlex>
          <Box>
            <Select placeholder='재학여부' width='390px'>
              <option>재학</option>
              <option>휴학</option>
              <option>졸업</option>
              <option>기타</option>
            </Select>
          </Box>
          <Box ml='174px'>
            <Input value={inputPhoneNumber} onChange={handlePhoneNumber} placeholder='핸드폰 번호' />
            <Text>예) 010-1234-5678</Text>
          </Box>
        </Box>
        <Box width='100%'>
          <Input mr='auto' value={inputMailAddress} onChange={handleMailAddress} placeholder='이메일' />
        </Box>
        <Button mt='121px'>회원가입하기</Button>
      </Box>
    </Box>
  );
};
