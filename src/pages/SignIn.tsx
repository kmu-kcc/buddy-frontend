import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {color, ColorProps, space, SpaceProps} from 'styled-system';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootState, useDispatch} from '../store';
import {signInRequest} from '../store/actions/userActions';
import {Input, Button, Box, Check, Popup, Text} from '../components';
import {Buddy} from '../components/icons';

const LinkText = styled(Link)<SpaceProps & ColorProps>`
  text-decoration: none;
  ${space}
  ${color}
`;

LinkText.defaultProps = {
  color: '#363634',
};

const UrlText = styled(Text)`
  font-weight: 700;
  color: #000;
  `.withComponent('a');

export const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const {loadingSignIn} = useSelector((state: RootState) => state.user);

  const handleSignInClick = useCallback(async () => {
    if (loadingSignIn || !id || !password) {
      return;
    }

    try {
      const response = await dispatch(signInRequest({
        id, password,
      }));
      if (response.type === signInRequest.fulfilled.type) {
        //  signin success
        history.replace('/activity');
      } else {
        //  signin error
        console.log('signin failed');
      }
    } catch (err) {
      console.log(err);
    }
  }, [history, dispatch, loadingSignIn, id, password]);
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  const [idSaved, setIdSaved] = useState(false);
  const handleCheck = useCallback(() => {
    setIdSaved(!idSaved);
  }, [idSaved, setIdSaved]);
  const handleFIndAccountPopupClick = useCallback(() => {
    setWithdrawalPopupShow(true);
  }, []);
  const handleWithdrawalClose = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, []);

  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);
  return (
    <Box isFlex width='100%' justifyContent='center'>
      <Box isFlex width='338px' flexDirection='column' alignItems='center' pt='96px'>
        <Box isBlock mb='64px' >
          <Buddy width='70px' height='106px' color='#6D48E5' />
        </Box>
        <Input width='100%' height='63px' value={id} onChange={handleInputChange(setId)} placeholder='아이디' />
        <Input mt='20px' type='password' width='100%' height='63px' value={password} onChange={handleInputChange(setPassword)} placeholder='비밀번호' />
        <Button mt='65px' width='100%' height='70px' onClick={handleSignInClick}>로그인</Button>
        <Check mt='24px' mr='auto' boxShape='circle' size='20px' fontSize='16px' lineHeight='19px' onCheck={handleCheck} label='아이디 저장' checked={idSaved} />
        <Box isFlex mt='40px' width='100%'>
          <LinkText to='/signup' color='#6D48E5'>회원가입</LinkText>
          <LinkText to='#' ml='auto' onClick={handleFIndAccountPopupClick}>아이디/비밀번호 찾기</LinkText>
          <Popup type='danger' confirmLabel='확인' hideCancelButton cancelLabel='거절' show={withdrawalPopupShow}
            onConfirm={() => {}}
            onCancel={() => {}}
            onClose={handleWithdrawalClose}>
            <Box isFlex alignItems='center' flexDirection='column'>
              <Text fontSize='20px' lineHeight='25px' mb='12px'>
                문의주시면 도와드리겠습니다.
              </Text>
              <UrlText target='_blank' href='http://pf.kakao.com/_itxiaT'>오픈채팅 링크 바로가기</UrlText>
            </Box>
          </Popup>
        </Box>
      </Box>
    </Box>
  );
};
