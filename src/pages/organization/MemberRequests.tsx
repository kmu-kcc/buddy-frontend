import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {color, typography, TypographyProps, layout, HeightProps, SpaceProps, WidthProps} from 'styled-system';
import {Box, Input, Button, MemberCard, Tab, Popup, Span} from '../../components';

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


export const MemberRequests: React.FC = () =>{
  const [Search, setSearch] = useState('');
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);

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

  const CardList = UserProfile.map((u) => {
    return {
      ...u,
      checked: false,
    };
  }).map((info, idx) => (
    <Box key={idx} mr='30px' mb='30px'>
      <MemberCard group='입부 신청' username={info.username} univnumber={info.univnumber} major={info.major} date={info.date} phone={info.phone} checked={check} onCheck={handleCheck} />
    </Box>
  ));

  return (
    <div>
      <Box isFlex flexDirection='column' width='100%' ml='67px'>
        <Box mt='60px' mb='58px' isFlex>
          <Text color='#454440;' fontSize={40}>조직관리</Text>
        </Box>
        <Box isFlex flexDirection='row-reverse' alignItems='end'>
          <Box mr='114px' ml='auto'>
            <Input height='59px' width='433px' value={Search} onChange={handleInputChange(setSearch)} placeholder='Search' />
          </Box>
          <Box isFlex flexDirection='column' >
            <Tab tabs={['동아리원 목록', '입부 신청내역', '퇴부 신청내역']} />
          </Box>
        </Box>
        <Box isFlex flexDirection='row-reverse' mt='36px'>
          <Box>
            <ReverseButton mr='114px' ml='21px' width='149px' height='54px' onClick={handleWithdrawalRequestPopupClick}>거부</ReverseButton>
            <Popup type='danger' onConfirm={handleWithdrawalConfirm} onCancel={handleWithdrawalCancel} confirmLabel='거절' cancelLabel='닫기' show={withdrawalPopupShow}>
              <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>입부</Span>를 거절하시겠습니까?</Text>
            </Popup>
          </Box>
          <Box>
            <Button width='149px' height='54px' onClick={handleWSignUpRequestPopupClick}>승인</Button>
            <Popup type='primary' onConfirm={handleSignUpConfirm} onCancel={handleSignUpCancel} confirmLabel='승인' cancelLabel='닫기' show={signUpPopupShow}>
              <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>입부</Span>를 승인하시겠습니까?</Text>
            </Popup>
          </Box>
        </Box>
        <Box isFlex mt='33px' mb='50px' flexWrap='wrap'>
          {CardList}
        </Box>
      </Box>
    </div>
  );
};
