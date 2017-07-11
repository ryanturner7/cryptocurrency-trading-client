'use strict';

module.exports = (err, req, res, next) => {
  console.error('error', err.message);
  if(err.message.toLowerCase().includes('required'))
    return res.sendStatus(400);

  res.sendStatus(500);
};
