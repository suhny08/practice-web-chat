/*eslint-disable*/
import React, { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { KimProfile, LeeProfile } from "./profile";

// const socket = io("http://localhost:3000/chat");
const socket = io();

function Chat(props) {
  
  const user = props.location.state.user.email;
  console.log(user);
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
  const liStyle = {
    fontSize: '20px'
  }
  const liStyleRight = {
    fontSize: '20px',
    textAlign: 'right'
  }
const pStyle = {
  fontSize: '12px'
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
        alert('login first');
        // window.location.href = '/';
      }
    });
  }, []);
  
  useEffect(() => {
    // console.log(window.localStorage);
    if ( window.localStorage.chats ) {
      setChats(JSON.parse(window.localStorage.chats));
    }
  }, []);
  
  useEffect(() => {
    socket.on("broadcast", msg => {
      setChats([...chats, msg]);
      window.localStorage.setItem(
        "chats", 
        JSON.stringify([...chats, msg]),
        );
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const nowDate = new Date();
     socket.emit ('send-message', { user: user, message: imessage, date: nowDate.toLocaleString() });
  };


  const handleChange = (e) => {
    setiMessage(e.target.value);
  }



  useEffect(() => {
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
    <h1>Chat Here!</h1>

    <div>
      <div>
        <ul>
          { 
            chats.map((e, index) => {
              if (e.user === "kim") {
              return <li key={index} style={liStyleRight}> <KimProfile /> {e.user + ": " + e.message}  
               <p style={pStyle}>{e.date}</p> </li> 
              } else {
              return <li key={index} style={liStyle}> <LeeProfile />  {e.user + ": " + e.message}  
               <p style={pStyle}>{e.date}</p> </li> 
              }
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


