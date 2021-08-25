import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {setCurrentActivity, searchActivity} from '../../store/actions/activityActions';
import {Text, Button, Box, SearchInput} from '../../components';
import {Buddy} from '../../components/icons';
import {CommonMessage} from '../../common/wordings';
import {Activity} from '../../models/Activity';

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

const Dummy: Activity[] = [
  {
    id: '610d458b79e122ea1d150cd6',
    title: 'it is long night',
    start: '1628249722',
    end: '1628249722',
    place: '성곡도서관 2층 스터디룸',
    type: 1,
    private: true,
    description: '2021년 2차 알고리즘 스터디',
    participants: [],
  },
  {
    id: '610d458b79e122ea1d150888',
    title: 'really long night',
    start: '1628249722',
    end: '1628249722',
    place: '성곡도서관 2층 스터디룸',
    type: 1,
    private: true,
    description: '2021년 2차 로아 스터디',
    participants: [],
  },
  {
    id: '610d458b79e122ea1d150777',
    title: 'very long night',
    start: '1628249722',
    end: '1628249722',
    place: '성곡도서관 2층 스터디룸',
    type: 1,
    private: true,
    description: '2021년 2차 ㅠㅠ 스터디',
    participants: [],
  },
];

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
      <Text fontSize='14px' lineHeight='18px' color='#9E9E9E' pt='5px'>{start}</Text>
    </Box>
  );
};

export const List = () => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state: RootState) => state.activity);

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

  const FoundAnniversary = Dummy.map((info, idx) => (
    <Box key={idx}>
      <ActivityCard {...info} />
    </Box>
  ));
  const Study = Dummy.map((info, idx) => (
    <Box key={idx}>
      <ActivityCard {...info} />
    </Box>
  ));
  const EtCetera = Dummy.map((info, idx) => (
    <Box key={idx}>
      <ActivityCard {...info} />
    </Box>
  ));

  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' justifyContent='space-between'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동관리</Text>
        <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
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
