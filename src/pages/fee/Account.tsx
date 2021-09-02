import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {captureException} from '@sentry/react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {position, PositionProps} from 'styled-system';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchAccount, deposit} from '../../store/actions/feeActions';
import {Text, Button, Box, Input, Transaction, TransactionHeader, Popup, Span} from '../../components';
import {Filter} from '../../components/icons';
import {CommonMessage, FeeMessage} from '../../common/wordings';
import {convertToMillis} from '../../utils/time';

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
  const {loadingDeposit, loadingTransaction, account, currentSemester} = useSelector((state: RootState) => state.fee);
  const {user} = useSelector((state: RootState) => state.user);

  const [FilterClicked, setFilterClick] = useState(false);
  const [ExportClicked, setExportClick] = useState(false);
  const [depositPopupShow, setDepositPopupShow] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDescription, setDepositDescription] = useState('');
  const [WithdrawPopupShow, setWithdrawPopupShow] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDescription, setWithdrawDescription] = useState('');
  const depositButtonVisible = useMemo(() => user?.role.fee_management, [user]);
  const balances = useMemo(() => account?.logs.reduce((acc = [], log) => [...acc, acc[acc.length - 1] + log.amount], [account.carry_over]) ?? [], [account]);

  const fetchAccount = useCallback(async () => {
    if (loadingTransaction) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(searchAccount({
        ...currentSemester,
      }));

      if (response.type === searchAccount.fulfilled.type) {
        return;
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      captureException(err);
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingTransaction, currentSemester]);

  const handleFilterClick = useCallback(() => {
    setFilterClick(!FilterClicked);
  }, [FilterClicked]);
  const handleExportClick = useCallback(() => {
    setExportClick(!ExportClicked);
  }, [ExportClicked]);
  const handleTextChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);

  const handleDepositRequestPopupClick = useCallback(() => {
    setDepositPopupShow(true);
  }, []);
  const handleDepositConfirm = useCallback(async () => {
    if (loadingDeposit) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (Number(depositAmount) === NaN || !depositDescription) {
      toast.warn(FeeMessage.invalidDepositInfo);
      return;
    }

    try {
      const response = await dispatch(deposit({
        amount: Number(depositAmount),
        description: depositDescription,
        ...currentSemester,
      }));

      if (response.type === deposit.fulfilled.type) {
        toast.success(FeeMessage.successDeposit);
        setDepositAmount('');
        setDepositDescription('');
        fetchAccount();
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      captureException(err);
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingDeposit, depositAmount, depositDescription, currentSemester, fetchAccount]);
  const handleDepositClose = useCallback(() => {
    setDepositPopupShow(false);
  }, []);
  const handleWithdrawRequestPopupClick = useCallback(() => {
    setWithdrawPopupShow(true);
  }, []);
  const handleWithdrawConfirm = useCallback(async () => {
    if (loadingDeposit) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (Number(withdrawAmount) === NaN || !withdrawDescription) {
      toast.warn(FeeMessage.invalidWithdrawInfo);
      return;
    }

    try {
      const response = await dispatch(deposit({
        amount: Number(withdrawAmount) * -1,
        description: withdrawDescription,
        ...currentSemester,
      }));

      if (response.type === deposit.fulfilled.type) {
        toast.success(FeeMessage.successWithdraw);
        setWithdrawAmount('');
        setWithdrawDescription('');
        fetchAccount();
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      captureException(err);
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingDeposit, withdrawAmount, withdrawDescription, currentSemester, fetchAccount]);
  const handleWithdrawClose = useCallback(() => {
    setWithdrawPopupShow(false);
  }, []);

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
            <Text mt='6px' color='#fff' fontSize='28px' fontWeight='bold' lineHeight='34px' textAlign='right'>
              {!isNaN(account?.total ?? NaN) ? `${account?.total.toLocaleString()}` : '-'}원
            </Text>
          </Box>
          <Box mt='24px' isFlex width='100%' alignItems='center' justifyContent='flex-end'>
            <Text color='#fff' fontSize='14px' lineHeight='22px'>
              이월 금액
              <Span ml='18px' fontWeight={700}>
                {!isNaN(account?.carry_over ?? NaN) ? `${account?.carry_over.toLocaleString()}` : '-'}원
              </Span>
            </Text>
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
        {(account?.logs.length ?? 0) > 0 ? account?.logs.map((log, i) => (
          <Transaction key={log.created_at}
            date={convertToMillis(log.created_at)}
            description={log.description}
            amount={log.amount}
            total={balances[i + 1]} />
        )) : <Text mt='48px' width='100%' textAlign='center' fontSize='20px'>입출금 내역이 없습니다.</Text>}
      </Box>
      {depositButtonVisible && (
        <>
          <FloatButton right='303px' onClick={handleDepositRequestPopupClick}>입금 내역 추가</FloatButton>
          <FloatButton right='50px' onClick={handleWithdrawRequestPopupClick} background='#FF6845' border='none'>출금 내역 추가</FloatButton>
        </>
      )}
      <Popup width='500px' height='390px' type='primary' confirmLabel='추가' cancelLabel='닫기' show={depositPopupShow}
        onConfirm={handleDepositConfirm}
        onClose={handleDepositClose}>
        <Box isFlex flexDirection='column' justifyItems='center'>
          <Text fontSize='20px' lineHeight='25px' mb='6px'>입금 내역 입력</Text>
          <Input onChange={handleTextChange(setDepositDescription)} value={depositDescription} />
          <Text fontSize='20px' lineHeight='25px' mt='25px' mb='6px'>입금 금액 입력</Text>
          <Input type='number' onChange={handleTextChange(setDepositAmount)} value={depositAmount} />
        </Box>
      </Popup>
      <Popup width='500px' height='390px' type='danger' confirmLabel='추가' cancelLabel='닫기' show={WithdrawPopupShow}
        onConfirm={handleWithdrawConfirm}
        onClose={handleWithdrawClose}>
        <Box isFlex flexDirection='column'>
          <Text fontSize='20px' lineHeight='25px' mb='6px'>출금 내역 입력</Text>
          <Input onChange={handleTextChange(setWithdrawDescription)} value={withdrawDescription} />
          <Text fontSize='20px' lineHeight='25px' mt='25px' mb='6px'>출금 금액 입력</Text>
          <Input type='number' onChange={handleTextChange(setWithdrawAmount)} value={withdrawAmount} />
        </Box>
      </Popup>
    </Box>
  );
};
