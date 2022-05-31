// import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { logout } from './services/supabase';
// import { convertText } from './services/fetch-utils';
import AuthPage from './AuthPage';
import ProfilePage from './ProfilePage';
import FavoritesPage from './FavoritesPage';
import DetailPage from './DetailPage';
import AboutUs from './AboutUs';

function App() {
  const [email, setEmail] = useState();
  const [token, setToken] = useState();
  
  return (
    <> 
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Library</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <p>{email}</p>
                <p>{token}</p>
                <button onClick={logout}>Log out</button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              {
                token 
                  ? <Redirect to="/library" /> 
                  : <AuthPage setEmail={setEmail} setToken={setToken} />
              }
            </Route>
            <Route exact path="/profile">
              {
                token 
                  ? <ProfilePage /> 
                  : <Redirect to='/' />
              }
            </Route>
            <Route exact path="/favorites">
              {
                token 
                  ? <FavoritesPage /> 
                  : <Redirect to='/' />
              }          
            </Route>
            <Route exact path="/library/:id">
              {
                token 
                  ? <DetailPage /> 
                  : <Redirect to='/' />
              }              
            </Route>
            <Route exact path="/about">
              {
                token 
                  ? <AboutUs /> 
                  : <Redirect to='/' />
              }          
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
