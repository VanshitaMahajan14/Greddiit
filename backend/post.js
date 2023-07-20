


app.post(
    '/register',
    async (req, res) =>  // post method for user registration
    {
      console.log('Incoming data from register form:', req.body);
      const {fname, lname, username, email, pass, age, contact} = req.body;
      const hashedPassword = await bcrypt.hash(pass, 10);

      const newuser = new regobj(
          {fname, lname, username, email, pass: hashedPassword, age, contact});

      newuser.save((error) => {
        if (error) {
          return res.status(500).send(error);
        } else {
          console.log('stored successfully to database');
          return res.status(201).send(newuser);
        }
      })
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
    const token = jwt.sign({userId: user._id}, 'my-secret-key');
    console.log(token)
    // Send the JWT to the client
    res.json({token});
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Server error'});
  }
});



app.post('/Newgreddiit', (req, res) => {  // post for greddiit
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


app.post('/Comments', (req, res) => {
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


app.post('/Followedby', (req, res) => {  // post for followedby
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


app.post('/Newpost', (req, res) => {  // post for newpost
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
    '/Reports',
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



app.post('/Joinrequest', (req, res) => {  // posting data for join requests
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
