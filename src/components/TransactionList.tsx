import React from 'react';
import styled from 'styled-components';
import {format} from 'date-fns';
import {Box} from './Box';
import {Text} from './Text';
import {formatCurrency} from '../utils/currency';

const Dummy = [
  {
    id: 1,
    date: '1629901188990',
    description: '회비납부',
    amount: 12000,
    total: 76000,
    type: 'input',
  },
  {
    id: 2,
    date: '1629901188990',
    description: '회비납부',
    amount: 12000,
    total: 88000,
    type: 'input',
  },
  {
    id: 3,
    date: '1629901188990',
    description: '회비납부',
    amount: 12000,
    total: 100000,
    type: 'input',
  },
  {
    id: 4,
    date: '1629901188990',
    description: '회비납부',
    amount: -12000,
    total: 88000,
    type: 'withdraw',
  },
];

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

export const Transaction = (props: TransactionProps) => {
  const {date, description, amount, total} = props;
  return (
    <Box isFlex py='27px' borderBottom='1px solid #CBC8BE'>
      <Text ml='32px' width='114px' color='#8D8C85' fontSize='20px' lineHeight='25px' fontWeight={500}>{format(Number(date), 'yy.MM.dd')}</Text>
      <Text ml='54px' color='#000' fontSize='20px' lineHeight='25px' fontWeight={500} width='198px'>{description}</Text>
      <ColoredText ml='97px' width='100px' amount={amount}>{formatCurrency(amount)}</ColoredText>
      <Text ml='42px' color='#8D8C85' fontSize='20px' lineHeight='25px' fontWeight={500}>{formatCurrency(total)}</Text>
    </Box>
  );
};

export const TransactionList = () => {
  return (
    <Box>
      {Dummy.map((info, idx) => (
        <Transaction key={idx}
          date={info.date}
          description={info.description}
          amount={info.amount}
          total={(info.total)} />
      ))}
    </Box>
  );
};
