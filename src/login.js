/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import { useHistory } from "react-router-dom";

function Login(props) {
  // const [ email, setEmail ] = useState("");
  // const [ password, setPassword ] = useState("");
  // const [ name, setName ] = useState("");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('/login')
  //     // .then(res => res.json())
  //       .then(user => console.log(user)//this.setState({ user })
  //       );
  // }, []);

  const { register, handleSubmit } = useForm();
  const history = useHistory(); 

  // const onSubmit = e => {
    // e.preventDefault(); // prevent page reload

    // setEmail(e.email);
    // setPassword(e.password);

    // fetch('http://localhost:8080/login', {
  //   fetch('/login', {
  //     method: "POST",
  //     redirect: "follow",
  //     credentials: 'include',
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(e)
  //   })
  //   .then( res => res.json() )
  //   .then( json => {
  //       console.log(json);
  //       if (json.email) {
  //         setEmail(json.email);
  //         console.log(email);
  //         window.location.href = '/';
  //       } else {
  //         alert('login fail!');
  //       }
  //     })    
  // };

//   useEffect(() => {
//     fetch("/login", {
//       method: "POST", 
//       redirect: "follow",
//       credentials: 'include',
//       headers: {
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify(e)
//     })
//     .then(res => res.json())
//     .then(json => {
//       setEmail(json.email);
//       console.log(email);
//       window.location.href = '/';
//     })
//   })
// };

useEffect(() => {
  // fetchData()?
}, []);

const onSubmit = e => {
  // e.preventDefault();
  fetch("/login", {
    method: "POST", 
    redirect: "follow",
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    // credentials: "same-origin",
    body: JSON.stringify(e),
  })
  .then(res => res.json())
  .then(json => {
    if (json.email) {
      // setEmail(json.email);
      window.location.href = '/'; 

      history.push('/');
    } else {
      // server.js 에서 반환받은 값(userData와 비교해서 존재유무 false)
      alert('login failed!');
    }
  })
};



  return (
    <div>
      <h1>{props.email}</h1>
    <form onSubmit={ handleSubmit(onSubmit) }>
      <input name="email" placeholder="enter email" { ...register('email', {required: true}) } />
      <input name="password" placeholder="password" type="password" { ...register('password', {required: true}) } />
      <input type="submit" />
    </form>
    </div>
  );
}

export default Login;
