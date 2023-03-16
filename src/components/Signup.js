import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const host = "http://localhost:5000"
  const[credentials, setCredentials] = useState({name:"", cpassword:"", email:"", password:""})

  let navigate = useNavigate();
 


  const onchange = (e)=>{
    //The significane of "...note" here is that a new object is created with setnote which hass all the properties of note just the updation is
    //[e.target.name]:e.target.value .
    setCredentials({...credentials, [e.target.name]:e.target.value})   
  //The [e.target.name]: e.target.value syntax creates a new property on the object with the key equal to the value of e.target.name and
  //the value equal to e.target.value. This allows you to update a specific property of the note object based on the name attribute of the
  //input element that triggered the event.
}


    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password})
  
          })
  
          const json = await response.json()
          console.log(json)
          if(json.success){
            //save the auth-token and redirect
            localStorage.setItem("token", json.authtoken) //The code localStorage.setItem("token", json.authtoken) sets a key-value pair in
            // the browser's localStorage object. The key is "token" and the value is the value of the authtoken property in a JSON object
            // called json.

              //localStorage is a property of the global window object in web browsers that allows you to store data in key-value
              // pairs in the browser. Data stored using localStorage is persistent even after the user closes the browser or navigates 
              //to a different page.

              navigate("/"); //By this hook we will navigate to the home("/") as soon as user puts correct credentials and submits.
              props.showAlert("Account created successfully", "success")
          }
          else{
            props.showAlert("Invalid Credentials", "warning")
          }
    }


  return (
    <div className='mt-3'>
      <h2>Create an account to use CloudBox</h2>
      <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="Name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name"onChange={onchange}  name = "name" aria-describedby="emailHelp"/>
    </div>
    <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" onChange={onchange} name = "email" aria-describedby="emailHelp"/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" onChange={onchange} name='password' id="password" minLength={5} required />
    </div>
    <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control"onChange={onchange} name='cpassword' id="cpassword" minLength={5} required />
                                                                            {/* This "minLength={5} required" functionality works in "onSubmit" */}
    </div>
  
    <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Signup
