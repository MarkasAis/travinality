import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';

import { GuideProvider } from './context';
import { AuthProvider } from './context';

import HomePage from './components/Home';
import AboutPage from './components/About';
import GuideSearchPage from './components/GuideSearch';
import GuidePage from './components/GuidePage';
import LoginPage from './components/Login';
import ProfilePage  from './components/Profile';

import BugReport from './components/BugReport';

const App = (props) => {
  return (
    <AuthProvider>
      <GuideProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/about' component={AboutPage} />
            <Route exact path='/search' component={GuideSearchPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/guide/:id' render={props =>
              <GuidePage id={parseInt(props.match.params.id)} {...props} />} />
          </Switch>
          <BugReport />
        </BrowserRouter>
      </GuideProvider>
    </AuthProvider>
  );
}

export default App;
