import React from 'react';

import {useSelector}  from 'react-redux';




// Components
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main'

interface Props {
    products: Array<any>
}

const categories = ["men clothing", "jewelery", "electronics", "women clothing", ];

const Homepage:React.FC<Props> = () => {

    const products = useSelector((state: any) => state.products);
    
    return (
       <>
       <Header />
       <Main />
       
       {categories.map((item, idx) => <FeaturedProducts key={idx} products={products} title={item}/>)}
       </>
    )
}


export default Homepage;
