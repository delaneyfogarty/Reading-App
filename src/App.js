// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { logout, getUser } from './services/supabase';
// import { convertText } from './services/fetch-utils';
import AuthPage from './AuthPage';
import ProfilePage from './ProfilePage';
import Home from './Home';
import DetailPage from './DetailPage';
import AboutUs from './AboutUs';
import UpdateProfilePage from './UpdateProfilePage';
import Library from './Library';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = getUser();

    if (user) {
      setToken(user.access_token);
      setEmail(user.email);
    }
  }, []);

  async function handleLogout() {
    await logout();
    setEmail('');
    setToken('');
  }

  return (
    <>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/library">Library</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/update">Update Profile</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <p>{email}</p>
                {/* <p>{token}</p> */}
                <button onClick={handleLogout}>Log out</button>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route exact path="/">
              {token ? (
                <Redirect to="/profile" />
              ) : (
                <AuthPage setEmail={setEmail} setToken={setToken} />
              )}
            </Route>
            <Route exact path="/profile">
              {token ? <ProfilePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/update">
              {token ? <UpdateProfilePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/library">
              {token ? <Library /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/detail/:id">
              {token ? <DetailPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/about">
              {token ? <AboutUs /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/home">
              {token ? <Home /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
