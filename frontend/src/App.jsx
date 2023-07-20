import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import LoginForm from './LoginForm';
import "./LoginForm.css";

import RegisterForm from './RegisterForm';
import "./RegisterForm.css"

import Profile from "./Profile.jsx"
import "./Profile.css"

import MySubGreddiits from './MySubGreddiits';
import "./MySubGreddiits.css";

import SubGreddiits from './SubGreddiits';
import './SubGreddiits.css';

import SavedPosts from './SavedPosts';
import './SavedPosts.css';

import Dashboard from './Dashboard';
import './Dashboard.css';

import CreateGreddiit from './CreateGreddiit';
import './CreateGreddiit.css';

import Greddiitpage from './Greddiitpage';
import "./Greddiitpage.css"

import Joinrequests from './Joinrequests';
import "./Joinrequests.css"

import NewPost from './NewPost';
import './NewPost.css';

import Reported from './Reported';
import './Reported.css';

import UserList from './Users';
import './Users.css';

import Stats from './Stats';
import './Stats.css'

import Count from './Countdown';


import { MyContext } from './MyContext';
import { MyProvider } from './MyContext';

import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';



const App = () => {
  const [currentform, setcurrentform] = useState("login");  //default form is login
  const toggleForm = (formName) => {
    setcurrentform(formName);   //change current form to given name
  }

  return (
    <MyProvider>
    <HashRouter>
      <div className="returnpage">
        {
          <Routes>
            <Route path="/" element={currentform === "login" ?
              (<LoginForm onFormSwitch={toggleForm} />) : (<RegisterForm onFormSwitch={toggleForm} />)} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/SavedPosts" element={<SavedPosts />} />
            <Route path="/SubGreddiits" element={<SubGreddiits />} />
            <Route path="/MySubGreddiits" element={<MySubGreddiits />} />
            <Route path="/CreateGreddiit" element={<CreateGreddiit />} />
            <Route path="/NewPost" element={<NewPost />} />
            <Route path="/Newgreddiit/:greddiitId" element={<Greddiitpage />} />
            <Route path="/Joinrequests" element={<Joinrequests />} />
            <Route path="/Reportedpages" element={<Reported />} />
            <Route path="/Users" element={<UserList />} />
            <Route path="/Stats" element={<Stats />} />
            <Route path="/Countdown" element = {<Count/>}/>
          </Routes>
        }
      </div>
    </HashRouter>
    </MyProvider>
  );
}

export default App;
