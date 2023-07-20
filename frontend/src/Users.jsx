import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { MyContext } from './MyContext';
import { useNavigate } from "react-router-dom";

const UserList = () => {

    const navigate = useNavigate

    useEffect(() => {
        if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
            console.log("lae chak mai agya")
            navigate("/");
        }
    }, []);
    const token = localStorage.getItem("token")
    const [showLinks, setShowLinks] = useContext(MyContext);

    const [greddiit, setGreddiit] = useState([]);     //for retreiving

    const gredId = localStorage.getItem("currentgredID")

    useEffect(() => {
        const fetchGreddiit = async () => {
            const res = await fetch(`http://localhost:8000/Newgreddiit/${gredId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },

            });
            const data = await res.json();
            // console.log('greddiitId:', gredId);
            // console.log('data:', data);
            setGreddiit([data]); // Set greddiit as an array with one element
        };
        fetchGreddiit();
    }, [gredId]);

    const moderator = greddiit.greddiitowner
    console.log(moderator)

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
            <div class="khaali"></div>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
            <div class="main">
                <div class="card-post">
                    <div class="posthai">
                        {/* <img class="posthai-image" src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" /> */}

                        <div class="posthai-content">
                            <p class="posthai-text">
                                <div class="blocked-users">

                                    <p>BLOCKED USERS</p>
                                    {greddiit.filter(greddiit => greddiit._id === localStorage.getItem("currentgredID") &&
                                        greddiit.greddiitowner === localStorage.getItem("currentuserlogged")).map(greddiit => (
                                            <div>
                                                {greddiit.blocked.map((blocked, index) => (
                                                    <React.Fragment key={index}>
                                                        <p style={{ marginLeft: "0px", marginRight: "20px" }}>{blocked}</p>
                                                        {index !== greddiit.blocked.length - 1 && <br />} {/* add a <br /> tag after each follower name, except for the last one */}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ))}

                                    <div class="other-users" style={{ alignItems: "center", justifyContent: "center" }}>
                                        <p>OTHER USERS</p>
                                        {greddiit.filter(greddiit => greddiit._id === localStorage.getItem("currentgredID") &&
                                            greddiit.greddiitowner === localStorage.getItem("currentuserlogged")).map(greddiit => (
                                                <div>
                                                    {greddiit.followers.map((followers, index) => (
                                                        <React.Fragment key={index}>
                                                            <p style={{ marginLeft: "0px", marginRight: "20px" }}>{followers}</p>
                                                            {index !== greddiit.followers.length - 1 && <br />} {/* add a <br /> tag after each follower name, except for the last one */}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserList;