import React, {useCallback, useMemo, useState} from 'react';
import {Route, useHistory, useLocation} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../../store';
import {searchMember} from '../../store/actions/memberActions';
import {Box, Text, Input, Tab} from '../../components';
import {Search} from '../../components/icons';
import {Members} from './Members';
import {Router} from '../../utils/router';
import {SignUpRequests} from './SignUpReqeusts';
import {WithdrawRequests} from './WIthdrawRequests';
import {CommonMessage} from '../../common/wordings';

const paths = ['/organization/members', '/organization/members/request/signup', '/organization/members/request/withdraw'];

interface Props {
  children: JSX.Element;
}

const Container = ({children}: Props) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state: RootState) => state.member);

  const history = useHistory();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const searchInputShow = useMemo(() => location.pathname === '/organization/members', [location]);
  const handleSearchChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    if (loading) {
      return;
    }

    try {
      const response = await dispatch(searchMember({
        keyword: event.target.value,
      }));
      if (response.type === searchMember.fulfilled.type) {
        return;
      } else {
        toast.error(response.payload);
      }
    } catch (err) {
      console.log(err);
      toast.error(CommonMessage.error);
    }
  }, [dispatch, loading]);
  const handleTabChange = useCallback((index: number) => {
    if (location.pathname !== paths[index]) {
      history.push(paths[index]);
    }
  }, [history, location]);

  return (
    <Box isFlex flexDirection='column' width='100%' px='60px'>
      <Text mt='60px' mb='58px' color='#454440;' fontSize='40px' fontWeight={700}>조직관리</Text>
      <Box isFlex alignItems='start'>
        <Tab tabs={['동아리원 목록', '입부 신청내역', '퇴부 신청내역']} onTabChange={handleTabChange} />
        {searchInputShow && <Input ml='auto' height='59px' width='433px' value={search}
          logo={<Search mr='27px' width='24px' height='24px' color='#CBC8BE' />}
          onChange={handleSearchChange} placeholder='Search' />}
      </Box>
      {children}
    </Box>
  );
};

export const Organization = () => (
  <Container>
    <Router>
      <Route path='/organization/members' exact component={Members} />
      <Route path='/organization/members/request/signup' exact component={SignUpRequests} />
      <Route path='/organization/members/request/withdraw' exact component={WithdrawRequests} />
    </Router>
  </Container>
);
