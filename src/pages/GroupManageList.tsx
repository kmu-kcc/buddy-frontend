import React, {useState, useCallback} from 'react';
import {Box, SearchInput, Button} from '../components';
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
  position: absolute;
  width: 231px;
  height: 0px;
  background-color: #E5E5E5;
  border: 1px solid #E5E5E5;
  margin-top: 76px;
  margin-left: 36px;
  margin-right: 36px;
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
    <Box>
      {children}
      <Box isInlineBlock position='absolute' mt='45px' mb='8px' ml='41px' mr='242px'>{group}</Box>
      <Box isInlineBlock position='absolute' ml='192px' mr='37px' mt='49px' mb='217px' fontSize='14px' color='#CBC8BE'>{date}</Box>
      <CardLine />
      <Box position='absolute' mt='104px' mb='104px'>
        <Box mt='4px'/>
        <Box>
          <Box position='absolute' isInlineBlock ml='45px' mr='213px' mt='12px' mb='12px'>이름</Box><Box isInlineBlock ml='152px' mt='12px' mb='12px'>{username}</Box>
        </Box>
        <Box>
          <Box position='absolute' isInlineBlock ml='45px' mr='213px' mt='12px' mb='12px'>학번</Box><Box isInlineBlock ml='152px' mt='12px' mb='12px'>{univnumber}</Box>
        </Box>
        <Box>
          <Box position='absolute' isInlineBlock ml='45px' mr='213px' mt='12px' mb='12px'>학과</Box><Box isInlineBlock ml='152px' mt='12px' mb='12px'>{major}</Box>
        </Box>
      </Box>
      <Box position='absolute' mr='46px' ml='46px' mt='239px' mb='35px'>
        <Button>자세히보기</Button>
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
      <MemberCard group='운영자' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date}/>
    </CardWrapper>
  ));

  const CardListMember = UserProfile.map((info, idx) => (
    <CardWrapper border='2px solid #FFD646' borderRadius='37px' key={idx}>
      <MemberCard group='동아리원' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date}/>
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
