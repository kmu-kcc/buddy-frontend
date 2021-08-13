import React, {useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, Box} from '../components';
import styled from 'styled-components';

const Key = styled.span`
  box-sizing: border-box;
  float:left;
  font-size: 20px;
  line-height: 25px;
  color: #FFFFFF;
`;

const Value = styled.span`
  box-sizing: border-box;
  font-size: 16px;
`;

const HeaderText = styled.p`
  color: #454440;
  font-size: 40px;
  font-weight: bold;
  line-height: 50.08px;
`;

export const Mypage: React.FC = () => {
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/ModifyMypage');
  }, [history]);
  return (
    <Box isBlock width='100%' justifyContent='center'>
      <Box isFlex ml='60px' mt='60px'>
        <HeaderText>마이페이지</HeaderText>
      </Box>
      {/* 이름 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderRadius='16px 0px 0px 0px'>
            <Key>이름</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5' borderRadius='0px 16px 0px 0px'>
            <Value>홍길동</Value>
          </Box>
        </Box>
      </Box>
      {/* 비밀번호 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>비밀번호</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>abcd1234</Value>
          </Box>
        </Box>
      </Box>
      {/* 전화번호 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>전화번호</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>01012345678</Value>
          </Box>
        </Box>
      </Box>
      {/* 이메일 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>이메일</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>abc123@naver.com</Value>
          </Box>
        </Box>
      </Box>
      {/* 대학 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>대학</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>소프트웨어융합대학</Value>
          </Box>
        </Box>
      </Box>
      {/* 학과 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>학과</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>경영학과</Value>
          </Box>
        </Box>
      </Box>
      {/* 학번 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>학번</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>20191954</Value>
          </Box>
        </Box>
      </Box>
      {/* 학년 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff'>
            <Key>학년</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5'>
            <Value>1학년</Value>
          </Box>
        </Box>
      </Box>
      {/* 재학여부 */}
      <Box isBlock>
        <Box isInlineFlex ml='60px'>
          <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
            bg='#6D48E5' borderTop='1px solid #fff' borderRadius='0px 0px 0px 16px'>
            <Key>재학여부</Key>
          </Box>
          <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
            border='1px solid #6D48E5' borderRadius='0px 0px 16px 00px'>
            <Value>재학</Value>
          </Box>
        </Box>
      </Box>
      <Box isBlock ml='1360px'>
        <Button mt='30px' width='220px' height='72px' onClick={handleClick}>수정하기</Button>
      </Box>
    </Box>
  );
};
