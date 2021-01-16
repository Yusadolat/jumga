import React from 'react'
import styled from 'styled-components';

import LoadingImage from './loading.svg';

const LoadingContainer=styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #c3c3c3;

    img{
        width: 200px;
    }
`
const Loading = () => {
    return (
        <LoadingContainer>
            <img src={LoadingImage} alt="loading..."/>
        </LoadingContainer>
    )
}

export default Loading
