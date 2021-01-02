import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Container} from '../../../styles/GlobalStyles'
import Logo from '../../../assets/logo.svg'
// STLES
import {FormContainer} from './Signup.style'


import {addUser} from '../../../features/user/userSlice'
type Inputs = {
    email: string,
    password: string,
    fullname: string,
    country: string,
    phone_number: number,
    business_name: string,
    bank_name: string,
    account_number: number,
  };


  
const Signup = () => {
    const [banks, setBanks] = useState([]);
    
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {

        const newMerchant = {...data, isMerchant: true, bank_code: "123"}

        // const test = {
        //     "fullname": "Yusuf Adeyemo",
        //     "email": "yusadolat@gmail.com",
        //     "phone_number": "08160016822",
        //     "country": "NG",
        //     "business_name": "ProntoVille LLC",
        //     "bank_name": "Access Bank",
        //     "bank_code": "044",
        //     "account_number": "0690000031",
        //     "password": "Islam1234",
        //     "isMerchant": true
        // }
        dispatch(addUser(newMerchant));
    }


    const handleChange = (e: any) => {
        const val = e.target.value;
        const API_KEY = 'FLWPUBK_TEST-6362fd2426a30ce1662a6d949416b3f4-X'
        // FLWSECK_TEST-8c7bc72d0a333a76d5f00cdaf701c053-X
        console.log(val)
        if(val){
            fetch(`https://api.flutterwave.com/v3/banks/${val}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${API_KEY}`
                }
            })
            .then((res) => res.json())
            .then((data) => {
                setBanks(data);
            })
            .catch((err) => console.log(err.message))
        }
    }
    return (
        <Container>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Link to="/">
                    <img width="70" src={Logo} alt="Logo"/>
                    </Link>
                    <h2>Merchant Sign Up</h2>

                    <input type="text" name="fullname" placeholder="Enter your full name" ref={register({ required: true })} />
                    {errors.fullname && <span>This field is required</span>}

                    <input type="email" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <input type="tel" name="phone_number" placeholder="Phone Number" ref={register({ required: true })} />
                    {errors.phone_number && <span>This field is required</span>}
                    
                    <select name="country" onChange={(e) => handleChange(e)} ref={register({ required: true })}>
                        <option value="">Select your country</option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                        <option value="KE">Kenya</option>
                        <option value="UK">UK</option>
                    </select>
                    {errors.country && <span>This field is required</span>}

                    <input type="text" name="business_name" placeholder="Your Business Name" ref={register({ required: true })} />
                    {errors.business_name && <span>This field is required</span>}
                   
                    <select name="bank_name" ref={register({ required: true })}>
                        <option value="">Select your Bank</option>
                        {banks?.map((bank:any) => <option value={bank.code}>{bank.name}</option>)}
                    </select>
                    {errors.bank_name && <span>Select a country to be able to choose a bank</span>}

                    <input type="number" name="account_number" placeholder="Account Number" ref={register({ required: true })} />
                    {errors.account_number && <span>This field is required</span>}

                    <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    <button>Submit</button>
                    <p>Already have an account? <Link to="/login">Login</Link> </p>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Signup
