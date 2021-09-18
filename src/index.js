import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Auth from './components/auth';
import { BrowserRouter, Route } from "react-router-dom";

//context used as a global variable for all components
export const TokenContext = createContext(null);

function Router(){

  // this state is passed via a context so all children to use it
  const [token, setToken] = useState('');

  return (
    
    <React.StrictMode>
      {/* wrapping the app in the context tag lets all children 
          read the context data from value=TOKEN*/}
      <TokenContext.Provider value={{token, setToken}}>
        <BrowserRouter>
          <Route exact path="/" component={Auth} />
          <Route exact path="/movies" component={App} />
        </BrowserRouter>
      </TokenContext.Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
