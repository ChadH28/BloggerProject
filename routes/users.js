const {Router} = require('express');
const knex = require('../db/knex')
const router = Router();
const {check, validationResult} = require('express-validator/check')


// @req GET
// @access public
// @desc get users
router.get('/', (req,res) => {
    knex
    .select()
    .from('users')
    .then(function (users) {
        res.send(users)
    })
})

// @req GET
// @access public
// @desc get a user
router.get('/:id', (req,res) => {
    const {id} = req.params;
    knex
    .select()
    .from('users')
    .where('id', id)
    .then(function (user) {
        res.send(user)
    })
})


// @req POST
// @access public
// @desc add new user
router.post('/', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send(req.body)
})

module.exports = router;