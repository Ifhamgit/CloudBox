import React from 'react';





const Goauth = () => {

  const googleAuthlogin = () => {
		window.open(
      // `${process.env.REACT_APP_API_URL}/auth/google/callback`
			"http://localhost:5000/auth/google/callback",
			"_self"
		);
    }
 
 
  return (
   <div>
         <div className="google-btn my-4" onClick={googleAuthlogin} >
          <div className="google-icon-wrapper">
            <img className="google-icon" alt='' src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
          </div>
          <p className="btn-text"  > Sign in with google</p>
        </div>
        {/* <p>
          <Link to="/signup">Sing Up</Link>
        </p> */}
     
        </div>
);
}


export default Goauth
