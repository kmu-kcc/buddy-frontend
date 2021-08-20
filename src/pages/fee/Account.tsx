import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {position, PositionProps} from 'styled-system';
import {Text, Button, Box, Tab, SearchInput} from '../../components';

const TempBudget = 1000000;

const CarriedData = {
  fee: 200000,
  semester: '21년 1학기',
  date: '21.08.04',
};

const comma = (num: number) =>{
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

const FloatButton = styled(Button)<PositionProps>`
  ${position}
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const FullBudget = styled.div<{Budget: number;}>`
  width: 442px;
  height: 90px;
  background: #6D48E5;
  border-radius: 15px;
  padding-right: 30px;
  padding-left: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 58px;
`;

interface CarriedProps {
  fee: number;
  semester?: string;
  date?: string;
};

const CarriedBudgetStyles = styled.div`
  width: 436px;
  height: 73px;
  box-sizing: border-box;
  border: 1px solid #6D48E5;
  border-radius: 15px;
  padding-right: 38px;
  padding-left: 43px;
  display: flex;
  align-items: center;
  margin-top: 14px;
`;

const CarriedBudget = (CarriedProps: CarriedProps) => {
  const {fee, semester, date} = CarriedProps;
  return (
    <CarriedBudgetStyles>
      <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='29px'>{date}</Text>
      <Text color='#000000' fontSize='20px' fontWeight={500} lineHeight='25px' mr='63px'>{semester}</Text>
      <Text color='#6D48E5' fontSize='20px' fontWeight='bold' lineHeight='25px'>{fee>=0? '+'+comma(fee):'-'+comma(fee)}</Text>
    </CarriedBudgetStyles>
  );
};

export const Account = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);

  return (
    <Box width='100%' py='48px' px='60px' >
      <Box isBlock>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>회계관리</Text>
        <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
          <Tab tabs={['입출금내역 목록', '동아리원 목록']} />
          <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
        </Box>
      </Box>
      <Box isInlineBlock>
        <Box isFlex mt='49px' mb='39px'>
          <Text color='#454440' fontSize='24px' fontWeight={700} lineHeight='30.05px'>전체금액</Text>
        </Box>
        <FullBudget Budget={TempBudget}>
          <Box isFlex>
            <Text color='#ffffff' fontSize='18px' lineHeight='22px'>잔여 총액</Text>
          </Box>
          <Text color='#ffffff' fontSize='28px' fontWeight='bold' lineHeight='34px' textAlign='right'>{comma(TempBudget)}원</Text>
        </FullBudget>
        <Text color='#454440' fontSize='24px' fontWeight='bold' lineHeight='30px'>이월 목록</Text>
        <Box isFlex mt='42px' padding='0 38px'>
          <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='75px'>날짜</Text>
          <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='122px'>내역</Text>
          <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='49px'>금액</Text>
        </Box>
        <CarriedBudget date={CarriedData.date} semester={CarriedData.semester} fee={CarriedData.fee} />
      </Box>
      <Box isInlineBlock py='48px' px='60px'>
        <Text color='#454440' fontSize='24px' fontWeight='bold' lineHeight='30px'>입출금내역 목록</Text>
      </Box>
      <Box isFlex alignItems='flex-end' justifyContent='space-between' right='50px'>
        <FloatButton right='303px'>입금 내역 추가</FloatButton>
        <FloatButton right='50px' background='#FF6845' border='2px solid #FF6845'>출금 내역 추가</FloatButton>
      </Box>
    </Box>
  );
};
