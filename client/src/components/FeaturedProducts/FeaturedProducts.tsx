import React from 'react';
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
                {products.map((item: Product, idx:number) => <ProductItem key={idx}  {...item} />
                )}
            </FeaturedDiv>
        </Container>
    )
}

export default FeaturedProducts
// item={item}