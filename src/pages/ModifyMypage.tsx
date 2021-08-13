import React, {useCallback, useState} from 'react';
import {Input, Select, Button, Box} from '../components';
import styled from 'styled-components';

const HeaderText = styled.p`
  color: #454440;
  font-size: 40px;
  font-weight: bold;
  line-height: 50.08px;
`;

const MiddleText = styled.p`
  color: #454440;
  font-size: 24px;
  font-weight: bold;
  line-height: 30px;
`;

const Text = styled.p`
  color: #454440;
  font-size: 20px;
  font-weight: bold;
  line-height: 25px;
`;

export const ModifyMypage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [major, setMajor] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);

  return (
    <Box isBlock width='100%' justifyContent='center'>
      <Box isFlex ml='60px' mt='60px'>
        <HeaderText>마이페이지</HeaderText>
      </Box>
      <Box isFlex ml='60px' mt='20px'>
        <MiddleText>수정하기</MiddleText>
      </Box>
      {/* 이름 */}
      <Box isBlock mt='47px'>
        <Box isInlineBlock ml='64px' mr='98px'>
          <Text>이름</Text>
        </Box>
        <Box isInlineBlock>
          <Input value={name} onChange={handleInputChange(setName)} placeholder='홍길동'
            width='390px' height='63px' />
        </Box>
      </Box>
      {/* 비밀번호 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='60px' mt='25px'>
          <Text>비밀번호</Text>
        </Box>
        <Box isInlineBlock>
          <Input value={password} onChange={handleInputChange(setPassword)} placeholder='변경하기'
            width='390px' height='63px' />
        </Box>
      </Box>
      {/* 전화번호 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='60px' mt='25px'>
          <Text>전화번호</Text>
        </Box>
        <Box isInlineBlock>
          <Input value={phoneNumber} onChange={handleInputChange(setPhoneNumber)}
            placeholder='01012345678' width='390px' height='63px' />
        </Box>
      </Box>
      {/* 이메일 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='80px' mt='25px'>
          <Text>이메일</Text>
        </Box>
        <Box isInlineBlock>
          <Input value={email} onChange={handleInputChange(setEmail)} placeholder='abc@gmail.com'
            width='390px' height='63px' />
        </Box>
        <Box isInlineBlock ml='40px'>
          <Button width='128px' height='46px' background='#EFEBFC' color='#6D48E5' px='0'>인증하기</Button>
        </Box>
      </Box>
      {/* 대학 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='98px' mt='25px'>
          <Text>대학</Text>
        </Box>
        <Box isInlineBlock>
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
      </Box>
      {/* 학과 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='98px' mt='25px'>
          <Text>학과</Text>
        </Box>
        <Box isInlineBlock>
          <Input value={major} onChange={handleInputChange(setMajor)} placeholder='소속학과'
            width='390px' height='63px' />
        </Box>
      </Box>
      {/* 학번 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='98px' mt='25px'>
          <Text>학번</Text>
        </Box>
        <Box isInlineBlock>
          <Input value={studentNumber} onChange={handleInputChange(setStudentNumber)}
            placeholder='학번 (ID)' width='390px' height='63px' />
        </Box>
      </Box>
      {/* 학년 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='98px' mt='25px'>
          <Text>학년</Text>
        </Box>
        <Box isInlineBlock>
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
      {/* 재학여부 */}
      <Box isBlock>
        <Box isInlineBlock ml='64px' mr='60px' mt='25px'>
          <Text>재학여부</Text>
        </Box>
        <Box isInlineBlock>
          <Select placeholder='재학여부' width='390px' height='63px'>
            <option>재학</option>
            <option>휴학</option>
            <option>졸업</option>
            <option>기타</option>
          </Select>
        </Box>
      </Box>
      <Box isBlock ml='64px' mt='30px' mb='70px'>
        <Button mt='65px' width='160px' height='50px' background='#FFEEEA'
          color='#FF6845' border='1px solid #FF6845' px='0'>
            퇴부신청
        </Button>
      </Box>
      <Box isBlock ml='1360px' mb='70px'>
        <Button width='220px' height='72px'>저장하기</Button>
      </Box>
    </Box>
  );
};
