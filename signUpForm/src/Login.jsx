// import { useState } from 'react'
// import './styles.css';
// import { Link,useNavigate } from 'react-router-dom';

// function Login(){
//   const [email,setEmail] = useState("")
//   const [password,setPassword] = useState("")
//   const navigate =useNavigate()
//   function handle() {
//     const storedUser = JSON.parse(localStorage.getItem("user"))
//     let user = storedUser.find((user) => user.email === email && user.pass === password)
//     if(user){
//       navigate('/welcome')
//     }else{
//       alert("Something is wrong")
//     }
//   }
//   return (
//     <>
//       <h2> Login </h2>
//       <label htmlFor='email'>Email : </label>
//       <input type='email' placeholder='abc@mail.com' name='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//       <label htmlFor='password'>Password : </label>
//       <input type='password' name='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit" onClick={handle}>Submit</button>
//       <label>Don't have an account?</label>
//       <Link to='/signup'>Signup</Link>
//     </>
//   )
// }

// export default Login

import { useState } from 'react';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle changes to form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    let newErrors = {};
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      return;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      localStorage.setItem('token', response.data.token);  // Save JWT token
      console.log(response)
      navigate('/welcome');
    } catch (error) {
      setErrors({ email: "Invalid credentials", password: "" });
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error-text">{errors.email}</p>}
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      <Link to="/delete-account">Delete account</Link>
    </div>
  );
}

export default Login;
