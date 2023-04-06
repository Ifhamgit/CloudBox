import React from 'react';
import { Link } from 'react-router-dom';




const Goauth = () => {

  const googleAuthlogin = () => {
		window.open(
      // `${process.env.REACT_APP_API_URL}/auth/google/callback`
			"http://localhost:5000/auth/google/callback",
			"_self"
		);
    }
  const googleAuthlogout = (userDetails) => {
    const user = userDetails.user;
    const logout = () => {
      window.open("http://localhost:5000/auth/logout", "_self");
    };
}
 
  return (
   <div>
        
         <button className='btn btn-outline-light my-3' onClick={googleAuthlogin}>google login</button> 
        {/* <p>
          <Link to="/signup">Sing Up</Link>
        </p> */}
     
        </div>
);
}


export default Goauth
