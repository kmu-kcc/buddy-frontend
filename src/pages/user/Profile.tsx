import React, {useCallback} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {Button, Box, Text} from '../../components';

const Key = styled.span`
  float: left;
  font-size: 20px;
  line-height: 25px;
  color: #FFFFFF;
`;

const Value = styled.span`
  font-size: 16px;
`;

const FloatButton = styled(Button)`
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Profile = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/user/settings');
  }, [history]);

  return (
    <Box width='100%' pl='60px' pt='48px' pb='48px' position='relative'>
      <Text mb='48px' fontSize='40px' fontWeight={700} lineHeight='50px' color='#454440'>마이페이지</Text>
      {/* 이름 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTopLeftRadius='16px'>
          <Key>이름</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5' borderTopRightRadius='16px'>
          <Value>홍길동</Value>
        </Box>
      </Box>
      {/* 비밀번호 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>비밀번호</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>abcd1234</Value>
        </Box>
      </Box>
      {/* 전화번호 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>전화번호</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>01012345678</Value>
        </Box>
      </Box>
      {/* 이메일 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>이메일</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>abc123@naver.com</Value>
        </Box>
      </Box>
      {/* 대학 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>대학</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>소프트웨어융합대학</Value>
        </Box>
      </Box>
      {/* 학과 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>학과</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>경영학과</Value>
        </Box>
      </Box>
      {/* 학번 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>학번</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>20191954</Value>
        </Box>
      </Box>
      {/* 학년 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>학년</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>1학년</Value>
        </Box>
      </Box>
      {/* 재학여부 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff' borderBottomLeftRadius='16px'>
          <Key>재학여부</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5' borderBottomRightRadius='16px'>
          <Value>재학</Value>
        </Box>
      </Box>
      <FloatButton onClick={handleClick}>수정하기</FloatButton>
    </Box>
  );
};
