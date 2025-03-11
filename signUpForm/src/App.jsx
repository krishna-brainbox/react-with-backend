// import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Login from './Login'
import Signup from './SignUp'
import Welcome from './Welcome'
import { BrowserRouter,Routes,Route, useNavigate} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
      <BrowserRouter>
      <AutoRedirect />
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/welcome' element={<Welcome />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

function AutoRedirect() {
  const navigate= useNavigate();
  useEffect(() => {
    navigate('/login');
  },[]);
  return null;
}

export default App
