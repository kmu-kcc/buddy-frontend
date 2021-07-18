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
      <h1>국민대 KCC</h1>
    </Wrapper>
  );
};
