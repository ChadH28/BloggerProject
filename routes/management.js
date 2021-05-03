const {
    Router
} = require('express');
const knex = require('../db/knex')
const router = Router();
const {
    check,
    validationResult
} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')


// @req GET http://localhost:3000/users
// @access PRIVATE
// @desc ADMIN get users
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
// @desc ADMIN get a user
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

router.get('/:id/image', (req, res) => {
    const {
        id
    } = req.params;
    knex
        .select('image')
        .from('users')
        .then(function (user) {
            res.send(user[0].image)
        })
})


// @req DELETE
// @access PRIVATE
// @desc ADMIN delete user
router.delete('/:id', (req,res) => {
    const {id} = req.params;
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
})

module.exports = router;


// @req POST http://localhost:3000/Admin
// @access public
// @desc add new ADMIN
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
                    users[0]
                })

            if (exists) {
                return res.status(400).json({
                    msg: 'Admin User exists'
                })
            } else {
                user = {
                    username,
                    email,
                    password,
                    role: 'admin',
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

// // @req PUT http://localhost:3000/users/:id
// // @access PRIVATE
// // @desc edit user
// router.put('/:id',
//     [
//         check('username', 'username is required')
//         .not()
//         .isEmpty(),
//         check('email', 'email is required')
//         .isEmail()
//         .normalizeEmail(),
//         check('password', 'password has to more than 5 characters')
//         .isLength({
//             min: 5
//         })
//     ],
//     (req, res) => {
//         const {
//             username,
//             email,
//             password,
//             role
//         } = req.body;
//         const {
//             id
//         } = req.params;
//         knex
//             .select()
//             .from('users')
//             .where('id', id)
//             .update({
//                 username: username,
//                 email: email,
//                 password: password,
//                 role: role
//             })
//             .then(function (user) {
//                 res.send(user)
//             })
//     })




