import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {CSSTransition} from 'react-transition-group';
import {Box, Button, ModalPortal} from '.';

type PopupType = 'primary' | 'danger';

const fadeTransition = 'fade';

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
  transition: all 0.3s ease-out;

  .${fadeTransition}-enter {
    opacity: 0;
  }
  .${fadeTransition}-appear-done {
    opacity: 1;
  }
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
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const Popup = (props: PopupProps) => {
  const {type, children, onConfirm, onCancel, onClose, confirmLabel, cancelLabel} = props;
  const [show, setShow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    onClose();
    setShow(false);
  }, [onClose]);

  const handleConfirmClick = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    close();
  }, [onConfirm, close]);
  const handleCancelClick = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    close();
  }, [onCancel, close]);
  const handleTransitionEnd = useCallback((node, done) => {
  }, []);
  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      close();
    }
  }, [close]);
  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (contentRef && !contentRef.current?.contains(event.target as Node)) {
      close();
    }
  }, [contentRef, close]);

  //  effect hook for keyboard event listener
  useEffect(() => {
    if (show) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [show, handleEscKey, handleOutsideClick]);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  return show ? (
    <ModalPortal>
      <CSSTransition in={show} timeout={300} classNames={fadeTransition} addEndListener={handleTransitionEnd}>
        <BackgroundWrapper>
          <PopupWrapper type={type} ref={contentRef}>
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
      </CSSTransition>
    </ModalPortal>
  ) : null;
};
