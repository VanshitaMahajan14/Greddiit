import React from 'react';
import Navbar from './Navbar';
import "./Navbar.css";
import sky from './sky2.jpg'

import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


const SavedPosts = () => {

    const navigate = useNavigate()
    const [savedpost, showSaved] = useState([]);
    const token = localStorage.getItem("token")


    useEffect(() =>             //fetching data from Newposts url
    {
        const fetchsaved = async () => {
            const res = await fetch(`http://localhost:8000/Newpost`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                    },

                });
            const data = await res.json();
            showSaved(data);
        };
        console.log("fetching")
        fetchsaved();
    }, []);


    useEffect(() => {
        if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
            console.log("lae chak mai agya")
            navigate("/");
        }

    }, []);

    const handleupvote = (post) => {
        if (post.liked.includes(localStorage.getItem("currentuserlogged"))) {
            alert("You have already upvoted this post")
            return
        }
        const id = post._id
        const newlike = localStorage.getItem("currentuserlogged")
        console.log(newlike)
        fetch(`http://localhost:8000/Newpost-like/${id}`, {
            method: "PUT",
            body: JSON.stringify({ $push: { liked: newlike } }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload(false)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handledownvote = (post) => {
        if (post.liked.includes(localStorage.getItem("currentuserlogged"))) {
            alert("You have already downvoted this post")
            return
        }
        const id = post._id
        const newdislike = localStorage.getItem("currentuserlogged")
        fetch(`http://localhost:8000/Newpost-dislike/${id}`, {
            method: "PUT",
            body: JSON.stringify({ $push: { disliked: newdislike } }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload(false)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const handlefollow = () => {

    }
    const handleremove = (post) => {                 //remove from saved posts
        const id = post._id
        const unsave = localStorage.getItem("currentuserlogged")     //removing user from list of saved in the post

        fetch(`http://localhost:8000/Newpost-unsaved/${id}`, {
            method: "PUT",
            body: JSON.stringify({ $pull: { saved: unsave } }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload(false)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const filteredSavedPost = savedpost.filter(post => post.saved.includes(localStorage.getItem("currentuserlogged")));

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
                </ul></nav>
            <div class="posts-area">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1 className="headingclass"> Posts in this Greddiit</h1>
                {filteredSavedPost.map(post => (
                    <div className="greddiit-container" key={[post]._id}>
                        <div class="card">
                            {/* <div class="card-header">
                                <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div> */}
                            <div class="card-body">
                                <div class="post-content">
                                    <h3 style={{ color: "black" }}>
                                        Posted By: {post.postedby}
                                    </h3>
                                    <p style={{ color: "black" }}>{post.text}</p>
                                </div>

                                <br></br>
                                <div class="icon-container">
                                    <span class="material-icons" onClick={() => handleupvote(post)}>thumb_up</span>
                                    <span class="material-icons" onClick={() => handledownvote(post)}>thumb_down</span>
                                </div>
                                <div class="post-data">
                                    <p>Upvotes: {post.liked.length} Downvotes: {post.disliked.length}</p>
                                </div>
                                {/* <button className="comment-button" onClick={() => setShowCommentForm(post._id)}>
                                        Add Comment
                                    </button> */}
                                <br></br>
                                <button className='follow-button' onClick={handlefollow}>Follow Profile</button>
                                <br></br>
                                <button onClick={() => handleremove(post)}>Remove</button>
                                <br></br>
                                <div class="user">
                                    <img src={sky} alt="" />
                                    <div class="user-info">
                                        <small>Created at {post.postedin}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </>
    );
}
export default SavedPosts;