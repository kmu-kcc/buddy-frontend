import React, {useCallback, useMemo, useState} from 'react';
import {toast} from 'react-toastify';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {setSemester, searchAccount, searchDeptors, searchPayers} from '../../store/actions/feeActions';
import {Box, Select, Tab, Button, Text} from '../../components';
import {Router, Route} from '../../common/router';
import {CommonMessage} from '../../common/wordings';
import {Account} from './Account';
import {Members} from './Members';

const paths = ['/fee/account', '/fee/members'];
const menus = ['입출금내역 목록', '동아리원 목록'];
const currentYear = new Date().getFullYear();
const years = Array<number>(currentYear - 2020).fill(0).map((y) => y + 2021);

interface Props {
  children: JSX.Element;
}

const Container = ({children}: Props) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state: RootState) => state.user);
  const {currentSemester} = useSelector((state: RootState) => state.fee);
  const history = useHistory();
  const location = useLocation();
  const [year, setCurrentYear] = useState(currentSemester.year);
  const [semester, setCurrentSemester] = useState(currentSemester.semester);
  const tabs = useMemo(() => {
    if (user?.role?.fee_management) {
      return menus;
    } else {
      return [menus[0]];
    }
  }, [user]);

  const handleTabChange = useCallback((index: number) => {
    if (location.pathname !== paths[index]) {
      history.push(paths[index]);
    }
  }, [history, location]);
  const handleSemesterSelect = useCallback((index: number, value: string) => {
    if (value === '1학기') {
      setCurrentSemester(1);
    } else {
      setCurrentSemester(2);
    }
  }, []);
  const handleYearSelect = useCallback((index: number, value: string) => {
    setCurrentYear(Number(value));
  }, []);

  const handleSemesterChangeClick = useCallback(async () => {
    dispatch(setSemester({
      year,
      semester,
    }));

    try {
      await Promise.all([
        dispatch(searchAccount({
          year,
          semester,
        })),
        dispatch(searchPayers({
          year,
          semester,
        })),
        dispatch(searchDeptors({
          year,
          semester,
        })),
      ]);
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, year, semester]);

  return (
    <Box isFlex flexDirection='column' width='100%' px='60px'>
      <Text mt='60px' mb='58px' color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>회계관리</Text>
      <Box isFlex alignItems='start'>
        <Tab tabs={tabs} onTabChange={handleTabChange} />
        <Box ml='auto' isFlex>
          <Select width='150px' placeholder='연도' initialSelection={year - 2021} onSelect={handleYearSelect}>
            {years.map((year) => <option key={year}>{year}</option>)}
          </Select>
          <Select width='150px' ml='20px' placeholder='학기' initialSelection={semester - 1} onSelect={handleSemesterSelect}>
            <option value='1'>1학기</option>
            <option value='2'>2학기</option>
          </Select>
          <Button ml='20px' onClick={handleSemesterChangeClick}>조회</Button>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export const Fee = () => (
  <Container>
    <Router authentication>
      <Route path='/fee/account' exact component={Account} />
      <Route path='/fee/members' exact role='fee_management' component={Members} />
    </Router>
  </Container>
);
