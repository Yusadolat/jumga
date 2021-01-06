import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './features/products/productsSlice'


// Pages
import Homepage from './pages/Homepage/Homepage'
import ProductPage from './pages/ProductPage/ProductPage';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

// MERCHANT
import MerchantSignup from './pages/Merchants/Signup/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Verify from './pages/Merchants/Verify/Verify';

// Components
import ScrollToTop from './ScrollToTop';

import './App.css';



const App: React.FC = () => {
  const [lastAccessedProduct, setLastAccessedProduct] = useState<string>("")

  const dispatch = useDispatch();
  const {user } = useSelector((state: any) => state);
  const { isMerchant, account_status } = user.user;
  const { isSignedIn } = user;

  useEffect(() => {
    dispatch(fetchProducts());
  // eslint-disable-next-line
  }, []);

  console.log(user)

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/product/:id" render={((props:any) => <ProductPage {...props} setLastAccessedProduct={setLastAccessedProduct} />)} />
        <Route path="/login" render={(props:any) => {
          if(isSignedIn && !isMerchant){
            return <Redirect to="/" />
          }else{
            return <Login {...props} lastAccessedProduct={lastAccessedProduct}/>
          }
        }}/>
        <Route path="/signup" render={((props:any) => <Signup {...props} lastAccessedProduct={lastAccessedProduct} />)}/>


        <Route path="/merchant/signup" component={MerchantSignup} />
        <Route path="/verify" render={(props) => {
          if(!isSignedIn){
            return <Redirect to="/login" />
          }else{
            if(isMerchant && account_status === false){
              return <Verify />
            }else if(isMerchant && account_status === true){
              return <Redirect to="/dashboard" />
            }
          }
        }} />

        <Route path="/dashboard" render={props =>  {
          if(isMerchant){
              if(isSignedIn && account_status === true){
                return <Dashboard />
              }else if(isSignedIn && account_status === false){
                return <Redirect to="/verify" />
              }else{
                return <Redirect to="/merchant/login" />
              }
          }else{
              if(isSignedIn){ 
                return <Dashboard />
              }else{
                return <Redirect to="/login" />
              }
          }
        }} />
      </Switch>
    </Router>
  );
}

export default App;
