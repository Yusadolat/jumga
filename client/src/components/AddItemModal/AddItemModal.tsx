import React, {useState} from 'react';
import styled from 'styled-components';


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
    loading: boolean;
}
type FormProps = {
    title: string;
    price: string;
    delivery_fee: string;
    currency: string;
}
const AddItemModal = ({notification, error, setModalShown, addProduct, loading}:ModalProps) => {
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
        addProduct(data);
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
                <input type="submit" value={loading ? "Adding..." :"Add Item"} />
            </form>
        </ModalContainer>
    )
}

export default AddItemModal
