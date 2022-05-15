/*eslint-disable*/
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000/chat", { transports: ['websocket'] });


function Chat() {
  const [ email, setEmail ] = useState("");
  const [ imessage, setiMessage ] = useState("");
  const [ chats, setChats ] = useState([]);

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

  }, []);


  useEffect(() => {
    // var socket = io.connect('http://localhost:3000');
    // io.connect('http://localhost:3000');
    return () => {
      // socket.close();
    };
  }, []); 
  

  
  function emit() {
    // var socket = io();
    // socket.emit('user-send', 'hello');
  }

  const handleSubmit = e => {
    e.preventDefault();
    var socket = io();
    socket.emit('send-message', imessage);
    setChats([...chats, imessage]);
  };

  const handleChange = e => {
    setiMessage(e.target.value);
  }


  useEffect(() => {
    var socket = io();
    socket.on("broadcast", (msg) => {

      setChats([...chats, msg]);
      console.log(chats);
    });
  }, []);

  return (
    <div>
    <h1>Chat here!</h1>

    <div>
      <div>
        <ul>
          {
            chats.map(e => {
              return <li key={e.id}>{chats}</li>
            })
          }
        </ul>
      </div>
      <div>
        <form id="form" style={formStyle} onSubmit={handleSubmit}>
          <input id="input" style={inputStyle} onChange={handleChange} value={imessage}/>
          <button id="button" style={buttonStyle} type="submit"> Send </button>
        </form>
      </div>
      </div>

    </div>
  );
}

export default Chat;


