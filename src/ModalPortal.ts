import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps{
    children?: React.ReactNode
}

export const ModalPortal = (props: ModalProps) => {
  const {children} = props;
  const el = document.getElementById('modal')!;
  return ReactDOM.createPortal(children, el);
};
