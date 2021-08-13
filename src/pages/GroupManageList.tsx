import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {background, BackgroundProps} from 'styled-system';
import {Box, SearchInput, Button, Text, Tab} from '../components';

const CardLine = styled.div`
  box-sizing: border-box;
  width: calc(100% - 68px);
  height: 1px;
  background-color: #E5E5E5;
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

const EllipsisText = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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

interface MemberCardProps {
  username?: string;
  univnumber?: string;
  major?: string;
  date?: string;
  group?: string;
}

const MemberCard = (MemberCardProps: MemberCardProps) => {
  const {group, username, univnumber, major, date} = MemberCardProps;
  return (
    <Box maxWidth='300px' isFlex flexDirection='column' pt='44px' pb='34px' alignItems='center'>
      <Box isFlex width='100%' alignItems='baseline' px='34px'>
        <Text flex={1} fontWeight={700} fontSize='18px' lineHeight='22px'>{group}</Text>
        <Text color='#CBC8BE;'>{date}</Text>
      </Box>
      <CardLine />
      <Box isFlex mt='28px' px='44px' flexDirection='column'>
        <Box isFlex>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>이름</Text>
          <EllipsisText ml='62px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{username}</EllipsisText>
        </Box>
        <Box isFlex mt='24px'>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>학번</Text>
          <EllipsisText ml='62px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{univnumber}</EllipsisText>
        </Box>
        <Box isFlex mt='24px'>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>학과</Text>
          <EllipsisText ml='62px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{major}</EllipsisText>
        </Box>
        <Button mt='30px' py='0' width='100%' height='40px' fontSize='14px' lineHeight='18px'>더 보기</Button>
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
    <Box border='2px solid #6D48E5' borderRadius='37px' key={idx}>
      <MemberCard group='운영자' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date} />
    </Box>
  ));
  const CardListMember = UserProfile.map((info, idx) => (
    <Box border='2px solid #FFD646' borderRadius='37px' key={idx}>
      <MemberCard group='동아리원' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date} />
    </Box>
  ));

  return (
    <Box width='100%' py='48px' px='60px'>
      <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>조직관리</Text>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
        <Tab tabs={['동아리원 목록', '입부 신청내역', '퇴부 신청내역']} />
        <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
      </Box>
      <Box isBlock width='80px' height='30px' mt='64px' position='relative' mb='28px'>
        <GroupName>운영자</GroupName>
        <GroupNameShadow background='#EFEBFC' />
      </Box>
      <Box isFlex flexWrap='wrap' style={{gap: '30px'}}>
        {CardListAdmin}
      </Box>
      <Box width='80px' height='30px' mt='62px' position='relative' mb='28px'>
        <GroupName>동아리원</GroupName>
        <GroupNameShadow background='#FFF5D1' />
      </Box>
      <Box isFlex flexWrap='wrap' style={{gap: '30px'}}>
        {CardListMember}
      </Box>
    </Box>
  );
};
