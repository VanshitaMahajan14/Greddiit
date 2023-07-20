const express = require('express');
const cors = require('cors');
const app = express();
// var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const jwtSecret = 'mysecret';  // replace with a secure secret key


mongoose.connect(
    'mongodb+srv://Vanshita03:Vanshita@cluster0.b3fizd1.mongodb.net/dass?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true});


app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

mongoose.connection
    .once(
        'open',
        () => {
          console.log('MongoDB database connection established successfully!');
        })
    .on('error', (error) => {
      console.log('Error connecting to database: ', error);
    });


    const greddiitschema = new mongoose.Schema({
      name: String,
      description: String,
      tags: [String],
      banned: [String],
      created_at: {type: Date, required: true, default: Date.now},
      followers: [String],
      blocked: [String],
      leave: [String],
      posts: {type: Number, default: 0},
      greddiitowner: String,
    });
    
    
    const registerschema = new mongoose.Schema({
      fname: String,
      lname: String,
      username: String,
      email: String,
      pass: String,
      age: String,
      contact: String
    });
    
    
    const loginschema = new mongoose.Schema({
      username: String,
      pass: String,
    })
    
    
    const requestschema = new mongoose.Schema({
      requestby: String,
      requestedto: String,
      greddiitname: String,
      greddiitId: String
    })
    
    const reportschema = new mongoose.Schema({
      username: String,
      text: String,
      Concern: String,
      reporteduser: String,
      postId: String,
      greddiitId: String,
      moderator: String,
    })
    
    const commentschema =
        new mongoose.Schema({comment: String, username: String, postId: String})
    
    
    const followedschema = new mongoose.Schema({
      username: String,
      followedby: String,
    })
    
    
    
    const postschema = new mongoose.Schema({
      text: String,
      postedby: String,
      postedin: Date,
      greddiitId: {type: String},
      savedflag: {type: Number, default: 0},
      saved: [String],
      liked: [String],
      disliked: [String]
    });
    
    const Greddiit  = mongoose.model('Greddiit', greddiitschema)
    const postt  =  mongoose.model('Post', postschema)
    const regobj  = mongoose.model('Register', registerschema)
    const requestobj  = mongoose.model('Request', requestschema)
    const followedobj = mongoose.model('Followedby', followedschema)
    const commentobj  = mongoose.model('Comment', commentschema)
    const reportobj = mongoose.model('Report', reportschema)
    const login  = mongoose.model('Login', loginschema)
    


// app.post(
//     '/register',
//     async (req, res) =>  // post method for user registration
//     {
//       console.log('Incoming data from register form:', req.body);
//       const {fname, lname, username, email, pass, age, contact} = req.body;
//       const hashedPassword = await bcrypt.hash(pass, 10);

//       const newuser = new regobj(
//           {fname, lname, username, email, pass: hashedPassword, age, contact});

//       newuser.save((error) => {
//         if (error) {
//           return res.status(500).send(error);
//         } else {
//           console.log('stored successfully to database');
//           return res.status(201).send(newuser);
//         }
//       })
//     });


app.post('/register', async (req, res) => {
  console.log('Incoming data from register form:', req.body);
  const { fname, lname, username, email, pass, age, contact } = req.body;

  const hashedPassword = await bcrypt.hash(pass, 10);

  // Check if username is already registered
  const existingUsername = await regobj.findOne({ username });
  if (existingUsername) {
    return res.status(400).send({ error: 'Username already taken' });
  }

  // Check if email is already registered
  const existingEmail = await regobj.findOne({ email });
  if (existingEmail) {
    return res.status(400).send({ error: 'Email already taken' });
  }

  // Hash password

  // Save new user to database
  const newuser = new regobj({
    fname,
    lname,
    username,
    email,
    pass: hashedPassword,
    age,
    contact,
  });

  newuser.save((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      console.log('stored successfully to database');
      return res.status(201).send(newuser);
    }
  });
});



app.get('/register', (req, res) => {  // get for user
  regobj.find((error, userfound) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(userfound);
    }
  });
});


app.get('/Followedby', (req, res) => {  // get for user
  followedobj.find((error, followerfound) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(followerfound);
    }
  });
});



app.post('/login', async (req, res) => {
  const {username, pass} = req.body;
  console.log(username);
  console.log(pass);

  try {
    // Find the user in the database
    const user = await regobj.findOne({username});

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({message: 'Invalid username or password'});
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
    if (!isPasswordCorrect) {
      return res.status(401).json({message: 'Invalid username or password'});
    }

    // If the username and password are correct, generate a JWT
    const token = jwt.sign({userId: user._id}, jwtSecret);
    console.log(token)
    // Send the JWT to the client
    res.json({token});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Server error'});
  }
});


// app.post('/Login', async (req, res) => {
//   console.log('Incoming data from login form:', req.body)
//   const {username, password} = req.body;

//   try {
//     // verify the user's credentials
//     const user = await login.findOne({username: username});
//     if (!user || user.pass !== password) {
//       return res.status(401).json({message: 'Invalid credentials'});
//     }

//     // generate a JWT token with the user ID as the payload
//     const token = jwt.sign({userId: user._id}, jwtSecret, {expiresIn: '1h'});
//     console.log(token)
//     // send the token in the response
//     return res.status(200).json({token: token});
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({message: 'Internal server error'});
//   }
// });


function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    console.log(token)
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) {
        return res.status(403).json({message: 'Invalid or expired token'});
      } else {
        req.userId = payload.userId;
        next();
      }
    });
  } else {
    return res.status(401).json({message: 'Missing authorization header'});
  }
}

app.post('/Newgreddiit',verifyToken,(req, res) => {  // post for greddiit
  console.log('Incoming data from New Greddiit form:', req.body);
  const newGreddiit = new Greddiit(req.body);
  newGreddiit.save((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      console.log('stored successfully to database');
      return res.status(201).send(newGreddiit);
    }
  });
});


app.put('/Newgreddiit-incpost/:id', verifyToken,(req, res) => {  // increasing post count
  const greddiitId = req.params.id;

  const {posts} = req.body;

  // Update the postsCount field in the database for the corresponding Greddiit
  Greddiit.findByIdAndUpdate(greddiitId, {posts}, {new: true},(err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});


app.put('/Newgreddiit-decpost/:id', verifyToken,(req, res) => {  // decreasing post count
  const greddiitId = req.params.id;

  const {posts} = req.body;

  // Update the postsCount field in the database for the corresponding Greddiit
  Greddiit.findByIdAndUpdate(greddiitId, {posts}, {new: true},(err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});



app.post('/Comments', verifyToken,(req, res) => {
  console.log('Incoming data from comment form:', req.body);
  const newComment = new commentobj(req.body);
  newComment.save((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      console.log('stored successfully to database');
      return res.status(201).send(newComment);
    }
  });
})


app.post('/Followedby',verifyToken, (req, res) => {  // post for followedby
  console.log('Incoming data from Followed by form:', req.body);
  const newfollowedby = new followedobj(req.body);
  newfollowedby.save((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      console.log('stored successfully to database');
      return res.status(201).send(newfollowedby);
    }
  });
});


app.get('/Newgreddiit', verifyToken,(req, res) => {  // get for greddiit
  Greddiit.find((error, greddiits) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(greddiits);
    }
  });
});


app.post('/Newpost', verifyToken,(req, res) => {  // post for newpost
  console.log('Incoming data from newpost form:', req.body);
  const newpost = new postt(req.body);
  newpost.save((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      console.log('stored successfully to database');
      return res.status(201).send(newpost);
    }
  });
});


app.post(
    '/Reports',verifyToken,
    (req, res) =>  // post method for reports
    {
      console.log('Incoming data from report form:', req.body);
      const newreport = new reportobj(req.body);
      newreport.save((error) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          console.log('stored successfully to database');
          return res.status(201).send(newreport);
        }
      })
    });


app.get('/Reports', verifyToken,(req, res) => {  // get for Reports
  reportobj.find((error, reports) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(reports);
    }
  });
});


app.put('/Newpost/:id', verifyToken,async (req, res) => {  // saved flag = 1
  const {id} = req.params;
  const {savedflag} = req.body;

  try {
    const post = await postt.findById(id);
    post.savedflag = savedflag;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


app.get('/Newpost', verifyToken,(req, res) => {  // get for posts
  postt.find((error, posts) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(posts);
    }
  });
});

app.post('/Joinrequest', verifyToken,(req, res) => {  // posting data for join requests
  console.log('Incoming data from joinrequest:', req.body);
  const newrequest = new requestobj(req.body);
  newrequest.save((error) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      console.log('stored successfully to database');
      return res.status(201).send(newrequest);
    }
  });
});

app.get('/Joinrequest', verifyToken,(req, res) => {  // get for posts
  requestobj.find((error, requests) => {
    if (error) {
      return res.status(500).send(error);
    } else {
      return res.status(200).send(requests);
    }
  });
});


app.delete('/Joinrequest/:id', verifyToken,(req, res) => {
  const id = req.params.id;
  requestobj.findByIdAndDelete(id, (err, deletedproduct) => {
    console.log('entered function');
    if (err) return res.status(400).send(err);
    if (!deletedproduct)
      return res.status(404).send('No product was found with the given ID.');
    res.send(deletedproduct);
  });
})

app.delete('/Reports/:id', verifyToken,(req, res) => {
  const id = req.params.id;
  reportobj.findByIdAndDelete(id, (err, deletedproduct) => {
    console.log('entered function');
    if (err) return res.status(400).send(err);
    if (!deletedproduct)
      return res.status(404).send('No product was found with the given ID.');
    res.send(deletedproduct);
  });
})


app.delete('/Followedby/:id', verifyToken,(req, res) => {
  const id = req.params.id;
  followedobj.findByIdAndDelete(id, (err, deletedproduct) => {
    console.log('entered function');
    if (err) return res.status(400).send(err);
    if (!deletedproduct)
      return res.status(404).send('No product was found with the given ID.');
    res.send(deletedproduct);
  });
})


app.delete('/Newpost/:id', verifyToken,(req, res) => {
  const id = req.params.id;
  postt.findByIdAndDelete(id, (err, deletedproduct) => {
    console.log('entered function');
    if (err) return res.status(400).send(err);
    if (!deletedproduct)
      return res.status(404).send('No product was found with the given ID.');
    res.send(deletedproduct);
  });
})

app.delete('/Newgreddiit/:id', verifyToken,(req, res) => {  // delete greddiit
  const id = req.params.id;
  Greddiit.findByIdAndDelete(id, (err, deletedproduct) => {
    if (err) return res.status(400).send(err);
    if (!deletedproduct)
      return res.status(404).send('No product was found with the given ID.');
    res.send(deletedproduct);
  });
});


app.get(
    '/Newgreddiit/:id', verifyToken,
    (req, res) => {                // getting greddiit by Id
      Greddiit.findById(req.params.id, (err, greddiit) => {
        if (err) return res.status(500).send(err);
        if (!greddiit) return res.status(404).send('Greddiit not found.');
        res.send(greddiit);
      });
    });

const port = 8000;

app.listen(port, () => {
  console.log('Server started on port 8000');
});



app.put('/register/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const newDetails = req.body;
  try {
    const updatedUser = await regobj.findOneAndUpdate({_id: id}, newDetails, {new: true});
    res.status(200).json({message: 'Record updated successfully', user: updatedUser});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: 'Failed to update record'});
  }
});


app.put('/Newgreddiit-followers/:id', verifyToken, (req, res) => {
  const greddiitId = req.params.id;
  const newFollower = req.body.$push.followers;
  // Use Mongoose to update Greddiit document with new follower
  Greddiit.findByIdAndUpdate(greddiitId, { $push: { followers: newFollower } }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});


app.put('/Newgreddiit-blocked/:id', verifyToken, (req, res) => {
  const greddiitId = req.params.id;
  const newblocked = req.body.$push.blocked;
  console.log(greddiitId)
  console.log(newblocked)
  
  // Use Mongoose to update Greddiit document with new blocked user
  Greddiit.findByIdAndUpdate(greddiitId, { $push: { blocked: newblocked} }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});


app.put('/Newgreddiit-leave/:id', verifyToken, (req, res) => {
  console.log("back me hai")
  const greddiitId = req.params.id;
  const leaveuser = req.body.$push.leave;

  // console.log(greddiitId)
  // console.log(leaveuser)

  Greddiit.findByIdAndUpdate(greddiitId, { $push: { leave: leaveuser} }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});



app.put('/Newgreddit-removefollower/:id',verifyToken, (req, res) => {
  const greddiitId = req.params.id;
  const leaveuser = req.body.$pull.followers;

  console.log(greddiitId)
  console.log(leaveuser)

  Greddiit.findByIdAndUpdate(greddiitId, { $pull: { followers: leaveuser} }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});



app.put('/Newpost-like/:id', verifyToken,(req, res) => {
  const postid = req.params.id;
  const newlike = req.body.$push.liked;

  console.log(postid)
  console.log(newlike)
  
  postt.findByIdAndUpdate(postid, { $push: { liked: newlike} }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});


app.put('/Newpost-dislike/:id', verifyToken,(req, res) => {
  const postid = req.params.id;
  const newdislike = req.body.$push.disliked;

  console.log(postid)
  console.log(newdislike)
  
  postt.findByIdAndUpdate(postid, { $push: { disliked: newdislike} }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});


app.put('/Newpost-saved/:id', verifyToken,(req, res) => {
  const postid = req.params.id;
  const newsave = req.body.$push.saved

  console.log(postid)
  console.log(newsave)
  
  postt.findByIdAndUpdate(postid, { $push: { saved: newsave} }, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});

app.put('/Newpost-unsaved/:id', verifyToken,(req, res) => {
  console.log("hi remove this post")
  const postid = req.params.id;
  const unsave = req.body.$pull.saved
  console.log(postid)
  console.log(unsave)
  
  postt.findByIdAndUpdate(postid, { $pull: { saved: unsave }}, { new: true }, (err, updatedGreddiit) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating Greddiit');
    } else {
      res.json(updatedGreddiit);
    }
  });
});









