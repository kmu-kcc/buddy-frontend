import React, {useCallback, useState, useEffect, useMemo} from 'react';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {getWithdrawalRequests, deleteMember} from '../../store/actions/memberActions';
import {Box, Button, MemberCard, Popup, Text, Span} from '../../components';
import {CommonMessage, MemberRequestsMessage} from '../../common/wordings';

// const ReverseButton = styled(Button)`
//   background: #FF6845;
//   border: 2px solid #FF6845;
// `;

export const WithdrawRequests = () => {
  const dispatch = useDispatch();
  const {withdrawalRequests, loadingDeleteMemberRequests} = useSelector((state: RootState) => state.member);
  const requests = useMemo(() => {
    return withdrawalRequests.map((req) => ({
      ...req,
      checked: false,
    }));
  }, [withdrawalRequests]);

  const [check, setCheck] = useState(false);
  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check, setCheck]);

  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);
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
        ids: requests.filter((req) => req.checked).map((req) => req.id),
      }));
      if (response.type === deleteMember.fulfilled.type) {
        toast.success(MemberRequestsMessage.deleteSuccess);
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingDeleteMemberRequests, requests]);
  const handleWithdrawalClose = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, []);

  const CardList = requests.map((info, idx) => (
    <Box key={idx} mr='30px' mb='30px'>
      <MemberCard group='퇴부 신청'
        username={info.name}
        univnumber={info.id}
        major={info.department.split(' ').slice(1).join(' ')}
        phone={info.phone} onCheck={handleCheck}>
        {check ? info.checked : !info.checked}
      </MemberCard>
    </Box>
  ));

  useEffect(() => {
    (async () => {
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
    })();
  }, [dispatch]);

  return (
    <Box>
      <Box isFlex flexDirection='row-reverse' mt='36px'>
        {/* <Box>
          <ReverseButton mr='114px' ml='21px' width='149px' height='54px' onClick={handleWithdrawalRequestPopupClick}>거부</ReverseButton>
          <Popup type='danger'confirmLabel='거절' cancelLabel='닫기'
            onClose={handleWithdrawalClose}
            onConfirm={handleWithdrawalConfirm}
            onCancel={handleWithdrawalCancel}
            show={withdrawalPopupShow}>
            <Text fontSize='20px' lineHeight='25px'><Span fontWeight={700}>퇴부</Span>를 거절하시겠습니까?</Text>
          </Popup>
        </Box> */}
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
        {requests.length > 0 ? CardList : <Text width='100%' textAlign='center' fontWeight={400} fontSize='20px'>퇴부 신청이 없습니다.</Text>}
      </Box>
    </Box>
  );
};
