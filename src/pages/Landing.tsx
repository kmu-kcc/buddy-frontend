import React from 'react';
import {Redirect} from 'react-router-dom';

export const Landing: React.FC = () => {
  return (
    <Redirect to='/signin' />
  );
};
