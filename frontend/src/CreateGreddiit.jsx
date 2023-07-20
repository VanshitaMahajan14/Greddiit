import React, { useState } from 'react';
//import { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';

const CreateGreddiit = () => {
   //const navigate = useNavigate();

   const [formData, setFormData] = useState({
      name: "",
      description: "",
      tags: "",
      banned: "",
      created_at: new Date().toISOString(),
      followers: "",
      blocked: "",
      leave: "",
      posts: 0,
      greddiitowner:"",
   });

   const [images, setImages] = useState([]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const formDataWithFollowers = { 
            ...formData, 
            created_at: new Date().toISOString(), 
            followers: [localStorage.getItem("currentuserlogged")], 
            greddiitowner: localStorage.getItem("currentuserlogged"),
            blocked: "",
            leave: "",
         };
         

         const response = await fetch("http://localhost:8000/Newgreddiit", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization":`Bearer${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formDataWithFollowers)
         });
         const data = await response.json();
         console.log(data);
         window.location.reload(false);
         alert("Greddiit created successfully!")
      } catch (error) {
         console.error(error);
      }
   };
   

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };


   const ImageChange = (e) => { 
   setImages(Array.from(e.target.files));
};

   return (
      <div class="greddiit-form">
         <h1 class="formname">New Greddiit</h1>
         <form onSubmit={handleSubmit}>
            <div class="user-box">
               <label class="label" htmlFor="">Name</label>
               <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
               />
            </div>
            <div class="user-box">
               <label class="label" htmlFor="">Description</label>
               <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
               />
            </div>
            <div class="user-box">
               <label class="label" htmlFor="">Tags</label>
               <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
               />
            </div>
            <div class="user-box">
               <label class="label" htmlFor="">Banned Keywords</label>
               <input
                  type="text"
                  name="banned"
                  value={formData.banned}
                  onChange={handleChange}
               />
            </div>
            {/* <div class="reg-box">
               <label htmlFor="">Image</label>
               <input
                  type="file"
                  name="image"
                  onChange={ImageChange}
               />

            </div> */}
            <button class="bt" type="submit">Create New Greddiit</button>
         </form>
      </div>
   );
}

export default CreateGreddiit;