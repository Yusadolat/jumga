import React from 'react'
import { useForm } from "react-hook-form";
import {useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import {Container} from '../../../styles/GlobalStyles'
import Logo from '../../../assets/logo.svg'
// STLES
import {FormContainer} from './Signup.style'


import {RegisterUser} from '../../../features/user/userSlice'
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
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        const newMerchant = {...data, isMerchant: true, bank_code: "123"}
        dispatch(RegisterUser(newMerchant));
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
                    
                    <select name="country" ref={register({ required: true })}>
                        <option value="">Select your country</option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                        <option value="NG">Kenya</option>
                        <option value="UK">UK</option>
                    </select>
                    {errors.country && <span>This field is required</span>}

                    <input type="text" name="business_name" placeholder="Your Business Name" ref={register({ required: true })} />
                    {errors.business_name && <span>This field is required</span>}
                   
                    <select name="bank_name" ref={register({ required: true })}>
                        <option value="">Select your Bank</option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                        <option value="NG">Kenya</option>
                        <option value="UK">UK</option>
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
