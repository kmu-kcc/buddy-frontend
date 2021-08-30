import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchPayers, searchDeptors, createFee} from '../../store/actions/feeActions';
import {Box, Button, Input, Text, Popup, Span} from '../../components';
import {Filter} from '../../components/icons';
import {CommonMessage, FeeMessage} from '../../common/wordings';

const NameText = styled(Text)`
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #454440;
`;

const UnivNumText = styled(Text)`
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #8D8D8D;
`;

interface MemberCardProps {
  username?: string;
  univnumber?: string;
}

const MemberCard = (MemberCardProps: MemberCardProps) => {
  const {username, univnumber} = MemberCardProps;
  return (
    <Box maxWidth='248px' isFlex pb='20px' pt='20px' px='44px' alignItems='center'>
      <NameText fontWeight={500} fontSize='16px' lineHeight='20px'>{username}</NameText>
      <UnivNumText ml='40px' fontWeight={500} fontSize='16px' lineHeight='20px'>{univnumber}</UnivNumText>
    </Box>
  );
};

export const Members = () => {
  const dispatch = useDispatch();
  const {currentSemester, loadingCreateFee, loadingPayers, loadingDeptors, payers, deptors} = useSelector((state: RootState) => state.fee);
  const [startFeePopupShow, setStartFeePopupShow] = useState(false);
  const [amount, setAmount] = useState('0');
  const totalUserCount = useMemo(() => payers.length + deptors.length, [payers.length, deptors.length]);
  const paidPercent = useMemo(() => {
    return payers.length / totalUserCount * 100;
  }, [payers.length, totalUserCount]);

  const fetchPayers = useCallback(async () => {
    if (loadingPayers) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(searchPayers({
        ...currentSemester,
      }));

      if (response.type === searchPayers.fulfilled.type) {
        toast.success(FeeMessage.successPayers);
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingPayers, currentSemester]);
  const fetchDeptors = useCallback(async () => {
    if (loadingDeptors) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(searchDeptors({
        ...currentSemester,
      }));

      if (response.type === searchDeptors.fulfilled.type) {
        toast.success(FeeMessage.successDeptors);
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingDeptors, currentSemester]);

  const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  }, []);
  const handleStartFeePopupClick = useCallback(() => setStartFeePopupShow(true), []);
  const handleStartFeePopupClose = useCallback(() => setStartFeePopupShow(false), []);
  const handleStartFeePopupConfirm = useCallback(async () => {
    if (loadingCreateFee) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (Number(amount) === NaN) {
      toast.error(FeeMessage.invalidFeeAmount);
      return;
    }

    const response = await dispatch(createFee({
      amount: Number(amount),
      ...currentSemester,
    }));

    if (response.type === createFee.fulfilled.type) {
      toast.success(FeeMessage.successCreateFee);
    } else {
      toast.error(response.payload as unknown as string);
    }
  }, [dispatch, loadingCreateFee, amount, currentSemester]);

  useEffect(() => {
    fetchPayers();
    fetchDeptors();
  //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const PaidMembers = PaidMembersProfile.map((info, idx) => (
  //   <Box border='1px solid #6D48E5' borderRadius='15px' key={idx}>
  //   </Box>
  // ));

  // const UnpaidMembers = UnpaidMembersProfile.map((info, idx) => (
  //   <Box border='1px solid #FF6845' borderRadius='15px' key={idx}>
  //     <MemberCard username={info.username} univnumber={info.univnumber} />
  //   </Box>
  // ));

  return (
    <Box isFlex width='100%' flexDirection='column'>
      <Box isFlex mt='64px' alignItems='center'>
        <Box ml='7px' isFlex height='30px' alignItems='baseline'>
          <Span color='#454440' fontSize='28px' lineHeight='34px' fontWeight={700}>{payers.length}명 /</Span>
          <Span ml='10px' color='rgba(69, 68, 64, 0.5)' fontSize='24px' lineHeight='29px'>{totalUserCount}명</Span>
        </Box>
        <Button height='52px' py='0px' lineHeight='52px' ml='auto' mr='10px' onClick={handleStartFeePopupClick}>학기 시작</Button>
      </Box>
      <Box ml='-10px' mt='15px' isFlex width='100%' height='34px' borderRadius='17px' bg='#EFEBFC'>
        <Box isFlex width={`${paidPercent}%`} height='34px' bg='#6D48E5' borderRadius='73px' />
      </Box>
      <Box mt='62px' isFlex width='100%' flexDirection='column'>
        <Box isFlex alignItems='center'>
          <Text color='#000' fontSize='24px' lineHeight='29px'>납부자</Text>
          <Box isFlex ml='auto' cursor='pointer'>
            <Filter height='24px' color='#8D8C85' />
            <Span ml='7px' color='#8D8C85' fontSize='20px' lineHeight='25px' fontWeight={500}>필터</Span>
          </Box>
        </Box>
        <Box mt='30px' isFlex flexWrap='wrap' style={{gap: '20px'}}>
          {payers.length > 0 ? payers.map((payer) => (
            <MemberCard key={payer.id}
              username={payer.name}
              univnumber={payer.id} />
          )) : <Text mt='32px' width='100%' textAlign='center'>납부한 회원이 없습니다.</Text>}
        </Box>
      </Box>
      <Box mt='62px' isFlex width='100%' mb='28px' flexDirection='column'>
        <Text color='#000' fontSize='24px' lineHeight='29px'>미납부자</Text>
        <Box mt='30px' isFlex flexWrap='wrap' style={{gap: '20px'}}>
          {deptors.length > 0 ? deptors.map((deptor) => (
            <MemberCard key={deptor.id}
              username={deptor.name}
              univnumber={deptor.id} />
          )) : <Text mt='32px' width='100%' textAlign='center'>미납부한 회원이 없습니다.</Text>}
        </Box>
      </Box>
      <Popup type='primary' height='fit-content' show={startFeePopupShow}
        confirmLabel='시작' cancelLabel='닫기'
        onConfirm={handleStartFeePopupConfirm}
        onClose={handleStartFeePopupClose}>
        <Box isFlex flexDirection='column' alignItems='center'>
          <Text fontSize='20px' lineHeight='25px'>{currentSemester.year}년도 {currentSemester.semester}학기 회계를 시작할까요?</Text>
          <Box isFlex mt='24px' alignItems='center' justifyContent='center'>
            <Text fontSize='20px' lineHeight='25px' mr='24px'>회비 금액</Text>
            <Input maxWidth='45%' flex={1} type='number' value={amount} placeholder='금액 입력' onChange={handleAmountChange} />
          </Box>
        </Box>
      </Popup>
    </Box>
  );
};
