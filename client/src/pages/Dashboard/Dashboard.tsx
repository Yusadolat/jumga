import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {Container} from '../../styles/GlobalStyles'
import Header from '../../components/Header/Header';
import AddItemModal from '../../components/AddItemModal/AddItemModal'

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
const ParagraphText = styled.p`
    text-align: center;
    display: block;
    width: 100%;
`

const AddButton= styled.button`
    background: #eb596e;
    color: #fff;
    font-size: 16px;
    padding: 10px 30px;
    outline: none;
    border: none;
    cursor: pointer;
`

const Dashboard = () => {
    const [products, setProducts] = useState<[]>([])
    const [modalShown, setModalShown] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [fetchLoading, setFetchLoading] = useState<boolean>(false);
    const [notification, setNotification] = useState<string>("");

    const user = useSelector((state: any) => state.user);

    const { token, _id} = user.user;

    const addProduct = (data:any) => {
        setLoading(true);
        setError("");
        fetch("http://localhost:5000/api/v1/products", {
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
            setTimeout(() => {
                setNotification("");
            }, 3000)
            setModalShown(false);
            fetchMyProducts();
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        })
    }

    const fetchMyProducts = () => {
        setFetchLoading(true);
        setError("");
        fetch(`http://localhost:5000/api/v1/merchant/products/${_id}`)
        .then((res) => res.json())
        .then((data) => {
            if(data.status === "success"){
                setProducts(data.data.products);
            }else{
                setError(data.message);
            }
            setFetchLoading(false);
        })
        .catch((err) => {
            setError(err.message)
            setFetchLoading(false);
        })
    }

    useEffect(() => {
        fetchMyProducts();
        
        // eslint-disable-next-line
    }, [])
    return (
        <>
        {modalShown && <AddItemModal notification={notification} error={error} addProduct={addProduct} setModalShown={setModalShown} loading={loading}/>}
        <Header />
        <Container>
            <Title>My Store</Title>
            <AddButton onClick={() => setModalShown(true)}>Add New Item</AddButton>
            
            {loading ? <p>Loading...</p> : <></>}
            <Table>
                <thead>
                   <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Delivery Fee</th>
                        <th>Action</th>
                   </tr>
                </thead>   
                <tbody>
                    {products?.map((product:any, idx) => {
                        return (
                            <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{product.title}</td>
                            <td>{product.currency} {product.price}</td>
                            <td>{product.delivery_fee}</td>
                            <td>
                                <Link to={`/product/${product._id}`}>View Product</Link>
                            </td>
                        </tr>    
                        )
                    })}
                </tbody> 
            </Table> 

            {fetchLoading && !error ? <ParagraphText>Fetching data...</ParagraphText> : <></>}
            {error && !fetchLoading? <ParagraphText>{error}</ParagraphText> : <></>}
        
        
        </Container>
        </>
    )
}

export default Dashboard
