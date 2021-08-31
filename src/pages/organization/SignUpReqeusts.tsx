import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {
  getSignUpRequests, approveSignUp, deleteMember,
  changeCheckedInSignUpRequests, getSignUpActivated, activateSignUp,
} from '../../store/actions/memberActions';
import {Box, Button, MemberCard, Popup, Text, ToggleSwitch, Span} from '../../components';
import {CommonMessage, MemberMessage, MemberRequestsMessage} from '../../common/wordings';
import {User} from '../../models/User';
import {convertToMillis} from '../../utils/time';

const ReverseButton = styled(Button)`
  background: #FF6845;
  border: 2px solid #FF6845;
`;

export const SignUpRequests = () => {
  const dispatch = useDispatch();
  const {signUpRequests, signUpActivated, loadingDeleteMemberRequests, loadingSignUpApproveRequests, loadingActivateSignUp} = useSelector((state: RootState) => state.member);
  const [signUpPopupShow, setSignUpPopupShow] = useState(false);
  const [deleteMemberPopupShow, setDeleteMemberPopupShow] = useState(false);

  const fetchSignUpRequest = useCallback(async () => {
    try {
      const response = await dispatch(getSignUpRequests());
      if (response.type === getSignUpRequests.fulfilled.type) {
        toast.success(MemberRequestsMessage.loadingSuccess);
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch]);

  const fetchSignUpActivated = useCallback(async () => {
    try {
      await dispatch(getSignUpActivated());
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch]);

  const handleCheck = useCallback((index: number) => () => {
    dispatch(changeCheckedInSignUpRequests({
      index,
      checked: !(signUpRequests as User[])[index].checked,
    }));
  }, [dispatch, signUpRequests]);
  const handleDeleteMemberPopupClick = useCallback(() => setDeleteMemberPopupShow(true), []);
  const handleDeleteMemberConfirm = useCallback(async () => {
    if (loadingDeleteMemberRequests) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(deleteMember({
        ids: signUpRequests?.filter((req) => req.checked).map((req) => req.id) ?? [],
      }));
      if (response.type === deleteMember.fulfilled.type) {
        toast.success(MemberRequestsMessage.deleteSuccess);
        fetchSignUpRequest();
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, fetchSignUpRequest, loadingDeleteMemberRequests, signUpRequests]);
  const handleDeleteMemberClose = useCallback(() => setDeleteMemberPopupShow(false), []);
  const handleWSignUpPopupClick = useCallback(() => setSignUpPopupShow(true), []);
  const handleSignUpConfirm = useCallback(async () => {
    if (loadingSignUpApproveRequests) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(approveSignUp({
        ids: signUpRequests?.filter((req) => req.checked).map((req) => req.id) ?? [],
      }));
      if (response.type === approveSignUp.fulfilled.type) {
        toast.success(MemberRequestsMessage.approveSuccess);
        fetchSignUpRequest();
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingSignUpApproveRequests, signUpRequests, fetchSignUpRequest]);
  const handleSignUpClose = useCallback(() => setSignUpPopupShow(false), []);
  const handleSignUpActiveChange = useCallback(async (toggled: boolean) => {
    if (loadingActivateSignUp) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(activateSignUp({
        activate: toggled,
      }));

      if (response.type !== activateSignUp.fulfilled.type) {
        toast.error(MemberMessage.errorActivateSignUp);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingActivateSignUp]);

  useEffect(() => {
    fetchSignUpRequest();
    fetchSignUpActivated();
  }, [fetchSignUpRequest, fetchSignUpActivated]);

  return (
    <Box>
      <Box isFlex mt='36px' alignItems='center'>
        <Text fontSize='18px' lineHeight='22px'>회원가입 활성화</Text>
        <ToggleSwitch ml='16px' active={signUpActivated} onToggleClick={handleSignUpActiveChange} />
        <Button ml='auto' width='149px' height='54px' onClick={handleWSignUpPopupClick}>승인</Button>
        <ReverseButton ml='21px' width='149px' height='54px' onClick={handleDeleteMemberPopupClick}>거부</ReverseButton>
      </Box>
      <Box isFlex mt='33px' mb='50px' flexWrap='wrap'>
        {(signUpRequests?.length ?? 0) > 0 ? signUpRequests?.map((info, idx) => (
          <Box key={idx} mr='30px' mb='30px'>
            <MemberCard group='입부 신청'
              username={info.name}
              univnumber={info.id}
              major={info.department.split(' ').slice(1).join(' ')}
              phone={info.phone}
              date={convertToMillis(info.created_at)}
              checked={info.checked}
              onClick={handleCheck(idx)} />
          </Box>
        )) : <Text width='100%' textAlign='center' fontWeight={400} fontSize='20px'>입부 신청이 없습니다.</Text>}
      </Box>
      <Popup type='danger' confirmLabel='거절' cancelLabel='닫기'
        onClose={handleDeleteMemberClose}
        onConfirm={handleDeleteMemberConfirm}
        show={deleteMemberPopupShow}>
        <Text fontSize='20px' lineHeight='25px'><Span fontWeight={700}>입부</Span>를 거절하시겠습니까?</Text>
      </Popup>
      <Popup type='primary' confirmLabel='승인' cancelLabel='닫기'
        onClose={handleSignUpClose}
        onConfirm={handleSignUpConfirm}
        show={signUpPopupShow}>
        <Text fontSize='20px' lineHeight='25px'><Span fontWeight={700}>입부</Span>를 승인하시겠습니까?</Text>
      </Popup>
    </Box>
  );
};
