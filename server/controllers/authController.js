const users = require('../models/users');
let id = 1;

function login(req, res, next)
{
  console.log("BODY: ", req.body)
  let { username, password } = req.body;
  if(username && password) //check to see that username and password exist
  {
    //check if the supplied username and pass match an existing entry
    let user = users.find((e) => (e.username === username && e.password === password) )
    if(user)
    {
      req.session.user.username = user.username;
      res.status(200).send(req.session.user)
    }
    else
    {
      res.status(500).send('Invalid login credentials');
    }
  }
  else
  {
    res.status(400).send("Both a username and a password are required");
  }
}

function register(req, res, next)
{
  //if a username and password are supplied
  if(req.body.username && req.body.password)
  {
    //push a new user onto the list of users
    users.push({
      id: id,
      username: req.body.username,
      password: req.body.password
    });
    //increment the id counter
    id++;
    //set current session to supplied username
    req.session.user.username = req.body.username;
  }
  res.status(200).send(req.session.user);
}

function signOut(req, res, next)
{
  req.session.destroy();
  res.status(200).send(req.session);
}

function getUser(req, res, next)
{
  res.status(200).send(req.session.user);
}

module.exports =
{
  login,
  register,
  signOut,
  getUser
};