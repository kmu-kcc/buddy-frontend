import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {Box, Button, ModalPortal} from '.';

type PopupType = 'primary' | 'danger';

const BackgroundWrapper = styled(Box)`
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PopupWrapper = styled(Box)<{type: PopupType}>`
  width: 500px;
  height: 256px;
  padding: 60px 80px;
  background-color: #fff;
  border: 1px solid ${({type}) => type === 'primary' ? '#6D48E5' : '#FF6845'};
  border-radius: 15px;
`;

const ConfirmButton = styled(Button)<{type: PopupType}>`
  border: 2px solid ${({type}) => type === 'primary' ? '#6D48E5' : '#FF6845'};
  background-color: ${({type}) => type === 'primary' ? '#6D48E5' : '#FF6845'};
`;

const RejectButton = styled(Button)<{type: PopupType}>`
  color: ${({type}) => type === 'primary' ? '#6D48E5' : '#FF6845'};
  background-color: ${({type}) => type === 'primary' ? '#EFEBFC' : '#FFEEEA'};
  border: 2px solid ${({type}) => type === 'primary' ? '#6D48E5' : '#FF6845'};
  :hover, :focus {
    color: #fff;
    background-color: ${({type}) => type === 'primary' ? '#6D48E5' : '#FF6845'};
  }
`;

interface PopupProps {
  children: JSX.Element | JSX.Element[];
  show: boolean;
  type: PopupType;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const Popup = (props: PopupProps) => {
  const {type, children, onConfirm, onCancel, confirmLabel, cancelLabel} = props;
  const [show, setShow] = useState(false);

  const handleConfirmClick = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    setShow(false);
  }, [setShow, onConfirm]);
  const handleCancelClick = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    setShow(false);
  }, [setShow, onCancel]);

  useEffect(() => {
    setShow(props.show);
  }, [props.show, setShow]);

  if (!show) {
    return null;
  }

  return (
    <ModalPortal>
      <BackgroundWrapper>
        <PopupWrapper type={type}>
          <Box isFlex alignItems='center' justifyContent='center' mb='52px'>
            {children}
          </Box>
          <Box isFlex width='100%' justifyContent='center'>
            <ConfirmButton type={type} width='140px' height='48px' onClick={handleConfirmClick}>{confirmLabel}</ConfirmButton>
            <RejectButton type={type} width='140px' height='48px' ml='60px'
              onClick={handleCancelClick}>
              {cancelLabel}
            </RejectButton>
          </Box>
        </PopupWrapper>
      </BackgroundWrapper>
    </ModalPortal>
  );
};
