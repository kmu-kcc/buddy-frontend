import React, {useCallback, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {updateMeRequest} from '../../store/actions/userActions';
import {Input, Select, Button, Box, Text} from '../../components';
import {Attendance} from '../../models/User';
import {CommonMessage, SettingsMessage} from '../../common/wordings';

const FloatButton = styled(Button)`
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const Settings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {user, loading} = useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState('');
  const [studentNumber, setStudentNumber] = useState(user?.id ?? '');
  const [college, setCollege] = useState(user?.department.split(' ')[0] ?? '');
  const [major, setMajor] = useState(user?.department.split(' ').slice(1).join(' ') ?? '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [grade, setGrade] = useState(user?.grade ?? 0);
  const [attendance, setAttendance] = useState(user?.attendance ?? -1);

  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  const handleCollegeSelect = useCallback((index: number, value: string) => {
    setCollege(value);
  }, []);
  const handleGradeSelect = useCallback((index: number) => {
    setGrade(index + 1);
  }, []);
  const handleAttendanceSelect = useCallback((index: number, value: string) => {
    let attendance: Attendance;
    if (value === '재학') {
      attendance = Attendance.ATTENDING;
    } else if (value === '휴학') {
      attendance = Attendance.LEAVE_OF_ABSENCE;
    } else if (value === '졸업') {
      attendance = Attendance.GRADUATED;
    } else {
      attendance = -1;
    }
    setAttendance(attendance);
  }, []);
  const handleSubmit = useCallback(async () => {
    if (loading) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (attendance < 0 || !studentNumber || !college || !major || !email || !phoneNumber || !grade || !password) {
      toast.warn(SettingsMessage.empty);
      return;
    }

    try {
      const response = await dispatch(updateMeRequest({
        id: studentNumber,
        update: {
          attendance,
          department: `${college} ${major}`,
          email,
          grade,
          password,
          phone: phoneNumber,
        },
      }));
      if (response.type === updateMeRequest.fulfilled.type) {
        toast.success(SettingsMessage.updateSuccess);
        history.replace('/organization/members');
      } else {
        toast.error(response.payload as unknown as string);
      }
      //  go back to user profile page
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, history, loading, studentNumber, attendance, college, major, email, grade, password, phoneNumber]);

  return (
    <Box width='100%' pl='60px' pt='48px' pb='48px' position='relative'>
      <Text mt='20px' color='#454440' fontSize='24px' lineHeight='30px' fontWeight={700}>수정하기</Text>
      <Box width='100%' pl='4px' mt='28px'>
        {/* 이름 */}
        <Box isFlex width='525px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학번 : {studentNumber}</Text>
        </Box>
        {/* 비밀번호 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>비밀번호</Text>
          <Input value={password} type='password' onChange={handleInputChange(setPassword)} placeholder='변경하기'
            width='390px' height='63px' />
        </Box>
        {/* 전화번호 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>전화번호</Text>
          <Input value={phoneNumber} type='tel' onChange={handleInputChange(setPhoneNumber)}
            placeholder='01012345678' width='390px' height='63px' />
        </Box>
        {/* 이메일 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>이메일</Text>
          <Input value={email} type='email' onChange={handleInputChange(setEmail)} placeholder='abc@gmail.com'
            width='390px' height='63px' />
        </Box>
        {/* 대학 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>대학</Text>
          <Select placeholder='소속대학' width='390px' height='63px' onSelect={handleCollegeSelect}>
            <option>글로벌인문지역대학</option>
            <option>사회과학대학</option>
            <option>법과대학</option>
            <option>경상대학</option>
            <option>경영대학</option>
            <option>창의공과대학</option>
            <option>과학기술대학</option>
            <option>예술대학</option>
            <option>체육대학</option>
            <option>조형대학</option>
            <option>소프트웨어융합대학</option>
            <option>건축대학</option>
            <option>자동차융합대학</option>
          </Select>
        </Box>
        {/* 학과 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학과</Text>
          <Input value={major} onChange={handleInputChange(setMajor)} placeholder='소속학과'
            width='390px' height='63px' />
        </Box>
        {/* 학번 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학번</Text>
          <Input value={studentNumber} onChange={handleInputChange(setStudentNumber)}
            placeholder='학번 (ID)' width='390px' height='63px' />
        </Box>
        {/* 학년 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학년</Text>
          <Select placeholder='학년' width='390px' height='63px' onSelect={handleGradeSelect}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </Select>
        </Box>
        {/* 재학여부 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>재학여부</Text>
          <Select placeholder='재학여부' width='390px' height='63px' onSelect={handleAttendanceSelect}>
            <option>재학</option>
            <option>휴학</option>
            <option>졸업</option>
            <option>기타</option>
          </Select>
        </Box>
      </Box>
      <FloatButton width='220px' height='72px' onClick={handleSubmit}>저장하기</FloatButton>
    </Box>
  );
};
