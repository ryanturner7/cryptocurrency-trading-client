'use strict';

module.exports = (err, req, res, next) => {
  // console.error('error', err);
  if(err.message.toLowerCase().includes('required'))
    return res.sendStatus(400);

  if(err.message.toLowerCase().includes('server failed'))
    return res.sendStatus(409);

  if(err.message.toLowerCase().includes('unauthorized'))
    return res.sendStatus(401);

  if(err.message.toLowerCase().includes('bad request'))
    return res.sendStatus(400);

  res.sendStatus(500);
};
