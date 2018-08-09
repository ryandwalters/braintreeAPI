const express = require('express');
const router = express.Router();
const gateway = require('../lib/gateway');
const braintree = require('braintree');

/*
Uses res.locals to pass data between middleware functions and finally to regular functions

next(err) passes any errors from this route-specific middleware to the app's
error handling middleware in app.js
*/

/*
Generates a Braintree client token and passes it to the next middleware called in index.js
*/

exports.tokenGen = (req, res, next) => {
  
  res.locals.clientToken = "";

  gateway.clientToken.generate({
  }).then((result) => {
      if(result.success = true){
        res.locals.clientToken = result.clientToken;
        next();
      }
      else if(result.success = false){
        next(err);
      }
    }).catch((err) => {
        next(err);
    });
};

/*
Renders the homepage and passes a client token into the view

client token is used in Braintree integration as an account-level authorization method
*/

exports.home = (req, res) => {
  res.render('home', {clientToken: res.locals.clientToken});
};

/*
Takes the nonce generated from the client-side and passes it into a Braintree paymentMethod 
API request.
*/

exports.store = (req, res, next) => {

  res.locals.paymentMethodToken = "";

  gateway.paymentMethod.create({
    customerId: "12345",
    paymentMethodNonce: req.body.nonce,
    deviceData: req.body.device_data,
    options: {
      verifyCard: true
    }
  }).then((result) => {
      if (result.success = true) {
        res.locals.paymentMethodToken = result.creditCard.token;
        next();
      } else if (result.success = false){
        next(err);
      }
  }).catch((err) => {
      next(err);
  }); 
};

/*
This creates a transaction with the stored payment method. It currently
uses a static test amount. Amounts between 2000-3000 will cause declines.
*/

exports.pay = (req, res) => {

  let transactionId = "";
  let JSONResult = { "id": ""};

  gateway.transaction.sale({
    amount: '5.00',
    paymentMethodToken: res.locals.paymentMethodToken,
    options: {
      submitForSettlement: true
    }
  }).then((result) => {
    if (result.success = true)  {
      JSONResult.id = result.transaction.id;
      res.json({ JSONResult });
    } else if (result.success = false) {
      next(err);
    }
  }).catch((err) => {
    next(err);
  });
};

exports.pageRender = (req, res, next) => {
  gateway.transaction.find(req.params.id, {
  }).then((result) => {
    res.render('resultPage', { 
      id: result.id, 
      status: result.status, 
      amount: result.amount, 
      last4:result.creditCard.last4
    });
  }).catch((err) => {
    console.log(err);
    next(err);
  });

};