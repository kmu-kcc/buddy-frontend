import React, {useState, useCallback, useMemo} from 'react';
import styled from 'styled-components';
import {position, PositionProps} from 'styled-system';
import {Text, Button, Box, Tab, Input, TransactionList} from '../../components';
import {Filter, Search} from '../../components/icons';

const TempBudget = 1000000;

const CarriedData = {
  fee: 200000,
  semester: '21년 1학기',
  date: '21.08.04',
};

const comma = (num: number) =>{
  return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};

const FullBudget = styled.div<{Budget: number;}>`
  width: 382px;
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
  padding-left: 38px;
  display: flex;
  align-items: center;
  margin-top: 14px;
`;

const FilterButton = styled.div<{FilterClicked: boolean;}>`
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: #8D8C85;
  cursor: pointer;
  right: 0;
  &::after{
    display: ${({FilterClicked}) => FilterClicked ? 'none': 'block'};
    border: 1px solid #6D48E5;
    width: 100px;
    height: 100px;
    background: #000000;
    z-index: 10;
  }
`;

const FloatButton = styled(Button)<PositionProps>`
  ${position}
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const CarriedBudget = (CarriedProps: CarriedProps) => {
  const {fee, semester, date} = CarriedProps;
  return (
    <CarriedBudgetStyles>
      <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='29px'>{date}</Text>
      <Text color='#000000' fontSize='20px' fontWeight={500} lineHeight='25px' mr='63px'>{semester}</Text>
      <Text color='#6D48E5' fontSize='20px' fontWeight='bold' lineHeight='25px'>{comma(fee)}</Text>
    </CarriedBudgetStyles>
  );
};

const Line = styled.div`
  box-sizing: border-box;
  width: 821px;
  height: 1px;
  background-color: #CBC8BE;
  margin-top: 22px;
`;

export const Account = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const [FilterClicked, setFilterClick] = useState(false);
  const [ExportClicked, setExportClick] = useState(false);
  const empty = useMemo(() => InputTextValue === '', [InputTextValue]);
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
  const handleFilterClick = useCallback(() => {
    setFilterClick(!FilterClicked);
  }, [FilterClicked, setFilterClick]);
  const handleExportClick = useCallback(() => {
    setExportClick(!ExportClicked);
  }, [ExportClicked, setExportClick]);

  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isBlock>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>회계관리</Text>
        <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
          <Tab tabs={['입출금내역 목록', '동아리원 목록']} />
          <Input empty={empty} logo={<Search mr='27px' width='24px' height='24px' color='#CBC8BE' />} onChange={handleInputChange} value={InputTextValue} placeholder='search' />
        </Box>
      </Box>
      <Box isFlex flexDirection='row' flexWrap='wrap'>
        <Box flexBasis='34%'>
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
          <Box mb='100px'>
            <CarriedBudget date={CarriedData.date} semester={CarriedData.semester} fee={CarriedData.fee} />
          </Box>
        </Box>
        <Box flexBasis='66%' py='48px' px='60px'>
          <Box isFlex alignItems='center' justifyContent='space-between'>
            <Box isFlex alignItems='center' justifyContent='space-between'>
              <Text color='#454440' fontSize='24px' fontWeight='bold' lineHeight='30px' mr='51px'>입출금내역 목록</Text>
              <Button background='#FFD646' width='82px' height='27px'
                fontSize='12px' fontWeight={500} lineHeight='15px' borderColor='#FFD646'
                color='#000000' border='none' px='18.5px' py='6px' onClick={handleExportClick}>내보내기
              </Button>
            </Box>
            <Box isFlex alignItems='center'>
              <Filter mr='7px' width='24px' height='24px' />
              <FilterButton FilterClicked={FilterClicked} onClick={handleFilterClick}>필터</FilterButton>
            </Box>
          </Box>
          <Box isFlex mt='53px' width='821px'>
            <Box isFlex justifyContent='space-between'>
              <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' ml='32px' mr='130px'>날짜</Text>
              <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px'>내역</Text>
            </Box>
            <Box isFlex justifyContent='space-betwen' ml='262px'>
              <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='104px'>금액</Text>
              <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='96px'>잔액</Text>
            </Box>
          </Box>
          <Line />
          <TransactionList />
        </Box>
        <Box isFlex alignItems='flex-end' justifyContent='space-between' right='50px'>
          <FloatButton right='303px'>입금 내역 추가</FloatButton>
          <FloatButton right='50px' background='#FF6845' border='none'>출금 내역 추가</FloatButton>
        </Box>
      </Box>
    </Box>
  );
};
