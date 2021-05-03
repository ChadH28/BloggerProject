const {Router} = require('express');
const knex = require('../db/knex')

const router = Router();


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
        title,
        content,
        topic, 
        user_id,
    } = req.body;
    knex('comments')
    .insert({
        comment_title: title,
        comment_content: content,
        comment_topic: topic,
        user_id: user_id,
        user: true
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
        title,
        content,
        topic, 
    } = req.body;
    const {id} = req.params;
    knex('comments')
    .where('id', id)
    .update({
        comment_title: title,
        comment_content: content,
        comment_topic: topic,
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