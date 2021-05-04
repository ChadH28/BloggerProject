const express = require('express');
const router = express.Router();
const {
    check,
    validationResult
} = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const knex = require('../db/knex')
const auth_middleware = require('../middleware/jwt')


// @route GET http://localhost:3000/auth
// @desc get LOGGED  user
// @access Private
router.get('/', auth_middleware, async (req, res) => {
    try {
        let user = await knex
        .select()
        .from('users')
        .where(
            'id', req.user.id
        ).then((user) => { return user[0] })
        delete user.password;
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// @route POST http://localhost:3000/auth
// @desc Auth user and get token LOGIN
// @access Public
router.post('/', [
    check('email', 'Please include a valid email')
    .isEmail(),
    check('password', 'Please enter a password')
    .isLength({min:5})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        email,
        password
    } = req.body;

    try {
        let user = await knex
        .select()
        .from('users')
        .where({
            'email': email
        })
        .then((users) => {
            return users[0]
        })

        if (!user) {
            return res.status(400).json({
                msg: 'Invalid user'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Your password characters dont match'
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 36000},
            (error, token) => {
                if(error) throw error;
                res.json({token})
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})




module.exports = router;