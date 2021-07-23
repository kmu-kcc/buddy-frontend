import React, {useState} from 'react';
import styled from 'styled-components';
// import {Menu, Button} from 'antd';
import {Link} from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [menu, setMenu] = useState(false);
  return ( // need to think about log in or not
    <Common>
      <Menubar onClick={()=>setMenu(!menu)}>menu</Menubar>
      <div>
        <Menulist menu={menu}>
          <ul>
            <div><Link to='/manageUser'>manageUser</Link></div>
            <div><Link to='/findUser'>findUser</Link></div>
            <div><Link to='/manageAccount'>manageAccount</Link></div>
          </ul>
        </Menulist>
      </div>
    </Common>
  );
};

const Menubar = styled.a`
    flex-direction: column;
    text-decoration: none;
    top:5px;
    position: absolute;
    font-size: 30px;
    @media screen and (min-width: 500px) {
        display: flex;    
    }
`;

const Common = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const Menulist = styled.div< {menu:boolean} >`
    background-color: aqua;
    flex-direction: column;
    @media screen and (min-width: 500px) {
        height: 500%;
        width: 100px;
        align-items:flex-end;
        display: ${({menu}) => {
    return menu === false ? 'none' : 'flex';
  }};
}
`;

