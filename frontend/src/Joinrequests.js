import './Navbar.css'

import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from './MyContext';


const Joinrequests = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState([]);  // for retreiving
  const [showLinks, setShowLinks] = useContext(MyContext);
  const token = localStorage.getItem("token")
  useEffect(() => {
    const fetchrequests = async () => {  // fetching requests
      const res = await fetch(`http://localhost:8000/Joinrequest`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log('data:', data);
      setRequests(data);
    };
    fetchrequests();
  }, []);



  useEffect(() => {
    if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
      console.log("lae chak mai agya")
      navigate("/");
    }

  }, []);


  const handlereject = async (reqId) => {  // delete the request
    try {
      const res = await fetch(`http://localhost:8000/Joinrequest/${reqId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setRequests(requests.filter(greddiit => greddiit._id !== reqId));
      } else {
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleaccept = async (request) => {
    const greddiitId = request.greddiitId;
    const newFollower = request.requestby

    // Send PUT request to server to update Greddiit document
    fetch(`http://localhost:8000/Newgreddiit-followers/${greddiitId}`, {
      method: "PUT",
      body: JSON.stringify({ $push: { followers: newFollower } }),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });


    const reqId = request._id

    try {
      const res = await fetch(`http://localhost:8000/Joinrequest/${reqId}`, {   //delete after accepting
        method: 'DELETE',
        headers:
        {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`,
        }
      });
      if (res.ok) {
        setRequests(requests.filter(greddiit => greddiit._id !== reqId));
      } else {
        console.error(await res.text());
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
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
          {showLinks && (
            <ul className="nav-items">
              <li className="nav-item">
                <Link to="/Users" className="nav-link" style={{ fontSize: "15px" }}>
                  <FontAwesomeIcon icon={faUsers} /> USERS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Joinrequests" className="nav-link" style={{ fontSize: "15px" }}>
                  <FontAwesomeIcon icon={faUserPlus} /> JOIN REQUESTS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Stats" className="nav-link" style={{ fontSize: "15px" }}>
                  <FontAwesomeIcon icon={faChartBar} /> STATS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Reportedpages" className="nav-link" style={{ fontSize: "15px" }}>
                  <FontAwesomeIcon icon={faExclamationTriangle} /> REPORTED POSTS
                </Link>
              </li>
            </ul>
          )}
        </ul></nav>
      <div class="khaali"></div>
      <div>
        {requests.filter(request =>
          request.requestedto === localStorage.getItem("currentuserlogged") &&
          request.greddiitId === localStorage.getItem("currentgredID")).map(request =>
          (<div class='request-container' key={request._id}>
            <p>{request.requestby} requested to join the greddiit {request.greddiitname} </p>
            <div class='request-buttons'>
              <button class='accept-button' onClick={() => handleaccept(request)} >Accept</button>
              <button class='reject-button' onClick={() => handlereject(request._id)}>Reject</button>
            </div>
          </div>
          ))}
      </div>
    </>

  );
}

export default Joinrequests;


// request.greddiitId === localStorage.getItem("currentgredID")