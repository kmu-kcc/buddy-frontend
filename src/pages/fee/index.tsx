import React, {useCallback, useMemo, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {Box, Select, Tab, Button, Input, Text} from '../../components';
import {Router, Route} from '../../common/router';
import {Account} from './Account';
import {Members} from './Members';

const paths = ['/fee/account', '/fee/members'];
const menus = ['입출금내역 목록', '동아리원 목록'];

interface Props {
  children: JSX.Element;
}

const Container = ({children}: Props) => {
  const {user} = useSelector((state: RootState) => state.user);
  const history = useHistory();
  const location = useLocation();
  const [InputTextValue, setInputTextValue] = useState('');
  const tabs = useMemo(() => {
    if (user?.role?.fee_management) {
      return menus;
    } else {
      return [menus[0]];
    }
  }, [user]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
  const handleTabChange = useCallback((index: number) => {
    if (location.pathname !== paths[index]) {
      history.push(paths[index]);
    }
  }, [history, location]);

  return (
    <Box isFlex flexDirection='column' width='100%' px='60px'>
      <Text mt='60px' mb='58px' color='#454440' fontSize='40px' fontWeight={700} lineHeight='50px'>회계관리</Text>
      <Box isFlex alignItems='start'>
        <Tab tabs={tabs} onTabChange={handleTabChange} />
        <Box ml='auto' isFlex>
          <Input width='150px' onChange={handleInputChange} value={InputTextValue} placeholder='연도' />
          <Select width='150px' ml='20px' placeholder='학기'>
            <option>1학기</option>
            <option>2학기</option>
          </Select>
          <Button ml='20px'>조회</Button>
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
