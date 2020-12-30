import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import { HeaderDiv, CartButton, LinkButton } from './Header.styles';
import Logo from '../../assets/logo.svg'

function Header() {
    // const length = useSelector((state:any) => state.cart.length);
    return (
        <HeaderDiv>
            <Link to="/">
            <img width="70" src={Logo} alt="Logo"/>
            </Link>
            <nav>
                
            </nav>
            <div>
                {/* <CartButton to="/cart">
                    <i className="fas fa-shopping-cart"></i> 
                    <span>{length || 0 }</span> 
                </CartButton> */}
                <LinkButton className="merchants" to="/merchant/login">For Merchant</LinkButton>
                <LinkButton to="/login">Login</LinkButton>
            </div>
        </HeaderDiv>
    )
}

export default Header
