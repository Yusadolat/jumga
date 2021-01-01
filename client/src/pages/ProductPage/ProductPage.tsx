import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {withRouter, useParams} from 'react-router-dom';
import styled from 'styled-components';



import Header from '../../components/Header/Header'
import {Container} from '../../styles/GlobalStyles';


const BackButton = styled.button`
    color: var(--main-green);
    margin-top: 40px;
    padding: 4px 22px;
    font-weight: 600;   
    font-size: 17px;  
    border: 1px solid rgba(0,0,0,.15);
    border-radius: 8px;
    cursor: pointer;
    &:hover{
        box-shadow: 1px 2px 3px 1px rgba(0,0,0,.15);
    }
`;
const MainContainer = styled(Container)`
    .row{
        margin: 30px 20px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .col{
            flex: 1;
            .price{
                font-size: 42px;
                margin: 10px 0;
            }
            img{
                width: 80%;
                border: 1px solid rgba(0,0,0,.15);
                padding: 50px;
            }
            .quantity-wrapper{
                span {
                    width: 40px;
                    display: inline-block;
                    font-size: 18px;
                    text-align: center;
                    padding: 0; 
                    margin: 0 20px; 
                }
                button[disabled]{
                    opacity: .4;
                    cursor: not-allowed;
                }
                button {
                    cursor: pointer;
                    border: none;
                    background: none;
                    font-weight: 700;
                    width: 50px;
                    height: 50px;
                    padding-bottom: 10px;
                    font-size: 30px;
                    outline: none;
                    background: var(--main-green);  
                    border-radius: 50%;
                }
            }
            .cta{
                display: flex;
                button {
                    font-size: 17px;
                    padding: 12px 23px;
                    border: none;
                    margin-top: 38px;
                    cursor: pointer;
                }
                button:nth-child(1) {
                    color: var(--darkred);
                    margin-right: 20px;
                }
                button:nth-child(2) {
                    background: var(--orange);
                }
            }
        }
    }
`



const ProductPage:React.FC = (props: any) => {
    const params:any = useParams();
    const id = params.id;

    const {products, } = useSelector((state: any) => state);
    const productsArray = products.products;
    const product = productsArray.find((item:any) => +item.id === +id);
    const history = props.history;

    


    const [quantity, setQuantity] = useState<number>(1);


    return (
        <>
            <Header />
            <MainContainer>
                <BackButton onClick={() => history.goBack()}> &lt; Back</BackButton>
                <div className="row">
                    <div className="col">
                        <img src={product?.image} alt="Product Item"/>
                    </div>
                    <div className="col">
                        <h2>{product?.title}</h2>
                        <h2 className="price">$ {product?.price}</h2>

                        <h4>Quantity</h4>
                        <div className="quantity-wrapper">
                            <button disabled={quantity < 2 && true} onClick={() => setQuantity(quantity - 1)}>-</button> 
                                <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <div className="cta">
                            <button>Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            
               
            </MainContainer>
        </>
    )
}

export default withRouter(ProductPage)
