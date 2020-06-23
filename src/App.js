import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './Components/Mystyles.css';
import Regform from './Components/Regform';
import Login from './Components/Login';
import Success from './Components/Success';
import Userdata from './Components/Userdata';

function App() {
  return (
    <Router>
    <div>
    <Route exact path="/" component={Regform} />
    <Route path="/login" component={Login} />
    <Route path="/success" component={Success} />
    <Route path="/userdata" component={Userdata} />
    </div>
    </Router>
  );
}

export default App;
