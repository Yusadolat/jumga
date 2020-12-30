import React from 'react';
import styled from 'styled-components'

const MainDiv = styled.div`
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
    h1{
        font-size: 100px;
        line-height: 1.2;
        margin: 0;
        font-weight: 300;
        span{
            font-weight: 700;
        }
    }
`
const Main:React.FC = () =>  {
    return (
        <MainDiv>
            <h1>Shop <br/><span>with Jumga</span></h1>
        </MainDiv>
    )
}

export default Main
