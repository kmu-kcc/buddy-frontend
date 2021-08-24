import React, {useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {background, BackgroundProps} from 'styled-system';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchMember} from '../../store/actions/memberActions';
import {Box, Button, Text} from '../../components';
import {CommonMessage, MemberMessage} from '../../common/wordings';

const CardLine = styled.div`
  box-sizing: border-box;
  width: calc(100% - 68px);
  height: 1px;
  background-color: #E5E5E5;
  margin-top: 8px;
`;

const GroupNameShadow = styled.div<BackgroundProps>`
  position: absolute;
  width: 100%;
  height: 20px;
  ${background}
  border-radius: 10px;
  top:10px;
`;

const GroupName = styled.span`
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const EllipsisText = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

interface MemberCardProps {
  username?: string;
  univnumber?: string;
  major?: string;
  date?: string;
  group?: string;
}

const MemberCard = (MemberCardProps: MemberCardProps) => {
  const {group, username, univnumber, major, date} = MemberCardProps;
  return (
    <Box maxWidth='300px' isFlex flexDirection='column' pt='44px' pb='34px' alignItems='center'>
      <Box isFlex width='100%' alignItems='baseline' px='34px'>
        <Text flex={1} fontWeight={700} fontSize='18px' lineHeight='22px'>{group}</Text>
        <Text color='#CBC8BE;'>{date}</Text>
      </Box>
      <CardLine />
      <Box isFlex mt='28px' px='44px' flexDirection='column'>
        <Box isFlex>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>이름</Text>
          <EllipsisText ml='62px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{username}</EllipsisText>
        </Box>
        <Box isFlex mt='24px'>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>학번</Text>
          <EllipsisText ml='62px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{univnumber}</EllipsisText>
        </Box>
        <Box isFlex mt='24px'>
          <Text color='#8D8C85' fontWeight={500} fontSize='16px' lineHeight='20px'>학과</Text>
          <EllipsisText ml='62px' flex={1} fontWeight={500} fontSize='16px' lineHeight='20px'>{major}</EllipsisText>
        </Box>
        <Button mt='30px' py='0' width='100%' height='40px' fontSize='14px' lineHeight='18px'>더 보기</Button>
      </Box>
    </Box>
  );
};

export const Members = () => {
  const dispatch = useDispatch();
  const {members} = useSelector((state: RootState) => state.member);
  const adminUsers = useMemo(() => members.filter((member) => {
    const role = member.role;
    return role?.activity_management || role?.fee_management || role?.member_management;
  }), [members]);
  const normalUsers = useMemo(() => members.filter((member) => {
    const role = member.role;
    return role?.activity_management && role.fee_management && role.member_management;
  }), [members]);

  const CardListAdmin = adminUsers.map((info, idx) => (
    <Box border='2px solid #6D48E5' borderRadius='37px' key={idx}>
      <MemberCard group='운영자' username={info.name} univnumber={info.id} major={info.department.slice(1)} date={'info.date'} />
    </Box>
  ));
  const CardListMember = normalUsers.map((info, idx) => (
    <Box border='2px solid #FFD646' borderRadius='37px' key={idx}>
      <MemberCard group='동아리원' username={info.name} univnumber={info.id} major={info.department.slice(1)} date={'info.date'} />
    </Box>
  ));

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(searchMember({
          keyword: '',
        }));
        if (response.type === searchMember.fulfilled.type) {
          toast.success(MemberMessage.success);
        } else {
          toast.error(response.payload);
        }
      } catch (err) {
        console.log(err);
        toast(CommonMessage.error);
      }
    })();
  }, [dispatch]);

  return (
    <Box>
      <Box isBlock width='80px' height='30px' mt='64px' position='relative' mb='28px'>
        <GroupName>운영자</GroupName>
        <GroupNameShadow background='#EFEBFC' />
      </Box>
      <Box isFlex flexWrap='wrap' style={{gap: '30px'}}>
        {adminUsers.length > 0 ? CardListAdmin : <Text width='100%' textAlign='center' fontWeight={400} fontSize='20px'>회원이 없습니다.</Text>}
      </Box>
      <Box width='80px' height='30px' mt='62px' position='relative' mb='28px'>
        <GroupName>동아리원</GroupName>
        <GroupNameShadow background='#FFF5D1' />
      </Box>
      <Box isFlex flexWrap='wrap' style={{gap: '30px'}}>
        {normalUsers.length > 0 ? CardListMember : <Text width='100%' textAlign='center' fontWeight={400} fontSize='20px'>회원이 없습니다.</Text>}
      </Box>
    </Box>
  );
};
