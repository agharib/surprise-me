var express = require('express');
var router = express.Router();
fs = require('fs');
let sales = 0;

// Match the raw body to content type application/json
router.post('/webhook', (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type} \n`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true });
});

function handlePaymentIntentSucceeded(payment) {
  // Text to be written out to our log of orders
  let text = "";

  // Just a dumb way to keep track of sales numbers, it's not important to any
  // function and will reset w/ server. 
  sales++;

  // Fun text building
  if (payment) {
    var timestamp = new Date(payment.created * 1000).toLocaleString();
    text = text.concat("\n New Sale #" + sales + "\n -Date: " + timestamp +
      "\n -Transaction ID: " + payment.id +
      "\n -Total: " + (payment.amount / 100).toFixed(2) + " " + payment.currency);

    if (payment.charges.data[0].billing_details.name && payment.charges.data[0].billing_details.email) {
      text = text.concat("\n -Billing Info: ");
      text = text.concat("\n --Customer Name: " + payment.charges.data[0].billing_details.name);
      text = text.concat("\n --Customer Email: " + payment.charges.data[0].billing_details.email);
    }

    if (payment.shipping) {
      text = text.concat("\n -Shipped To: " + payment.shipping.name +
        "\n -Address: \n --Street Address: " + payment.shipping.address.line1 + " " + (payment.shipping.address.line2 == null ? "" : payment.shipping.address.line2));
      text = text.concat("\n --Postal Code: " + payment.shipping.address.postal_code);
      if (payment.shipping.address.city) {
        text = text.concat("\n --City: " + payment.shipping.address.city + ", " + payment.shipping.address.state);
      };
      text = text.concat("\n");
    } else {
      text = text.concat("\n -Shipping Info: Not Provided \n");
    };
  };

  // Writing to file, assumes file already exists
  if (text) {
    fs.appendFile('salesLog.txt', text, function (err) {
      if (err) return console.log(err);
      console.log('GOOD: Successful Sale! Sales Log Updated!!');
    });
  }
};

module.exports = router;