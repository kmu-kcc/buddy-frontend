import React, {useCallback, useState, useMemo} from 'react';
import styled from 'styled-components';
import {toast} from 'react-toastify';
import {Button, Box, Check, Span, Tab, Text, Textarea, ToggleSwitch, Input, Popup, Select, TransactionList} from '../components';
import {Arrow, Check as CheckIcon, Buddy, Filter, Search, Activity, Organization, Fee, Profile, Exit} from '../components/icons';

const StateLabel = styled.span<{active: boolean;}>`
  padding: 2px 6px;
  color: ${({active}) => active ? '#fff' : '#000'};
  ${({active}) => active ? 'background-color: #3399cc;' : ''}
  border: 1px solid #3399cc;
`;

export const Test = () => {
  const [error, setError] = useState(false);
  const [count, setCount] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [inputTextValue, setInputTextValue] = useState('');
  const [check, setCheck] = useState(false);
  const [secondCheck, setSecondCheck] = useState(false);
  const [selected, setSelected] = useState('none');
  const [isToggle, setToggle] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [withdrawalPopupShow, setWithdrawalPopupShow] = useState(false);
  const [signUpPopupShow, setSignUpPopupShow] = useState(false);

  //  button callbacks
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count, setCount]);
  const handleErrorClick = useCallback(() => {
    console.log('error button clicked');
    setError(true);
  }, [setError]);
  //  toggle and input callbacks
  const handleToggleChange = useCallback((toggle: boolean) => {
    setToggle(toggle);
    console.log(`current toggle state: ${isToggle} change toggle state: ${toggle}`);
  }, [isToggle, setToggle]);
  const handleTextareaChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  }, [setTextValue]);
  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value);
  }, [setInputTextValue]);
  //  check callbacks
  const handleCheck = useCallback(() => {
    setCheck(!check);
  }, [check, setCheck]);
  const handleSecondCheck = useCallback(() => {
    setSecondCheck(!secondCheck);
  }, [secondCheck, setSecondCheck]);
  //  select callbacks
  const handleSelect = useCallback((index: number, value: string) => {
    setSelected(value);
  }, [setSelected]);
  //  popup trigger button callback
  const handleWSignUpRequestPopupClick = useCallback(() => {
    setSignUpPopupShow(true);
  }, []);
  const handleWithdrawalRequestPopupClick = useCallback(() => {
    setWithdrawalPopupShow(true);
  }, []);
  //  popup callbacks
  const handleWithdrawalConfirm = useCallback(() => {
    // setWithdrawalPopupShow(false);
  }, []);
  const handleWithdrawalCancel = useCallback(() => {
    // setWithdrawalPopupShow(false);
  }, []);
  const handleWithdrawalClose = useCallback(() => {
    setWithdrawalPopupShow(false);
  }, []);
  const handleSignUpConfirm = useCallback(() => {
    // setSignUpPopupShow(false);
  }, []);
  const handleSignUpCancel = useCallback(() => {
    // setSignUpPopupShow(false);
  }, []);
  const handleSignUpClose = useCallback(() => {
    setSignUpPopupShow(false);
  }, []);
  //  tab callbacks
  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const tabs = useMemo(() => ['Tab 1', 'Tab 2', 'Tab 3'], []);
  const env = useMemo(() => process.env.REACT_APP_ENV, []);

  if (error) {
    throw new Error();
  }

  return (
    <Box width='100%' p='16px 24px'>
      <Text>
        deployed channel&nbsp;&nbsp;
        <StateLabel active={env === 'localhost'}>localhost</StateLabel>
        <StateLabel active={env === 'development'}>development</StateLabel>
        <StateLabel active={env === 'production'}>production</StateLabel>
      </Text>
      <Box>
        <h2>Box</h2>
        <Box mb='4px' isFlex alignItems='center' justifyContent='center' color='#000' bg='#eee'>
          Basic Flex Box
        </Box>
        <Box isInlineBlock bg='#aaa' p='4px'>
          Basic Inline Box 1
        </Box>
        <Box ml='4px' isInlineBlock bg='#aacccc' p='4px'>
          Basic Inline Box 2
        </Box>
        <Box ml='4px' isInlineBlock bg='#3399cc' p='4px' color='#fff'>
          Basic Inline Box 3
        </Box>
      </Box>
      <Box>
        <h2>Button</h2>
        <Button mr='8px' onClick={() => toast('Sample Toast')}>Button 1</Button>
        <Button mr='8px' onClick={handleClick}>{count} time clicked</Button>
        <Button onClick={handleErrorClick}>Click to occur error</Button>
      </Box>
      <Box>
        <h2>Check</h2>
        <Check mr='16px' boxShape='rectangle' size='14px' fontSize='16px' label='check' checked={check} onCheck={handleCheck} />
        <Check boxShape='circle' size='14px' fontSize='14px' fontWeight={500} color='#00f' label='adding' checked={secondCheck} onCheck={handleSecondCheck} />
      </Box>
      <Box>
        <h2>Textarea</h2>
        <Textarea onChange={handleTextareaChange} mr='8px' value={textValue} placeholder='Textarea 1' />
        <Textarea value='' placeholder='error textarea' error />
      </Box>
      <Box>
        <h2>Input</h2>
        <Input onChange={handleInputChange} mr='8px' value={inputTextValue} placeholder='Input 1' />
        <Input value='' placeholder='error input' error />
      </Box>
      <Box>
        <h2>Select</h2>
        <Select width='200px' placeholder='Select 1' onSelect={handleSelect}>
          <option>Selection 1</option>
          <option>Selection 2</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
          <option>Selection 3</option>
        </Select>
        <Select ml='4px' width='200px' placeholder='Long Long Long Select 2'>
          <option>Selection 1</option>
          <option>Selection 2</option>
        </Select>
        <Select ml='4px' width='200px' placeholder='Select 3' initialSelection={2}>
          <option>Selection 1</option>
          <option>Selection 2</option>
          <option>Selection 3</option>
        </Select>
        <Box>
          <Text>Select 1 selected value is <Span color='#f00'>{selected}</Span></Text>
        </Box>
      </Box>
      <Box>
        <h2>Toggle</h2>
        <ToggleSwitch onToggleClick={handleToggleChange} />
        <ToggleSwitch ml='4px' onToggleClick={handleToggleChange} />
      </Box>
      <Box>
        <h2>Icon</h2>
        <Box>
          <Box isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Arrow mb='8px' color='#000' />
            <Span>Arrow (1.5x)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <CheckIcon mb='8px' color='#000' />
            <Span>Check (3x)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Buddy mb='8px' width='30px' height='30px' color='#000' />
            <Span>Buddy Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Filter mb='8px' width='30px' height='30px' color='#000' />
            <Span>Filter Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Search mb='8px' width='30px' height='30px' color='#000' />
            <Span>Search Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Activity mb='8px' width='30px' height='30px' color='#000' />
            <Span>Activity Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Fee mb='8px' width='30px' height='30px' color='#000' />
            <Span>Fee Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Organization mb='8px' width='30px' height='30px' color='#000' />
            <Span>Organization Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Profile mb='8px' width='30px' height='30px' color='#000' />
            <Span>Profile Icon (30x30)</Span>
          </Box>
          <Box ml='4px' isInlineFlex minWidth='100px' height='80px' flexDirection='column' alignItems='center'>
            <Exit mb='8px' width='30px' height='30px' color='#000' />
            <Span>Exit Icon (30x30)</Span>
          </Box>
        </Box>
      </Box>
      <Box>
        <h2>PopUp</h2>
        <Box isFlex>
          <Box>
            <Button onClick={handleWSignUpRequestPopupClick}>Click to open popup</Button>
            <Popup width='700px' height='1000px' type='primary' confirmLabel='승인' cancelLabel='거절' show={signUpPopupShow}
              onConfirm={handleSignUpConfirm}
              onCancel={handleSignUpCancel}
              onClose={handleSignUpClose}>
              <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>입부</Span>를 승인하시겠습니까?</Text>
            </Popup>
          </Box>
          <Box ml='20px'>
            <Button onClick={handleWithdrawalRequestPopupClick}>Click to open popup</Button>
            <Popup type='danger' confirmLabel='승인' hideCancelButton cancelLabel='거절' show={withdrawalPopupShow}
              onConfirm={handleWithdrawalConfirm}
              onCancel={handleWithdrawalCancel}
              onClose={handleWithdrawalClose}>
              <Text fontSize='20px' lineHeight='25px'>홍길동님의 <Span fontWeight={700}>퇴부</Span>를 승인하시겠습니까?</Text>
            </Popup>
          </Box>
        </Box>
      </Box>
      <Box>
        <h2>Tab</h2>
        <Box>
          <Tab tabs={tabs} initialTab={1} onTabChange={handleTabChange} />
          <Text mt='12px'>current active tab is index <Span color='#f00'>{activeTab}</Span></Text>
        </Box>
      </Box>
      <Box>
        <h2>TransactionList</h2>
        <TransactionList></TransactionList>
      </Box>
    </Box>
  );
};
