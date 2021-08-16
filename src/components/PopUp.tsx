import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import {color, typography, TypographyProps, layout, HeightProps, SpaceProps, WidthProps} from 'styled-system';
import {Box, Button} from '../components';
import {ModalPortal} from '../ModalPortal';

const AcceptButton = styled(Button)<{popupType: '입부' | '퇴부', Yes: boolean}>`
  background-color: ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};
  border: 2px solid ${({popupType}) => popupType === '입부' ? '#6D48E5' : '#FF6845'};

  :hover{
    filter: brightness(150%);
  }
  :focus {
    filter: brightness((100%));
  }
`;

const RejectButton = styled(Button)<{popupType: '입부' | '퇴부', No: boolean}>`
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

const BackgroundWrapper = styled.div<{Yes: boolean, No: boolean}>`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: ${({Yes, No}) => Yes||No ? 'none': 'flex'};
  align-items: center;
  justify-content: center;
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
  onYes?: (YesStatus: boolean) => void;
  onNo?: (NoStatus: boolean) => void;
}

export const PopUp = (Props: PopupProps) => {
  const {onYes, onNo, popupType, name} = Props;
  const [Yes, setYes] = useState(false);
  const [No, setNo] = useState(false);
  const handleYes = useCallback(() => {
    setYes(!Yes);
    if (onYes) {
      setYes(!Yes);
    }
  }, [Yes, setYes, onYes]);
  const handleNo = useCallback(() => {
    setNo(!No);
    if (onNo) {
      setNo(!No);
    }
  }, [No, setNo, onNo]);
  return (
    <ModalPortal>
      <BackgroundWrapper Yes={Yes} No={No}>
        <PopupWrapper popupType={popupType}>
          <Box isFlex flexDirection='column' alignItems='center'>
            <Box mt='71px' mb='53px'>
              <Text>{name}님의 <b>{popupType}</b>을 승인하시겠습니까?</Text>
            </Box>
            <Box isFlex width='344px' justifyContent='space-between'>
              <Box>
                <AcceptButton Yes={Yes} onClick={handleYes} width='auto' height='48px' px='36px' popupType={popupType}>{popupType}승인</AcceptButton>
              </Box>
              <Box>
                <RejectButton No={No} onClick={handleNo} width='auto' height='48px' px='36px' popupType={popupType}>{popupType}거부</RejectButton>
              </Box>
            </Box>
          </Box>
        </PopupWrapper>
      </BackgroundWrapper>
    </ModalPortal>
  );
};
