var form = document.querySelector('#cardForm');
var authorization = 'sandbox_cpwjwjjn_swtvmfpffbnqqx4v';

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