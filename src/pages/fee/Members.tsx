import React, {useState, useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchPayers} from '../../store/actions/feeActions';
import {Box, Input, Text, Span, Tab} from '../../components';
import {Filter, Search} from '../../components/icons';
import {CommonMessage, FeeMessage} from '../../common/wordings';
import {getCurrentSemester} from '../../utils/semester';

const GroupName = styled.span`
  font-size: 24px;
  line-height: 29px;
  font-weight: normal;
  color: #000000;
`;

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

const FilterText = styled(Text)`
  font-weight: normal;
  font-size: 20px;
  line-height: 25px;
  color: #8D8C85;
`;

const UnpaidMembersProfile = [
  {
    id: 1,
    username: '홍길동',
    univnumber: '20190155',
  },
  {
    id: 2,
    username: '홍길동',
    univnumber: '20190155',
  },
  {
    id: 3,
    username: '홍길동',
    univnumber: '20190155',
  },
];

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
  const {loadingPayers, payers} = useSelector((state: RootState) => state.fee);
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
  const empty = useMemo(() => InputTextValue === '', [InputTextValue]);

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

  useEffect(() => {
    fetchPayers();
  }, []);

  // const PaidMembers = PaidMembersProfile.map((info, idx) => (
  //   <Box border='1px solid #6D48E5' borderRadius='15px' key={idx}>
  //   </Box>
  // ));

  const UnpaidMembers = UnpaidMembersProfile.map((info, idx) => (
    <Box border='1px solid #FF6845' borderRadius='15px' key={idx}>
      <MemberCard username={info.username} univnumber={info.univnumber} />
    </Box>
  ));

  return (
    <Box width='100%' py='48px' px='60px'>
      <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>회계관리</Text>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
        <Tab tabs={['입출금내역 목록', '동아리원 목록']} />
        <Input empty={empty} logo={<Search mr='27px' width='24px' height='24px' color='#CBC8BE' />} onChange={handleInputChange} value={InputTextValue} placeholder='search' />
      </Box>
      <Box ml='7px' isFlex width='100%' height='30px' mt='64px' alignItems='baseline'>
        <Span color='#454440' fontSize='28px' lineHeight='34px' fontWeight={700}>3,200,000 원 /</Span>
        <Span ml='10px' color='rgba(69, 68, 64, 0.5)' fontSize='24px' lineHeight='29px'>4,000,000원</Span>
      </Box>
      <Box ml='-10px' mt='15px' isFlex width='100%' height='34px' borderRadius='73px' bg='#EFEBFC'>
        <Box isFlex width='940px' height='34px' bg='#6D48E5' borderRadius='73px' />
      </Box>
      <Box mt='62px' isFlex width='100%' flexDirection='column'>
        <Box isFlex alignItems='center'>
          <Text color='#000' fontSize='24px' lineHeight='29px'>납부자</Text>
          <Box isFlex ml='auto'>
            <Filter mb='8px' height='24px' color='#8D8C85' />
            <FilterText>필터</FilterText>
          </Box>
        </Box>
        <Box mt='30px' isFlex flexWrap='wrap' style={{gap: '20px'}}>
          {payers.length > 0 ? payers.map((payer) => <MemberCard key={payer.id} username={payer.name} univnumber={payer.id} />) : <Text width='100%' textAlign='center'>납부한 회원이 없습니다.</Text>}
        </Box>
      </Box>
      <Box isFlex width='100%' mt='64px' mb='28px' flexDirection='column'>
        <Box isBlock width='140px' height='30px' mt='64px' position='relative' mb='28px'>
          <GroupName>미납부자</GroupName>
        </Box>
        <Box isFlex flexWrap='wrap' style={{gap: '30px'}}>
          {UnpaidMembers}
        </Box>
      </Box>
    </Box>
  );
};
