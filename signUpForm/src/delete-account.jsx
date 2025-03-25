import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DeleteAccount() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Handle changes to form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/delete-account', formData);
      navigate('/signup');  // Redirect to home or login page after deletion
    } catch (error) {
      alert('Error deleting account: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <label htmlFor="email">Email: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
}

export default DeleteAccount;
