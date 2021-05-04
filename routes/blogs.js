const {
    Router
} = require('express');
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
// @access Private and public
// @desc add/create a new blog
router.post('/', (req, res) => {
    const {
        title,
        content,
        topic,
        user_id,
    } = req.body;
    try {
        knex('blogs')
            .insert({
                blog_title: title,
                blog_content: content,
                blog_topic: topic,
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
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error in creating blog.');
    }

})


// @req PUT
// @access Private and public
// @desc edit and update blog
router.put('/:id', (req, res) => {
    const {
        field,
        value,
        title,
        content,
        topic,
    } = req.body;
    const {
        id
    } = req.params;
    try {
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
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error in updating blog.');
    }

})


// @req DELETE
// @access Private and public
// @desc delete blog
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    try {
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
    } catch (error) {
        console.error(error.message);
        res.send('Error in deleting blog.')
    }
})

module.exports = router;


