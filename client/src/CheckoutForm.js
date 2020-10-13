import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {

  // Setting states to process and update UI
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [enteredEmail, setEmail] = useState('')
  const [enteredName, setName] = useState('')

  const stripe = useStripe();
  const elements = useElements();

  // Creating the payment intent instantly and since in useEffect
  // this will run after DOM is rendered and since no return
  // WON'T BE CLEANED UP, but probably doesn't matter since
  // I'm just pulling new data
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/payments/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: [{ id: "surprise" }] })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  // Boilerplate style code
  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    if (event.empty) {
      setDisabled(event.empty);
    } else if (event.elementType === 'card') {
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
    } else if (event.target.id === "email") {
      if (validateEmail(event.target.value)) {
        setEmail(event.target.value);
      }
    } else if (event.target.id === "nameField") {
      if (validateName(event.target.value)) {
        setName(event.target.value);
      }
    }
  };

  function validateName(name) {
    // This isn't international friendly yet. 
    return /^[a-zA-Z]+ [a-zA-Z]+$/.test(name)
  };

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  };

  // Decides what will happen on Submit from DOM, looks like 
  // mostly state management w/ abovve defined states
  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    if (enteredEmail && enteredName) {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: enteredEmail,
            name: enteredName
          },
        }
      });

      if (payload.error) {
        setError(payload.error.message);
        console.log(payload.error.message);
        setProcessing(false);
      } else {
        setError(null);
        setProcessing(false);
        setSucceeded(true);
        if (payload) {
          var stamp = new Date(payload.paymentIntent.created * 1000).toLocaleString();
          console.log("New Sale!\n -Date: " + stamp + "\n -Transaction ID: " + payload.paymentIntent.id +
            "\n -Total: $" + (payload.paymentIntent.amount / 100).toFixed(2));
        }
      }
    } else {
      if (!enteredName) {
        setError(`Full Name needed to complete transaction`);
      } else {
        setError(`Email needed to complete transaction`);
      }
      setProcessing(false);
    }
  };

  // Spitting out the HTML form based on all of the above
  return (
    <form id="payment-form" onSubmit={handleSubmit}>
            <input type="text" id="nameField" className="field" placeholder="Name" onChange={handleChange} />
      <input type="email" id="email" className="field" placeholder="Email address" onChange={handleChange} />
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      <button
        disabled={processing || disabled || succeeded}
        id="submit"
      >
        <span id="button-text">
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
              "Pay"
            )}
        </span>
      </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, see the results
            <a
          href={`https://dashboard.stripe.com/test/payments`}
        >
          {" "}
              here.
            </a> Refresh the page to pay again.
          </p>
    </form>
  );
}  
