import React, {useCallback, useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {getWithdrawalRequests, deleteMember, changeCheckedInWithdrawalRequests} from '../../store/actions/memberActions';
import {Box, Button, MemberCard, Popup, Text, Span} from '../../components';
import {CommonMessage, MemberRequestsMessage} from '../../common/wordings';
import {User} from '../../models/User';

export const WithdrawRequests = () => {
  const dispatch = useDispatch();
  const {withdrawalRequests, loadingDeleteMemberRequests} = useSelector((state: RootState) => state.member);
  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);

  const handleCheck = useCallback((index: number) => () => {
    dispatch(changeCheckedInWithdrawalRequests({
      index,
      checked: !((withdrawalRequests as User[])[index].checked),
    }));
  }, [dispatch, withdrawalRequests]);

  const fetchWithdrawRequest = useCallback(async () => {
    try {
      const response = await dispatch(getWithdrawalRequests());
      if (response.type === getWithdrawalRequests.fulfilled.type) {
        toast.success(MemberRequestsMessage.loadingSuccess);
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      toast.error(CommonMessage.error);
    }
  }, [dispatch]);

  const handleWithdrawalRequestPopupClick = useCallback(() => {
    setWithdrawalPopupShow(true);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalConfirm = useCallback(async () => {
    if (loadingDeleteMemberRequests) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(deleteMember({
        ids: withdrawalRequests?.filter((req) => req.checked).map((req) => req.id) ?? [],
      }));
      if (response.type === deleteMember.fulfilled.type) {
        toast.success(MemberRequestsMessage.deleteSuccess);
        fetchWithdrawRequest();
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, fetchWithdrawRequest, loadingDeleteMemberRequests, withdrawalRequests]);
  const handleWithdrawalClose = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, []);

  useEffect(() => {
    fetchWithdrawRequest();
  }, [fetchWithdrawRequest]);

  return (
    <Box>
      <Box isFlex flexDirection='row-reverse' mt='36px'>
        <Box>
          <Button width='149px' height='54px' onClick={handleWithdrawalRequestPopupClick}>승인</Button>
          <Popup type='primary' confirmLabel='승인' cancelLabel='닫기'
            onClose={handleWithdrawalClose}
            onConfirm={handleWithdrawalConfirm}
            show={withdrawalPopupShow}>
            <Text fontSize='20px' lineHeight='25px'><Span fontWeight={700}>퇴부</Span>를 승인하시겠습니까?</Text>
          </Popup>
        </Box>
      </Box>
      <Box isFlex mt='33px' mb='50px' flexWrap='wrap'>
        {(withdrawalRequests?.length ?? 0) > 0 ? withdrawalRequests?.map((info, idx) => (
          <Box key={idx} mr='30px' mb='30px'>
            <MemberCard group='퇴부 신청'
              username={info.name}
              univnumber={info.id}
              major={info.department.split(' ').slice(1).join(' ')}
              phone={info.phone}
              date={info.updated_at}
              checked={info.checked}
              onClick={handleCheck(idx)} />
          </Box>
        )) : <Text width='100%' textAlign='center' fontWeight={400} fontSize='20px'>퇴부 신청이 없습니다.</Text>}
      </Box>
    </Box>
  );
};
