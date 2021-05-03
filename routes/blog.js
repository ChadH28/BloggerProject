const { Router } = require("express");
const knex = require("../db/knex");

const router = Router();

// @req GET
// @access Private and public
// @desc get blog
router.get("/", (req, res) => {
  knex
    .select()
    .from("blog")
    .then(function (blog) {
      res.send(blog);
    });
});

// @req GET
// @access Private and public
// @desc get a blog
router.get("/:id", (req, res) => {
  const { id } = req.params;
  knex
    .select()
    .from("blog")
    .where("id", id)
    .then(function (blog) {
      res.send(blog);
    });
});

// @req POST
// @access Private and public
// @desc add/create a new blog
router.post("/", (req, res) => {
  const { title, content, topic, accounts_id } = req.body;
  knex("blog")
    .insert({
      blog_title: title,
      blog_content: content,
      blog_topic: topic,
      accounts_id: accounts_id,
      user: true,
    })
    .then(function () {
      knex
        .select()
        .from("blog")
        .then(function (blog) {
          res.send(blog);
        });
    });
});

// @req PUT
// @access Private and public
// @desc edit and update blog
router.put("/:id", (req, res) => {
  const { field, value, title, content, topic } = req.body;
  const { id } = req.params;
  knex("blog")
    .where("id", id)
    .update({
      blog_title: title,
      blog_content: content,
      blog_topic: topic,
    })
    .then(function () {
      knex
        .select()
        .from("blog")
        .then(function (blog) {
          res.send(blog);
        });
    });
});

// @req DELETE
// @access Private and public
// @desc delete blog
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  knex("blog")
    .where("id", id)
    .del()
    .then(function () {
      knex
        .select()
        .from("blog")
        .then(function (blog) {
          res.send(blog);
        });
    });
});

module.exports = router;
