import React from 'react'
import styled from 'styled-components';

const Title = styled.h2`
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
`

interface Props {
    title: string;
}
const HeaderTitle:React.FC<Props> = ({title}) => {
    return (
        <Title>{title}</Title>
    )
}

export default HeaderTitle
