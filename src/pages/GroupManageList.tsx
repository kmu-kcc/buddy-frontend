import React, {useState, useCallback} from 'react';
import {Box, SearchInput} from '../components';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 24px;
`;

const SelectLine = styled.div`
  width: 100%;
  height: 0px;
  background-color: #E5E5E5;
  border: 1px solid #E5E5E5;
`;

const GroupName = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 25px;
  width: 78px;
  height: 20px;
  background: #EFEBFC;
  border-radius: 10px;
  text-align: center;
  vertical-align:text-top;
`;

export const GroupManageList = () => {
  const [InputTextValue, setInputTextValue] = useState('');
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);

  return (
    <Wrapper>
      <Box isInlineBlock mb='48px' fontSize='40px' lineHeight='50px'>
        조직관리
      </Box>
      <SelectLine>
        입퇴부신청내역 동아리원목록
        <SearchInput onChange={handleInputChange} value={InputTextValue} placeholder='search' />
      </SelectLine>
      <Box mt='75px'>
        <GroupName>운영자</GroupName>
      </Box>
    </Wrapper>
  );
};
