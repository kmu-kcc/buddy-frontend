import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {Box, SearchInput, Text, Tab} from '../../components';

const GroupName = styled.span`
  font-size: 24px;
  line-height: 29px;
  font-weight: normal;
  color: #000000;
`;

const AmountReceived = styled.span`
  font-size: 28px;
  line-height: 34px;
  font-weight: bold;
  z-index: 1;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  color: #454440;
`;

const ToBeReceived = styled.span`
  font-size: 24px;
  line-height: 29px;
  font-weight: bold;
  z-index: 1;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  color: rgba(69, 68, 64, 0.5);
`;

const NameText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #454440;
`;

const UnivNumText = styled(Text)`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #8D8D8D;
`;

const UserProfile = [
  {
    id: 1,
    username: '홍길동',
    univnumber: '20190155',
  },
  {
    id: 2,
    username: '홍길동',
    univnumber: '20190155',
  },
  {
    id: 3,
    username: '홍길동',
    univnumber: '20190155',
  },
];

interface MemberCardProps {
  username?: string;
  univnumber?: string;
}

const MemberCard = (MemberCardProps: MemberCardProps) => {
  const {username, univnumber} = MemberCardProps;
  return (
    <Box maxWidth='248px' isFlex flexDirection='column' pb='20px' alignItems='center'>
      <Box isFlex mt='20px' px='44px' flexDirection='column'>
        <Box isFlex>
          <NameText fontWeight={500} fontSize='16px' lineHeight='20px'>{username}</NameText>
          <UnivNumText ml='40px' fontWeight={500} fontSize='16px' lineHeight='20px'>{univnumber}</UnivNumText>
        </Box>
      </Box>
    </Box>
  );
};

export const AccountMembers = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);

  const CardListAdmin = UserProfile.map((info, idx) => (
    <Box border='1px solid #6D48E5' borderRadius='15px' key={idx}>
      <MemberCard username={info.username} univnumber={info.univnumber} />
    </Box>
  ));

  return (
    <Box width='100%' py='48px' px='60px'>
      <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>회계관리</Text>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
        <Tab tabs={['입출금내역 목록', '동아리원 목록']} />
        <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
      </Box>
      <Box isFlex width='100%' height='30px' mt='64px' position='relative' mb='28px' alignItems='flex-end'>
        <Box isFlex width='180px' height='34px' >
          <AmountReceived>3,200,000 원 /</AmountReceived>
        </Box>
        <Box isFlex width='150px' height='34px' ml='10px'>
          <ToBeReceived>4,000,000원</ToBeReceived>
        </Box>
      </Box>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end'>
        <Box isFlex width='940px' height='34px' bg='#6D48E5' borderRadius='73px' position='relative'>
        </Box>
        <Box isFlex width='1330px' height='34px' border='1px solid #6D48E5' borderRadius='73px' position='absolute'>
        </Box>
      </Box>
      <Box isBlock width='140px' height='30px' mt='64px' position='relative' mb='28px'>
        <GroupName>동아리원 목록</GroupName>
      </Box>
      <Box isFlex flexWrap='wrap' style={{gap: '30px'}}>
        {CardListAdmin}
      </Box>
    </Box>
  );
};
