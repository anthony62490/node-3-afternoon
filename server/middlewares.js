function checkForCart (req, res, next)
{
  //If a cart attribute dows not exist on the current session
  if(!req.session.cart)
  {
    //create a new cart
    req.session.cart = [];
  }
  //move on to the next middleware
  next();
}

module.exports =
{
  checkForCart
};