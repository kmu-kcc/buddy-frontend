import React, {useState, useCallback, useEffect, useMemo} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {format} from 'date-fns';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {setCurrentActivity, searchActivity} from '../../store/actions/activityActions';
import {Text, Button, Box, Input} from '../../components';
import {Buddy, Search} from '../../components/icons';
import {CommonMessage} from '../../common/wordings';
import {Activity, ActivityType} from '../../models/Activity';

const FloatButton = styled(Button)`
  width: 245px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const ActivityCardWrapper = styled(Box)`
  background-color: #F8F8F8;
  border-radius: 15px;
`;

type CardProps = Activity;

const ActivityCard = (props: CardProps) => {
  const dispatch = useDispatch();
  const {title, start} = props;
  const history = useHistory();
  const handleClick = useCallback(() => {
    dispatch(setCurrentActivity({
      ...props,
    }));
    history.push('/activity/detail');
  }, [dispatch, history, props]);

  return (
    <Box isFlex flexDirection='column' mr='30px' onClick={handleClick} cursor='pointer'>
      <ActivityCardWrapper isFlex justifyContent='center' width='226px' height='147px'>
        <Buddy width='38px' height='56px' mt='46px' />
      </ActivityCardWrapper>
      <Text fontSize='18px' lineHeight='22px' color='#454440' pt='20px'>{title}</Text>
      <Text fontSize='14px' lineHeight='18px' color='#9E9E9E' pt='5px'>{format(Number(start), 'yyyy년 MM월 dd일')}</Text>
    </Box>
  );
};

export const List = () => {
  const dispatch = useDispatch();
  const {loading, activities} = useSelector((state: RootState) => state.activity);

  const foundingActivities = useMemo(() => activities.filter((activity) => activity.type === ActivityType.FOUNDING_FESTIVAL), [activities]);
  const studyActivities = useMemo(() => activities.filter((activity) => activity.type === ActivityType.STUDY), [activities]);
  const etcActivities = useMemo(() => activities.filter((activity) => activity.type === ActivityType.ETC), [activities]);

  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);

    if (loading) {
      return;
    }

    try {
      const response = await dispatch(searchActivity({
        keyword: event.target.value,
      }));

      if (response.type === searchActivity.fulfilled.type) {
        return;
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loading]);
  const history = useHistory();
  const handleClick = useCallback(() => {
    history.push('/activity/create');
  }, [history]);

  useEffect(() => {
    (async () => {
      try {
        const response = await dispatch(searchActivity({
          keyword: '',
        }));

        if (response.type === searchActivity.fulfilled.type) {
          return;
        } else {
          toast.error(response.payload);
        }
      } catch (err) {
        console.log(err);
        toast.error(CommonMessage.error);
      }
    })();
  }, [dispatch]);

  const FoundAnniversary = studyActivities.map((info, idx) => (
    <Box key={idx}>
      <ActivityCard {...info} />
    </Box>
  ));
  const Study = foundingActivities.map((info, idx) => (
    <Box key={idx}>
      <ActivityCard {...info} />
    </Box>
  ));
  const EtCetera = etcActivities.map((info, idx) => (
    <Box key={idx}>
      <ActivityCard {...info} />
    </Box>
  ));

  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' justifyContent='space-between'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동관리</Text>
        <Input onChange={handleInputChange} value={InputTextValue}
          logo={<Search ml='27px' width='24px' height='24px' color='#CBC8BE' />}
          placeholder='Search' />
      </Box>
      <Text fontSize='24px' lineHeight='29px' color='#454440' pt='60px' pb='20px'>스터디</Text>
      <Box isFlex>
        {FoundAnniversary}
      </Box>
      <Text fontSize='24px' lineHeight='29px' color='#454440' pt='30px' pb='20px'>창립제</Text>
      <Box isFlex>
        {Study}
      </Box>
      <Text fontSize='24px' lineHeight='29px' color='#454440' pt='30px' pb='20px'>기타</Text>
      <Box isFlex>
        {EtCetera}
      </Box>
      <FloatButton onClick={handleClick}>새로운 활동 추가</FloatButton>
    </Box>
  );
};
