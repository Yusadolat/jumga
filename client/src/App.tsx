import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice'


// Pages
import Homepage from './pages/Homepage/Homepage'
import ProductPage from './pages/ProductPage/ProductPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// MERCHANT
import MerchantLogin from './pages/Merchants/Login/Login';
import MerchantSignup from './pages/Merchants/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Verify from './pages/Merchants/Verify/Verify';

// Components
import ScrollToTop from './ScrollToTop';

import './App.css';



const App: React.FC = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const {products, user } = useSelector((state: any) => state);
  console.log({products, user})
  const {isMerchant} = user.user;
  const { isSignedIn } = user;

  console.log(isMerchant, isSignedIn);
  useEffect(() => {
    dispatch(fetchProducts());
  // eslint-disable-next-line
  }, []);


  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route path="/login" render={props => {
          if(isSignedIn && !isMerchant){
            return <Redirect to="/" />
          }else{
            return <Login />
          }
        }
        } component={Login} />
        <Route path="/signup" component={Signup} />



        <Route path="/merchant/login" component={MerchantLogin} />
        <Route path="/merchant/signup" component={MerchantSignup} />
        <Route path="/verify" component={Verify} />

        <Route path="/dashboard" render={props =>  {
          if(isSignedIn){
            return <Dashboard />
          }else if(!isSignedIn && isMerchant){
            return <Redirect to="/merchant/login" />
          }else if(!isSignedIn && !isMerchant) {
            return <Redirect to={{
              pathname: "/login",
            }} />
          }
        }} />
      </Switch>
    </Router>
  );
}

export default App;
