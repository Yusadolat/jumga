import React from 'react';
import {useSelector} from 'react-redux';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import {withRouter, useParams, Link} from 'react-router-dom';
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

    const {products, user } = useSelector((state: any) => state);
    const productsArray = products.products;
    const product = productsArray.find((item:any) => item._id === id);
    const history = props.history;

    const {isMerchant} = user.user;
    const {isSignedIn} = user;
    let business_name = "ABC", email = "test@gmail.com", fullname="Test Test", phone_number = '00120921092';

    
    const config = {
        public_key: 'FLWPUBK_TEST-6362fd2426a30ce1662a6d949416b3f4-X',
        tx_ref: Date.now(),
        amount: product.price,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email,
          phonenumber:  phone_number,
          name: fullname,
        },
        subaccounts: [
            {
              id: "RS_A8EB7D4D9C66C0B1C75014EE67D4D663",
              transaction_split_ratio: 2,
            },
            {
              id: "RS_CF5B2A15E2CCD39F44E7774376EAE5C5",
              transaction_split_ratio: 2,
            },
        ],
        customizations: {
          title: business_name,
          description: 'Payment for store verification',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const fwConfig:any = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response:any) => {
           console.log(response);
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };
    
      let content;
      if(isSignedIn){
        if(isMerchant){
            content = <p>You need to sign in as a customer to be able to purchase Item</p>
        }else{
            content = <FlutterWaveButton {...fwConfig} />
        }
      }else{
        content = <Link to="/login">Login to Checkout</Link>
      }

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

                        <div className="cta">
                            {content}
                        </div>
                    </div>
                </div>
                
               
            </MainContainer>
        </>
    )
}

export default withRouter(ProductPage)
