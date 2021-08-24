import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
// import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../store';
import {signUpRequest} from '../store/actions/userActions';
import {Input, Select, Button, Box} from '../components';
import {Buddy} from '../components/icons';
import {Attendance} from '../models/User';

const Text = styled.p`
  margin-left: 19px;
  color: #6D48E5;
  font-size: 16px;
  font-weight: 300;
  line-height: 20px;
  white-space: nowrap;
`;

export const SignUp = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const {loadingSignUp} = useSelector((state: RootState) => state.user);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [attendance, setAttendance] = useState<Attendance | null>(null);

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
      attendance = null;
    }
    setAttendance(attendance);
  }, []);
  const handleGradeSelect = useCallback((index: number, value: string) => {
    setGrade(index + 1);
  }, []);
  const handleSignUpClick = useCallback(async () => {
    if (loadingSignUp) {
      return;
    }

    if (!name || !college || !major || !phoneNumber || !email || !studentNumber || !grade || !attendance) {
      console.log('invalid form value');
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
      console.log('signup request finish', response.type);
      //  TODO show finish page
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, loadingSignUp, name, college, major, grade, phoneNumber, email, studentNumber, attendance]);

  return (
    <Box isFlex width='100%' pt='100px' pb='96px' justifyContent='center'>
      <Box isFlex flexDirection='column' justifyContent='center' alignItems='center'>
        <Box>
          <Buddy mb='100px' width='248px' height='140px' />
        </Box>
        <Box isFlex>
          <Box>
            <Input width='390px' height='63px' value={studentNumber} onChange={handleInputChange(setStudentNumber)} placeholder='학번 (ID)' />
            <Text>영어와 숫자만 8~9자</Text>
          </Box>
          <Box ml='174px'>
            <Input width='390px' height='63px' value={email} onChange={handleInputChange(setEmail)} type='email' placeholder='이메일' />
          </Box>
        </Box>
        <Box isFlex>
          <Box width='390px'>
            <Input width='390px' height='63px' value={password} onChange={handleInputChange(setPassword)} type='password' placeholder='비밀번호' />
            <Text>영어 대문자, 숫자, 특수문자 각 1개 이상 혼용, 전체 8글자 이상</Text>
          </Box>
          <Box ml='174px'>
            <Input width='390px' height='63px' value={passwordCheck} onChange={handleInputChange(setPasswordCheck)} type='password' placeholder='비밀번호 확인' />
          </Box>
        </Box>
        <Box isFlex>
          <Box>
            <Input width='390px' height='63px' value={name} onChange={handleInputChange(setName)} placeholder='이름' />
            <Text>한글만, 최대 10자</Text>
          </Box>
          <Box ml='174px'>
            <Input width='390px' height='63px' value={phoneNumber} onChange={handleInputChange(setPhoneNumber)} type='tel' placeholder='전화번호' />
            <Text>예) 01012345678</Text>
          </Box>
        </Box>
        <Box isFlex>
          <Box>
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
          <Box ml='174px'>
            <Input width='390px' height='63px' value={major} onChange={handleInputChange(setMajor)} placeholder='소속학과' />
            <Text>한글만, 최대 15자</Text>
          </Box>
        </Box>
        <Box isFlex>
          <Box isFlex height='63px'>
            <Select placeholder='재학여부' width='390px' height='63px' onSelect={handleAttendanceSelect}>
              <option>재학</option>
              <option>휴학</option>
              <option>졸업</option>
              <option>기타</option>
            </Select>
          </Box>
          <Box ml='174px'>
            <Select placeholder='학년' width='390px' height='63px' onSelect={handleGradeSelect}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </Select>
          </Box>
        </Box>
        <Box isFlex mt='71px' height='20px'>
          <Text></Text>
        </Box>
        <Button mt='30px' width='388px' height='70px' onClick={handleSignUpClick}>회원가입</Button>
      </Box>
    </Box>
  );
};
