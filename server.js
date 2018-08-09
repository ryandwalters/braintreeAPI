var express = require('express');
var braintree = require("braintree");
var client = require('braintree-web/client');
var hostedFields = require('braintree-web/hosted-fields');


var app = express()

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "swtvmfpffbnqqx4v",
  publicKey: "mcf3k4jbhw42t67b",
  privateKey: "9f1c032ea23c4f31155becb122102446"
});

gateway.clientToken.generate({
 
  }, function (err, response) {
    var clientToken = response.clientToken
  });

  app.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
      res.send(response.clientToken);
    });
  });

  app.post("/checkout", function (req, res) {
    var nonceFromTheClient = req.body.payment_method_nonce;
    // Use payment method nonce here
    gateway.paymentMethodNonce.create('eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI4MmZiZDljYTRmNTIyYTZiYjA3Njg5Zjg4ZjQyMjVjMjY1YTNlM2ZjZjBhNzhmNWYzMDI3NDNkYjBlMmJjNWQ5fGNyZWF0ZWRfYXQ9MjAxOC0wOC0wOVQxNDo1NzozNy43MzkzMzE2MjUrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dHZtZnBmZmJucXF4NHZcdTAwMjZwdWJsaWNfa2V5PW1jZjNrNGpiaHc0MnQ2N2IiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d0dm1mcGZmYm5xcXg0di9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dHZtZnBmZmJucXF4NHYvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vb3JpZ2luLWFuYWx5dGljcy1zYW5kLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vc3d0dm1mcGZmYm5xcXg0diJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJSeWFuIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoicnlhbiIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoic3d0dm1mcGZmYm5xcXg0diIsInZlbm1vIjoib2ZmIn0=', function(err, response) {
      var nonce = response.paymentMethodNonce.nonce;
    });

    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
    });
  });

  gateway.paymentMethod.create({
    customerId: "theCustomerId",
    // paymentMethodNonce: nonceFromTheClient,
    options: {
      verifyCard: true,
      verificationMerchantAccountId: "theMerchantAccountId",
      verificationAmount: "2.00",
    }
  }, function (err, result) {
  });



app.listen(3000, () => console.log('Example app listening on port 3000!'))