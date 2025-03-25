// import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import Login from './Login'
import Signup from './SignUp'
import Welcome from './Welcome'
import DeleteAccount from './delete-account'
import { BrowserRouter,Routes,Route, useLocation, useNavigate} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  return (

      <BrowserRouter>
      {/* <AutoRedirect /> */}
        <Routes>
          <Route path="/" element={<AutoRedirect />} />
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/welcome' element={<Welcome />}></Route>
          <Route path='/delete-account' element={<DeleteAccount />}></Route>
        </Routes>
      </BrowserRouter>
  );
}

function AutoRedirect() {
  const navigate= useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate('/login');
  },[location.pathname]);

  return null;
}

export default App
