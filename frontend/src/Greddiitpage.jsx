import React, { useSyncExternalStore } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { MyContext } from './MyContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

import sky from "./sky2.jpg"


const Greddiitpage = () => {


    useEffect(() => {
        if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
           //back to login page if user not logged
            navigate("/");
        }

    }, []);



    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const { greddiitId } = useParams();
    const [showLinks, setShowLinks] = useContext(MyContext);
    const commentFormRef = useRef(null);
    const reportFormRef = useRef(null);


    const [greddiit, setGreddiit] = useState({});     //for retreiving
    const [showpost, setShowpost] = useState([]);     //for retreiving
    const [showcomments, setComments] = useState([])  //for retreiving


    const [showPostForm, setShowPostForm] = useState(false);
    const [PostData, setPostData] = useState({
        text: "",
        postedby: "",
        postedin: "",
        greddiitId: "",
        savedflag: 0,
        saved: "",
        liked: "",
        disliked: "",
    });

    const [showcommentform, setShowCommentForm] = useState(false);
    const [commentData, setCommentData] = useState({
        comment: "",
        username: "",
        postId: ""
    })

    const [showreportform, setShowReporttForm] = useState(false);
    const [reportData, setReportdata] = useState({
        username: "",
        text: "",
        Concern: "",
        reporteduser: "",
        postId: "",
        greddiitId: "",
        moderator: ""
    })

    const [followdata, setFollowData] = useState({
        username: "",
        followedby: "",
    })

    const [postId, setPostId] = useState("")

    useEffect(() => {
        const fetchData = async () => {                           //fetching Greddiit info to display on left side of page
            const res = await fetch(`http://localhost:8000/Newgreddiit/${greddiitId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log('greddiitId:', greddiitId);
            console.log('data:', data);
            setGreddiit(data);
        };
        fetchData();
    }, [greddiitId]);

    const moderator = greddiit.greddiitowner

    useEffect(() => {
        const fetchposts = async () => {                           //fetching posts info to display on right side of page
            const res = await fetch(`http://localhost:8000/Newpost`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },

            });
            const data = await res.json();
            console.log('data:', data);
            setShowpost(data);
        };
        fetchposts();
    }, []);

    useEffect(() => {
        const fetchcomments = async () => {                       //fetching comments
            const res = await fetch(`http://localhost:8000/Comments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log('data:', data);
            setComments(data);
        };
        fetchcomments();
    }, [])


    //increments the likes on the post if a user likes it
    
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
            
            //push the user into the array of users that have liked the post
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

    //increments the dowvotes on a post if a user downvotes the post
    const handledownvote = (post) => {
        if (post.disliked.includes(localStorage.getItem("currentuserlogged"))) {
            alert("You have already downvoted this post")
            return
        }
        const id = post._id
        const newdislike = localStorage.getItem("currentuserlogged")
        fetch(`http://localhost:8000/Newpost-dislike/${id}`, {
            method: "PUT",
            //push the new user into array of users that have downvoted the post
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

    const CreateNewPost = () => {
        setShowPostForm(true);
    };
    const handlecomments = () => {
        setShowCommentForm(true)
    }
    const handlereport = () => {
        setShowReporttForm(true)
    }

    const handlefollow = async (post) => {
        if (post.postedby === localStorage.getItem("currentuserlogged")) {
            alert("You cannot follow your own profile!")
            return
        }
        console.log(post.postedby)
        setFollowData({
            ...followdata,
            username: post.postedby,
            followedby: localStorage.getItem("currentuserlogged")
        })
        try {
            const response = await fetch("http://localhost:8000/Followedby",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...followdata, username: post.postedby, followedby: localStorage.getItem("currentuserlogged")
                    })
                });
            const data = await response.json();
            console.log(data);
            window.location.reload(false)
            alert(`You started following ${post.postedby}`)
        }
        catch (error) {
            console.error(error);
        }
    }
     //adds the user to the list of users who have saved the post
    const handlesavedposts = (post) => {
        const id = post._id
        if (!post.saved.includes(localStorage.getItem("currentuserlogged"))) {
            const newsave = localStorage.getItem("currentuserlogged")
            fetch(`http://localhost:8000/Newpost-saved/${id}`, {
                method: "PUT",
                body: JSON.stringify({ $push: { saved: newsave } }),
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
        }
    };

    const handlecommentsubmit = (postId) => async (e) => {
        e.preventDefault();

        const commentInput = commentFormRef.current.querySelector('input[name="comment"]');
        const commentValue = commentInput.value.trim();

        if (!commentValue) {
            alert('Please enter a comment!');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8000/Comments`, {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...commentData, username: localStorage.getItem("currentuserlogged"), postId: postId }),
            });
            const data = await response.json();
            console.log(data);
            window.location.reload(false)
        } catch (error) {
            console.error(error);
        }
    };


    const handlereportsubmit = (post, moderator) => async (e) => {
        e.preventDefault();

        const reportInput = reportFormRef.current.querySelector('input[name="Concern"]');
        const reportValue = reportInput.value.trim();

        if (!reportValue) {
            alert('Please state a concern for the report!');
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/Reports', {

                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...reportData, username: localStorage.getItem("currentuserlogged"), text: post.text, reporteduser: post.postedby, postId: post._id, greddiitId: post.greddiitId, moderator: moderator }),
            });
            const data = await response.json();
            console.log(data);
            window.location.reload(false)
        } catch (error) {
            console.error(error);
        }
    };


    const handlePostSubmit = (greddiit) => async (e) => {
        e.preventDefault();
        console.log(greddiit._id)

        const bannedWords = greddiit.banned
        console.log(bannedWords)
        const replaceString = "*".repeat(3);

        // Check if the post contains any banned words
        const postText = PostData.text.toLowerCase();
        const BannedWords = bannedWords.some(word => postText.includes(word));

        // If the post contains banned words, alert the user and replace the words

        if (BannedWords) {
            alert("Your post contains banned keywords.");
            const filteredText = bannedWords.reduce((text, word) => {
                const regex = new RegExp(word, "gi");
                return text.replace(regex, replaceString);
            }, PostData.text);
            PostData.text = filteredText
        }

        try {
            const response = await fetch(`http://localhost:8000/Newpost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...PostData, postedby: localStorage.getItem("currentuserlogged"), postedin: new Date().toISOString(), greddiitId: greddiit._id }),
            });
            const data = await response.json();
            console.log(data);
            console.log(data.postsCount)
        }
        catch { }

        const gredId = greddiit._id
        const posts = greddiit.posts
        console.log(gredId)

        fetch(`http://localhost:8000/Newgreddiit-incpost/${gredId}`, {           //increasing post count for greddiit

            method: "PUT",
            body: JSON.stringify({ posts: posts + 1 }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // window.location.reload(false)
            })
            .catch((error) => {
                console.error(error);
            });

        window.location.reload(false);
    };





    const handlePostChange = (e) => {
        setPostData({ ...PostData, [e.target.name]: e.target.value });
    }

    const handleCommentChange = (e) => {
        setCommentData({ ...commentData, [e.target.name]: e.target.value })
    }

    const handleReportChange = (e) => {
        setReportdata({ ...reportData, [e.target.name]: e.target.value })
    }

    return (
        <div><header>
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
        </header>
            <div class="khaali"></div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start"
            }}>
                <div class="container" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", height: "00px" }}>
                    {greddiit.name && (
                        <div class="greddiit-info">
                            <h1>{greddiit.name}</h1>
                            <p>Description: {greddiit.description}</p>
                            <p>Tags: {greddiit.tags}</p>
                            <p>Posts: {greddiit.posts}</p>
                            <p>Created By: {greddiit.greddiitowner}</p>
                            <p> Banned Keywords: {greddiit.banned}</p>
                            <p>Created on: {greddiit.created_at.substring(0,10)} at {greddiit.created_at.substring(11,19)} </p>
                            <br></br>
                            <div class="new-post-button">
                                <button onClick={CreateNewPost}>CREATE NEW POST</button>
                            </div>
                            {showPostForm && (
                                <form onSubmit={handlePostSubmit(greddiit)}>
                                    <div class="reg-box">
                                        <label htmlFor="">Text</label>
                                        <input type="text" name="text" value={PostData.text} onChange={handlePostChange} />
                                    </div>
                                    <button type="submit">Submit</button>
                                </form>
                            )}
                        </div>
                    )}
                </div>

                <div class="posts-area">
                    <h1 className="headingclass"> Posts in this Greddiit</h1>
                    {showpost.filter(post => post.greddiitId === greddiit._id).map(post => (
                        <div className="greddiit-container" key={[post]._id}>
                            <div class="card">
                                {/* <div class="card-header">
                                <img src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                            </div> */}
                                <div class="card-body">
                                    <br></br>
                                    {/* <span class="tag tag-teal">Non Fiction</span> */}
                                    <div class="post-content">
                                        <h3 style={{ color: "black" }}>
                                            Posted By: {greddiit.blocked.includes(post.postedby) ? "Blocked User" : post.postedby}
                                        </h3>

                                        <p style={{ color: "black" }}>{post.text}</p>
                                    </div>
                                    <br></br>
                                    <div class="icon-container">
                                        <span class="material-icons" onClick={() => handleupvote(post)}>thumb_up</span>
                                        <span class="material-icons" onClick={() => handledownvote(post)}>thumb_down</span>
                                    </div>
                                    <div class="post-data">
                                        <p>Upvotes: {post.liked.length - 1} Downvotes: {post.disliked.length - 1}</p>
                                        {showcomments.filter(comments => comments.postId === [post]._id).map(comments =>
                                        (
                                            <p style={{ color: "black" }}>{comments.username} : {comments.comment}</p>
                                        ))}
                                    </div>
                                    <button className="comment-button" style={{ borderColor: "black" }} onClick={handlecomments}>
                                        Add Comment
                                    </button>
                                    {showcommentform &&
                                        <form onSubmit={handlecommentsubmit(post._id)} ref={commentFormRef}>
                                            <div>500px
                                                <label>Add comment</label>
                                                <input name="comment" type="text" value={commentData.comment} onChange={handleCommentChange}></input>
                                            </div>
                                            <button class="comment-button" type="submit">Submit</button>
                                        </form>
                                    }
                                    <br></br>
                                    <button className='follow-button' onClick={() => handlefollow(post)}>Follow Profile</button>
                                    <br></br>
                                    <button onClick={() => handlesavedposts(post)}>Save Post</button>
                                    <br></br>
                                    {post.postedby !== localStorage.getItem("currentuserlogged") &&
                                        <button onClick={handlereport}>Report</button>
                                    }
                                    {showreportform &&
                                        <form onSubmit={handlereportsubmit(post, moderator)} ref={reportFormRef}>
                                            <div>
                                                <label>State concern for report</label>
                                                <input name="Concern" type="text" value={reportData.Concern} onChange={handleReportChange}></input>
                                            </div>
                                            <button class="comment-button" type="submit">Submit</button>
                                        </form>
                                    }
                                    <br></br>
                                    <br></br>
                                    <div class="user">
                                        <img src={sky} alt="" />
                                        <div class="user-info">
                                            <small>Created on: {post.postedin.substring(0,10)} at {post.postedin.substring(11,19)}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};


export default Greddiitpage;






