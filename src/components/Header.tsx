import React from 'react';
import styled from 'styled-components';
import {space, SpaceProps} from 'styled-system';

const Wrapper = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${space}
`;

type Props = SpaceProps;

export const Header: React.FC<Props> = (props) => {
  const {...styles} = props;
  return (
    <Wrapper {...styles}>
      <h1 style={
        {
          marginTop: '50px',
          color: '#207eba',
          fontSize: '30px',
          fontFamily: '고딕',
          fontWeight: 1000,
        }
      }>국민대 KCC</h1>
    </Wrapper>
  );
};
