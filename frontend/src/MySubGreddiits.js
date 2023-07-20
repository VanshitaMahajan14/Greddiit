import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './Navbar';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const MySubGreddiits = () => {

  useEffect(() => {
    if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
      console.log("lae chak mai agya")
      navigate("/");
    }

  }, []);
  const navigate = useNavigate();

  const [greddiits, setGreddiits] = useState([]);
  const [greddiitform, setShowGreddiitForm] = useState(false)
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
    greddiitowner: "",
  });

  
  const token = localStorage.getItem("token")
  useEffect(() => {           //showing the greddiits
    const fetchData = async () => {
      const res = await fetch('http://localhost:8000/Newgreddiit', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      })
      const data = await res.json();
      setGreddiits(data);
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
      console.log("lae chak mai agya")
      navigate("/");
    }

  }, []);


  const deletegreddiit = async (greddiitId) => {           //deleting Greddiits
    try {
      const res = await fetch(`http://localhost:8000/Newgreddiit/${greddiitId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setGreddiits(greddiits.filter(greddiit => greddiit._id !== greddiitId));
      } else {
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };


  // const handlenewgreddiit = () => {
  //   navigate('/CreateGreddiit');
  // }



  const handlenewgreddiit = () => {
    setShowGreddiitForm(true)
  }


  const handleOpenClick = (greddiitId) => {
    navigate(`/Newgreddiit/${greddiitId}`);
  }

  const sortbyname = () => {
    setGreddiits([...greddiits].sort((a, b) => a.name.localeCompare(b.name)));
  }

  const sortbyfollowers = () => {
    setGreddiits([...greddiits].sort((a, b) => a.followers.length - b.followers.length))
  }

  const sortbycreationdate = () => {
    setGreddiits([...greddiits].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataWithFollowers = {
        ...formData,
        created_at: new Date().toISOString(),
        followers: [localStorage.getItem("currentuserlogged")],
        greddiitowner: localStorage.getItem("currentuserlogged"),
      };

      const token = localStorage.getItem("token"); // get the JWT token from local storage
      const response = await fetch("http://localhost:8000/Newgreddiit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formDataWithFollowers),
      });
      const data = await response.json();
      console.log(data);
      window.location.reload(false);
      alert("Greddiit created successfully!");
    } catch (error) {
      console.error(error);
    }
  };


  return (



    <div className="mainclass">
      <nav className="navbar" style={{ justifyContent: "center", alignContent: "center" }}>
        <ul className="nav-items">
          <li className="nav-item">
            <Link to="/Profile" className="nav-link" style={{ fontSize: "15px" }}>
              <FontAwesomeIcon icon={faUser} /> PROFILE
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/MySubGreddiits" className="nav-link" style={{ fontSize: "15px" }}>
              <FontAwesomeIcon icon={faLayerGroup} /> MY SUBGREDDIITS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/SubGreddiits" className="nav-link" style={{ fontSize: "15px" }}>
              <FontAwesomeIcon icon={faLayerGroup} /> SUBGREDDIITS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/SavedPosts" className="nav-link" style={{ fontSize: "15px" }}>
              <FontAwesomeIcon icon={faBookmark} /> SAVED POSTS
            </Link>
          </li>
        </ul></nav>
      <div class="khaali"></div>
      <button class="newgredbt" onClick={handlenewgreddiit} style={{ backgroundColor: "#D1C8E1", height: "50px", fontFamily: "fantasy", width: "200px", fontSize: "17px", borderRadius: "10px" }}>
        Create New Greddiit
      </button>
      {greddiitform &&


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
          <button class="gredbt" type="submit">Create</button>
        </form>
      }
      <div class="buttonsforsort">
        <button class="sort-button" style={{ color: "white", width: "200px", height: "50px", backgroundColor: "#1F5673" }} onClick={sortbyname}>Sort by name</button>
        <br></br>
        <button class="sort-button" style={{ color: "white", width: "200px", height: "50px", backgroundColor: "#759FBC" }} onClick={sortbyfollowers}>Sort by no. of followers</button>
        <br></br>
        <button class="sort-button" style={{ color: "white", width: "200px", height: "50px", backgroundColor: "#90C3C8" }} onClick={sortbycreationdate}>Sort by Creation Date</button>
      </div>
      {greddiits.filter(greddiit => greddiit.greddiitowner === localStorage.getItem("currentuserlogged")).map(greddiit => (
        <div className="mygreddiit-container" key={greddiit._id}>
          <h3 className="mygreddiit-header">{greddiit.name}</h3>
          <p className="mygreddiit-description">Description: {greddiit.description}</p>
          <p className="mygreddiit-tags">Tags: {greddiit.tags.join(', ')}</p>
          <p className="mygreddiit-banned">Banned Keywords: {greddiit.banned.join(',')}</p>
          <p className="mygreddiit-owner">Created By: {greddiit.greddiitowner}</p>
          <p className='follower_class'>Followers: {greddiit.followers.length}</p>
          <p>Created at: {greddiit.created_at}</p>
          <button className="mysubdelete-button" onClick={() => deletegreddiit(greddiit._id)}>Delete</button>
          <button className="mysubopen-button" onClick={() => handleOpenClick(greddiit._id)}>Open</button>
        </div>
      ))}
    </div>
  );
}


export default MySubGreddiits;