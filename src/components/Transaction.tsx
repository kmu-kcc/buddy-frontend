import React from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import {Box} from './Box';
import {Text} from './Text';

const ColoredText = styled(Text)<{amount: number;}>`
  font-size: 20px;
  line-height: 25px;
  font-weight: 700;
  color: ${({amount}) => amount < 0 ? '#FF6845' : '#6D48E5'};
`;

interface TransactionProps {
  date: string;
  description: string;
  amount: number;
  total: number;
};

export const TransactionHeader = () => {
  return (
    <Box isFlex pb='22px' mt='53px' borderBottom='1px solid #CBC8BE'>
      <Text flex={1} textAlign='center' color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px'>날짜</Text>
      <Text flex={3} textAlign='center' color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px'>내역</Text>
      <Text flex={1} textAlign='center' color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px'>금액</Text>
      <Text flex={1} textAlign='center' color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px'>잔액</Text>
    </Box>
  );
};

export const Transaction = (props: TransactionProps) => {
  const {date, description, amount, total} = props;
  return (
    <Box isFlex py='27px' borderBottom='1px solid #CBC8BE'>
      <Text flex={1} ml='calc(100% / 18)' color='#8D8C85' fontSize='20px' lineHeight='25px' fontWeight={500}>{format(Number(date), 'yy.MM.dd')}</Text>
      <Text flex={3} color='#000' fontSize='20px' lineHeight='25px' fontWeight={500}>{description}</Text>
      <ColoredText flex={1} mr='12px' textAlign='right' amount={amount}>{amount > 0 ? '+' : ''}{amount.toLocaleString()}</ColoredText>
      <Text flex={1} mr='calc(100% / 24)' color='#8D8C85' textAlign='right' fontSize='20px' lineHeight='25px' fontWeight={500}>{total.toLocaleString()}</Text>
    </Box>
  );
};
