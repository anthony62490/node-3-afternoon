function checkForSession(req, res, next)
{
  //If a user attribute does not exist on the current session
  if(!req.session.user)
  {
    //create a new user
    req.session.user = 
    {
      username: '', 
      cart: [], 
      total: 0
    };
  }
  //move on to the next middleware
  next();
}

module.exports =
{
  checkForSession
};