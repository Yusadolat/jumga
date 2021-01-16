import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';

import {logoutUser} from '../../features/user/userSlice'
import { HeaderDiv, LinkButton } from './Header.styles';
import Logo from '../../assets/logo.svg'

function Header() {
    const user = useSelector((state: any) => state.user);
    const {isSignedIn } = user;
    const {isMerchant, email} = user.user;

    const history = useHistory();
    const dispatch = useDispatch();
    const HandleLogout = () => {
        dispatch(logoutUser(""));
        sessionStorage.clear();
        history.push("/")
    }
    let buttons;
    if (isSignedIn && isMerchant) {
        buttons = (
            <div className="right-side">
                <LinkButton className="merchants" to="/dashboard">My Store</LinkButton>
                <LinkButton to="/" onClick={HandleLogout}>Logout</LinkButton>
            </div>
        )
    }else if( isSignedIn && !isMerchant){
        buttons = (
            <div className="right-side">
                <p>Welcome, {email}</p>
                <LinkButton className="merchants" to="/dashboard">My Orders</LinkButton>
                <LinkButton to="/" onClick={HandleLogout}>Logout</LinkButton>
            </div>
        )
    }else{
        buttons = (
            <div className="right-side">
                <LinkButton className="merchants" to="/merchant/signup">Merchant Signup</LinkButton>
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
