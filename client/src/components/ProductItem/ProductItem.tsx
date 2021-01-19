import React from 'react';
import {Link} from 'react-router-dom';

import styled from 'styled-components';

const ProductDiv = styled.div` 
    width: 230px;
    height: 300px;    
    box-shadow: 1px 4px 10px 1px rgba(0,0,0,0.085);
    border-radius: 10px;
    overflow: hidden;
    margin: 20px;
    position: relative;
    cursor: pointer;
    .title{
        color: var(--dark);
        margin: 10px 0;
        font-size: 16px;
        min-height: 20px;
        font-weight: 700;
        padding: 0 10px;
    }
    .price {
        color: red;
        
        font-size: 15px;
        font-weight: 600;
        padding: 5px;
        width: 100%;
        margin: 0;
    }
    a {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: block;
        text-decoration: none;
        color: var(--dark);
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        font-size: 15px;
        font-weight: 600;
        border-radius: 8px;
        background: var(--light);
        &:hover{
            color: var(--darkred);
        }
    }
    .img-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center; 
        width: 100%;
        height: 60%;
        padding: 20px;
        text-align: center;
        img{
            width: 90%;
            height: 100%;           
        }
    }

`

interface Props {
    category: string;
    description: string;
    _id: string;
    image: string;
    title: string;
    price: number;
    currency: string;
}


const ProductItem:React.FC<Props> = ({ price, currency, title, _id, image}) => {
    return (
        <ProductDiv>
            <div className="img-wrapper">
                <img src={image} alt="Showing product item"/>
            </div>
            <h3 className="title">{title.length > 50 ? title.substring(0, 50) + "..." : title}</h3>
            <h4 className="price">{currency} {price.toFixed(2)}</h4>
            <Link to={`product/${_id}`} className="btn">View Product</Link>
        </ProductDiv>
    )
}

export default ProductItem
