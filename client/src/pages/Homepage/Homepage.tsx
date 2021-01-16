import React from 'react';

import {useSelector}  from 'react-redux';




// Components
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main'

interface Props {
    products: Array<any>
}


const Homepage:React.FC<Props> = () => {

    const products = useSelector((state: any) => state.products);

    const {loading, error} = products;   
    return (
       <>
       <Header />
       <Main />
       <div style={{textAlign: 'center'}}>
            {error ? <p>{error}</p> : <></>}

            {loading ? <h3 style={{color: 'red'}}>FETCHING ITEMS...</h3> : <></>}
       </div>
       
       {!loading && !error ? <FeaturedProducts products={products.products} title="Featured Products"/> : <></>}
       </>
    )
}


export default Homepage;
