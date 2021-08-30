import React, {useCallback} from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import {Box, Button, Text} from '../components';

const CardLine = styled.div`
  box-sizing: border-box;
  width: calc(100% - 68px);
  height: 1px;
  background-color: #E5E5E5;
  margin-top: 8px;
`;

const EllipsisText = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;


const Inbutton = styled(Button)`
  background: #EBEBEB;
  border: 2px solid #EBEBEB;
  color: #000;

  :hover, :focus {
    background: #6D48E5;
    border: 2px solid #6D48E5;
    color: #fff;
  }
  `;

const Wrapper = styled(Box)<{checked: boolean}>`
border-color: ${({checked}) => checked ? '#6D48E5' : '#EFEBFC'};

:hover, :focus {
  border: 2px solid #6D48E5;
}
`;

interface MemberCardProps {
  username: string;
  univnumber: string;
  major: string;
  group?: string;
  phone: string;
  date?: string;
  checked?: boolean;
  onClick?: () => void;
}

export const MemberCard = (MemberCardProps: MemberCardProps) => {
  const {checked, group, date, username, univnumber, major, phone, onClick} = MemberCardProps;
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return (
    <Wrapper maxWidth='300px' isFlex flexDirection='column' pt='44px' pb='34px' alignItems='center' border='2px solid #EBEBEB' borderRadius='37px' checked={checked || false} onClick={handleClick}>
      <Box isFlex width='100%' alignItems='baseline' px='34px'>
        <Text flex={1} fontWeight={700} fontSize='18px' lineHeight='22px'>{group}</Text>
        <Text color='#CBC8BE' fontWeight={400} fontSize='14px' lineHeight='17px'>{format(Number(date) ?? 0, 'yyyy-MM-dd')}</Text>
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
        <Box isFlex mt='24px'>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>전화번호</Text>
          <EllipsisText ml='32px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{phone}</EllipsisText>
        </Box>
        <Inbutton mt='30px' py='0' width='100%' height='40px' fontSize='14px' lineHeight='18px'>더 보기</Inbutton>
      </Box>
    </Wrapper>
  );
};
