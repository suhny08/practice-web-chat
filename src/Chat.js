/*eslint-disable*/
import React, { useState, useEffect } from "react";


function Chat() {
  const [ email, setEmail ] = useState("");

  const bodyStyle = {
    margin: '0', 
    paddingBottom: '3rem'
  }
  const formStyle = {
    background: 'rgba(0, 0, 0, 0.15)',
    padding: '0.25rem',
    position: 'fixed', 
    bottom: '0', left: '0', right: '0', 
    display: 'flex', 
    height: '3rem', 
    boxSizing: 'border-box', 
    backdropFilter: 'blur(10px)'
  }
  const inputStyle = {
    border: 'none',
    padding: '0 1rem',
    flexGrow: '1',
    borderRadius: '2rem', 
    margin: '0.25rem',
    borderRadius: '3px', 
    outline: 'none', 
  }
  const buttonStyle = {
    background: '#0080ff',
    borderRadius: '3px', 
    color: '#fff'
  }


  
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
      if (!user) {
        // alert('login first');
        // window.location.href = '/';
      }
    });
  });

  return (
    <div>
    <h1>Chat here!</h1>
    <div>

    </div>
    <div>
    <form id="form" action="" style={formStyle}>
      <input id="input" style={inputStyle}/><button style={buttonStyle}>Send</button>
      </form>
    </div>
    </div>
  );
}

export default Chat;
