import React from 'react'
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Goauth from './Goauth'
import axios from 'axios';



const Login = (props) => {

  const host = "http://localhost:5000"
  const[credentials, setCredentials] = useState({email:"", password:""})
  const [user, setUser] = useState(null);

  let navigate = useNavigate();
  const [focusedE, setFocusedE] = useState(false);
  const [focusedP, setFocusedP] = useState(false);

  
  const onchangeE = (e)=>{
    //The significane of "...note" here is that a new object is created with setnote which hass all the properties of note just the updation is
    //[e.target.name]:e.target.value .
    setCredentials({...credentials, [e.target.name]:e.target.value})   
  //The [e.target.name]: e.target.value syntax creates a new property on the object with the key equal to the value of e.target.name and
  //the value equal to e.target.value. This allows you to update a specific property of the note object based on the name attribute of the
  if(!e.target.value){
    setFocusedE(false)
  }else{
    setFocusedE(true)
  }
}
  const onchangeP = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})   
    
    if(!e.target.value){
      setFocusedP(false)
    }else{
      setFocusedP(true)
    }
}


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
  
          })
  
          const json = await response.json()
          console.log(json)
          if(json.success){
            //save the auth-token and redirect
            localStorage.setItem("token", json.authToken) //The code localStorage.setItem("token", json.authtoken) sets a key-value pair in
            // the browser's localStorage object. The key is "token" and the value is the value of the authtoken property in a JSON object
            // called json.

              //localStorage is a property of the global window object in web browsers that allows you to store data in key-value
              // pairs in the browser. Data stored using localStorage is persistent even after the user closes the browser or navigates 
              //to a different page.

              props.showAlert("Welcome User", "success")
              navigate("/"); //By this hook we will navigate to the home("/") as soon as user puts correct credentials and submits.
          }
          else{
            props.showAlert("Invalid Credentials", "warning")
          }
    }

    const getUser = async () => {
   
      try {
        const url = "http://localhost:5000/auth/login/success";
        const { data } = await axios.get(url, { withCredentials: true });
       
          // store the JWT in local storage
           if(data.user){
           localStorage.setItem("token", data.authToken) 
           navigate("/");
          // console.log("done")
           }
        const user2 = await data.user_json
        setUser(user2);
  
      } catch (err) {
        console.log(err);
      }
    };
    
     useEffect(() => {
       getUser()
     }, []);


  return (
    
    <div className="login-box">
      
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
    <label className={focusedE ? "d-none" : ""}>Email</label>
      <input type="email" name="email" value={credentials.email} onChange={onchangeE} required=""/>
      
    </div>
    <div className="user-box">
    <label className={focusedP ? "d-none" : ""}>Password</label>
      <input type="password" value={credentials.password} onChange={onchangeP} name="password"  required=""/>
      
    </div>
    <input type="submit" name="login" value="login"/>
    <Goauth/>
   
    {/* <a href=" You forgot your password?">
    Forgot your password?
  </a> */}
  </form>

 
</div>

    
  )
}

export default Login

