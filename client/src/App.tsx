import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addProducts } from './features/products/productsSlice'


// Pages
import Homepage from './pages/Homepage/Homepage'
import ProductPage from './pages/ProductPage/ProductPage';
import Login from './pages/Login/Login';
import CartPage from './pages/CartPage/CartPage';

// Components
import ScrollToTop from './ScrollToTop';

import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        dispatch(addProducts(json));
      })
      .catch(err => console.log({ err }))
  // eslint-disable-next-line
  }, []);


  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/:category/:id" component={ProductPage} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={CartPage} />
      </Switch>
    </Router>
  );
}

export default App;
