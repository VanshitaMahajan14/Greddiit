import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Navbar.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLayerGroup, faBookmark, faImage, faUsers, faUserPlus, faChartBar, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap'
import flower from './flower.jpg';


const Profile = () => {

	const navigate = useNavigate();

	const [userdetails, setUserdetails] = useState([])           //for fetching
	const [showEditForm, setShowEditForm] = useState(false)

	const [deletefollow, setDeleteFollow] = useState([])         //for deleting
	const [showFollowerModal, setShowFollowerModal] = useState(false);
	const [showFollowingModal, setShowFollowingModal] = useState(false);

    const token = localStorage.getItem("token")
	const handleFollowerClick = () => {
		setShowFollowerModal(!showFollowerModal);
	};

	const handleFollowingClick = () => {
		setShowFollowingModal(!showFollowingModal);
	};


	const [newdetails, setNewDetails] = useState({     //for updating new details in backend
		fname: "",
		lname: "",
		age: "",
		contact: ""
	})

	const [error, setError] = useState(null)

	const [followerdata, setfollowerdata] = useState([])

	useEffect(() => {
		if (localStorage.getItem("logged") === "false" || (!localStorage.getItem("logged"))) {
			console.log("lae chak mai agya")
			navigate("/");
		}

	}, []);


	useEffect(() => {
		const fetchuserdetails = async () => {            //fetching user details
			try {
				const res = await fetch('http://localhost:8000/register',{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"authorization": `Bearer ${token}`,
					  },
				});
				const data = await res.json();
				setUserdetails(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchuserdetails();
	}, []);


	useEffect(() => {
		const fetchfollowers = async () => {              //fetching following and follower details
			try {
				const res = await fetch('http://localhost:8000/Followedby',{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"authorization": `Bearer ${token}`,
					  },
				});
				const data = await res.json();
				setfollowerdata(data);
				console.log(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchfollowers()
	}, [])

	const [userName, setUserName] = useState(localStorage.getItem("userName") || "Thecoolcat");         //default value or what it was previously
	const [userBio, setUserBio] = useState(localStorage.getItem("userBio") || "I am Beluga - your favourite cat");

	const handleEditProfile = () => {
		setShowEditForm(true);
	}

	const handleLogout = () => {
		//clear the user's current session
		localStorage.removeItem("userName");
		localStorage.removeItem("userBio");
		localStorage.setItem("logged", false);
		navigate("/");  // Navigate to the login page
	}

	const removefollowerfollowing = async (followerdata) => {
		const id = followerdata._id
		console.log(id)
		try {
			const res = await fetch(`http://localhost:8000/Followedby/${id}`, {
				method: 'DELETE',
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${token}`,
				  },
			});
			if (res.ok) {
				setDeleteFollow(deletefollow.filter(deletefollow => deletefollow._id !== id));
				window.location.reload(false)
			} else {
				console.error(await res.text());
			}
		} catch (error) {
			console.error(error);
		}
	}

	const handleProfileChange = (e) => {
		setNewDetails({ ...newdetails, [e.target.name]: e.target.value })
	}

	const filteredData = followerdata.filter(followerdata => followerdata.username === localStorage.getItem("currentuserlogged"));
	const numberOfFollowers = filteredData.length;
	console.log(numberOfFollowers);

	const filteredData2 = followerdata.filter(followerdata => followerdata.followedby === localStorage.getItem("currentuserlogged"));
	const numberOfFollowing = filteredData2.length;
	console.log(numberOfFollowing);



	const submitchangedetails = (user) => async (e) => {
		e.preventDefault()
		const id = user._id
		console.log(id)
		console.log("HI")
		try {
			const response = await fetch(`http://localhost:8000/register/${id}`, {    //search for the record bases on Ids
				method: 'PUT',
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${token}`,
				  },
				body: JSON.stringify(newdetails)
			});

			if (response.ok) {
				// The data was successfully updated
				setShowEditForm(false);
			} else {
				// The server returned an error
				throw new Error('Failed to update data');
			}
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>

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
				<div>

					<div class="profile">
						<div class="khaali"></div>
						<div class="profile-card">
							<header>
								<img src={flower} alt="A beautiful flower" />
								<br></br>
								<br></br>

								{userdetails.filter(userdata => userdata.username === localStorage.getItem("currentuserlogged")).map(userdata => (
									<div style={{ color: "black" }}>
										<p style={{ color: "black" , fontFamily: "Shantell Sans"}}>First Name: {userdata.fname}</p>
										<p style={{ color: "black" ,  fontFamily: "Shantell Sans"}}>Last Name: {userdata.lname}</p>
										<p style={{ color: "black" ,  fontFamily: "Shantell Sans"}}>Age: {userdata.age}</p>
										<p style={{ color: "black" ,  fontFamily: "Shantell Sans"}}>Contact: {userdata.contact}</p>

										<button class="btn profile-edit-btn" onClick={handleEditProfile}>Edit Profile</button>
										{
											showEditForm &&
											<form class="editform" onSubmit={submitchangedetails(userdata)}>
												<div class="reg-box">
													<label htmlFor="">First Name</label>
													<input className="inputclass"
													type="text" name="fname" value={newdetails.fname} onChange={handleProfileChange} />
												</div>
												<div class="reg-box">
													<label htmlFor="">Last Name</label>
													<input className="inputclass"
													type="text" name="lname" value={newdetails.lname} onChange={handleProfileChange} />
												</div>
												<div class="reg-box">
													<label htmlFor="">Age</label>
													<input className="inputclass"
													type="number" name="age" value={newdetails.age} onChange={handleProfileChange} />
												</div>
												<div class="reg-box">
													<label htmlFor="">Contact</label>
													<input className="inputclass"
													type="number" name="contact" value={newdetails.contact} onChange={handleProfileChange} />
												</div>
												<button type="submit">Submit</button>
											</form>
										}
									</div>


								))}

								<div>

								</div>
							</header>
							<div class="profile-bio">
								<p style={{fontFamily: "Shantell Sans"}}> A just-starting-out frontender in a big world of code.</p>

								<div class="followers-following-container">
									<div class="followers-container">
									<Button class="following-button" onClick={handleFollowerClick} style={{ backgroundColor: "transparent",fontSize: "20px", border: "none", fontFamily: "Shantell Sans"}}>Followers: {numberOfFollowers}</Button>
										<Modal show={showFollowerModal} onHide={handleFollowerClick}>
											<Modal.Header closeButton>
												<Modal.Title>Modal Title</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<p>{followerdata.filter(followerdata => followerdata.username === localStorage.getItem("currentuserlogged")).map(followerdata => (
													<div style={{ color: "black" }}>
														<p> {followerdata.followedby}</p>
														<button onClick={() => removefollowerfollowing(followerdata)}>Remove</button>
													</div>
												)
												)}
												</p>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={handleFollowerClick}>
													Close
												</Button>
											</Modal.Footer>
										</Modal>
									</div>

									<div class="following-container">
										<Button class="following-button" onClick={handleFollowingClick} style={{ backgroundColor: "transparent",fontSize: "20px", border: "none", fontFamily: "Shantell Sans"}}>Following: {numberOfFollowing}</Button>
										<Modal show={showFollowingModal} onHide={handleFollowingClick}>
											<Modal.Header closeButton>
												<Modal.Title>Modal Title</Modal.Title>
											</Modal.Header>
											<Modal.Body>
												<p>{followerdata.filter(followerdata => followerdata.followedby === localStorage.getItem("currentuserlogged")).map(followerdata => (
													<div style={{ color: "black" }}>
														<p> {followerdata.username}</p>
														<button onClick={() => removefollowerfollowing(followerdata)}>Unfollow</button>
													</div>
												)
												)}
												</p>
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={handleFollowingClick}>
													Close
												</Button>
											</Modal.Footer>
										</Modal>
									</div>
								</div>

								<div class="khaali"></div>
								{/* <div class="heart-icon">
									<i class="far fa-heart"></i>
								</div> */}
								<div class="profile-social-links" style={{ alignItems: "center" }}>
									<ul class="profile-social-links">
										<li>

											<i class="fab fa-facebook-square" style={{ fontSize: "30px" }}></i>
										</li>
										<li>
											<i class="fab fa-instagram" style={{ fontSize: "30px" }}></i>
										</li>
										<li>

											<i class="fab fa-linkedin" style={{ fontSize: "30px" }}></i>
										</li>
									</ul>
								</div>
							</div>

						</div>


					</div>
				</div>
			</div>
			<div class="khaali"></div>
			<div class="khaali"></div>
			<div class="khaali"></div>
			<div class="khaali"></div>
			<div>
				<button class="logout" onClick={handleLogout}>Logout</button>

			</div>

		</div>
	);
}

export default Profile;









