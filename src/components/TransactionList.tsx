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
    describtion: '회비납부',
    amount: 12000,
    total: 76000,
    type: 'input',
  },
  {
    id: 2,
    date: '21.08.15',
    describtion: '회비납부',
    amount: 12000,
    total: 88000,
    type: 'input',
  },
  {
    id: 3,
    date: '21.08.15',
    describtion: '회비납부',
    amount: 12000,
    total: 100000,
    type: 'input',
  },
  {
    id: 4,
    date: '21.08.15',
    describtion: '회비납부',
    amount: -12000,
    total: 88000,
    type: 'withdraw',
  },
];

const ColorText = styled(Text)<{amount: number}>`
  font-size : 20px;
  line-height: 25px;
  color: ${({amount}) => amount < 0 ? '#FF6845' : '#6D48E5'};
`;

const comma = (num: number) =>{
  const res = num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  return (num >= 0 ? '+'+res : res);
};

interface TransActionInterface {
  date?: string;
  describtion?: string;
  amount: number;
  total: number;
};

export const AccountList = (props: TransActionInterface) => {
  const {date, describtion, amount, total} = props;
  return (
    <div>
      <Box isFlex mb='16px' mt='27px'>
        <Text color='#8D8C85' fontSize='20px' lineHeight='25px' ml='32px' height='35px' width='114px'>{date}</Text>
        <Text color='#000000' fontSize='20px' lineHeight='25px' ml='54px' height='35px' width='198px'>{describtion}</Text>
        <ColorText amount={amount} ml='97px' height='35px' width='100px'> {comma(amount)}</ColorText>
        <Text color='#8D8C85' fontSize='20px' lineHeight='25px' ml='42px'>{comma(total)}</Text>
      </Box>
      <ListLine />
    </div>
  );
};

export const TransactionList = () => {
  const List = Dummy.map((info, idx) => (
    <AccountList key={idx} date={info.date} describtion={info.describtion} amount={info.amount} total={(info.total)} />
  ));
  return (
    <div>
      <Box>
        {List}
      </Box>
    </div>
  );
};
