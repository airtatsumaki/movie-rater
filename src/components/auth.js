import React, { useState, useEffect } from 'react';
import '../App.css';
import { API } from '../api-service';
//import { TokenContext } from '../index';
import { useCookies } from 'react-cookie';

function Auth(){
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);
  const isDisabled = username.length === 0 || password.length === 0;

  //token and setToken are passed to this component via the 
  //TokenContext component witin index.js
  //const {token, setToken} = useContext(TokenContext);
  const [token, setToken] = useCookies(['token']);

  useEffect(() => {
    // our token object has a propterty of token: '' inside.
    // so have to check token['token']
    console.log(token);
    if(token['token']) {
      window.location.href = "/movies";
    }
  },[token]);

  const loginClicked = () => {
    API.loginUser({username, password})
    .then(resp => setToken('token', resp.token))
    //{username, password} - automatically replaced with {username: username, password: password}
    .catch(error => console.log(error));
    
  }

  const registerClicked = () => {
    API.registerUser({username, password})
    .then(() => loginClicked())
    //{username, password} - automatically replaced with {username: username, password: password}
    .catch(error => console.log(error));
  }

  return (
    <div className="App">
      {!token['token'] ? (
        <div className="login">
          <header className="App-header">
            {isLoginView ? (<h1>Login</h1>) : (<h1>Register</h1>)}
          </header>
          <label htmlFor="username">Username</label><br />
          <input id="username" type="text" placeholder="username" value={username} 
          onChange={evt => setUsername(evt.target.value)} /><br />
          <label htmlFor="password">Password</label><br />
          <input id="password" type="password" placeholder="password" value={password} 
          onChange={evt => setPassword(evt.target.value)} /><br />
          {isLoginView ? (
            <>
            <button className="clickable" onClick={loginClicked} disabled={isDisabled}>Login</button>
            <p>Don't have an account? Register <span className="link clickable" onClick={() => setIsLoginView(false)}>here!</span></p>
            </>
          ) : (
            <>
            <button className="clickable" onClick={registerClicked} disabled={isDisabled}>Register</button>
            <p>Already have an account? Sign in <span className="link clickable" onClick={() => setIsLoginView(true)}>here!</span></p>
            </>
          ) }
        </div>
      ) : null}
    </div>
  )
}

export default Auth;