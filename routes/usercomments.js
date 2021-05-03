const {Router} = require('express');
const knex = require('../db/knex')

const router = Router();


// @req GET
// @access Private and public
// @desc get users comments to blog
router.get('/:id', (req,res) => {
    const {id} = req.params;
    knex
    // .from('blogs')
    // .innerJoin('users', 'blogs.user_id', 'users.id')
    // .where('blogs.user_id', id)
    .from('comments')
    .innerJoin('blogs', 'comments.user_id', 'blogs.id')
    .where('comments.user_id', id)
    .then(function (userComment) {
        res.send(
            // userComment[0].username, 
            // userComment[0].comment_title, 
            // userComment[0].comment_content
            userComment
        )
    })
})

module.exports = router;