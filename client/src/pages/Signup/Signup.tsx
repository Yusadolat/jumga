import React from 'react'
import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import {Container} from '../../styles/GlobalStyles'
import Logo from '../../assets/logo.svg'
// STLES
import {FormContainer} from './Signup.styles'

import {RegisterUser} from '../../features/user/userSlice'

type Inputs = {
    email: string,
    password: string,
    fullname: string,
    country: string
  };
 
const Signup = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        console.log(data);
        dispatch(RegisterUser(data));
    }

    return (
        <Container>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Link to="/">
                    <img width="70" src={Logo} alt="Logo"/>
                    </Link>
                    <h2>Sign Up</h2>

                    <input type="text" name="fullname" placeholder="Enter your full name" ref={register({ required: true })} />
                    {errors.fullname && <span>This field is required</span>}

                    <select name="country" ref={register({ required: true })}>
                        <option value="">Select your country</option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                        <option value="NG">Kenya</option>
                        <option value="UK">UK</option>
                    </select>
                    {errors.country && <span>This field is required</span>}

                    <input type="email" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
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
