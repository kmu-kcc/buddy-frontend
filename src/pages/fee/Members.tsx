import React, {useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchPayers, searchDeptors} from '../../store/actions/feeActions';
import {Box, Text, Span} from '../../components';
import {Filter} from '../../components/icons';
import {CommonMessage, FeeMessage} from '../../common/wordings';
import {getCurrentSemester} from '../../utils/semester';

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
  const {loadingPayers, loadingDeptors, payers, deptors} = useSelector((state: RootState) => state.fee);
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
        ...getCurrentSemester(),
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
  }, [dispatch, loadingPayers]);
  const fetchDeptors = useCallback(async () => {
    if (loadingDeptors) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(searchDeptors({
        ...getCurrentSemester(),
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
  }, [dispatch, loadingDeptors]);

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
    <Box>
      <Box ml='7px' isFlex width='100%' height='30px' mt='64px' alignItems='baseline'>
        <Span color='#454440' fontSize='28px' lineHeight='34px' fontWeight={700}>{payers.length}명 /</Span>
        <Span ml='10px' color='rgba(69, 68, 64, 0.5)' fontSize='24px' lineHeight='29px'>{totalUserCount}명</Span>
      </Box>
      <Box ml='-10px' mt='15px' isFlex width='100%' height='34px' borderRadius='73px' bg='#EFEBFC'>
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
    </Box>
  );
};
