import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components';

import {Container} from '../../styles/GlobalStyles'
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';

const Title = styled.h5`
    font-size: 20px;
    text-align: center;
    margin-top: 50px;
`
const Table = styled.table`
    width: 100%;
    margin-top: 20px;
    background: #fcefce;

    thead tr{
        background: #000;
        th{
            color: #fff;
        }
    }
    td, th{
        padding: 13px 0px;
        min-width: 100px;
        border-bottom: 1px solid rgba(0,0,0, 0.5);

        &:nth-child(1){
            text-align: center;
        }
    }
`
const ModalContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9999999;
    background: rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;


    form {
        background: #fff;
        width: 500px;
        min-height: 450px;
        padding: 20px 70px;
        position: relative;

        @media screen and (max-width: 550px){
            width: 80%;
        }
        .close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 30px;
            font-weight: 600;
            cursor: pointer;
        }
        h3 {
            font-size: 20px;
            margin: 20px 0;
            text-align: center;
            color: #3c3c34;
        }
        input,
        select {
            width: 100%;
            margin: 3px auto 18px auto;
            padding: 10px;
            border-radius: 10px;
            font-size: 15px;
            display: block;
            outline: none;
            border: 1px solid rgba(0,0,0,0.3);
            background: #fff;

            &[type="submit"]{
                background: #14ace2;
                color: #fff;
                font-size: 20px;
            }
        }
        label{
            font-size: 15px;
            font-weight: 600;
        }
    }

`

type ModalProps = {
    setModalShown: (state:any) => void;
    addProduct: (data:any) => void;
    error: string;
    notification: string;
}
type FormProps = {
    title: string;
    price: string;
    delivery_fee: string;
    currency: string;
}
const AddItemModal = ({notification, error, setModalShown, addProduct}:ModalProps) => {
    const [data, setData] = useState<FormProps>({title: "", price: "", delivery_fee: "", currency: ""});


    const HandleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {value, name} = e.target;

        
        if(name === "price"){
            setData((previousState:FormProps) => ({...previousState, delivery_fee: Math.round(+value * 0.075).toString(), [name]: value}))
        }else{
            setData((previousState:FormProps) => ({...previousState, [name]: value}))
        }
    }

    const HandleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(data);
        addProduct(data)
    }
    return(
        <ModalContainer>
            <form onSubmit={(e) => HandleSubmit(e)}>
                <span className="close" onClick={() => setModalShown(false)}>X</span>
                <h3>Add Item</h3>
                <label htmlFor="title">Item Name</label>
                <input onChange={(e) => HandleChange(e)} value={data.title} name="title" type="text" placeholder="Item Name" required/>
                <label htmlFor="currency">Currency</label>
                <select onChange={(e) => HandleChange(e)} value={data.currency} name="currency" required>
                    <option value="">Select Currency</option>
                    <option value="NGN">Nigerian Naira</option>
                    <option value="USD">United State Dollars</option>
                    <option value="GHS">Ghanian Cedi</option>
                    <option value="KES">Kenyan Shilling</option>
                </select>
                <label htmlFor="priice">Item Price in {data.currency}</label>
                <input onChange={(e) => HandleChange(e)} value={data.price} name="price" type="number" placeholder="Item Price" required/>

                <label htmlFor="delivery_fee">Delivery Fee - Added Automatically</label>
                <input onChange={(e) => HandleChange(e)} value={data.delivery_fee} name="delivery_fee" type="number" placeholder="Delivery Fee - Auto Added" readOnly/>

                {error ? <p>{error}</p> : <></>}

                {notification ? <p>{notification}</p> : <></>}
                <input type="submit" value="Add Item" />
            </form>
        </ModalContainer>
    )
}
const Dashboard = () => {
    const [products, setProducts] = useState<[]>([])
    const [modalShown, setModalShown] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");

    const user = useSelector((state: any) => state.user);

    console.log(user);
    const { token, _id} = user.user;

    const addProduct = (data:any) => {
        
        fetch("https://jumga.herokuapp.com/api/v1/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({...data, merchant_id: _id})
        })
        .then((res) => res.json())
        .then((data) => {
            setNotification("Item Successfully Added");
            setLoading(false);
            fetchMyProducts();
            setTimeout(() => {
                setNotification("");
            }, 3000)
            setModalShown(false);
            fetchMyProducts();
        })
        .catch((err) => setError(err.message))
    }

    const fetchMyProducts = () => {
        console.log(_id);
        fetch(`https://jumga.herokuapp.com/api/v1/products/${_id}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.status === "success"){
                setProducts(data.data.products);
            }else{
                setError(data.message);
            }
        })
        .catch((err) => setError(err.message))
    }

    useEffect(() => {
        fetchMyProducts();
        
        // eslint-disable-next-line
    }, [])
    return (
        <>
        {modalShown && <AddItemModal notification={notification} error={error} addProduct={addProduct} setModalShown={setModalShown}/>}
        <Header />
        <Container>
            <Title>Past Orders</Title>
            <button onClick={() => setModalShown(true)}>Add New Item</button>
            
            {loading ? <p>Loading...</p> : <></>}
            <Table>
                <thead>
                   <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Action</th>
                   </tr>
                </thead>   
                <tbody>
                    {products?.map((product:any, idx) => {
                        return (
                            <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                <Link to={`/product/${product._id}`}>View Product</Link>
                            </td>
                        </tr>    
                        )
                    })}
                   
                </tbody> 
            </Table> 
        </Container>
        </>
    )
}

export default Dashboard
