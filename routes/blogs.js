const {Router} = require('express');

const router = Router();


// @req GET
// @access Private and public
// @desc get a blog
router.get('/:id', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('work')
})

// @req GET
// @access Private and public
// @desc get blogs
router.get('/', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('explore')
})


// @req POST
// @access Private and public
// @desc add/create a new blog
router.post('/', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('added')
})


// @req PUT
// @access Private and public
// @desc edit and update blog
router.put('/:id', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('edited')
})


// @req DELETE
// @access Private and public
// @desc delete blog
router.delete('/:id', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('deleted')
})

module.exports = router;