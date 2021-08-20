import React, {useCallback, useState} from 'react';
import {Input, Select, Button, Box, Text, Popup, Span} from '../../components';
import styled from 'styled-components';

const FloatButton = styled(Button)`
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Settings = () => {
  const [password, setPassword] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [major, setMajor] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);

  const handleWithdrawalConfirm = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalCancel = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalRequestPopupClick = useCallback(() => {
    setWithdrawalPopupShow(true);
  }, [setWithdrawalPopupShow]);
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);

  return (
    <Box width='100%' pl='60px' pt='48px' pb='48px' position='relative'>
      <Text color='#454440' fontSize='40px' lineHeight='50px' fontWeight={700}>마이페이지</Text>
      <Text mt='20px' color='#454440' fontSize='24px' lineHeight='30px' fontWeight={700}>수정하기</Text>
      <Box width='100%' pl='4px' mt='28px'>
        {/* 이름 */}
        <Box isFlex width='525px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>이름</Text>
          <Input value={name} onChange={handleInputChange(setName)} placeholder='홍길동'
            width='390px' height='63px' />
        </Box>
        {/* 비밀번호 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>비밀번호</Text>
          <Input value={password} type='password' onChange={handleInputChange(setPassword)} placeholder='변경하기'
            width='390px' height='63px' />
        </Box>
        {/* 전화번호 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>전화번호</Text>
          <Input value={phoneNumber} type='tel' onChange={handleInputChange(setPhoneNumber)}
            placeholder='01012345678' width='390px' height='63px' />
        </Box>
        {/* 이메일 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>이메일</Text>
          <Input value={email} type='email' onChange={handleInputChange(setEmail)} placeholder='abc@gmail.com'
            width='390px' height='63px' />
        </Box>
        {/* 대학 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>대학</Text>
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
        {/* 학과 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학과</Text>
          <Input value={major} onChange={handleInputChange(setMajor)} placeholder='소속학과'
            width='390px' height='63px' />
        </Box>
        {/* 학번 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학번</Text>
          <Input value={studentNumber} onChange={handleInputChange(setStudentNumber)}
            placeholder='학번 (ID)' width='390px' height='63px' />
        </Box>
        {/* 학년 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학년</Text>
          <Select placeholder='학년' width='390px' height='63px'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Select>
        </Box>
        {/* 재학여부 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>재학여부</Text>
          <Select placeholder='재학여부' width='390px' height='63px'>
            <option>재학</option>
            <option>휴학</option>
            <option>졸업</option>
            <option>기타</option>
          </Select>
        </Box>
        <Box>
          <Button mt='47px' px='0' width='160px' height='50px' background='#FFEEEA' color='#FF6845'
            border='1px solid #FF6845' onClick={handleWithdrawalRequestPopupClick}>
              퇴부신청
          </Button>
          <Popup type='danger' onConfirm={handleWithdrawalConfirm} onCancel={handleWithdrawalCancel} confirmLabel='확인' cancelLabel='취소' show={withdrawalPopupShow}>
            <Text fontSize='20px' lineHeight='25px'>정말 <Span fontWeight={700}>퇴부</Span>하시겠습니까?</Text>
          </Popup>
        </Box>
      </Box>
      <FloatButton width='220px' height='72px'>저장하기</FloatButton>
    </Box>
  );
};
