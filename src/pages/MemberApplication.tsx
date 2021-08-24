import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Box, MemberCard, Input, Button} from '../components';
import {color, typography, TypographyProps, layout, HeightProps, SpaceProps, WidthProps} from 'styled-system';

const ReverseButton = styled(Button)`
  background: #FF6845;
  border: 2px solid #FF6845;
`;

const UnderBar = styled.div`
  border: 1px solid #E5E5E5;
  width:  383px;
`;

const Text = styled.span<TypographyProps & HeightProps & SpaceProps & WidthProps>`
  ${color}
  ${typography}
  ${layout}
  font-weight: bold;
  line-height: 50px;
`;

export const MemberApplication: React.FC = () =>{
  const [Search, setSearch] = useState('');
  const handleInputChange = useCallback((setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setState(event.target.value);
    };
  }, []);
  return (
    <div>
      <Box isFlex flexDirection='column' width='100%' ml='67px'>
        <Box mt='60px' mb='58px' isFlex>
          <Text color='#454440;' fontSize={40}>조직관리</Text>
        </Box>
        <Box isFlex flexDirection='row-reverse'>
          <Box mr='114px' ml='auto'>
            <Input height='59px' width='433px' value={Search} onChange={handleInputChange(setSearch)} placeholder='Search' />
          </Box>
          <Box isFlex width='500px' height='48px'>
            <Text width='500px' height='48px' color='#B8B6B0;' fontSize={20}>입 / 퇴부 신청내역</Text>
          </Box>
        </Box>
        <UnderBar />
        <Box isFlex flexDirection='row-reverse' mt='36px'>
          <ReverseButton mr='114px' ml='21px' width='149px' height='54px'>거부</ReverseButton>
          <Button width='149px' height='54px'>승인</Button>
        </Box>
        <Box isFlex mt='33px' mb='50px' flexWrap='wrap' maxWidth='1302px'>
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
          <MemberCard />
        </Box>
      </Box>
    </div>
  );
};
