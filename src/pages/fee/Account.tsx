import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {position, PositionProps} from 'styled-system';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchAccount} from '../../store/actions/feeActions';
import {Text, Button, Box, Input, Transaction, TransactionHeader, Popup} from '../../components';
import {Filter} from '../../components/icons';
import {CommonMessage, FeeMessage} from '../../common/wordings';
import {getCurrentSemester} from '../../utils/semester';
import {formatCurrency} from '../../utils/currency';

const CarriedData = {
  fee: 200000,
  semester: '21년 1학기',
  date: '21.08.04',
};

const TotalBalanceContainer = styled(Box)`
  width: 442px;
  height: 90px;
  display: flex;
  justify-content: space-between;
  background: #6D48E5;
  border-radius: 15px;
  padding: 0 30px;
  align-items: center;
`;

interface CarriedProps {
  fee: number;
  semester?: string;
  date?: string;
};

const CarriedBudgetWrapper = styled.div`
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

const CarriedBudget = (CarriedProps: CarriedProps) => {
  const {fee, semester, date} = CarriedProps;
  return (
    <CarriedBudgetWrapper>
      <Text color='#8D8C85' fontSize='20px' fontWeight={500} lineHeight='25px' mr='29px'>{date}</Text>
      <Text color='#000000' fontSize='20px' fontWeight={500} lineHeight='25px' mr='63px'>{semester}</Text>
      <Text color='#6D48E5' fontSize='20px' fontWeight='bold' lineHeight='25px'>{formatCurrency(fee)}</Text>
    </CarriedBudgetWrapper>
  );
};

const FilterButton = styled.div<{FilterClicked: boolean;}>`
  font-weight: 500;
  font-size: 20px;
  line-height: 25px;
  color: #8D8C85;
  cursor: pointer;
  right: 0;
  &::after {
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

export const Account = () => {
  const dispatch = useDispatch();
  const {loadingTransaction, account} = useSelector((state: RootState) => state.fee);
  const [FilterClicked, setFilterClick] = useState(false);
  const [ExportClicked, setExportClick] = useState(false);
  const [depositPopupShow, setDepositPopupShow] = useState(false);
  const [inputDepositValue, setInputDepositValue] = useState('');
  const [inputDepositDescriptionValue, setInputDepositDescriptionValue] = useState('');
  const [WithdrawPopupShow, setWithdrawPopupShow] = useState(false);
  const [inputWithdrawValue, setInputWithdrawValue] = useState('');
  const [inputWithdrawDescriptionValue, setInputWithdrawDescriptionValue] = useState('');

  const fetchAccount = useCallback(async () => {
    if (loadingTransaction) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(searchAccount({
        ...getCurrentSemester(),
      }));

      if (response.type === searchAccount.fulfilled.type) {
        toast.success(FeeMessage.successTransaction);
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingTransaction]);

  const handleFilterClick = useCallback(() => {
    setFilterClick(!FilterClicked);
  }, [FilterClicked, setFilterClick]);
  const handleExportClick = useCallback(() => {
    setExportClick(!ExportClicked);
  }, [ExportClicked, setExportClick]);

  const handleDepositRequestPopupClick = useCallback(() => {
    setDepositPopupShow(true);
  }, []);
  const handleDepositConfirm = useCallback(() => {
    setDepositPopupShow(false);
  }, [setDepositPopupShow]);
  const handleDepositClose = useCallback(() => {
    setDepositPopupShow(false);
  }, []);
  const handleDepositChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDepositValue(event.target.value);
  }, [setInputDepositValue]);
  const handleDepositDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputDepositDescriptionValue(event.target.value);
  }, [setInputDepositDescriptionValue]);

  const handleWithdrawRequestPopupClick = useCallback(() => {
    setWithdrawPopupShow(true);
  }, []);
  const handleWithdrawConfirm = useCallback(() => {
    setWithdrawPopupShow(false);
  }, [setWithdrawPopupShow]);
  const handleWithdrawClose = useCallback(() => {
    setWithdrawPopupShow(false);
  }, []);
  const handleWithdrawChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWithdrawValue(event.target.value);
  }, [setInputWithdrawValue]);
  const handleWithdrawDescriptionChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputWithdrawDescriptionValue(event.target.value);
  }, [setInputWithdrawDescriptionValue]);

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <Box isFlex flexDirection='row'>
      <Box flexBasis='34%'>
        <Text mt='48px' ml='12px' color='#454440' fontSize='24px' fontWeight={700} lineHeight='30.05px'>전체금액</Text>
        <TotalBalanceContainer mt='40px'>
          <Text color='#fff' fontSize='18px' lineHeight='22px'>잔여 총액</Text>
          <Text color='#fff' fontSize='28px' fontWeight='bold' lineHeight='34px' textAlign='right'>{account?.total ? `${formatCurrency(account?.total)}` : '-'}원</Text>
        </TotalBalanceContainer>
        <Text mt='58px' color='#454440' fontSize='24px' fontWeight='bold' lineHeight='30px'>이월 내역</Text>
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
            <Text color='#454440' fontSize='24px' fontWeight='bold' lineHeight='30px' mr='51px'>입출금 내역</Text>
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
        <TransactionHeader />
        {(account?.logs.length ?? 0) > 0 ? account?.logs.map((log) => (
          <Transaction key={log.created_at}
            date={log.created_at}
            description={log.description}
            amount={log.amount}
            total={100000} />
        )) : <Text mt='48px' width='100%' textAlign='center' fontSize='20px'>입출금 내역이 없습니다.</Text>}
      </Box>
      <Box isFlex alignItems='flex-end' justifyContent='space-between' right='50px'>
        <FloatButton right='303px' onClick={handleDepositRequestPopupClick}>입금 내역 추가</FloatButton>
        <Popup width='500px' height='390px' type='primary' confirmLabel='추가' cancelLabel='닫기' show={depositPopupShow}
          onConfirm={handleDepositConfirm}
          onClose={handleDepositClose}>
          <Box isFlex flexDirection='column' justifyItems='center'>
            <Text fontSize='20px' lineHeight='25px' mb='6px'>입금 내역 입력</Text>
            <Input onChange={handleDepositDescriptionChange} value={inputDepositDescriptionValue}></Input>
            <Text fontSize='20px' lineHeight='25px' mt='25px' mb='6px'>입금 금액 입력</Text>
            <Input onChange={handleDepositChange} value={inputDepositValue}></Input>
          </Box>
        </Popup>
        <FloatButton right='50px' onClick={handleWithdrawRequestPopupClick} background='#FF6845' border='none'>출금 내역 추가</FloatButton>
        <Popup width='500px' height='390px' type='danger' confirmLabel='추가' cancelLabel='닫기' show={WithdrawPopupShow}
          onConfirm={handleWithdrawConfirm}
          onClose={handleWithdrawClose}>
          <Box isFlex flexDirection='column'>
            <Text fontSize='20px' lineHeight='25px' mb='6px'>출금 내역 입력</Text>
            <Input onChange={handleWithdrawDescriptionChange} value={inputWithdrawDescriptionValue}></Input>
            <Text fontSize='20px' lineHeight='25px' mt='25px' mb='6px'>출금 금액 입력</Text>
            <Input onChange={handleWithdrawChange} value={inputWithdrawValue}></Input>
          </Box>
        </Popup>
      </Box>
    </Box>
  );
};
