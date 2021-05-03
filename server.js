const express = require('express');
const cors = require('cors')

// application object using express 
const app = express();
app.use(cors())

// PORT 
const port = process.env.PORT || 3000
// body parser
const bodyParser = require('body-parser');
// routes
const blogs = require('./routes/blogs')
const users = require('./routes/users')
const auth = require('./routes/auth')
const userBlogs = require('./routes/userblogs')
const comments = require('./routes/comments')
const userComments = require('./routes/usercomments')

// Init middleware
app.use(bodyParser.json());
app.use(express.json({
    extended: false
}))

// Routes
// CRUD
app.use('/blogs', blogs)
app.use('/users', users)
app.use('/auth', auth)
app.use('/blogs-of-user', userBlogs)
app.use('/comments', comments)
app.use('/user-comments', userComments)



app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;


// how to time stamp when making an update
// how to differentiate users and admin
// how to make the users comment to users blogs relationship or join
// how to upload image from front and store it in th back
// how to make an upvote component with click is upvote declick is no vote
// roles
// admin section
