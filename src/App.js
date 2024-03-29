import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState} from "react";
import Alert from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";


// import { Navigate } from "react-router-dom";


function App() {

  const[alert,setAlert] = useState(null)

  const showAlert =(message, type) => {
    setAlert({
      msg: message,
      type: type
  })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
}
  
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