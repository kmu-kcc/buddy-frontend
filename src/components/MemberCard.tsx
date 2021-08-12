import React from 'react';
import styled from 'styled-components';
import {Box} from './Box';

const CardWrapper = styled.div`
  width: 303px;
  height: 358px;
  border: 1px solid #8D8C85;
  border-radius: 20px;
`;

const ApplicationMethod = styled.span`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
`;

const ApplicationDate = styled.span`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #CBC8BE;
`;

const MemberProps = styled.span`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  width: 60px;
  height: 20px;
  color: #8D8C85;
`;

const MemberValues = styled.span`
  font-family: Spoqa Han Sans Neo;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  width: 105px;
  height: 20px;
  color: #000000;
`;

export const MemberCard = () =>{
  return (
    <div>
      <CardWrapper>
        <Box mt='45px' ml='41px' isFlex alignItems='baseline'>
          <Box>
            <ApplicationMethod>퇴부신청</ApplicationMethod>
          </Box>
          <Box ml='78px'>
            <ApplicationDate>2021.05.21</ApplicationDate>
          </Box>
        </Box>
        <Box ml='45px' mt='36px' isFlex alignItems='baseline'>
          <Box isFlex width='60px' height='20px'>
            <MemberProps>이름</MemberProps>
          </Box>
          <Box ml='47px'>
            <MemberValues>홍길동</MemberValues>
          </Box>
        </Box>
        <Box ml='45px' mt='24px' isFlex alignItems='baseline'>
          <Box isFlex width='60px' height='20px'>
            <MemberProps>학번</MemberProps>
          </Box>
          <Box ml='47px'>
            <MemberValues>20180092</MemberValues>
          </Box>
        </Box>
        <Box ml='45px' mt='24px' isFlex alignItems='baseline'>
          <Box isFlex width='60px' height='20px'>
            <MemberProps>학과</MemberProps>
          </Box>
          <Box ml='47px'>
            <MemberValues>소프트웨어</MemberValues>
          </Box>
        </Box>
        <Box ml='45px' mt='24px' isFlex alignItems='baseline'>
          <Box isFlex width='60px' height='20px'>
            <MemberProps>전화번호</MemberProps>
          </Box>
          <Box ml='47px'>
            <MemberValues>01073283315</MemberValues>
          </Box>
        </Box>
      </CardWrapper>
    </div>
  );
};
