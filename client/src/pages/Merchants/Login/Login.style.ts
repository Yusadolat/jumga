import styled from 'styled-components';
export const FormContainer = styled.div`
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

form {
    font-family: "Be Vietnam", sans-serif;
    width: 500px;
    box-shadow: 1px 4px 30px 2px rgba(0,0,0,0.015);
    text-align: center;
    background: var(--light);
    padding: 40px 30px;
    border-radius: 9px;
    input{
        width: 100%;
        height: 45px;
        border: 1px solid rgba(0,0,0,.34);
        border-radius: 8px;
        padding: 10px;
        margin-top: 30px;
        font-size: 18px;
    }
    button {
        height: 45px;
        width: 190px;
        cursor: pointer;
        border: none;
        background: var(--main-green);
        font-size: 17px;
        font-weight: 500;
        color: #fff;
        display: block;
        margin: 20px auto;
    }
    span{
        text-align: left !important;
        color: var(--darkred);
    }
    @media screen and (max-width: 450px){
        width: 90%;
    }
}
`