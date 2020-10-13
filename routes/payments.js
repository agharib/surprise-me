var express = require('express');
var router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 2000;
};

router.post("/create-payment-intent", async (req, res) => {
  const { items, currency } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    metadata: {integration_check: 'accept_a_payment'}
  });

   // Send publishable key and PaymentIntent details to client
   res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: paymentIntent.client_secret
  });
});

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});
// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;