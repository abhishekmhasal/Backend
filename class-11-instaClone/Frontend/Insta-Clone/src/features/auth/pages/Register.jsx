import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios"

const Register = () => {

const [username, setUsername] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')

 async function submitHandler(e){
  e.preventDefault()


  axios.post("http://localhost:3000/api/auth/register",{
    username,email,password
  },{
    withCredentials: true
  })
.then(res=>{
  console.log(res.data);
  
})
}



  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={submitHandler} >
          <input onInput={(e)=>{setUsername(e.target.value)}}type="text" name="username" placeholder="enrter username" />

          <input onInput={(e)=>{setemail(e.target.value)}} type="text" name="email" placeholder="enter email" />

          <input onInput= {(e)=>{setpassword(e.target.value)}}type="text" name="password" placeholder="enter password" />

          <button type="submit">Register</button>
        </form>
        <p>
          already an account?
          <Link to="/login" className="toggle-auth-form">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
