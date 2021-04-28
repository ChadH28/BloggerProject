const {
    Router
} = require('express');
const knex = require('../db/knex')
const router = Router();
const {
    check,
    validationResult
} = require('express-validator')
const bcrypt = require('bcryptjs')


// @req GET http://localhost:3000/users
// @access public
// @desc get users
router.get('/', (req, res) => {
    knex
        .select()
        .from('users')
        .then(function (users) {
            res.send(users)
        })
})

// @req GET http://localhost:3000/users/:id
// @access public
// @desc get a user
router.get('/:id', (req, res) => {
    const {
        id
    } = req.params;
    knex
        .select()
        .from('users')
        .where('id', id)
        .then(function (user) {
            res.send(user)
        })
})


// @req POST http://localhost:3000/users
// @access public
// @desc add new user
router.post('/',
    [
        check('username', 'username is required')
        .not()
        .isEmpty(),
        check('email', 'email is required')
        .isEmail()
        .normalizeEmail(),
        check('password', 'password has to more than 5 characters')
        .isLength({
            min: 5
        })
    ], async (req, res) => {
        const {
            username,
            email,
            password
        } = req.body
        try {
            let exists = await knex
                .select()
                .from('users')
                .where({
                    email: 'email'
                })
                .then((users) => {
                    users[0]
                })

            if (exists) {
                return res.status(400).json({
                    msg: 'User exists'
                })
            } else {
                user = {
                    username,
                    email,
                    password
                }
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(password, salt)
                knex('users')
                    .insert(user)
                    .then(function () {
                        knex
                            .select()
                            .from('users')
                            .then(function (users) {
                                res.send(users)
                            })
                    })

            }
        } catch (error) {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({
            //         errors: errors.array()
            //     })
            // }
            console.error(error.message)
            res.status(500).send('Server error')
        }
    })

module.exports = router;