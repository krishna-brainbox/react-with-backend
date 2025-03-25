import React from 'react'
import './welcome.css'
import { Link,useNavigate } from 'react-router-dom'
function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to my page</h1>
      <button onClick={()=>navigate(-1)}> Go back </button>
      <Link to="/delete-account">Delete account</Link>
    </>
  )
}

export default Welcome