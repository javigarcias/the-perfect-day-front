import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Restaurants from './containers/Restaurant/Restaurant';
import Photographers from './containers/Photographers/Photographers';
import Florist from './containers/Florist/Florist';
import Beauty from './containers/Beauty/Beauty';
import Review from './containers/Review/Review';
import Profile from './containers/Profile/Profile';
import Opinion from './containers/Opinion/Opinion';


function App() {
  return (
    <BrowserRouter>
      
        <Header />
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/restaurants' component={Restaurants} exact/>
          <Route path='/photographers' component={Photographers} exact/>
          <Route path='/florist' component={Florist} exact/>
          <Route path='/beauty' component={Beauty} exact/>
          <Route path='/review' component={Review} exact/>
          <Route path='/profile' component={Profile} exact/>
          <Route path='/opinion' component={Opinion} exact/>

        </Switch>
    
    </BrowserRouter>
  );
}

export default App;
