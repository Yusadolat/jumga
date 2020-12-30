import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import HeaderTitle from '../HeaderTitle/HeaderTitle';

import ProductItem from '../ProductItem/ProductItem'

const Container = styled.div`
    padding: 80px 0;
    text-align: center;
    border-bottom: 1px solid rgba(0,0,0,.09);
    min-height: 600px;

`
const FeaturedDiv = styled.div`
    width: 90%;
    margin: 20px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (max-width: 500px) {
        justify-content: center;
    }
`
const NavigateButton = styled(Link)`
    padding: 17px 30px;
    width: 280px;
    margin-top: 20px;
    margin: initial auto;
    display: inline-block;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    box-shadow: 1px 4px 10px 1px rgba(0,0,0,.095);
    text-decoration: none;
    text-transform: uppercase;
    border: 1px solid rgba(0,0,0,.035);
    transition: .3s;
    &:hover{
        transform: scale(1.02);
    }
`
type Product  = {
    category: string;
    description: string;
    id: number;
    image: string;
    title: string;
    price: number;
}

type Props = {
    products: Array<Product>;
    title: string;
}

const FeaturedProducts:React.FC<Props> = ({products, title}) =>  {
    return (
        <Container>
            <HeaderTitle title={title}/>
            <FeaturedDiv>
                {products.filter((product) => product.category === title).map((item: Product, idx:number) => idx < 4 && <ProductItem key={idx}  {...item} />
                )}
            </FeaturedDiv>

            <NavigateButton to={`/category/${title.toLowerCase()}`}>All {title}</NavigateButton>
        </Container>
    )
}

export default FeaturedProducts
// item={item}