import React from 'react';
import styled from 'styled-components';
import {color, typography, TypographyProps, layout, HeightProps, SpaceProps, WidthProps} from 'styled-system';
import {Box, Button} from '../components';

const AcceptButton = styled(Button)<{popupType: '입부' | '퇴부'}>`
  background-color: ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};
  border: 2px solid ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};

  :hover{
    filter: brightness(150%);
  }
  :focus {
    filter: brightness((100%));
  }
`;

const RejectButton = styled(Button)<{popupType: '입부' | '퇴부'}>`
  background-color: ${({popupType}) => popupType === '입부' ? '#EFEBFC' : '#FFEEEA'};
  border: 2px solid ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};
  color: ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};

  :hover {
    filter: brightness(90%);
  }
  :focus {
    filter: brightness((100%));
  }
`;

const Text = styled.span<TypographyProps & HeightProps & SpaceProps & WidthProps>`
  ${color}
  ${typography}
  ${layout}
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;

`;

const PopupWrapper = styled.div<{popupType: '입부' | '퇴부'}>`
  width: 500px;
  height: 256px;
  background-color: #ffffff;
  border: 1px solid #6D48E5;
  border-radius: 15px;
  border-color: ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};
`;

interface PopupProps {
  popupType: '입부' | '퇴부';
  name: string;
}

export const PopUp = (Props: PopupProps) => {
  const {popupType, name} = Props;
  return (
    <div>
      <PopupWrapper popupType={popupType}>
        <Box isFlex flexDirection='column' alignItems='center'>
          <Box mt='71px' mb='53px'>
            <Text>{name}님의 <b>{popupType}</b>을 승인하시겠습니까?</Text>
          </Box>
          <Box isFlex width='344px' justifyContent='space-between'>
            <Box>
              <AcceptButton width='auto' height='48px' px='36px' popupType={popupType}>{popupType}승인</AcceptButton>
            </Box>
            <Box>
              <RejectButton width='auto' height='48px' px='36px' popupType={popupType}>{popupType}거부</RejectButton>
            </Box>
          </Box>
        </Box>
      </PopupWrapper>
    </div>
  );
};
