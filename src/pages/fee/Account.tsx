import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {position, PositionProps} from 'styled-system';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchAccount} from '../../store/actions/feeActions';
import {Text, Button, Box, Input, Transaction, TransactionHeader, Popup, Span} from '../../components';
import {Filter} from '../../components/icons';
import {CommonMessage, FeeMessage} from '../../common/wordings';
import {getCurrentSemester} from '../../utils/semester';
import {formatCurrency} from '../../utils/currency';

const TotalBalanceContainer = styled(Box)`
  width: 380px;
  display: flex;
  flex-direction: column;
  background: #6D48E5;
  border-radius: 15px;
  padding: 32px 30px 24px 30px;
  align-items: center;
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
  //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box isFlex width='100%' flexDirection='row' flexWrap='wrap'>
      <Box mr='64px'>
        <Text mt='48px' ml='12px' color='#454440' fontSize='24px' fontWeight={700} lineHeight='30.05px'>전체금액</Text>
        <TotalBalanceContainer mt='40px'>
          <Box isFlex width='100%' flexDirection='column' alignItems='center'>
            <Text color='#fff' fontSize='18px' lineHeight='22px'>잔여 총액</Text>
            <Text mt='6px' color='#fff' fontSize='28px' fontWeight='bold' lineHeight='34px' textAlign='right'>{account?.total ? `${formatCurrency(account?.total)}` : '-'}원</Text>
          </Box>
          <Box mt='24px' isFlex width='100%' alignItems='center' justifyContent='flex-end'>
            <Text color='#fff' fontSize='14px' lineHeight='22px'>이월 금액<Span ml='18px' fontWeight={700}>{account?.carry_over ? `${formatCurrency(account?.carry_over)}` : '-'}원</Span></Text>
            {/* <Text color='#fff' fontSize='24px' fontWeight='bold' lineHeight='34px' textAlign='right'></Text> */}
          </Box>
        </TotalBalanceContainer>
      </Box>
      <Box flex={1} py='48px'>
        <Box isFlex minWidth='600px' alignItems='center' justifyContent='space-between'>
          <Box isFlex alignItems='center' justifyContent='space-between'>
            <Text color='#454440' fontSize='24px' fontWeight='bold' lineHeight='30px' mr='51px'>입출금 내역</Text>
            <Button background='#FFD646' width='82px' height='27px'
              fontSize='12px' fontWeight={500} lineHeight='15px' borderColor='#FFD646'
              color='#000000' border='none' px='18.5px' py='6px' onClick={handleExportClick}>내보내기
            </Button>
          </Box>
          <Box isFlex alignItems='center' cursor='pointer' onClick={handleFilterClick}>
            <Filter width='24px' height='24px' />
            <Span ml='7px' color='#8D8C85' fontSize='20px' lineHeight='25px' fontWeight={500}>필터</Span>
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
