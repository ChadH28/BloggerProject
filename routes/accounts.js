const { Router } = require("express");
const knex = require("../db/knex");
const router = Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @req GET http://localhost:3000/accounts
// @access public
// @desc get accounts
router.get("/", (req, res) => {
  knex
    .select()
    .from("accounts")
    .then(function (accounts) {
      res.send(accounts);
    });
});

// @req GET http://localhost:3000/accounts/:id
// @access public
// @desc get a user
router.get("/:id", (req, res) => {
  const { id } = req.params;
  knex
    .select()
    .from("accounts")
    .where("id", id)
    .then(function (user) {
      res.send(user);
    });
});

// @req POST http://localhost:3000/accounts
// @access public
// @desc add new user
router.post(
  "/",
  [
    check("username", "username is required").not().isEmpty(),
    check("email", "email is required").isEmail().normalizeEmail(),
    check("password", "password has to more than 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    } // change made

    const { username, email, password } = req.body;

    try {
      let exists = await knex
        .select()
        .from("accounts")
        .where({
          email: email, // first string val in table then object
        })
        .then((accounts) => {
          accounts[0];
        });

      if (exists) {
        return res.status(400).json({
          msg: "User exists",
        });
      } else {
        user = {
          username,
          email,
          password,
        };
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        knex("accounts")
          .insert(user)
          //console.log(user)
          .then(function () {
            const payload = {
              user: {
                id: user.id,
                email: user.email,
              },
            };

            jwt.sign(
              payload,
              config.get("jwtSecret"),
              {
                expiresIn: 360000,
              },
              (error, token) => {
                if (error) throw error;
                res.json({
                  token,
                });
              }
            );
          });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
