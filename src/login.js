import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


function Login() {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  // const navigate = useNavigate();

  // useEffect(() => {
  //   fetch('/login')
  //     // .then(res => res.json())
  //       .then(user => console.log(user)//this.setState({ user })
  //       );
  // }, []);

  const { register, handleSubmit } = useForm();

  const onSubmit = e => {
    // e.preventDefault(); // prevent page reload

    // setEmail(e.email);
    // setPassword(e.password);

    // fetch('http://localhost:8080/login', {
    fetch('/login', {
      method: "POST",
      redirect: "follow",
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(e)
    })
    .then( res => res.json() )
    .then( json => {
        console.log(json);
        if (json.email) {
          window.location.href = '/';
          this.setEmail(json.email);
        } else {
          alert('login fail!');
        }
      })    
  };


  return (
    <div>
    <h1>{ this }</h1>
    <form onSubmit={ handleSubmit(onSubmit) }>
      <input name="email" placeholder="enter email" { ...register('email', {required: true}) } />
      <input name="password" placeholder="password" type="password" { ...register('password', {required: true}) } />
      <input type="submit" />
    </form>
    </div>
  );
}

export default Login;
