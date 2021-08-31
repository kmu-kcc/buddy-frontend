import React, {useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {Button, Box, Text} from '../../components';
import {Attendance} from '../../models/User';
import {getMeRequest} from '../../store/actions/userActions';
import {getCredentialInfo} from '../../common/credentials';

const Key = styled.span`
  float: left;
  font-size: 20px;
  line-height: 25px;
  color: #FFFFFF;
`;

const Value = styled.span`
  font-size: 16px;
`;

const FloatButton = styled(Button)`
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {user, loading} = useSelector((state: RootState) => state.user);
  const college = useMemo(() => user?.department.split(' ')[0], [user?.department]);
  const major = useMemo(() => user?.department.split(' ').slice(1).join(' '), [user?.department]);
  const attendance = useMemo(() => {
    const attendance = user?.attendance;
    if (attendance === Attendance.ATTENDING) {
      return '재학';
    } else if (attendance === Attendance.LEAVE_OF_ABSENCE) {
      return '휴학';
    } else if (attendance === Attendance.GRADUATED) {
      return '졸업';
    }
  }, [user?.attendance]);

  const handleClick = useCallback(() => {
    history.push('/user/settings');
  }, [history]);

  useEffect(() => {
    if (user || loading) {
      return;
    }

    const info = getCredentialInfo();

    if (!info) {
      history.push('/auth/signin');
      return;
    }

    dispatch(getMeRequest(info));
  }, [dispatch, history, user, loading]);

  return (
    <Box width='100%' pl='60px' pt='48px' pb='48px' position='relative'>
      <Text mb='48px' fontSize='40px' fontWeight={700} lineHeight='50px' color='#454440'>마이페이지</Text>
      {/* 이름 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTopLeftRadius='16px'>
          <Key>이름</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5' borderTopRightRadius='16px'>
          <Value>{user?.name}</Value>
        </Box>
      </Box>
      {/* 전화번호 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>전화번호</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>{user?.phone}</Value>
        </Box>
      </Box>
      {/* 이메일 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>이메일</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>{user?.email}</Value>
        </Box>
      </Box>
      {/* 대학 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>대학</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>{college}</Value>
        </Box>
      </Box>
      {/* 학과 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>학과</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>{major}</Value>
        </Box>
      </Box>
      {/* 학번 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>학번</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>{user?.id}</Value>
        </Box>
      </Box>
      {/* 학년 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff'>
          <Key>학년</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5'>
          <Value>{user?.grade}학년</Value>
        </Box>
      </Box>
      {/* 재학여부 */}
      <Box isFlex>
        <Box isFlex width='152px' height='68px' alignItems='center' justifyContent='center'
          bg='#6D48E5' borderTop='1px solid #fff' borderBottomLeftRadius='16px'>
          <Key>재학여부</Key>
        </Box>
        <Box isFlex width='262px' height='68px' alignItems='center' justifyContent='center'
          border='1px solid #6D48E5' borderBottomRightRadius='16px'>
          <Value>{attendance}</Value>
        </Box>
      </Box>
      <FloatButton onClick={handleClick}>수정하기</FloatButton>
    </Box>
  );
};
