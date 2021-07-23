import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding: 60px;
    width: 590px;
    margin: 0 auto;

`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 460px;
  height: 40px;
  margin: 0 0 8;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;

`;

const Button = styled.div`
  display: block;
    width: 460px;
    height: 56px;
    line-height: 55px;
    margin: 16px 0 7px;
    border-radius: 0;
    border: solid 1px rgba(0,0,0,.1);
    box-shadow: 0 2px 6px 0 rgb(61 80 81 / 8%);
    background-color: #359bdb;
    color: #fff;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -.5px;
    cursor: pointer;
    text-align: center;
    -webkit-appearance: none;
`;

const Checkbox = styled.input`
  background-color: initial;
  cursor: default;
  appearance: auto;
  box-sizing: border-box;
  margin: 3px 3px 3px 4px;
  padding: initial;
  border: initial;
`;

const OtherElements = styled.div`
font-size: 14px;
line-height: 14px;
padding-top: 18px;
text-align: center;
color: #8e8e8e;
border-top: 1px solid #e4e4e5;
}
`;

export const LoginForm= () => {
  return (
    <Container>
      <form id="input" name="input" method="POST" action="http://서버">
        <Input id="id" name="id" type="int" placeholder="학번을 입력해주세요" />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
        <Button>로그인</Button>
      </form>
      <Checkbox type="checkbox" id="loginCheckBox"/>
      <label htmlFor="loginCheckBox">로그인 유지</label>
      <div>
        <OtherElements>
          <a id="pwinquiry" href="http://비밀번호찾기">비밀번호 찾기</a>
          <span>  |  </span>
          <a id="join" href="http://회원가입신청">회원가입 신청</a>
        </OtherElements>
      </div>
    </Container>
  );
};
