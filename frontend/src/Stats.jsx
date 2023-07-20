import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { MyContext } from './MyContext';


const Stats = () => {
    const [showLinks, setShowLinks] = useContext(MyContext);
    return(
        <>
              <nav className="navbar" style={{justifyContent: "center", alignContent: "center"}}>
                <ul className="nav-items">
                    <li className="nav-item">
                        <Link to="/Profile" className="nav-link" style={{fontSize: "15px"}}>
                            <FontAwesomeIcon icon={faUser} /> PROFILE
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/MySubGreddiits" className="nav-link" style={{fontSize: "15px"}}>
                            <FontAwesomeIcon icon={faLayerGroup} /> MY SUBGREDDIITS
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/SubGreddiits" className="nav-link" style={{fontSize: "15px"}}>
                            <FontAwesomeIcon icon={faLayerGroup} /> SUBGREDDIITS
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/SavedPosts" className="nav-link" style={{fontSize: "15px"}}>
                            <FontAwesomeIcon icon={faBookmark} /> SAVED POSTS
                        </Link>
                    </li>
                    {showLinks && (
                        <ul className="nav-items">
                            <li className="nav-item">
                                <Link to="/Users" className="nav-link" style={{fontSize: "15px"}}>
                                    <FontAwesomeIcon icon={faUsers} /> USERS
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Joinrequests" className="nav-link" style={{fontSize: "15px"}}>
                                    <FontAwesomeIcon icon={faUserPlus} /> JOIN REQUESTS
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Stats" className="nav-link" style={{fontSize: "15px"}}>
                                    <FontAwesomeIcon icon={faChartBar} /> STATS
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/Reportedpages" className="nav-link" style={{fontSize: "15px"}}>
                                    <FontAwesomeIcon icon={faExclamationTriangle} /> REPORTED POSTS
                                </Link>
                            </li>
                        </ul>
                    )}
                </ul></nav>
        </>
    );


}

export default Stats;