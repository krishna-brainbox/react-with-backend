import React from 'react'
import './welcome.css'
import { Link,useNavigate } from 'react-router-dom'
function Welcome() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Welcome to my page</h1>
      <button onChange={()=>navigate(-1)}> Go back </button>
    </>
  )
}

export default Welcome