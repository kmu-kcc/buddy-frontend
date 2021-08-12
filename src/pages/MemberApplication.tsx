import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import {Box, MemberCard, Input, Button} from '../components';
import {color, typography, TypographyProps, layout} from 'styled-system';

const ReverseButton = styled(Button)`

`;

const Text = styled.span<TypographyProps>`
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
      <Box mt='60px' mb='58px' isFlex>
        <Text color='#454440;' fontSize={40}>조직관리</Text>
      </Box>
      <Box isFlex>
        <Box>
          <Text color='#B8B6B0;' fontSize={25}>입/퇴부 신청내역</Text>
        </Box>
        <Box ml='639px'>
          <Input value={Search} onChange={handleInputChange(setSearch)}></Input>
        </Box>
      </Box>
      <Box>
        <Button>승인</Button>
        <ReverseButton>거부</ReverseButton>
      </Box>
      <Box isFlex >
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </Box>
    </div>
  );
};
