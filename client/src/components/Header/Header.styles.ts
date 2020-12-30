import styled from 'styled-components'
import {Link} from 'react-router-dom';

export const HeaderDiv = styled.header`
    display: flex;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 999999999999999999999999999999;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    box-shadow: 0px 2px 7px 2px rgba(0,0,0,.13);
    nav{
        ul{
            display: flex;
            padding: 0;
            list-style: none;
            li{
                a{
                    text-decoration: none;
                    color: var(--dark);
                    padding: 20px;
                    text-transform: titlecase;
                }
            }
        }
    }

    
`
export const LinkButton = styled(Link)`
    padding: 9px 14px;
    margin: 0 10px;
    border: none;
    border-radius: 7px;
    font-size: 16px;
    cursor: pointer;
    background: var(--main-green);
    color: var(--light);
    font-weight: 600;
    text-decoration: none;
    &.merchants {
        background: var(--darkred);
    }
`

export const CartButton = styled(Link)`
    background: none;
    outline: none;
    border: none;
    font-size: 20px;
    position: relative;
    padding: 20px;

    span {
        font-size: 13px;
        position: absolute;
        top: 9px;
        font-weight: 700;
    }
`