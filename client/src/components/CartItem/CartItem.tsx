import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {incrementCartQuantity, decrementCartQuantity} from '../../features/cart/cartSlice';

const Wrapper = styled.div`
    margin: 20px 0;
    padding: 20px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid rgba(0,0,0,.14);
    .img-wrapper{
        width: 100px;
        height: 100px;
        margin-right: 40px;
        img {
            width: 100%;
            height: 100%;
        }
    }
`

const CheckoutButton = styled(Link)`
    background: orange;
    color: #fff;
    border: none;
    font-size: 17px;
    font-weight: 600;
    padding: 10px 24px;
    display: inline-block;
    margin-top: 20px;
    cursor: pointer;
    text-decoration: none;
`

const QuantityButton = styled.button`
    font-size: 28px;
    line-height: 50px;
    font-weight: 700;
    padding: 0 17px;    
    border: none;
    background: #e5e5e5;
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    margin: 10px;

    &:disabled{
        opacity: .4;
    }
`

interface ObjProps {
    category: string;
    description: string;
    id: string;
    image: string;
    price: string;
    quantity: number;
    title: string;
}
interface CartProps {
    item: ObjProps;
}
const CartItem:React.FC<CartProps> = ({item}) => {
    const dispatch = useDispatch();

    const HandleIncrement = (id:any) => dispatch(incrementCartQuantity(id));
    const HandleDecrement = (id:any) => dispatch(decrementCartQuantity(id));
    return (
        <Wrapper>
            <div className="img-wrapper">
                <img src={item.image} alt="Product Item"/>
            </div>
            <div>
                <h2>{item.title}</h2>
                <h3>Quantity: <span>{item.quantity}</span></h3>
                <QuantityButton onClick={() => HandleIncrement(item.id)}>+</QuantityButton>
                
                <QuantityButton disabled={item.quantity < 2 ? true : false} onClick={() => HandleDecrement(item.id)}>-</QuantityButton>

                <div>
                    <CheckoutButton to="/checkout">Proceed to Checkout</CheckoutButton>
                </div>
            </div>
           
        </Wrapper>
    )
}

export default CartItem
