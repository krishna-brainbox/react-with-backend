import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './styles.css'
import axios from 'axios';


function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle changes to form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async () => {
    let newErrors = {};
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long, include one letter, one number, and one special character.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
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
      {errors.email && <p className="error-text">{errors.email}</p>}
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