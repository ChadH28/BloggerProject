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

module.exports = router;