import React, {useCallback, useState, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {getSignUpRequests, approveSignUp, deleteMember} from '../../store/actions/memberActions';
import {Box, Button, MemberCard, Popup, Text, Span} from '../../components';
import {CommonMessage, MemberRequestsMessage} from '../../common/wordings';

const ReverseButton = styled(Button)`
  background: #FF6845;
  border: 2px solid #FF6845;
`;

export const SignUpRequests = () => {
  const dispatch = useDispatch();
  const {signUpRequests, loadingDeleteMemberRequests, loadingSignUpApproveRequests} = useSelector((state: RootState) => state.member);
  const requests = useMemo(() => signUpRequests.map((req) => ({
    ...req,
    checked: false,
  })), [signUpRequests]);

  const [check, setCheck] = useState(false);
  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check, setCheck]);

  const [signUpPopupShow, setSignUpPopupShow] = useState(false);
  const [deleteMemberPopupShow, setDeleteMemberPopupShow] = useState(false);
  const handleDeleteMemberPopupClick = useCallback(() => {
    setDeleteMemberPopupShow(true);
  }, []);
  const handleDeleteMemberConfirm = useCallback(async () => {
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
  const handleDeleteMemberClose = useCallback(() => {
    setDeleteMemberPopupShow(false);
  }, []);
  const handleWSignUpPopupClick = useCallback(() => {
    setSignUpPopupShow(true);
  }, []);
  const handleSignUpConfirm = useCallback(async () => {
    if (loadingSignUpApproveRequests) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(approveSignUp({
        ids: requests.filter((req) => req.checked).map((req) => req.id),
      }));
      if (response.type === approveSignUp.fulfilled.type) {
        toast.success(MemberRequestsMessage.approveSuccess);
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingSignUpApproveRequests, requests]);
  const handleSignUpClose = useCallback(() => {
    setSignUpPopupShow(false);
  }, []);

  const CardList = signUpRequests.map((u) => {
    return {
      ...u,
      checked: false,
    };
  }).map((info, idx) => (
    <Box key={idx} mr='30px' mb='30px'>
      <MemberCard group='입부 신청' username={info.name} univnumber={info.id} major={info.department.slice(1)} date={'info.date'} phone={info.phone} onCheck={handleCheck}>
        {check ? info.checked : !info.checked}
      </MemberCard>
    </Box>
  ));

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(getSignUpRequests());
        if (response.type === getSignUpRequests.fulfilled.type) {
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
        <Box>
          <ReverseButton ml='21px' width='149px' height='54px' onClick={handleDeleteMemberPopupClick}>거부</ReverseButton>
          <Popup type='danger' confirmLabel='거절' cancelLabel='닫기'
            onClose={handleDeleteMemberClose}
            onConfirm={handleDeleteMemberConfirm}
            show={deleteMemberPopupShow}>
            <Text fontSize='20px' lineHeight='25px'><Span fontWeight={700}>입부</Span>를 거절하시겠습니까?</Text>
          </Popup>
        </Box>
        <Box>
          <Button width='149px' height='54px' onClick={handleWSignUpPopupClick}>승인</Button>
          <Popup type='primary' confirmLabel='승인' cancelLabel='닫기'
            onClose={handleSignUpClose}
            onConfirm={handleSignUpConfirm}
            show={signUpPopupShow}>
            <Text fontSize='20px' lineHeight='25px'><Span fontWeight={700}>입부</Span>를 승인하시겠습니까?</Text>
          </Popup>
        </Box>
      </Box>
      <Box isFlex mt='33px' mb='50px' flexWrap='wrap'>
        {requests.length > 0 ? CardList : <Text width='100%' textAlign='center' fontWeight={400} fontSize='20px'>입부 신청이 없습니다.</Text>}
      </Box>
    </Box>
  );
};
