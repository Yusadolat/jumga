import React from 'react'
import { useForm } from "react-hook-form";
import {Container} from '../../styles/GlobalStyles'

// STLES
import {FormContainer} from './Login.style'
type Inputs = {
    email: string,
    password: string,
  };
 
const Login = () => {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        console.log(data);
    }

    console.log(watch("email"))
    return (
        <Container>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Login</h2>
                    <input type="email" name="email" placeholder="Enter your email" ref={register} />
                    {errors.email && <span>This field is required</span>}
                    
                    <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    <button>Submit</button>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Login
