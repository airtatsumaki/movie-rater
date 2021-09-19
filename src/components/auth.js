import React, { useState, useEffect } from 'react';
import '../App.css';
import { API } from '../api-service';
//import { TokenContext } from '../index';
import { useCookies } from 'react-cookie';

function Auth(){
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
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

  return (
    <div className="App centerMe">
      {!token['token'] ? (
        <div className="login">
          <label htmlFor="username">Username</label><br />
          <input id="username" type="text" placeholder="username" value={username} 
          onChange={evt => setUsername(evt.target.value)} /><br />
          <label htmlFor="password">Password</label><br />
          <input id="password" type="password" placeholder="password" value={password} 
          onChange={evt => setPassword(evt.target.value)} /><br />
          <button onClick={loginClicked}>Login</button>
        </div>
      ) : null}
    </div>
  )
}

export default Auth;