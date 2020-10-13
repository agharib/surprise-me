import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from './CheckoutForm';
import logo from './surprise.svg';
import './App.css';

const promise = loadStripe("pk_test_51HaosmI5KSVF37EPRrQ4nqLUbuBrGKXPTnUds2XjR752ExyI1FcXoQHbsaWV6BIj20zJFXsbnfEz8i00Po5Garxl00Qtm3EHrw");

export default function App() {
  return (
    <div className="App">
        <div className="sr-root">
        <div className="sr-main">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-Title">Surprises For<br />Just $20</h1>
            <Elements stripe={promise}>
              <CheckoutForm />
            </Elements>
            </div>
      </div>
    </div>
  )
}