import React, {useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
// import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {signUpRequest} from '../../store/actions/userActions';
import {getSignUpActivated} from '../../store/actions/memberActions';
import {Input, Select, Button, Box, Text, Loading} from '../../components';
import {Buddy} from '../../components/icons';
import {Attendance} from '../../models/User';
import {CommonMessage, SignUpMessage} from '../../common/wordings';
import {attendances, colleges, grades} from '../../common/common_data.json';

const NotAvailable = () => (
  <Box isFlex width='100%' pt='100px' pb='96px' justifyContent='center'>
    <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
      <Buddy mb='150px' width='248px' height='140px' mr='17px' />
      <Text fontSize='24px'>회원가입 기간이 아닙니다.</Text>
      <Button mt={['120px', '200px']} height='60px' fontSize='20px' onClick={() => window.location.href = '/'}>메인으로 가기</Button>
    </Box>
  </Box>
);

export const SignUp = () => {
  const dispatch = useDispatch();
  const {loadingSignUp} = useSelector((state: RootState) => state.user);
  const {signUpActivated, loadingSignUpActivated} = useSelector((state: RootState) => state.member);

  const history = useHistory();
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [attendance, setAttendance] = useState<Attendance>(-1);

  const fetchSignUpActivated = useCallback(async () => {
    if (loadingSignUpActivated) {
      return;
    }

    try {
      await dispatch(getSignUpActivated());
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loadingSignUpActivated]);

  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  const handleCollegeSelect = useCallback((index: number, value: string) => {
    setCollege(value);
  }, []);
  const handleAttendanceSelect = useCallback((index: number, value: string) => {
    let attendance: Attendance | null;
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
  const handleGradeSelect = useCallback((index: number, value: string) => {
    setGrade(index + 1);
  }, []);
  const handleSignUpClick = useCallback(async () => {
    if (loadingSignUp) {
      toast.info(CommonMessage.loading);
      return;
    }

    if (!name || !college || !major || !phoneNumber || !email || !studentNumber || !grade || (attendance < 0)) {
      toast.warn(SignUpMessage.empty);
      return;
    }

    try {
      const response = await dispatch(signUpRequest({
        email,
        phone: phoneNumber,
        grade,
        name,
        id: studentNumber,
        department: `${college} ${major}`,
        attendance,
      }));
      if (response.type === signUpRequest.fulfilled.type) {
        //  TODO show finish page
        history.push('/auth/signup/complete');
      } else {
        toast.error(response.payload as unknown as string);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, history, loadingSignUp, name, college, major, grade, phoneNumber, email, studentNumber, attendance]);

  useEffect(() => {
    fetchSignUpActivated();
  //  eslint-disable-next-line
  }, []);


  if (loadingSignUpActivated) {
    return <Loading />;
  }

  return signUpActivated ? (
    <Box isFlex width='100%' pt='100px' pb='96px' justifyContent='center'>
      <Box isFlex flexDirection='column' justifyContent='center' alignItems='center' px={['16px', 0]}>
        <Box mb='100px' cursor='pointer' onClick={() => history.push('/')}>
          <Buddy width='248px' height='140px' />
        </Box>
        <Box isFlex flexDirection={['column', 'row']}>
          <Box>
            <Input width='390px' height='63px' value={studentNumber} onChange={handleInputChange(setStudentNumber)} placeholder='학번 (ID)' />
            <Text ml='19px' mt={['12px', '26px']} color='#6D48E5' fontWeight={300}>영어와 숫자만 8~9자</Text>
          </Box>
          <Box ml={[0, '174px']} mt={['26px', 0]}>
            <Input width='390px' height='63px' value={email} onChange={handleInputChange(setEmail)} type='email' placeholder='이메일' />
          </Box>
        </Box>
        <Box isFlex mt='26px' flexDirection={['column', 'row']}>
          <Box>
            <Input width='390px' height='63px' value={name} onChange={handleInputChange(setName)} placeholder='이름' />
            <Text ml='19px' mt={['12px', '26px']} color='#6D48E5' fontWeight={300}>한글만, 최대 10자</Text>
          </Box>
          <Box ml={[0, '174px']} mt={['26px', 0]}>
            <Input width='390px' height='63px' value={phoneNumber} onChange={handleInputChange(setPhoneNumber)} type='tel' placeholder='전화번호' />
            <Text ml='19px' mt={['12px', '26px']} color='#6D48E5' fontWeight={300}>예) 01012345678</Text>
          </Box>
        </Box>
        <Box isFlex mt='26px' flexDirection={['column', 'row']}>
          <Box>
            <Select placeholder='소속대학' width='390px' height='63px' onSelect={handleCollegeSelect}>
              {colleges.map((college, i) => <option key={i}>{college}</option>)}
            </Select>
          </Box>
          <Box mt={['26px', 0]} ml={[0, '174px']}>
            <Input width='390px' height='63px' value={major} onChange={handleInputChange(setMajor)} placeholder='소속학과' />
            <Text ml='19px' mt={['12px', '26px']} color='#6D48E5' fontWeight={300}>한글만, 최대 15자</Text>
          </Box>
        </Box>
        <Box isFlex mt='26px' flexDirection={['column', 'row']}>
          <Box isFlex height='63px'>
            <Select placeholder='재학여부' width='390px' height='63px' onSelect={handleAttendanceSelect}>
              {attendances.map((attendance, i) => <option key={i}>{attendance}</option>)}
            </Select>
          </Box>
          <Box mt={['26px', 0]} ml={[0, '174px']}>
            <Select placeholder='학년' width='390px' height='63px' onSelect={handleGradeSelect}>
              {grades.map((grade) => <option key={grade}>{grade}</option>)}
            </Select>
          </Box>
        </Box>
        <Box isFlex mt={['24px', '71px']} height='20px'></Box>
        <Button mt='30px' width='388px' height='70px' onClick={handleSignUpClick}>회원가입</Button>
      </Box>
    </Box>
  ) : <NotAvailable />;
};
