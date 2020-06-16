import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import './App.css';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Navbar from './components/layout/Navbar'

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
          </Switch>
        </Fragment>
      </Router>
    </ContactState>
  );
}

export default App;
