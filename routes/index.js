var express = require('express');
var router = express.Router();
var gateway = require('../lib/gateway');
var braintree = require('braintree');
var apiController = require('../controllers/apiController');
var hostedFields = require('braintree-web/hosted-fields');
var client = require('braintree-web/client');


router.get('/', apiController.tokenGen, apiController.home);

router.post('/storeAndPay', apiController.store, apiController.pay);

router.get('/results/:id', apiController.pageRender);

module.exports = router;