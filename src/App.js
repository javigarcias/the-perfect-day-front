import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header/Header';
import Register from './containers/Register/Register';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path='/' component={Home} />
          <Route path='/register' component={Register} exact/>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
