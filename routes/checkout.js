const express = require('express');
const router  = express.Router();

//GET /products/

const checkoutRouter = () => {
  router.post("/checkout", (req, res) => {
    console.log("works")
    const phoneNumber = req.body.phone.split(' ').join('').split('-').join('');
    client.messages
    .create({
      from: '+19152218907',
      to: phoneNumber,
      body: 'Your order is ready',
    })
    .then(message => console.log(message.sid));
    setTimeout(() => {
      client.messages
    .create({
      from: '+19152218907',
      to: phoneNumber,
      body: 'Your order is ready part 2',
    })
    .then(message => console.log(message.sid));
    }, 4000);
    res.redirect('/');
  });
  return router;
};


module.exports = checkoutRouter
