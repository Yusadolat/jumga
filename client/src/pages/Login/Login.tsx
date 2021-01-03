import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import {Container} from '../../styles/GlobalStyles'
import Logo from '../../assets/logo.svg';

import {addUser} from '../../features/user/userSlice';


// STLES
import {FormContainer} from './Login.style'
import { Link } from 'react-router-dom';
type Inputs = {
    email: string,
    password: string,
  };
 
const Login = () => {
    const [error, setError] = useState("");

    const history = useHistory();
    const dispatch = useDispatch()



    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        console.log(data);
        fetch("https://jumga.herokuapp.com/api/v1/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((res:any) => res.json())
        .then((json) => {
            console.log(json);
            dispatch(addUser(json));
            history.goBack();            
        })
        .catch((err:any) => {
            setError(err.message);
            console.log({err})
        })
    }

    return (
        <Container>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Link to="/">
                    <img width="70" src={Logo} alt="Logo"/>
                    </Link>
                    <h2>Login</h2>
                    <input type="email" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    {error && <p>{error}</p>}
                    <button>Submit</button>

                    <p>Don't have an account? <Link to="/signup">Sign up</Link> </p>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Login
