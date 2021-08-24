import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components';
import {color, typography, TypographyProps, layout, HeightProps, SpaceProps, WidthProps} from 'styled-system';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {getSignUpRequests, getWithdrawalRequests} from '../../store/actions/memberActions';
import {Box, Button, MemberCard, Popup, Span} from '../../components';
import {CommonMessage, MemberRequestsMessage} from '../../common/wordings';

const ReverseButton = styled(Button)`
  background: #FF6845;
  border: 2px solid #FF6845;
`;

const Text = styled.span<TypographyProps & HeightProps & SpaceProps & WidthProps>`
  ${color}
  ${typography}
  ${layout}
  font-weight: bold;
  line-height: 50px;
`;

const UserProfile = [
  {
    id: 1,
    username: 'seonilKim',
    univnumber: '20171379',
    major: 'eletric engineering',
    date: '2021.08.04',
    phone: '010-1234-1234',
  },
  {
    id: 2,
    username: 'hello',
    univnumber: '20171380',
    major: 'computer engineering',
    date: '2021.08.11',
    phone: '010-1234-1234',
  },
  {
    id: 3,
    username: 'hellowolrd',
    univnumber: '20128191',
    major: 'computer science',
    date: '2021.08.13',
    phone: '010-1234-1234',
  },
  {
    id: 4,
    username: 'juheong',
    univnumber: '20128191',
    major: 'computer science',
    date: '2021.08.13',
    phone: '010-1234-1234',
  },
  {
    id: 5,
    username: 'soyang',
    univnumber: '20180092',
    major: 'economic',
    date: '2021.08.13',
    phone: '010-1234-1234',
  },
];

export const SignUpRequests = () => {
  const dispatch = useDispatch();
  const {signUpRequests} = useSelector((state: RootState) => state.member);
  const [check, setCheck] = useState(false);
  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check, setCheck]);

  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);
  const [signUpPopupShow, setSignUpPopupShow] = useState(false);
  const handleWSignUpRequestPopupClick = useCallback(() => {
    setSignUpPopupShow(true);
  }, [setSignUpPopupShow]);
  const handleWithdrawalRequestPopupClick = useCallback(() => {
    setWithdrawalPopupShow(true);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalConfirm = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalCancel = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, [setWithdrawalPopupShow]);
  const handleSignUpConfirm = useCallback(() => {
    setSignUpPopupShow(false);
  }, [setSignUpPopupShow]);
  const handleSignUpCancel = useCallback(() => {
    setSignUpPopupShow(false);
  }, [setSignUpPopupShow]);
  const handleSignUpClose = useCallback(() => {
    setSignUpPopupShow(false);
  }, []);
  const handleWithdrawalClose = useCallback(() => {
    setWithdrawalPopupShow(false);
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
        if (response.type === getWithdrawalRequests.fulfilled.type) {
          toast.success(MemberRequestsMessage.loadingSuccess);
        } else {
          toast.error(response.payload);
        }
      } catch (err) {
        console.log(err);
        toast.error(CommonMessage.error);
      }
    })();
  }, [dispatch]);

  return (
    <Box>
      <Box isFlex flexDirection='row-reverse' mt='36px'>
        <Box>
          <ReverseButton mr='114px' ml='21px' width='149px' height='54px' onClick={handleWithdrawalRequestPopupClick}>거부</ReverseButton>
          <Popup type='danger' onClose={handleSignUpClose} onConfirm={handleWithdrawalConfirm} onCancel={handleWithdrawalCancel} confirmLabel='거절' cancelLabel='닫기' show={withdrawalPopupShow}>
            <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>입부</Span>를 거절하시겠습니까?</Text>
          </Popup>
        </Box>
        <Box>
          <Button width='149px' height='54px' onClick={handleWSignUpRequestPopupClick}>승인</Button>
          <Popup type='primary' onClose={handleWithdrawalClose} onConfirm={handleSignUpConfirm} onCancel={handleSignUpCancel} confirmLabel='승인' cancelLabel='닫기' show={signUpPopupShow}>
            <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>입부</Span>를 승인하시겠습니까?</Text>
          </Popup>
        </Box>
      </Box>
      <Box isFlex mt='33px' mb='50px' flexWrap='wrap'>
        {CardList}
      </Box>
    </Box>
  );
};

export const WithdrawRequests = () => {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check, setCheck]);

  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);
  const [signUpPopupShow, setSignUpPopupShow] = useState(false);
  const handleWSignUpRequestPopupClick = useCallback(() => {
    setSignUpPopupShow(true);
  }, [setSignUpPopupShow]);
  const handleWithdrawalRequestPopupClick = useCallback(() => {
    setWithdrawalPopupShow(true);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalConfirm = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, [setWithdrawalPopupShow]);
  const handleWithdrawalCancel = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, [setWithdrawalPopupShow]);
  const handleSignUpConfirm = useCallback(() => {
    setSignUpPopupShow(false);
  }, [setSignUpPopupShow]);
  const handleSignUpCancel = useCallback(() => {
    setSignUpPopupShow(false);
  }, [setSignUpPopupShow]);
  const handleSignUpClose = useCallback(() => {
    setSignUpPopupShow(false);
  }, []);
  const handleWithdrawalClose = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, []);

  const CardList = UserProfile.map((u) => {
    return {
      ...u,
      checked: false,
    };
  }).map((info, idx) => (
    <Box key={idx} mr='30px' mb='30px'>
      <MemberCard group='퇴부 신청' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date} phone={info.phone} onCheck={handleCheck}>
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
        console.log(err);
        toast.error(CommonMessage.error);
      }
    })();
  }, [dispatch]);

  return (
    <Box>
      <Box isFlex flexDirection='row-reverse' mt='36px'>
        <Box>
          <ReverseButton mr='114px' ml='21px' width='149px' height='54px' onClick={handleWithdrawalRequestPopupClick}>거부</ReverseButton>
          <Popup type='danger' onClose={handleSignUpClose} onConfirm={handleWithdrawalConfirm} onCancel={handleWithdrawalCancel} confirmLabel='거절' cancelLabel='닫기' show={withdrawalPopupShow}>
            <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>퇴부</Span>를 거절하시겠습니까?</Text>
          </Popup>
        </Box>
        <Box>
          <Button width='149px' height='54px' onClick={handleWSignUpRequestPopupClick}>승인</Button>
          <Popup type='primary' onClose={handleWithdrawalClose} onConfirm={handleSignUpConfirm} onCancel={handleSignUpCancel} confirmLabel='승인' cancelLabel='닫기' show={signUpPopupShow}>
            <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>퇴부</Span>를 승인하시겠습니까?</Text>
          </Popup>
        </Box>
      </Box>
      <Box isFlex mt='33px' mb='50px' flexWrap='wrap'>
        {CardList}
      </Box>
    </Box>
  );
};
