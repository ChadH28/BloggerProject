const {Router} = require('express');
const knex = require('../db/knex')

const router = Router();


// @req GET
// @access Private and public
// @desc get blogs
router.get('/', (req,res) => {
    knex
    .select()
    .from('blogs')
    .then(function (blogs) {
        res.send(blogs)
    })
})

// @req GET
// @access Private and public
// @desc get a blog
router.get('/:id', (req,res) => {
    const {id} = req.params;
    knex
    .select()
    .from('blogs')
    .where('id', id)
    .then(function (blog) {
        res.send(blog)
    })
})


// @req POST
// @access Private and public
// @desc add/create a new blog
router.post('/', (req,res) => {
    const { 
        title,
        content,
        topic, 
        user_id,
    } = req.body;
    knex('blogs')
    .insert({
        blog_title: title,
        blog_content: content,
        blog_topic: topic,
        user_id: user_id,
        user: true
    })
    .then(function () {
        knex
        .select()
        .from('blogs')
        .then(function (blogs) {
            res.send(blogs)
        })
    })
})



// @req PUT
// @access Private and public
// @desc edit and update blog
router.put('/:id', (req,res) => {
    const { 
        field, 
        value, 
        title, 
        completed 
    } = req.body;
    const {id} = req.params;
    knex('blogs')
    .where('id', id)
    .update({
        title: title,
        completed: completed
    })
    .then(function () {
        knex
        .select()
        .from('blogs')
        .then(function (blogs) {
            res.send(blogs)
        })
    })
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