const swag = require('../models/swag');

function search(req, res, next)
{
  if(!req.query.category)
  {
    res.status(200).send(swag);
  }
  else
  {
    let filtered = swag.filter((e) => (e.category === req.query.category));
    res.status(200).send(filtered);
  }
}

module.exports =
{
  search
};