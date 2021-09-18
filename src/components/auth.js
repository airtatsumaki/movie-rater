import React, { useState, useEffect } from 'react';
import '../App.css';
import { API } from '../api-service';

function Auth(){
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const loginClicked = () => {
    API.loginUser({username, password})
    .then(resp => console.log(resp.token))
    //{username, password} - automatically replaced with {username: username, password: password}
    .catch(error => console.log(error));
  }

  return (
    <div className="App centerMe">
      <div className="login">
        <label htmlFor="username">Username</label><br />
        <input id="username" type="text" placeholder="username" value={username} 
        onChange={evt => setUsername(evt.target.value)} /><br />
        <label htmlFor="password">Password</label><br />
        <input id="password" type="password" placeholder="password" value={password} 
        onChange={evt => setPassword(evt.target.value)} /><br />
        <button onClick={loginClicked}>Login</button>
      </div>
    </div>
  )
}

export default Auth;