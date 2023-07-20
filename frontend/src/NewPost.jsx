import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

const NewPost = (greddiitId) => {

  const location = useLocation();
  const Idobtained = location.state.greddiitId;
  console.log("Id obtained:", Idobtained);

  const [formData, setFormData] = useState({
    text: "",
    postedby: "",
    postedin:"",
    upvotes: 0,
    downvotes: 0,
    greddiitId: Idobtained,
    savedflag: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/Newpost`, {
       
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div class="RegForm">
      <h1 class="formname">New Post</h1>
      <form onSubmit={handleSubmit}>
      <div class="reg-box">
          <label htmlFor="">Text</label>
          <input type="text" name="text" value={formData.text} onChange={handleChange} />
        </div>
        {/* <div class="reg-box">
          <label htmlFor="">Posted By</label>
          <input type="text" name="postedby" value={formData.postedby} onChange={handleChange} />
        </div> */}
        <button class="bt" type="submit">
          Create New Post LessGo!
        </button>
      </form>
    </div>
  );
};

export default NewPost;
