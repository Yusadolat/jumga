import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import { HeaderDiv, CartButton } from './Header.styles';


function Header() {
    const length = useSelector((state:any) => state.cart.length);
    return (
        <HeaderDiv>
            <Link to="/">Qoat</Link>
            <nav>
                <ul>
                    <li><Link to="/">Shop</Link></li>
                    <li><Link to="/">Footwears</Link></li>
                    <li><Link to="/">BackPacks</Link></li>
                    <li><Link to="/">Faq</Link></li>
                    <li><Link to="/">About</Link></li>
                </ul>
            </nav>
            <div>
                <CartButton to="/cart">
                    <i className="fas fa-shopping-cart"></i> 
                    <span>{length || 0 }</span> 
                </CartButton>
                <button>For Merchant</button>
                <button>My Account</button>
            </div>
        </HeaderDiv>
    )
}

export default Header
