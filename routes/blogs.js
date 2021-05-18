const {
    Router
} = require('express');
const {
    check,
    validationResult
} = require('express-validator')
const knex = require('../db/knex')
const router = Router();


// @req GET
// @access Private and public
// @desc get blogs
router.get('/', (req, res) => {
    try {
        knex
            .select()
            .from('blogs')
            .then(function (blogs) {
                res.send(blogs)
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('blogs Not Found.');
    }

})

// @req GET
// @access Private and public
// @desc get a blog
router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    try {
        knex
            .select()
            .from('blogs')
            .where('id', id)
            .then(function (blog) {
                res.send(blog)
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('blog Not Found.');
    }

})



// @req POST
// @access Private
// @desc add/create a new blog
router.post('/',
    [
        check('title', 'title is required')
        .not()
        .isEmpty(),
        check('content', 'content is required')
        .not()
        .isEmpty(),
        check('topic', 'please select a topic')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const {
            blog_title,
            blog_content,
            blog_topic,
            blog_image,
            user_id
        } = req.body;
        try {
            let user = await knex
                .select()
                .from('users')
                .then((user) => {
                    return user[0]
                })
            if (user.role === 'user') {
                knex('blogs')
                    .insert({
                        blog_title: blog_title,
                        blog_content: blog_content,
                        blog_topic: blog_topic,
                        blog_image: blog_image,
                        user_id: user_id
                    })
                    .then(function () {
                        knex
                            .select()
                            .from('blogs')
                            .then(function (blogs) {
                                res.send(blogs)
                            })
                    })
            } else {
                res.status(401);
                return res.send('You dont have authorization to create')
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error in creating blog.');
        }
    })


// @req PUT
// @access Private and public
// @desc edit and update blog
router.put('/:id',
    [
        check('title', 'title is required to update')
        .not()
        .isEmpty(),
        check('content', 'content is required to update')
        .not()
        .isEmpty(),
        check('topic', 'please select a topic to update')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const {
            title,
            content,
            topic
        } = req.body;
        const {
            id
        } = req.params;
        try {
            let user = await knex
                .select()
                .from('users')
                .then((user) => {
                    return user[0]
                })
            if (user.role === 'user') {
                knex('blogs')
                    .where('id', id)
                    .update({
                        blog_title: title,
                        blog_content: content,
                        blog_topic: topic
                        //date_blogEdited
                    })
                    .then(function () {
                        knex
                            .select()
                            .from('blogs')
                            .then(function (blogs) {
                                res.send(blogs)
                            })
                    })
            } else {
                res.status(401);
                return res.send('You dont have authorization to update')
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error in updating blog.');
        }

    })


// @req DELETE
// @access Private and public
// @desc delete blog
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    try {
        let user = await knex
            .select()
            .from('users')
            .then((user) => {
                return user[0]
            })
        if (user.role === 'user') {
            knex('blogs')
                .where('id', id)
                .del()
                .then(function () {
                    knex
                        .select()
                        .from('blogs')
                        .then(function (blogs) {
                            res.send(blogs)
                        })
                })
        } else {
            res.status(401);
            return res.send('You dont have authorization to delete')
        }
    } catch (error) {
        console.error(error.message);
        res.send('Error in deleting blog.')
    }
})

module.exports = router;