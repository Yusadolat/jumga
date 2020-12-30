import React from 'react'
import { useForm } from "react-hook-form";
import {Container} from '../../styles/GlobalStyles'
import Logo from '../../assets/logo.svg'
// STLES
import {FormContainer} from './Signup.styles'
import { Link } from 'react-router-dom';
type Inputs = {
    email: string,
    password: string,
    fullname: string,
    country: string
  };
 
const Signup = () => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        console.log(data);
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
                    </select>
                    {errors.country && <span>This field is required</span>}

                    <input type="email" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    <button>Submit</button>
                    <p>Don't have an account? <Link to="/signup">Sign up</Link> </p>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Signup
