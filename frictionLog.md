# Surprise Me! 1.0 Friction Log

## **My experience Implementing Stripe PaymentsIntent**

***Goal: To building a way for my e-commerce store to accept payments, fulfill that order, and log a registry of all payments***

Regardless of if they are entrepreneurs or working at mid-size/large companies, Engineers weigh several aspects when looking to onboard a new platform. To name a few examples, Engineers look for: 

1. **Aligned Goals:** How does the platform help them accomplish their business goals?
2. **Low On-Ramp:** How difficult is the on-ramp to the platform? How long before they can see something working?
3. **Tons of Integrations:** Does this platform work with all of their existing tooling? Are there integrations with their critical systems (like POS, bookkeeping etc). 
4. **Customization:** How can the platform be customized to fit their needs? 
5. **Testing and Error Handling:** How do they test their integration and make sure they are handling all cases gracefully?
6. **Scalability:** How will the platform scale with their business/team?
7. **Support & Thriving Ecosystem:** If something doesn’t work do they have clear ways to debug? Is there an ecosystem around the platform? Can they just look up an issue in StackOverflow and find the answer?
8. And much much more depending on their domain

Every engineer may weigh these things differently and make tradeoffs, but these are some of the things I’m looking to answer as I onboard to Stripe via the PaymentsIntent Integration. 

## The Good

1. **For engineers who are adept with full stack development the resources are endless and clear** - Really in-depth documentation, depending on if you are the kind of engineer who likes tutorials or those who like to dive into docs or those who like to jump head first into code. Even within the documentation everything's made to get you what you need faster, for example the enhanced find when you cmd-f in the docs. 
2. **Wide support for all backgrounds** - Not everyone knows the latest trendy language. Also many engineers from big/mid-size businesses maybe coming from an already established code base. Supporting everything from Java->Ruby->Node makes Stripe adaptable to all existing products. In addition, for non-engineers there are even options. 
3. **Clear step by step instructions that support a variety of use cases** - Went from Server -> UI -> Testing -> Webhooks to fulfill orders -> Going Live. Makes it really clear the order to standing up your business.
4. **Start making money in no time** - I haven’t wrote code in years and never used React/Node.JS and I stood up a page that accepts payments in a day. 
5. **Control over my data with webhooks **- This makes the possibilities endless. As Stripe processes everything, I can update my server and store that data locally or push to other third party solutions ( reporting POS etc)
6. **Is everyone using Stripe?** - Any error I hit, a quick google search saw several solutions. The community is thriving and supporting each other. Also noticed great links to developer communities in the developer portal, really amplifies that focus on the community more. 

## The Bad

1. **Documentation is extensive, but inconsistent** - Documentation whether in the tutorials, sample code, sdk etc is critical for an engineers on ramp and understanding. While there is a lot of it, it’s inconsistent dependent on what page you go to. For example the immersive experience doesn’t talk about fetching a client secret, while the text guide does, this makes it easy to miss critical capabilities. The sample code is also inconsistent, there are several examples that support React and several that don’t. Makes it hard to make use of all the great documentation. 
2. **Solution more geared towards existing businesses, what about new businesses** - Significant work if you are first standing up your business. No easy way to build a catalog/inventory. Starting from payments, means there is an expectation that the rest of the store is already there.
3. **Could leverage addresses/emails for fraud detection and save engineers millions** - If I’m starting a business or even working in the online sales department at a retail giant, we all want to avoid fraud. If Stripe processes Address’, emails, phones etc; they could help prevent fraud from basic things like bots to more sinister frauds, saving engineers or their employers millions.
4. **Opportunity to provide out of the box scaffolding to make ramp up even more smooth** - Today the expectation is you come in with your own basic setup. What if Stripe had a way to start with a fully built project that you can just clone and run `npm start` to have it all work. All you need to do is update a bunch of the boiler plate. Either that or even just having sample code match common scaffolding, for example in my case w/ Express scaffolding and routes. 
5. **Opportunity to integrate w/ IDEs to make ramping up even faster** - With VSO addons we could build Stripe CLI integration closer to where the code is written, we could make it easy to drop basic boiler plate code for all things like paymentsIntent or Customer Api etc. 
6. **Test Analyzer in the guide is great, but there was no clear instruction on how to integrate that into my project/build system** - Since these systems are mission critical for businesses, engineers will invest in lots of testing. Making it clear and easy how to do this for systems of all sizes can really give engineers peace of mind.  
    
    *Note: based on last three it’s clear tooling/tool integration can be a big opportunity to improve engineering efficiency*

## Raw Log

 
🙂 - Making a stripe account was a breeze. Entering business info was also easy. For people just starting a business, might be delightful to have a way to help come up with business names, like a word generator etc. I remember this was a fun process when my family started their businesses.
😓 - I just came up with an idea and I want to build a custom store to get started, the current code assumes I already have a store. I have no idea where to start to build a catalog, we are going straight to money collection. I guess this is meant for people with an established catalog they built on their own or elsewhere. Would be good to have a way for engineers who literally just came up with an idea to build a full solution. 
I don’t really know react/node, but I think looking at the samples it’s what’s most supported. Gonna go learn those now. 
😐 - Made the default react app, read some react docs, have no idea how to run that with a server, going to go do that now. I’ve never done full stack like that, but it’s a cool experience, can’t help but feel like the ramp up is a little high for not established engineers. Maybe that’s what Checkout tries to fix. 
🙂 - So MUCH DOCUMENTATION! I even get to pick between an immersive experience and test based experience. I can also download the samples. Also the github is amazing, should be advertised more. 
😓 - I went with express for my server, since that seems to be the default. I used the default scaffolding that is autogenerated and it makes a ton of files and routes and views, none of that is in the samples. Need to go learn that, but if express is what the sample is using and I’m using the default scaffolding, I wish the samples assumed that too. 
😓 - Got stuck getting my server working, went from immersive tutorial to text based and it’s pretty different. Text based has a whole section on fetching client secret that’s not in the immersive one. Noticing samples are also not the same, makes it super hard to debug what’s going on. 
😐 - I’m doing a lot of copy and pasting right now, this is all pretty much boilerplate, shouldn’t my IDE be able to spit me out a file with all of this? 
😐 - Building on the above I wonder if it makes sense for stripe to just have a way to spit out default scaffolding with a way to create an inventory and accept payments etc. Feels like that would sooth on-ramp for newer engineers. 
🙂 - Server code works! All in all that wasn’t too bad. The actual number of lines written were trivial. On to the UI!
😓 - Would be good to have more comments in the actual sample code that explains what’s going on. For example since I’m new to React, would have been good to know what useState and useEffect were doing. I ended up figuring it out, but would have helped to have some commentary from whoever wrote this sample. This is just like when you write code for a team or open source, you want to make clear what’s happening to the reader. 
😓 - I have some UI showing up, but if I’m running a business w/ physical goods I need to ship things, where do I do this? I can’t edit the element because that’s abstracted out to be secure, so I guess I need to edit around it? What a pain I thought I was supposed to be able sell things, but I guess it’s really just payments with this API. Luckily we are only selling one item right now :) 
😐 - Found some cool UI samples but they are in JS vs react, would be good to support React in all samples.
😓 - Added some fields for customer name and email, now I want to make sure I’m setting the states properly since I want these to be required (since I will pass the info to the api, wish for more documentation on what some of these blocks are doing, time to spend a bunch of time debugging and figuring it out. 
😓 - Since I’m doing the name and email validation myself, it’s pretty weak and not internationalized properly. For example some one can enter pretty much anything in my name field (including vulgar things) and I’ll just work. Good opportunity to help developers detect fraud by analyzing name/phone/email/address fields. Maybe it can help stop people using Stripe for different schemes. 
🙂 - The test case analyzer in the tutorial is great!!! Helps make sure everything works and lets the developer know how much stripe is truly handling. Also the list of test cases outside the test ui is also great. I wonder what ways we can help engineers have these tests automated, maybe integrating with their build system. Since it’s mostly boilerplate maybe we can generate it from the IDE. On to the webhook to store
😓 - Took me forever to get the webhook working, it was all due to my middleware messing up the json. Wish there was an FAQ or something in the errors that made this much clearer. Saw on stackoverflow people hitting this in a variety of ways. Also having out of the door scaffolding can help avoid this. 
🙂 - Stripe CLI is awesome and was a breeze to setup. Super powerful and intuitive. 
🙂 - Great next steps in tutorial. It is a little strange though that it jumps from PaymentsIntent Development -> Webhook Development -> Webhook Live and skips over taking your PaymentsIntent Live. That seems more exciting for the engineer than the webhook. Sooner they can take their PaymentsIntent live the sooner they can start making $$$. 

