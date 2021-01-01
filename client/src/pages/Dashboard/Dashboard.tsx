import React, {useState} from 'react'
import styled from 'styled-components';

import {Container} from '../../styles/GlobalStyles'
import Header from '../../components/Header/Header';

const Title = styled.h5`
    font-size: 20px;
    text-align: center;
    margin-top: 50px;
`
const Table = styled.table`
    width: 100%;
    margin-top: 20px;
    background: #fcefce;
    padding: 20px;

    tbody tr {
       border: 1px solid rgba(0,0,0, 0.5);
    }
    td {
        text-align: center;
        padding-bottom: 10px;
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
        padding: 20px;
        text-align: center;
        position: relative;

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
            color: #3c3c34;
        }
        input {
            width: 80%;
            margin: 10px auto;
            padding: 10px;
            border-radius: 10px;
            font-size: 15px;
            display: block;
        }
    }

`
const AddItemModal = ({setModalShown}:any) => {
    return(
        <ModalContainer>
            <form action="">
                <span className="close" onClick={() => setModalShown(false)}>X</span>
                <h3>Add Item</h3>
                <input type="text" placeholder="Item Name"/>
                <input type="number" placeholder="Item Price"/>

                <input type="submit" value="Add Item" />
            </form>
        </ModalContainer>
    )
}
const Dashboard = () => {
    const [modalShown, setModalShown] = useState(true)
    return (
        <>
        {modalShown && <AddItemModal setModalShown={setModalShown}/>}
        <Header />
        <Container>
            <Title>Past Orders</Title>
            <button onClick={() => setModalShown(true)}>Add New Item</button>
            <Table>
                <thead>
                   <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Order ID</th>
                        <th>Item Price</th>
                        <th>Action</th>
                   </tr>
                </thead>   
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Black T-Shirt</td>
                        <td>As332432434234</td>
                        <td>$200</td>
                        <td>
                            <button>View Product</button>
                        </td>
                    </tr>    
                </tbody> 
            </Table> 
        </Container>
        </>
    )
}

export default Dashboard
