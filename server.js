const express = require('express');
// application object using express 
const app = express();
// PORT 
const port = process.env.PORT || 3000
// body parser
const bodyParser = require('body-parser');


// Init middleware
app.use(bodyParser.json());
app.use(express.json({
    extended: false
}))

// Routes
// CRUD


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;