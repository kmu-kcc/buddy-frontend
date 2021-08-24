import React, {useCallback, useState} from 'react';
import {Route, useHistory} from 'react-router-dom';
import {Box, Text, Input, Tab} from '../../components';
import {Search} from '../../components/icons';
import {Members} from './Members';
import {Router} from '../../utils/router';
import {SignUpRequests, WithdrawRequests} from './MemberRequests';

const paths = ['/organization/members', '/organization/members/request/signup', '/organization/members/request/withdraw'];

interface Props {
  children: JSX.Element;
}

const Container = ({children}: Props) => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);
  const handleTabChange = useCallback((index: number) => {
    if (history.location.pathname !== paths[index]) {
      history.push(paths[index]);
    }
  }, [history]);

  return (
    <Box isFlex flexDirection='column' width='100%' pl='67px'>
      <Box mt='60px' mb='58px' isFlex>
        <Text color='#454440;' fontSize='40px' fontWeight={700}>조직관리</Text>
      </Box>
      <Box isFlex flexDirection='row-reverse' alignItems='end'>
        <Box mr='114px' ml='auto'>
          <Input logo={<Search mr='27px' width='24px' height='24px' color='#CBC8BE' />} height='59px' width='433px' value={search} onChange={handleSearchChange} placeholder='Search' />
        </Box>
        <Box isFlex flexDirection='column' >
          <Tab tabs={['동아리원 목록', '입부 신청내역', '퇴부 신청내역']} onTabChange={handleTabChange} />
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export const Organization = () => (
  <Container>
    <Router>
      <Route path='/organization/members' exact component={Members} />
      <Route path='/organization/members/request' exact component={SignUpRequests} />
      <Route path='/organization/members/withdraw' exact component={WithdrawRequests} />
    </Router>
  </Container>
);
