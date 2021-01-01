import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector}  from 'react-redux';

import { HeaderDiv, LinkButton } from './Header.styles';
import Logo from '../../assets/logo.svg'

function Header() {
    const user = useSelector((state: any) => state.user);
    // const {isSignedIn, loading } = user;
    const {isSignedIn } = user;
    const {isMerchant} = user.user;

    let buttons;
    if (isSignedIn && isMerchant) {
        buttons = (
            <div>
                <LinkButton className="merchants" to="/dashboard">My Store</LinkButton>
            </div>
        )
    }else if( isSignedIn && !isMerchant){
        buttons = (
            <div>
                <LinkButton className="merchants" to="/dashboard">My Orders</LinkButton>
                <LinkButton to="/login">Logout</LinkButton>
            </div>
        )
    }else{
        buttons = (
            <div>
                <LinkButton className="merchants" to="/merchant/login">For Merchant</LinkButton>
                <LinkButton to="/login">Login</LinkButton>
            </div>
        )
    }
    return (
        <HeaderDiv>
            <Link to="/">
            <img width="70" src={Logo} alt="Logo"/>
            </Link>
            <nav>
                
            </nav>
            {buttons}
        </HeaderDiv>
    )
}

export default Header
