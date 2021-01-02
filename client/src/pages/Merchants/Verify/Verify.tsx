import React from 'react';
import {useSelector} from 'react-redux';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

import styled from 'styled-components';

import {Container} from '../../../styles/GlobalStyles'

const Wrapper = styled.div`
    width: 500px;
    margin: 20px auto;
    padding: 30px;
    text-align: center;
`
function Verify() {
    const  user = useSelector((state:any) => state.user);
    const {business_name, email, fullname, phone_number} = user.user;


    const config = {
        public_key: 'FLWPUBK_TEST-6362fd2426a30ce1662a6d949416b3f4-X',
        tx_ref: Date.now(),
        amount: 20,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email,
          phonenumber:  phone_number,
          name: fullname,
        },
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
    
    return (
        <Container>
            <Wrapper>
                <h3>Before Proceeding to your dashboard, you need to make a payment of $20. Click the button below to proceed!</h3>
                <FlutterWaveButton {...fwConfig} />
            </Wrapper>
        </Container>
    )
}

export default Verify
