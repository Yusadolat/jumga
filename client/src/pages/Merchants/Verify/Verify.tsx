import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

import styled from 'styled-components';

import {addUser} from '../../../features/user/userSlice'
import {Container} from '../../../styles/GlobalStyles'

const Wrapper = styled.div`
    width: 500px;
    margin: 20px auto;
    padding: 30px;
    text-align: center;

    button {
      font-size: 20px;
      padding: 10px 40px;
      background: #12f3f3;
      color: #000;
    }
`
function Verify() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const dispatch = useDispatch();
    const history = useHistory();

    const  user = useSelector((state:any) => state.user);
    const {business_name, email, phone_number, _id, token } = user.user;


    const config = {
        public_key: 'FLWPUBK_TEST-6362fd2426a30ce1662a6d949416b3f4-X',
        tx_ref: Date.now(),
        amount: 20,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
          email,
          phonenumber:  phone_number,
          name: business_name,
        },
        customizations: {
          title: "Jumga",
          description: 'Payment for store verification',
          logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
      };
    
      const fwConfig:any = {
        ...config,
        text: 'Verify Store',
        callback: (response:any) => {
          setLoading(true);
          if(response.status === "successful"){
            handleVerify();
          }else{
            setError(response.message);
          }
         
          setLoading(false);
          closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => {},
      };
      

      const handleVerify = () => {
        fetch(`https://jumga.herokuapp.com/api/v1/users/${_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
              },
              body: JSON.stringify({
                "account_status": true
                })
            })
            .then((res) => res.json())
            .then((data) => {  
              const {token, updatedUser} = data;
              const { fullname, email, phone_number, country, business_name, isMerchant, account_status, _id} = updatedUser;
              const newUser = { fullname, email, phone_number, country, business_name, isMerchant, account_status, _id, token}
              dispatch(addUser(newUser));
              setTimeout(() => history.push("/dashboard"), 2000)
            })
            .catch((err) => setError(err.message))
      }
    return (
        <Container>
            <Wrapper>
                <h3>Before Proceeding to your dashboard, you need to make a payment of $20. Click the button below to proceed!</h3>
                {loading && !error ? <div>Processing Payment...</div> : <></>}
                {error && !loading ? <div>{error}</div> : <></>}
                {!loading ? <FlutterWaveButton onClick={() => setLoading(true)} {...fwConfig} /> : <></>}
            </Wrapper>
        </Container>
    )
}

export default Verify
