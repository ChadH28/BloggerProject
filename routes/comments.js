const {Router} = require('express');
const knex = require('../db/knex')

const router = Router();

        // -- comment_id
        // -- comment_content
        // -- dateCreated or timePosted

        // -- blogger comment relationship
        // -- comment to blog relationship

// @req GET
// @access Private and public
// @desc get comments
router.get('/', (req,res) => {
    knex
    .select()
    .from('comments')
    .then(function (comments) {
        res.send(comments)
    })
})

// @req GET
// @access Private and public
// @desc get a comment
router.get('/:id', (req,res) => {
    const {id} = req.params;
    knex
    .select()
    .from('comments')
    .where('id', id)
    .then(function (comment) {
        res.send(comment)
    })
})


// @req POST
// @access Private and public
// @desc add/create a new comment
router.post('/', (req,res) => {
    const { 
        content,
        user_id,
        blog_id
    } = req.body;
    knex('comments')
    .insert({
        comment_content: content,
        user_id: user_id,
        blog_id: blog_id,
    })
    .then(function () {
        knex
        .select()
        .from('comments')
        .then(function (comments) {
            res.send(comments)
        })
    })
})



// @req PUT
// @access Private and public
// @desc edit and update comment
router.put('/:id', (req,res) => {
    const { 
        field, 
        value, 
        content
    } = req.body;
    const {id} = req.params;
    knex('comments')
    .where('id', id)
    .update({
        comment_content: content
    })
    .then(function () {
        knex
        .select()
        .from('comments')
        .then(function (comments) {
            res.send(comments)
        })
    })
})


// @req DELETE
// @access Private and public
// @desc delete comment
router.delete('/:id', (req,res) => {
    const {id} = req.params;
    knex('comments')
    .where('id', id)
    .del()
    .then(function () {
        knex
        .select()
        .from('comments')
        .then(function (comments) {
            res.send(comments)
        })
    })
})

module.exports = router;