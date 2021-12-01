// load .env data into process.env
require("dotenv").config();

// Twilio API
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// requiring getCart function
// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const productRoutes = require("./routes/products");

const checkoutRoutes = require("./routes/checkout")

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/", productRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/checkout", checkoutRoutes());
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const templateVars = {menuItems};
  res.render('index', templateVars);
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/checkout", (req, res) => {

  res.render("checkout");
});

app.post("/checkout", (req, res) => {
  const cartItems = getCart();
  console.log(cartItems);
  const phoneNumber = req.body.phone.split(' ').join('').split('-').join('');
  client.messages
  .create({
    from: '+19152218907',
    to: phoneNumber,
    body: 'Your order is ready',
  })
  .then(message => console.log(message.sid));
  setTimeout(() => {
    client.messages
  .create({
    from: '+19152218907',
    to: phoneNumber,
    body: 'Your order is ready part 2',
  })
  .then(message => console.log(message.sid));
  }, 4000);
  res.redirect("/");
});

// delete for remove button
// call to database and reduce quantity

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
