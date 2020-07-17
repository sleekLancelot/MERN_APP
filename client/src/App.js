import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ContactState from './context/contact/ContactState';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import './App.css';
import Home from './components/pages/Home'
import About from './components/pages/About'
import Navbar from './components/layout/Navbar'
import LorR from './components/pages/LorR';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';


const App = () => {
  return (
    <AuthState>
      <AlertState>
        <ContactState>
          <Router>
            <Fragment>
              <Navbar />
              <Alert />
              <Switch>
                <PrivateRoute exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/register' render={props => (
                  <LorR {...props} word={'register'} logger={false} regger={true} />
                )} />
                <Route path='/login' render={props => (
                  <LorR {...props} word={'login'} logger={true} regger={false} />
                )} />
              </Switch>
            </Fragment>
          </Router>
        </ContactState>
      </AlertState>
    </AuthState>
  );
}

export default App;
