const {Router} = require('express');

const router = Router();


// @req GET
// @access public
// @desc get a user
router.get('/:id', (req,res) => {
    // knex
    // .select()
    // .from('todos')
    // .then(function (todos) {
    //     res.send(todos)
    // })
    res.send('user')
})

module.exports = router;