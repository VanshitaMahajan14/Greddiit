import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import bcrypt from 'bcrypt.js';

const RegisterForm = (props) => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    email: "",
    pass: "",
    age: "",
    contact: "",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // Check for empty fields
  //   for (const key in formData) {
  //     if (formData[key] === '') {
  //       alert('Please fill all fields');
  //       return;
  //     }
  //   }
  //   try {
  //     const response = await fetch('http://localhost:8000/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //     alert('Successfully registered!');
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   // navigate('/');
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === '') {
        alert('Please fill all fields');
        return;
      }
    }
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert(data.error);
      } else {
        alert('Successfully registered!');
      }
    } catch (error) {
      console.error(error);
    }
    // navigate('/');
  };
  
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div class="Reg-Form">
      <h1 class="Regheading">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <div class="reg-box">
          <label className="labelhai"  htmlFor="">First Name</label>
          <input className= "inputclass"
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
          />
        </div>
        <div class="reg-box">
          <label className="labelhai" htmlFor="">Last Name</label>
          <input className= "inputclass"
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
          />
        </div>
        <div class="reg-box">
          <label className="labelhai"  htmlFor="">User Name</label>
          <input className= "inputclass"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div class="reg-box">
          <label className="labelhai"  htmlFor="">Email</label>
          <input className= "inputclass"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div class="reg-box">
          <label className="labelhai"  htmlFor="">Password</label>
          <input className= "inputclass"
            type="text"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
          />
        </div>
        <div class="reg-box">
          <label className="labelhai"  htmlFor="">Age</label>
          <input className= "inputclass"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div class="reg-box">
          <label className="labelhai"  htmlFor="">Contact</label>
          <input className= "inputclass"
            type="number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <br></br>
        <br></br>
        <button class="reg-bt" type="submit" >Register</button>
        <button class="reg" type="button" onClick={() => props.onFormSwitch('login')}>Already have an account? Login</button>
      </form>
    </div>
  );
}

export default RegisterForm;