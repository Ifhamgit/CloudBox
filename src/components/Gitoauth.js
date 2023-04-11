import React from 'react'




function Gitoauth() {


  const githubAuthlogin = () => {
		window.open(
      // `${process.env.REACT_APP_API_URL}/auth/github/callback`
			"http://localhost:5000/auth/github/callback",
			"_self"
		);
    }
  return (
    <div>
      {/* <button className='btn-social btn-github' onClick={githubAuthlogin}>Sign In with Github</button> */}
      {/* <button className=" btn btn-block btn-social btn-github fa fa-github"> Sign in with Github </button> */}
      <button className="github-btn"  onClick={githubAuthlogin}><i className="fab fa-github"></i> Sign In with GitHub</button>

     
      
    </div>
  )
}

export default Gitoauth
