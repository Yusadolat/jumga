import React from 'react';
import {useSelector} from 'react-redux';

import {Container} from '../../styles/GlobalStyles';

import Header from '../../components/Header/Header';
import CartItem from '../../components/CartItem/CartItem';


const CartPage:React.FC = () => {
    const {cart} = useSelector((state:any) => state);

//     category: "jewelery"
// description: "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days."
// id: 6
// image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
// price: 168
// quantity: 1
// title: "Solid Gold Petite Micropave "
    return (
        <>
        <Header />
        <Container>
            {cart?.map((item:any, idx:number) => <CartItem item={item} key={idx}/>)}
        </Container>
        </>
    )
}

export default CartPage
