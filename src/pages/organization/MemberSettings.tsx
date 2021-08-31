import React, {useCallback, useState, useMemo} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {updateMemberRequest} from '../../store/actions/userActions';
import {updateMemberRole} from '../../store/actions/memberActions';
import {Input, Select, Button, Box, Check, Text} from '../../components';
import {Attendance} from '../../models/User';
import {CommonMessage, MemberMessage, SettingsMessage} from '../../common/wordings';
import {attendances, colleges, grades} from '../../common/common_data.json';
import {isMaster} from '../../utils/env';

const FloatButton = styled(Button)`
  width: 220px;
  height: 72px;
  position: fixed;
  bottom: 35px;
  right: 50px;
  font-size: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

export const MemberSettings = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.user);
  const {currentMember, loading, loadingUpdateMemberRole} = useSelector((state: RootState) => state.member);
  const id = currentMember?.id ?? '';

  const [name, setName] = useState(currentMember?.name ?? '');
  const [college, setCollege] = useState(currentMember?.department.split(' ')[0] ?? '');
  const [major, setMajor] = useState(currentMember?.department.split(' ').slice(1).join(' ') ?? '');
  const [phoneNumber, setPhoneNumber] = useState(currentMember?.phone ?? '');
  const [email, setEmail] = useState(currentMember?.email ?? '');
  const [grade, setGrade] = useState(currentMember?.grade ?? 0);
  const [attendance, setAttendance] = useState<Attendance>(currentMember?.attendance ?? -1);
  const [isActivityManager, setActivityManager] = useState(currentMember?.role.activity_management ?? false);
  const [isFeeManager, setFeeManager] = useState(currentMember?.role.fee_management ?? false);
  const [isMemberManager, setMemberManager] = useState(currentMember?.role.member_management ?? false);
  const collegeIndex = useMemo(() => colleges.indexOf(college), [college]);

  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  const handleCheck = useCallback((setState: React.Dispatch<React.SetStateAction<boolean>>) => {
    return (checked: boolean) => setState(checked);
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

  const handleUpdateRoleClick = useCallback(async () => {
    if (loadingUpdateMemberRole) {
      toast.info(CommonMessage.loading);
      return;
    }

    try {
      const response = await dispatch(updateMemberRole({
        id,
        role: {
          activity_management: isActivityManager,
          fee_management: isFeeManager,
          member_management: isMemberManager,
        },
      }));

      if (response.type === updateMemberRole.fulfilled.type) {
        toast.success(MemberMessage.successUpdateRole);
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingUpdateMemberRole, id, isActivityManager, isFeeManager, isMemberManager]);
  const handleSubmit = useCallback(async () => {
    if (loading) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (attendance < 0 || !id || !college || !major || !email || !phoneNumber || !grade) {
      toast.warn(SettingsMessage.empty);
      return;
    }

    try {
      const response = await dispatch(updateMemberRequest({
        id,
        update: {
          attendance,
          department: `${college} ${major}`,
          email,
          grade,
          phone: phoneNumber,
        },
      }));
      if (response.type === updateMemberRequest.fulfilled.type) {
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
  }, [dispatch, history, loading, id, attendance, college, major, email, grade, phoneNumber]);

  return (
    <Box width='100%' pl='60px' pt='48px' pb='48px' position='relative'>
      <Text mt='20px' color='#454440' fontSize='24px' lineHeight='30px' fontWeight={700}>수정하기</Text>
      <Box width='100%' pl='4px' mt='28px'>
        {/* 이름 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>이름</Text>
          <Input value={name} onChange={handleInputChange(setName)} placeholder='이름' width='390px' height='63px' />
        </Box>
        {/* 전화번호 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>전화번호</Text>
          <Input value={phoneNumber} type='tel' onChange={handleInputChange(setPhoneNumber)} placeholder='01012345678' width='390px' height='63px' />
        </Box>
        {/* 이메일 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>이메일</Text>
          <Input value={email} type='email' onChange={handleInputChange(setEmail)} placeholder='abc@gmail.com' width='390px' height='63px' />
        </Box>
        {/* 대학 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>대학</Text>
          <Select placeholder='소속대학' width='390px' height='63px' initialSelection={collegeIndex} onSelect={handleCollegeSelect}>
            {colleges.map((college, i) => <option key={i}>{college}</option>)}
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
          <Input value={id} onChange={() => {}}
            placeholder='학번 (ID)' width='390px' height='63px' />
        </Box>
        {/* 학년 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>학년</Text>
          <Select placeholder='학년' width='390px' height='63px' initialSelection={grade} onSelect={handleGradeSelect}>
            {grades.map((grade) => <option key={grade}>{grade}</option>)}
          </Select>
        </Box>
        {/* 재학여부 */}
        <Box isFlex width='525px' mt='25px' alignItems='center'>
          <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>재학여부</Text>
          <Select placeholder='재학여부' width='390px' height='63px' initialSelection={attendance} onSelect={handleAttendanceSelect}>
            {attendances.map((attendance, i) => <option key={i}>{attendance}</option>)}
          </Select>
        </Box>
        {/* 권한 */}
        {isMaster(user) && (
          <Box isFlex width='525px' mt='25px' alignItems='center'>
            <Text flex={1} color='#454440' fontSize='20px' lineHeight='25px' fontWeight={700}>권한 설정</Text>
            <Box isFlex width='250px' flexDirection='column'>
              <Check boxShape='rectangle' size='16px' fontSize='20px' lineHeight='30px' label='회원 관리자' checked={isMemberManager} onCheck={handleCheck(setMemberManager)} />
              <Check my='14px' boxShape='rectangle' size='16px' fontSize='20px' lineHeight='30px' label='활동 관리자' checked={isActivityManager} onCheck={handleCheck(setActivityManager)} />
              <Check boxShape='rectangle' size='16px' fontSize='20px' lineHeight='30px' label='회계 관리자' checked={isFeeManager} onCheck={handleCheck((setFeeManager))} />
            </Box>
            <Button onClick={handleUpdateRoleClick}>저장</Button>
          </Box>
        )}
      </Box>
      <FloatButton width='220px' height='72px' onClick={handleSubmit}>저장하기</FloatButton>
    </Box>
  );
};
