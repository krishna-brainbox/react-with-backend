import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './styles.css'
import axios from 'axios';


function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Handle changes to form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/signup', formData);
      navigate('/welcome');
    } catch (error) {
      alert('Error creating account'+ error);
    }
  };
  return (
    <>
      <h2> Signup </h2>
      <label htmlFor='email'>Email : </label>
      <input type='email' placeholder='abc@mail.com' name='email' id='email' value={formData.email} onChange={handleChange} />
      <label htmlFor='password'>Password : </label>
      <input type='password' name='password' id='password' value={formData.password} onChange={handleChange} />
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <label>Alrerady have an account?</label> <Link to='/login'>Login</Link>
    </>
  )
}

export default Signup

// function Signup(){
//   const [email,setEmail] = useState("")
//   const [password,setPassword] = useState("")
//   const navigate = useNavigate()
//   function handle() {
//     const storedUser = JSON.parse(localStorage.getItem("user")) || []
//     storedUser.push({email : email,pass:password})
//     localStorage.setItem('user',JSON.stringify(storedUser))
//     navigate('/welcome')
//   }