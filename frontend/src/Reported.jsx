import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from './MyContext';
import { useNavigate } from "react-router-dom";

const Reported = () => {
    const token = localStorage.getItem("token")
    const [showreports, setShowreports] = useState([]);
    const [deletereports, setDeletereports] = useState([])    //for deletion
    const [posts, setposts] = useState([])                    //for deletion

    const [showLinks, setShowLinks] = useContext(MyContext);
    const [ignoreClicked, setIgnoreClicked] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
            console.log("lae chak mai agya")
            navigate("/");
        }

    }, []);


    const handleDelete = async (report) => {              //delete the particular post as well as the report

        const postId = report.postId
        console.log(postId)
        try {
            const res = await fetch(`http://localhost:8000/Newpost/${postId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setposts(posts.filter(post => post._id !== postId));
            } else {
                console.error(await res.text());
            }
        } catch (error) {
            console.error(error);
        }

        const reportId = report._id
        try {
            const res = await fetch(`http://localhost:8000/Reports/${reportId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                },
            });
            if (res.ok) {
                setDeletereports(deletereports.filter(deletereports => deletereports._id !== reportId));
            } else {
                console.error(await res.text());
            }
        } catch (error) {
            console.error(error);
        }


        const gredId = report.greddiitId

            fetch(`http://localhost:8000/Newgreddiit-decpost/${gredId}`, {

                method: "PUT",
                body: JSON.stringify({ posts: posts - 1 }),
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


        window.location.reload(false);
    }


    const handleIgnore = async (postId) => {                //Ignore the report
        setIgnoreClicked(true);
        // window.location.reload(false)
    }



    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`http://localhost:8000/Reports`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": `Bearer ${token}`,
                    },

                });     //fetching reports
            const data = await res.json();
            setShowreports(data);
            console.log(data);
        };
        fetchData();
    }, []);



    const handleBlock = async (report) => {
        // update Greddiit with a new blocked user
        const newBlockedUser = report.reporteduser
        const greddiitId = report.greddiitId
        console.log(newBlockedUser)


        fetch(`http://localhost:8000/Newgreddiit-blocked/${greddiitId}`, {
            method: "PUT",
            body: JSON.stringify({ $push: { blocked: newBlockedUser } }),
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




        // const reportId = report._id
        // try {
        //     const res = await fetch(`http://localhost:8000/Reports/${reportId}`, {
        //         method: 'DELETE',
        //         headers: {
        //             "Content-Type": "application/json",
        //             "authorization": `Bearer ${token}`,
        //         },
        //     });
        //     if (res.ok) {
        //         setDeletereports(deletereports.filter(deletereports => deletereports._id !== reportId));
        //     } else {
        //         console.error(await res.text());
        //     }
        // } catch (error) {
        //     console.error(error);
        // }




        //remove him from followers
        fetch(`http://localhost:8000/Newgreddit-removefollower/${greddiitId}`, {
            method: "PUT",
            body: JSON.stringify({ $pull: { followers: newBlockedUser } }),
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
    }

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
            {showreports.filter(report => report.greddiitId === localStorage.getItem("currentgredID") &&
                report.moderator === localStorage.getItem("currentuserlogged")).map(report =>
                (<div class="report-container">
                    <p>Reported by : {report.username}</p>
                    <p>Text of post: {report.text}</p>
                    <p>Reported user :{report.reporteduser}</p>
                    <p>Concern for report: {report.Concern}</p>
                    <div class="action-buttons">
                        <button class="action-block-button" disabled={ignoreClicked} onClick={() => handleBlock(report)}>Block User</button>
                        <button className="action-delete-button" onClick={() => handleDelete(report)} disabled={ignoreClicked}>Delete Reported Post</button>
                        <button className="action-ignore-button" onClick={handleIgnore} disabled={ignoreClicked}>Ignore</button>
                    </div>
                </div>
                ))}
        </>
    );
}


export default Reported;
