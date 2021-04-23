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

// creating GET req endpoint
app.get('/blogs', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('work')
})

app.get('/', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('explore')
})


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});

module.exports = app;