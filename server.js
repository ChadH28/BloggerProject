const express = require('express');
// application object using express 
const app = express();
// PORT 
const port = process.env.PORT || 3000
// body parser
const bodyParser = require('body-parser');
// routes
const blogs = require('./routes/blogs')
const users = require('./routes/users')


// Init middleware
app.use(bodyParser.json());
app.use(express.json({
    extended: false
}))

// Routes
// CRUD
app.use('/blogs', blogs)
app.use('/users', users)



app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;