// Require express - give us a function
const express = require('express');
require('dotenv').config();


// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const port = process.env.PROD_PORT;// || 5001;

console.log(process.env);

// express static file serving - public is the folder name
app.use(express.static('server/public'));

// Start up our server
app.listen(port, () => {
  console.log('listening on port', port);
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});