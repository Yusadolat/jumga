import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {useDispatch,} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
    bank_code: string,
    account_number: number,
  };


  
const Signup = () => {
    const [banks, setBanks] = useState([]);
    const [error, setError] = useState("");
    const [bankName, setBankName] = useState("");
    const [loading, setLoading] = useState(false);
    
    const history = useHistory();
    const dispatch = useDispatch();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const onSubmit = (data:Inputs) => {

        const newMerchant = {...data, isMerchant: true, bank_name: bankName};

        console.log({dataToBeSent: newMerchant});
        
        fetch("https://jumga.herokuapp.com/api/v1/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMerchant)
        })
        .then((res:any) => res.json())
        .then((json) => {
            if(json.status === "Failed"){
                setError(json.message);
            }else{
                dispatch(addUser(json));
                history.push(`/verify`);
            }           
        })
        .catch((err) => setError(err.message))
    }


    const handleChange = (e: any) => {
        
        const val = e.target.value;
        if(val){
            setLoading(true);
            fetch(`https://jumga.herokuapp.com/api/v1/banks/${val}`)
            .then((res) => res.json())
            .then((json) => {
                if(json.status === "success"){
                    setBanks(json.data)
                }else{
                    setError(json.message);
                }
            })
            .catch((err) => setError(err.message));
            setLoading(false);
        }
    }

    const handleBank = (e:any) => {
        const selectedBank:any = banks?.find((bank:any) => bank.code === e.target.value);

        setBankName(selectedBank.name);
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

                    <select name="country" onChange={(e) => handleChange(e)} ref={register({ required: true })}>
                        <option value="">Select your country</option>
                        <option value="NG">Nigeria</option>
                        <option value="GH">Ghana</option>
                        <option value="KE">Kenya</option>
                        <option value="UK">UK</option>
                    </select>
                    {errors.country && <span>This field is required</span>}

                    <input type="email" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                    {errors.email && <span>This field is required</span>}
                    
                    <input type="tel" name="phone_number" placeholder="Phone Number" ref={register({ required: true })} />
                    {errors.phone_number && <span>This field is required</span>}
                    

                    <input type="text" name="business_name" placeholder="Your Business Name" ref={register({ required: true })} />
                    {errors.business_name && <span>This field is required</span>}
                   
                    <select name="bank_code" onChange={(e:any) => handleBank(e)} ref={register({ required: true })}>
                        <option value="">{loading ? "Fetching banks..." : !loading && banks.length ? "Select your Bank" : !loading && !banks.length ? "Select a country to be able to select a bank" : <></> }</option>
                        {banks?.map((bank:any) => <option key={bank.id} value={bank.code}>{bank.name}</option>)}
                    </select>
                    {errors.bank_code && <span>Select a country to be able to choose a bank</span>}

                    <input type="number" name="account_number" placeholder="Account Number" ref={register({ required: true })} />
                    {errors.account_number && <span>This field is required</span>}

                    <input type="password" name="password" placeholder="Password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                    
                    {error ? <p>{error}</p> : <></>}

                    <button>Submit</button>
                    <p>Already have an account? <Link to="/login">Login</Link> </p>
                </form>
            </FormContainer>
        </Container>
    )
}

export default Signup
