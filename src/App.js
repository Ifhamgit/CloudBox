import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
import { Navigate } from "react-router-dom";


function App() {
//  let navigate = useNavigate();
  const[alert,setAlert] = useState(null)
  const [user, setUser] = useState(null);
  const showAlert =(message, type) => {
    setAlert({
      msg: message,
      type: type
  })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
}
	// const getUser = async () => {
   
	// 	try {
	// 		const url = "http://localhost:5000/auth/login/success";
	// 		const { data } = await axios.get(url, { withCredentials: true });
     
  //       // store the JWT in local storage
  //       if(data.user){
  //       localStorage.setItem("token", data.authToken) 
  //       console.log("done")
  //       }
  //     console.log(data)
  //     const user2 = await data.user._json
  //     setUser(user2);
  //     // if(user){
  //     //   localStorage.setItem("token", data.authToken) 
     
      
  //     // console.log(user)
      
  //     // const json = await data.json()
  //     // if(json.success){
  //     //   //save the auth-token and redirect
  //     //   localStorage.setItem("token", json.authToken) //The code localStorage.setItem("token", json.authtoken) sets a key-value pair in
  //     //   // the browser's localStorage object. The key is "token" and the value is the value of the authtoken property in a JSON object
  //     //   // called json.

  //     //     //localStorage is a property of the global window object in web browsers that allows you to store data in key-value
  //     //     // pairs in the browser. Data stored using localStorage is persistent even after the user closes the browser or navigates 
  //     //     //to a different page.

  //     //     // props.showAlert("Welcome User", "success")
  //     //     navigate("/"); //By this hook we will navigate to the home("/") as soon as user puts correct credentials and submits.
  //     // }

	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
  
	//  useEffect(() => {
	//  	getUser()
	//  }, []);

  

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert = {showAlert}/>}></Route>
              <Route exact path="/about" element={<About/>}></Route>
              {/* <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login showAlert={showAlert}/>}></Route> */}
              <Route exact path="/login" element={ <Login showAlert={showAlert}/>}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
              {/* <Route exact path="/login"	element={user ? <Navigate to="/" /> : <Login />}/> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;


//react app api url - http://localhost:5000