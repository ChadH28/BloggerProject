const {Router} = require('express');
const knex = require('../db/knex')

const router = Router();


// @req GET
// @access Private and public
// @desc get users blogs
router.get('/:id', (req,res) => {
    const {id} = req.params;
    knex
    .from('blogs')
    .innerJoin('users', 'blogs.user_id', 'users.id')
    .where('blogs.user_id', id)
    .then(function (userBlog) {
        res.send(
            // userBlog[0].username, 
            // userBlog[0].blog_title, 
            // userBlog[0].blog_content
            userBlog
        )
    })
})

module.exports = router;