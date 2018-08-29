const swag = require('../models/swag'); //array of swag

function add(req, res, next)
{
  console.log("SESSION: ", req.session);
  if(req.query.id)
  {
    let {id} = req.query;
    let currentUser = req.session.user;
    if(currentUser.cart.find((e) => e.id === id))
    {
      //user's cart already contains an item by this id
      res.status(200).send(req.session.user);
    }
    else
    {
      //identify item
      let i = swag.findIndex((e) => e.id === id)
      console.log("i - ", i)
      //add this item id to the user's cart
      currentUser.cart.push(swag[i]);
      console.log("currentUser.cart - ", currentUser.cart)
      //update cart total
      currentUser.total += swag[i].price;
      res.status(200).send(res.session.user);
    }
  }
}

function remove(req, res, next)
{
  let currentUser = req.session.user;
  if(req.query.id)
  {
    //get the index of the item in user's cart
    let itemIndex = currentUser.cart.findIndex((e) => req.query.id === e.id);
    //get the full object from the swag list
    let itemObj = swag.find((e) => req.query.id === e.id);
    if(itemIndex)
    {
      //splice the cart array to discard the deleted item
      currentUser.cart.splice(itemIndex, 1);
      //subtract the collected item price from the user's running total
      currentUser.total -= itemObj.price;
      res.status(200).send(currentUser)
    }
  }
}

function checkout(req, res, next)
{
  req.session.user.cart = [];
  req.session.user.total = 0;
  res.status(200).send(req.session.user)
}

module.exports =
{
  add,
  remove,
  checkout
};