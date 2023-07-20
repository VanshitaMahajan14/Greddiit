import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import { MyProvider } from './App';
import { MyContext } from './MyContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Fuse from 'fuse.js'
import { useRef } from 'react';
import { createContext } from 'react';
const SubGreddiits = () => {

//    const buttonRef = useRef()

    useEffect(() => {
        if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
            console.log("lae chak mai agya")
            navigate("/");
        }

    }, []);
    const [searchTerm, setSearchTerm] = useState('');
    const [showLinks, setShowLinks] = useContext(MyContext);
    const [greddiits, setGreddiits] = useState([]);

    const [requestdata, setRequestdata] = useState({
        requestedby: "",
        requestedto: "",
        greddiitname: "",
    })

    const options = {
        includeScore: true,
        keys: ['name', 'tags']
    };


    // function handleClick() {
    //     if (buttonRef.current.disabled) {
    //         alert('You have left this greddiit once. You cannot join it again');
    //     }
    // }

    const fuse = new Fuse(greddiits, options);
    const filteredGreddiits = searchTerm === '' ? greddiits : fuse.search(searchTerm).map(item => item.item);


    const token = localStorage.getItem("token")
    const navigate = useNavigate();

    const handleChange = (e) => {             //setting search term
        setSearchTerm(e.target.value);
    };


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:8000/Newgreddiit',
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                    },
                });
            const data = await res.json();
            setGreddiits(data);
        };
        fetchData();
    }, []);

    const handleOpenClick = (greddiitId) => {
        localStorage.setItem("currentgredID", greddiitId)
        setShowLinks(true);
        navigate(`/Newgreddiit/${greddiitId}`);
    };

    const joingreddiit = async (greddiit) => {
        try {
            const response = await fetch("http://localhost:8000/Joinrequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ ...requestdata, requestby: localStorage.getItem("currentuserlogged"), requestedto: greddiit.greddiitowner, greddiitname: greddiit.name, greddiitId: greddiit._id })

            });
            const data = await response.json();
            console.log(data);
            alert("Join request sent")
        } catch (error) {
            console.error(error);
        }
    };

    // const filteredGreddiits = greddiits.filter((greddiit) => {                 //applying search methodology
    //     const lower = searchTerm.toLowerCase();
    //     const hasNameMatch = greddiit.name.toLowerCase().includes(lower);
    //     const hasTagMatch = greddiit.tags.some((tag) => tag.toLowerCase().includes(lower));           //matching tags
    //     return hasNameMatch || hasTagMatch;
    // });

    const sortbyname = () => {
        setGreddiits([...greddiits].sort((a, b) => a.name.localeCompare(b.name)));
    }
    const sortbyfollowers = () => {

        setGreddiits([...greddiits].sort((a, b) => a.followers - b.followers))

    }

    const sortbycreationdate = () => {
        setGreddiits([...greddiits].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));

    }

    const leavegreddiit = (gred) => {
        console.log("hello")
        const newLeaveUser = localStorage.getItem("currentuserlogged");
        const greddiitId = gred._id;
        console.log(greddiitId);
        console.log(newLeaveUser);


        fetch(`http://localhost:8000/Newgreddiit-leave/${greddiitId}`, {     //adding user to leave array of greddiit
            method: "PUT",
            body: JSON.stringify({ $push: { leave: newLeaveUser } }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                // window.location.reload(false);
            })
            .catch((error) => {
                console.error(error);
            });

        fetch(`http://localhost:8000/Newgreddit-removefollower/${greddiitId}`, {
            method: "PUT",
            body: JSON.stringify({ $pull: { followers: newLeaveUser } }),
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.reload(false);
                // Reload the page or update the UI as needed
            })
            .catch((error) => {
                console.error(error);
            });

    };

    // const [isDisabled, setIsDisabled] = useState(false);
    // const [Joindisabled, setJoinDisabled] = useState(false)

    const handleLeaveGreddiit = (greddiit) => {
        leavegreddiit(greddiit);
        // setIsDisabled(true);
    };

    const handleJoinGreddiit = (greddiit) => {
        joingreddiit(greddiit)
        // Joindisabled(true)
    }


    return (
        <div>
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
            <div className="search-container">
                <i className="fa fa-search search-icon"></i>
                <input
                    className="search-input"
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search..."
                    style={{ color: "black", caretColor: "auto", width: "300px" }}
                />

                <div class="subgredbuttonsforsort">
                    <button class="sort-button" style={{ color: "white", width: "200px", height: "50px", backgroundColor: "#1F5673" }} onClick={sortbyname}>Sort by name</button>
                    <br></br>
                    <button class="sort-button" style={{ color: "white", width: "200px", height: "50px", backgroundColor: "#759FBC" }} onClick={sortbyfollowers}>Sort by no. of followers</button>
                    <br></br>
                    <button class="sort-button" style={{ color: "white", width: "200px", height: "50px", backgroundColor: "#90C3C8" }} onClick={sortbycreationdate}>Sort by Creation Date</button>
                </div>
            </div>
            <div class="joinedsub">
                <h1 style={{ color: 'black', textAlign: 'center', fontFamily: "fantasy" }}>
                    Joined Sub Greddiits
                </h1>
                <div className="subgreddiit-list">

                    {filteredGreddiits.filter(greddiit => greddiit.followers.includes(localStorage.getItem("currentuserlogged"))).map((greddiit) => (

                        <div className="subgreddiit-container" key={greddiit._id}>
                            <h3 className="gsubreddiit-header">Name: {greddiit.name}</h3>
                            <p className="subgreddiit-description">
                                Description: {greddiit.description}
                            </p>
                            <p className="subgreddiit-tags">
                                Tags: {greddiit.tags.join(', ')}
                            </p>
                            <p className="subgreddiit-tags">
                                Posts: {greddiit.posts}
                            </p>
                            <p className="subgreddiit-tags">
                                Created By: {greddiit.greddiitowner}
                            </p>
                            <p className="greddiit-banned">Banned Keywords: {greddiit.banned.join(',')}</p>
                            <p className='follower_class'>Followers:  {greddiit.followers.length}</p>
                            <p className="creationdate">Created at: {greddiit.created_at} </p>

                            <button
                                className="open-button"
                                onClick={() => handleOpenClick(greddiit._id)}
                            >
                                Open
                            </button>


                            <button
                                className={`leave-button ${localStorage.getItem("currentuserlogged") === greddiit.greddiitowner ? 'leavedisabled' : 'leaveenabled'}`}
                                onClick={() => handleLeaveGreddiit(greddiit)}
                                disabled={localStorage.getItem("currentuserlogged") === greddiit.greddiitowner}>
                                Leave
                            </button>

                        </div>
                    ))}
                </div>
                <h1 style={{ color: 'black', textAlign: 'center', fontFamily: 'Mynerve' }}>
                    Other Sub Greddiits
                </h1>
                {filteredGreddiits.filter(greddiit => !greddiit.followers.includes(localStorage.getItem("currentuserlogged"))).map((greddiit) => (
                    <div className="subgreddiit-container" key={greddiit._id}>
                        <h3 className="subgreddiit-header">Name: {greddiit.name}</h3>
                        <p className="subgreddiit-description">Description: {greddiit.description}</p>
                        <p className="subgreddiit-tags">Tags: {greddiit.tags.join(', ')}</p>
                        <p className='follower_class'>Followers:  {greddiit.followers.length}</p>
                        <p className="greddiit-banned">Banned Keywords: {greddiit.banned.join(',')}</p>
                        <p className="subgreddit-description">Created By: {greddiit.greddiitowner}</p>
                        <button
                            className={`join-button ${localStorage.getItem("currentuserlogged") === greddiit.greddiitowner ? 'joindisabled' : 'joinenabled'}`}
                            onClick={() => handleJoinGreddiit(greddiit)}
                            disabled={greddiit.leave.includes(localStorage.getItem("currentuserlogged"))}>
                            Join
                        </button>
                        {localStorage.getItem("currentuserlogged") !== greddiit.greddiitowner && greddiit.leave.includes(localStorage.getItem("currentuserlogged")) && (
    <script>alert("You left the greddiit!");</script>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubGreddiits;
