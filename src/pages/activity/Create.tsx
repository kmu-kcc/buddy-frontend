import React, {useState, useCallback, useMemo} from 'react';
import {captureException} from '@sentry/react';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {createActivity} from '../../store/actions/activityActions';
import {Text, Button, Box, Input, Textarea, Select, Span, ToggleSwitch} from '../../components';
import {CommonMessage, ActivityMessage} from '../../common/wordings';
import {ActivityType} from '../../models/Activity';
import {convertToSec} from '../../utils/time';

const FloatButton = styled(Button)`
  width: 245px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {loadingCreate} = useSelector((state: RootState) => state.activity);
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ActivityType>(-1);
  const [privateActivity, setPrivate] = useState(true);

  const start = useMemo(() => convertToSec(new Date(startDate).getTime()).toString(), [startDate]);
  const end = useMemo(() => convertToSec(new Date(endDate).getTime()).toString(), [endDate]);

  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setState(event.target.value);
    };
  }, []);
  const handleActivityTypeSelect = useCallback((index: number, value: string) => {
    let type: ActivityType;
    if (value === '창립제') {
      type = ActivityType.FOUNDING_FESTIVAL;
    } else if (value === '스터디') {
      type = ActivityType.STUDY;
    } else if (value === '기타') {
      type = ActivityType.ETC;
    } else {
      type = -1;
    }
    setType(type);
  }, []);
  const handleToggleClick = useCallback((toggled: boolean) => {
    setPrivate(toggled);
  }, []);

  const handleSubmitClick = useCallback(async () => {
    if (loadingCreate) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (type < 0 || !place || start === 'NaN' || end === 'NaN' || !title || !description) {
      toast.warn(ActivityMessage.empty);
      return;
    }

    try {
      const response = await dispatch(createActivity({
        type,
        start,
        end,
        title,
        description,
        place,
        participants: [],
        private: privateActivity,
      }));

      if (response.type === createActivity.fulfilled.type) {
        toast.success(ActivityMessage.successCreate);
        history.replace('/activity');
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      captureException(err);
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, history, loadingCreate, type, place, privateActivity, start, end, title, description]);

  return (
    <Box width='100%' py='48px' px='60px'>
      <Box isFlex width='100%' mt='32px' alignItems='flex-end' justifyContent='space-between'>
        <Text color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>활동추가</Text>
      </Box>
      <Box isFlex mt='56px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>비공개</Text>
        <ToggleSwitch ml='75px' onToggleClick={handleToggleClick} />
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>활동 제목</Text>
        <Input onChange={handleInputChange(setTitle)} value={title} ml='49px' width='1036px' height='64px' />
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>장소</Text>
        <Input onChange={handleInputChange(setPlace)} value={place} ml='91px' width='1036px' height='64px' />
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>할동 종류</Text>
        <Select ml='49px' width='200px' height='64px' placeholder='활동 종류 선택' onSelect={handleActivityTypeSelect}>
          <option>창립제</option>
          <option>스터디</option>
          <option>기타</option>
        </Select>
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>기간</Text>
        <Input onChange={handleInputChange(setStartDate)} value={startDate} width='208px' height='64px' ml='91px' placeholder='YYYY-MM-DD' />
        <Span mx='20px' fontSize='20px' lineHeight='24px'> ~ </Span>
        <Input onChange={handleInputChange(setEndDate)} value={endDate} width='208px' height='64px' placeholder='YYYY-MM-DD' />
      </Box>
      <Box isFlex mt='30px' alignItems='center'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>참여자</Text>
        <Button ml='72px'>이름 검색 및 추가</Button>
      </Box>
      <Box isFlex flexDirection='column' mt='60px'>
        <Text fontSize='20px' color='#454440' lineHeight='24px'>본문 <Span fontSize='16px'>(Markdown 형식으로 작성)</Span></Text>
        <Textarea onChange={handleInputChange(setDescription)} value={description} backgroundColor='#F8F8F8' width='1168px' height='838px' mt='20px' />
      </Box>
      <FloatButton onClick={handleSubmitClick}>생성</FloatButton>
    </Box>
  );
};
