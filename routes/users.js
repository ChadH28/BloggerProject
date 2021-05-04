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
const jwt = require('jsonwebtoken')
const config = require('config')


// @req GET http://localhost:3000/users
// @access PRIVATE and PUBLIC
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
// @access PRIVATE
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
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        } // change made

        const {
            username,
            email,
            password,
            image
        } = req.body

        try {
            let exists = await knex
                .select()
                .from('users')
                .where({
                    'email': email // first string val in table then object 
                })
                .then((users) => {
                    return users[0]
                })

            if (exists) {
                res.status(400);
                return res.send('User already exists')
            } else {
                user = {
                    username,
                    email,
                    password,
                    role: 'user',
                    image
                }
                const salt = await bcrypt.genSalt(10)
                user.password = await bcrypt.hash(password, salt)
                knex('users')
                    .insert(user)
                    //console.log(user)
                    .then(function () {
                        const payload = {
                            user: {
                                id: user.id,
                                email: user.email
                            }
                        }

                        jwt.sign(
                            payload,
                            config.get('jwtSecret'), {
                                expiresIn: 360000
                            },
                            (error, token) => {
                                if (error) throw error;
                                res.json({
                                    token
                                })
                            }
                        )
                    })
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server error')
        }
    })

// @req PUT http://localhost:3000/users/:id
// @access PRIVATE
// @desc edit user
router.put('/:id',
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
    ],
    async (req, res) => {
        const {
            username,
            email,
            password
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
                knex('users')
                    .where('id', id)
                    .update({
                        username: username,
                        email: email,
                        password: await bcrypt.hash(password, salt)
                    })
                    .then(function () {
                        knex
                            .select()
                            .from('users')
                            .then(function (users) {
                                res.send(users)
                            })
                    })
            } else {
                res.status(401);
                return res.send('You dont have authorization to edit')
            }
        } catch (error) {
            console.error(error.message)
            res.status(500).send('Server error')
        }
    })

// @req DELETE
// @access PRIVATE
// @desc delete user
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
            knex('users')
                .where('id', id)
                .del()
                .then(function () {
                    knex
                        .select()
                        .from('users')
                        .then(function (users) {
                            res.send(users)
                        })
                })
        } else {
            res.status(401);
            return res.send('You dont have authorization to delete')
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

module.exports = router;