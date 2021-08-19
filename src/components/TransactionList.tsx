import React from 'react';
import styled from 'styled-components';
import {Box} from './Box';
import {Text} from './Text';

const ListLine = styled.div`
  width: 821px;
  height: 0px;
  border: 1px solid #CBC8BE;
`;

const Dummy = [
  {
    id: 1,
    date: '21.08.15',
    value: '회비납부',
    amount: '12000',
    total: '76000',
    type: 'input',
  },
  {
    id: 2,
    date: '21.08.15',
    value: '회비납부',
    amount: '12000',
    total: '88000',
    type: 'input',
  },
  {
    id: 3,
    date: '21.08.15',
    value: '회비납부',
    amount: '12000',
    total: '100000',
    type: 'input',
  },
  {
    id: 4,
    date: '21.08.15',
    value: '회비납부',
    amount: '12000',
    total: '88000',
    type: 'withdraw',
  },
];

const ColorText = styled(Text)<{type: string}>`
  font-size : 20px;
  line-height: 25px;
  color: ${({type}) => type === 'withdraw' ? '#FF6845' : '#6D48E5'};
`;

interface TransActionInterface {
  date?: string;
  value?: string;
  amount?: string;
  total?: string;
  type: string;
};

export const AccountList = (props: TransActionInterface) => {
  const {date, value, amount, total, type} = props;
  return (
    <div>
      <Box isFlex mb='16px' mt='27px'>
        <Text color='#8D8C85' fontSize='20px' lineHeight='25px' ml='32px' height='35px' width='114px'>{date}</Text>
        <Text color='#000000' fontSize='20px' lineHeight='25px' ml='54px' height='35px' width='202px'>{value}</Text>
        <ColorText type={type} ml='100px' height='35px' width='120px'>{amount}</ColorText>
        <Text color='#8D8C85' fontSize='20px' lineHeight='25px' ml='50px'>{total}</Text>
      </Box>
      <ListLine />
    </div>
  );
};

export const TransactionList = () => {
  const List = Dummy.map((info, idx) => (
    <AccountList key={idx} date={info.date} value={info.value} amount={info.amount} total={info.total} type={info.type} />
  ));
  return (
    <div>
      <Box>
        {List}
      </Box>
    </div>
  );
};
