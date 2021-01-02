import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';

import {Container} from '../../styles/GlobalStyles'
import Logo from '../../assets/logo.svg'
// STLES
import {FormContainer} from './Signup.styles'

import {addUser} from '../../features/user/userSlice'

type Inputs = {
    email: string,
    password: string,
    fullname: string,
    country: string,
    phone_number: string,
    business_name: string,
    bank_name: string,
    bank_code: string,
    account_number: string,
    isMerchant: boolean
  };
 
const Signup = () => {
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        const newUser = {
            ...data,
            business_name: "",
            bank_name: "",
            bank_code: "",
            account_number: "",
        }
        console.log(newUser);
        fetch("https://jumga.herokuapp.com/api/v1/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then((res:any) => res.json())
        .then((json) => {
            console.log(json);
            dispatch(addUser(json));
        })
        .catch((err) => setError(err.message))
        
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

                    <input type="tel" name="phone_number" placeholder="Enter your Phone Number" ref={register({ required: true })} />
                    {errors.phone_number && <span>This field is required</span>}

                    <input type="email" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}

                    {error && <p>{error}</p>}
                    <button>Submit</button>
                    <p>Already have an account? <Link to="/login">Login</Link> </p>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Signup
