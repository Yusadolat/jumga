import React, {useEffect, useState} from 'react';
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
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999999999999999999999999999999999 !important;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div.container {
        background: #fff;
        width: 500px;
        min-height: 450px;
        padding: 20px 70px;
        position: relative;

        @media screen and (max-width: 550px){
            width: 80%;
        }
        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 30px;
            font-weight: 600;
            cursor: pointer;
        }
        h1{
            font-size: 24px;
            color: #ff577f;
            border-bottom: 2px solid rgba(0,0,0,.4);
        }
        h5{
            font-size: 18px;
            span {
                width: 40%;
                display: inline-block;
            }
        }
        h3 {
            font-size: 20px;
            margin: 20px 0;
            border-top: 1px solid rgba(0,0,0,.3);
            border-bottom: 1px solid rgba(0,0,0,.3);
            padding: 6px 0;
            span {
                width: 40%;
                display: inline-block;
            }
        }
        button {
            width: 100%;
            background: #ff577f;
            color: #fdffbc;
            font-size: 16px;
            font-weight: 600;
            padding: 10px;
            outline: none;
            border: none;
            border-radiues: 10px;
            cursor: pointer;
            margin-top: 50px;
        }
      
    }

`


type ModalProps = {
    setModalShown: (state:boolean) => void;
    fwConfig:any;
    product:any;
}
const CheckoutModal = ({setModalShown, fwConfig, product}:ModalProps) => {
    return(
        <ModalContainer>
            <div className="container">
                <span className="close" onClick={() => setModalShown(false)}>X</span>
                <h1>Order Summary</h1>
                
                <h5><span>Item Fee:</span>  {product.currency} {product.price}</h5>
                <h5><span>Shipping Fee:</span>  {product.currency} {product.delivery_fee}</h5>
                <h3><span>Total:</span> {product.currency} {+product.price + +product.delivery_fee}</h3>
                <FlutterWaveButton className="checkout-btn" {...fwConfig} />
            </div>
        </ModalContainer>
    )
}


const ProductPage:React.FC = (props: any) => {
    const [product, setProduct] = useState<any>([]);
    const [merchant, setMerchant] = useState<any>({});
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [processingOrder, setProcessingOrder] = useState<string>("");
    const [modalShown, setModalShown] = useState<boolean>(false)
    const params:any = useParams();
    const setLastAccessedProduct = props.setLastAccessedProduct;
    const history = props.history;
    const id = params.id;

    const { user } = useSelector((state: any) => state);
    const {isSignedIn} = user;
    const { email, fullname, isMerchant, phone_number, token, _id} = user.user;
    const {business_name, dispatch_rider, subaccount_id } = merchant;

    
    const {image, price, delivery_fee,} = product;


    // Calculate the total and split value for each item
    const total_amount = price + +delivery_fee
    const dispatch_split_value = (+delivery_fee/total_amount);
    const merchant_split_value = (+price/total_amount);
    
    

    const config = {
        public_key: 'FLWPUBK_TEST-6362fd2426a30ce1662a6d949416b3f4-X',
        tx_ref: Date.now(),
        amount: total_amount,
        currency: product.currency,
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email,
          phonenumber:  phone_number,
          name: fullname,
        },
        subaccounts: [
            {
              id: subaccount_id,
              transaction_charge_type: 'percentage',
              transaction_charge: merchant_split_value
            },
            {
              id: dispatch_rider,
              transaction_charge_type: 'percentage',
              transaction_charge: dispatch_split_value
            },
        ],
        customizations: {
          title: business_name,
          description: `Payment for item - ${product.title}`,
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    

    const fwConfig:any = {
    ...config,
    text: 'Pay Now!',
    callback: (response:any) => {
        closePaymentModal() // this will close the modal programmatically
        setModalShown(false);


        if(response.status === "successful"){
            setProcessingOrder("Processing Order....");
            const{ customer, amount, currency, transaction_id, tx_ref,flw_ref } = response;

            const orderBody = { 
                title: product.title, 
                product_id: id,
                user_id: _id, 
                customer: {
                        name: customer.name,
                        email: customer.email,
                        phone_number: customer.phone_number
                    }, 
                amount, 
                currency, 
                transaction_id, 
                tx_ref, 
                flw_ref 
            };

            fetch("http://localhost:5000/api/v1/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(orderBody)
            })
            .then((res) => res.json())
            .then((data) => {
                setProcessingOrder("Order Processed Successfully!");
                setTimeout(() => {
                    setProcessingOrder("");
                }, 3000);
            })
            .catch((err) => {
                setProcessingOrder("Something went wrong!");
                setTimeout(() => {
                    setProcessingOrder("");
                }, 3000);
                setError(err.message);
            });
        }
    },
    onClose: () => {},
    };


    const handleClick = () => {
        setModalShown((previousState) => !previousState)
    }
    let content;
    if(isSignedIn){
        if(isMerchant){
            content = <p>You need to sign in as a customer to be able to purchase Item</p>
        }else{
            content = (<>
            <button onClick={handleClick}>Proceed to checkout</button>
            </>)
        }
    }else{
    content = (
    <>
        <Link to="/login">Login </Link>
         <span style={{paddingRight: 10, paddingLeft: 10}}> or </span>
        <Link to="/signup">Signup </Link>
        <span style={{paddingRight: 10, paddingLeft: 10}}>to Checkout</span>
        
    </>
    )}


    const fetchMerchantData = (merchant_id:string) => {
        fetch(`http://localhost:5000/api/v1/users/${merchant_id}`)
        .then((res) => res.json())
        .then((data) => {
            const {business_name, country, dispatch_rider, split_value, subaccount_id} = data;
            setMerchant({business_name, country, dispatch_rider, split_value, subaccount_id})
        })
        .catch((err) => setError(err.message));
    }

    useEffect(() => {
        fetchMerchantData(product.merchant_id);

        // eslint-disable-next-line
    }, [product.merchant_id]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProduct(data);
            setLoading(false);
            setLastAccessedProduct(id);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);        
        });


        // eslint-disable-next-line
    }, [])


    return (
        <>
            {modalShown ? <CheckoutModal product={product} fwConfig={fwConfig} setModalShown={setModalShown}/> : <></>}
            <Header />
            <MainContainer>
                <BackButton onClick={() => history.goBack()}> &lt; Back</BackButton>
                {loading ? <p>Loading...</p> : <></>}
                {Object.entries(product).length ? (
                    <div className="row">
                    <div className="col">
                        <img src={image} alt="Product Item"/>
                    </div>
                    <div className="col">
                        <h2>{product?.title}</h2>
                        <p>{product?.description}</p>
                        <h2 className="price">{product?.currency} {product?.price}</h2>

                        {error ? <p>{error}</p> : <></>} 
                        {processingOrder ? <p>{processingOrder}</p> : <></>} 
                        <div className="cta">
                            {content}
                        </div>
                    </div>
                    </div>
                ) : <></>}
                                
            </MainContainer>
        </>
    )
}

export default withRouter(ProductPage)
