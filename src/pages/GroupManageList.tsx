import React, {useState, useCallback} from 'react';
import {Box, SearchInput, Button, Text} from '../components';
import styled from 'styled-components';
import {background, BackgroundProps, border, BorderProps, space, SpaceProps} from 'styled-system';

const Wrapper = styled(Box)`
  width: 100%;
  padding: 16px 24px;
`;

const SelectLine = styled.div`
  display: inline-block;
  width: 100%;
  height: 0px;
  background-color: #E5E5E5;
  border: 1px solid #E5E5E5;
  margin-bottom: 75px;
`;

const CardLine = styled.div`
  width: 231px;
  height: 0px;
  background-color: #E5E5E5;
  border: 1px solid #E5E5E5;
  margin-left: 36px;
  margin-top: 8px;
  `;

const GroupNameShadow = styled.div<BackgroundProps>`
  position: absolute;
  width: 100%;
  height: 20px;
  ${background}
  border-radius: 10px;
  top:10px;
`;

const GroupName = styled.span`
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const UserProfile = [
  {
    id: 1,
    username: 'seonilKim',
    univnumber: '20171379',
    major: 'eletric engineering',
    date: '2021.08.04',
  },
  {
    id: 2,
    username: 'hello',
    univnumber: '20171380',
    major: 'computer engineering',
    date: '2021.08.11',
  },
  {
    id: 3,
    username: 'hellowolrd',
    univnumber: '20128191',
    major: 'computer science',
    date: '2021.08.13',
  },
];

const CardWrapper = styled.div<SpaceProps & BorderProps>`
  display: inline-block;
  width: 303px;
  height: 314px;
  ${border}
  ${space}
  background: #FFFFFF;
  box-sizing: border-box;
  margin: 15px 10px;
  margin-bottom: 38px;

`;

interface MemberCardProps {
  username?: string;
  univnumber?: string;
  major?: string;
  date?: string;
  children?: React.ReactNode;
  group?: string;
}

const MemberCard = (MemberCardProps: MemberCardProps) => {
  const {group, children, username, univnumber, major, date} = MemberCardProps;
  return (
    <Box isFlex flexDirection='column'>
      {children}
      <Box isFlex flexDirection='column'>
        <Box isFlex mt='45px' ml='41px'>
          <Box>{group}</Box>
          <Box ml='101px'><Text color='#CBC8BE;'>{date}</Text></Box>
        </Box>
        <CardLine />
      </Box>
      <Box isFlex mt='28px' ml='44px'>
        <Box isFlex flexDirection='column'>
          <Box isFlex height='20px'>
            <Box >이름</Box>
            <Box ml='62px' flex={1}>{username}</Box>
          </Box>
          <Box isFlex mt='24px' height='20px'>
            <Box >학번</Box>
            <Box ml='62px' flex={1}>{univnumber}</Box>
          </Box>
          <Box isFlex mt='24px' height='20px'>
            <Box >학과</Box>
            <Box ml='62px' flex={1}>{major}</Box>
          </Box>
          <Box mt='30px'>
            <Button py='0' width='211px' height='40px'>자세히보기</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};


export const GroupManageList = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);

  const CardListAdmin = UserProfile.map((info, idx) => (
    <CardWrapper border='2px solid #6D48E5' borderRadius='37px' key={idx}>
      <MemberCard group='운영자' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date} />
    </CardWrapper>
  ));

  const CardListMember = UserProfile.map((info, idx) => (
    <CardWrapper border='2px solid #FFD646' borderRadius='37px' key={idx}>
      <MemberCard group='동아리원' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date} />
    </CardWrapper>
  ));
  return (
    <Wrapper>
      <Box mb='58px' fontSize='40px' fontWeight='bold' lineHeight='50px'>
        조직관리
      </Box>
      입퇴부신청내역
      <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
      <SelectLine />
      <Box isBlock width='80px' height='30px' position='relative' textAlign='center' mb='28px'>
        <GroupName>운영자</GroupName>
        <GroupNameShadow background='#EFEBFC' />
      </Box>
      {CardListAdmin}
      <Box isBlock width='80px' height='30px' position='relative' textAlign='center' mb='28px'>
        <GroupName>동아리원</GroupName>
        <GroupNameShadow background='#FFF5D1' />
      </Box>
      {CardListMember}
    </Wrapper>
  );
};
