/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { Link, Route, BrowserRouter, Switch  } from "react-router-dom";
import login from './Login';
import chat from './Chat';

function Web() {
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");

  useEffect (() => {
    console.log('use Effect');
    fetch("/isUser", {
      method: "GET", 
      // redirect: "follow",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      // credentials: "same-origin",
      // body: JSON.stringify(e),
    })
    .then(res => res.json())
    .then(user => {
      console.log('is Authenticated?');
      console.log(user);
      setEmail(user.email);
    });
  });
  
  return (
    <div>
    <Route exact path="/">
      <h1>email:{email} </h1>
      <Link to="/login"> Login .. </Link>
      <p></p>
      <Link to="/chat"> Chat .. </Link>
     </Route>
    <Route path="/login" component={ login } email={email} name={name}></Route>
    <Route path="/chat" component={ chat }></Route>
    </div>
  );
}

export default Web;
