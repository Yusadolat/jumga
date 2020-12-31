import React from 'react';
import {Link} from 'react-router-dom';

import { HeaderDiv, LinkButton } from './Header.styles';
import Logo from '../../assets/logo.svg'

function Header() {

    return (
        <HeaderDiv>
            <Link to="/">
            <img width="70" src={Logo} alt="Logo"/>
            </Link>
            <nav>
                
            </nav>
            <div>
                <LinkButton className="merchants" to="/merchant/login">For Merchant</LinkButton>
                <LinkButton to="/login">Login</LinkButton>
            </div>
        </HeaderDiv>
    )
}

export default Header
