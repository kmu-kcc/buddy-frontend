import React, {useState} from 'react';
import styled from 'styled-components';
// import {Menu, Button} from 'antd';
import {Link} from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(false);

  return ( // need to think about log in or not
    <Common>
      <Menulist menu={menu}>
        <Link to='/manageUser'>magageUser</Link>
        <Link to='/findUser'>findUser</Link>
        <Link to='/manageAccount'>manageAccount</Link>
      </Menulist>
      <Menubar onClick={()=>setMenu(!menu)}>
      </Menubar>
    </Common>
  );
};

const Menubar = styled.button`
    display: flex;
    align-items:center;
    font-size: 30px;
    position: absolute;
    right: 32px;
    height: 97px;
    @media screen and (min-width: 500px) {
        display: none;    
    }
`;

const Common = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    @media screen and (max-width: 500px) {
        flex-direction: column;
    }
`;

const Menulist = styled.div< {menu:boolean} >`
    display: flex;
    align-items:center;
    @media screen and (max-width: 500px) {
        
        flex-direction: column;
        align-items:flex-end;
        display: ${({menu}) => {
    return menu === false ? 'none' : 'flex';
  }};
}
`;

