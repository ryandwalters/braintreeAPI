var form = document.querySelector('#cardForm');
var authorization = 'sandbox_g42y39zw_348pk9cgf3bgyw2b';

var button = document.querySelector('#submit-button');

braintree.dropin.create({
  authorization: 'eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI4MmZiZDljYTRmNTIyYTZiYjA3Njg5Zjg4ZjQyMjVjMjY1YTNlM2ZjZjBhNzhmNWYzMDI3NDNkYjBlMmJjNWQ5fGNyZWF0ZWRfYXQ9MjAxOC0wOC0wOVQxNDo1NzozNy43MzkzMzE2MjUrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXN3dHZtZnBmZmJucXF4NHZcdTAwMjZwdWJsaWNfa2V5PW1jZjNrNGpiaHc0MnQ2N2IiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvc3d0dm1mcGZmYm5xcXg0di9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3N3dHZtZnBmZmJucXF4NHYvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vb3JpZ2luLWFuYWx5dGljcy1zYW5kLnNhbmRib3guYnJhaW50cmVlLWFwaS5jb20vc3d0dm1mcGZmYm5xcXg0diJ9LCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJwYXlwYWxFbmFibGVkIjp0cnVlLCJwYXlwYWwiOnsiZGlzcGxheU5hbWUiOiJSeWFuIiwiY2xpZW50SWQiOm51bGwsInByaXZhY3lVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vcHAiLCJ1c2VyQWdyZWVtZW50VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3RvcyIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImFsbG93SHR0cCI6dHJ1ZSwiZW52aXJvbm1lbnROb05ldHdvcmsiOnRydWUsImVudmlyb25tZW50Ijoib2ZmbGluZSIsInVudmV0dGVkTWVyY2hhbnQiOmZhbHNlLCJicmFpbnRyZWVDbGllbnRJZCI6Im1hc3RlcmNsaWVudDMiLCJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsIm1lcmNoYW50QWNjb3VudElkIjoicnlhbiIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoic3d0dm1mcGZmYm5xcXg0diIsInZlbm1vIjoib2ZmIn0=',
  container: '#dropin-container'
}, function (createErr, instance) {
  button.addEventListener('click', function () {
    instance.requestPaymentMethod(function (err, payload) {
      // Submit payload.nonce to your server
    });
  });
});

braintree.client.create({
  authorization: authorization
}, function(err, clientInstance) {
  if (err) {
    console.error(err);
    return;
  }
  createHostedFields(clientInstance);
});

function createHostedFields(clientInstance) {
  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      'input': {
        'font-size': '16px',
        'font-family': 'courier, monospace',
        'font-weight': 'lighter',
        'color': '#ccc'
      },
      ':focus': {
        'color': 'black'
      },
      '.valid': {
        'color': '#8bdda8'
      }
    },
    fields: {
      number: {
        selector: '#card-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#expiration-date',
        placeholder: 'MM/YYYY'
      },
      postalCode: {
        selector: '#postal-code',
        placeholder: '11111'
      }
    }
  }, function (err, hostedFieldsInstance) {
    var teardown = function (event) {
      event.preventDefault();
      alert('Submit your nonce to your server here!');
      hostedFieldsInstance.teardown(function () {
        createHostedFields(clientInstance);
        form.removeEventListener('submit', teardown, false);
      });
    };
    
    form.addEventListener('submit', teardown, false);
  });
}

