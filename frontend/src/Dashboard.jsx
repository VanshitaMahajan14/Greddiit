import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const Dashboard = () => {

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
			navigate("/");
			//navigate back to login page if not logged in
		}

	}, []);


    return (
		<div>
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
					</ul></nav>
        </div>
    );
}


export default Dashboard;
