import React, {useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {format} from 'date-fns';
import {RootState} from '../../store';
import {Text, Button, Box, Textarea} from '../../components';
import {ActivityMessage} from '../../common/wordings';

const FloatButton = styled(Button)`
  width: 245px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const UnderBar = styled.div`
  box-sizing: border-box;
  max-width: 1147px;
  height: 0px;
  margin-top: 20px;
  margin-bottom: 47px;
  border: 1px solid #939393;
`;

const ACTIVITY_TYPE_STRING = ['창립제', '스터디', '기타'];

export const Detail = () => {
  const history = useHistory();
  const {currentActivity} = useSelector((state: RootState) => state.activity);
  const type = useMemo(() => {
    const activityType = currentActivity?.type ?? -1;
    if (activityType < 0 || activityType > 2) {
      return '';
    } else {
      return ACTIVITY_TYPE_STRING[activityType];
    }
  }, [currentActivity?.type]);
  const participants = useMemo(() => currentActivity?.participants.join(', ') || '없음', [currentActivity?.participants]);
  const date = useMemo(() => {
    return `${format(Number(currentActivity?.start ?? 0), 'yyyy년 M월 dd일')}~${format(Number(currentActivity?.end ?? 0), 'yyyy년 M월 dd일')}`;
  }, [currentActivity]);
  const handleEditClick = useCallback(() => {
    history.push('/activity/edit');
  }, [history]);

  useEffect(() => {
    if (!currentActivity) {
      toast.error(ActivityMessage.invalid);
      history.replace('/activity');
    }
  }, [history, currentActivity]);

  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동관리</Text>
      </Box>
      <Box isFlex justifyContent='space-between' pt='60px' maxWidth='1147px'>
        <Text color='#454440' fontWeight={700} fontSize='20px' lineHeight='24px'>{currentActivity?.title}</Text>
        <Text color='#9E9E9E' fontSize='14px' lineHeight='17px' pl='44px'>{date}</Text>
      </Box>
      <Box isFlex mt='20px'>
        <Text color='#AAAAAA' fontSize='16px' lineHeight='20px'>분류</Text>
        <Text color='#454440' fontSize='16px' lineHeight='20px' pl='44px'>{type}</Text>
      </Box>
      <Box isFlex pt='7px'>
        <Text color='#AAAAAA' fontSize='16px' lineHeight='20px' >참여자</Text>
        <Text color='#454440' fontSize='16px' lineHeight='20px' pl='29px'>{participants}</Text>
      </Box>
      <UnderBar />
      <Textarea value={currentActivity?.description ?? ''} backgroundColor='#F8F8F8' width='1147px' height='838px' disabled />
      <FloatButton onClick={handleEditClick}>새로운 활동 추가</FloatButton>
    </Box>
  );
};
