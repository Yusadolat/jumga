import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useForm } from "react-hook-form";
import {Container} from '../../styles/GlobalStyles'
import Logo from '../../assets/logo.svg';

import {addUser} from '../../features/user/userSlice';
import {BASE_URL} from '../../api'

// STLES
import {FormContainer} from './Login.style'
import { Link } from 'react-router-dom';
type Inputs = {
    email: string,
    password: string,
  };
 
const Login = ({lastAccessedProduct}:any) => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const dispatch = useDispatch()



    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {
        setError("");
        setLoading(true);
        fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((res:any) => res.json())
        .then((json) => {
            if(json.status === "Failed"){
                setError(json.message);
            }else{
                const {token, user, status} = json;
                const { fullname, email, phone_number, country, business_name, isMerchant, account_status, _id} = user;
                const newUser = { fullname, email, phone_number, country, business_name, isMerchant, account_status, _id, token}
                if(status === "Sucess"){
                    dispatch(addUser(newUser));
                    if(user.isMerchant){
                        history.push("/dashboard");
                    }else{
                        if(lastAccessedProduct){
                            history.push(`/product/${lastAccessedProduct}`)
                        }else{
                            history.goBack();  
                        }
                    } 
                }else{
                    setError(json.message);
                }
               
                setLoading(false);
            }
            setLoading(false);                
        })
        .catch((err:any) => {
            setError(err.message);
            setLoading(false);
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
                    <button disabled={loading ? true : false}>{loading ? "Submitting..." : "Login"}</button>

                    <p>Don't have an account? </p>
                    <p>Sign up as a <Link to="/signup">Customer</Link> or as a <Link to="/merchant/signup">Merchant</Link></p>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Login
