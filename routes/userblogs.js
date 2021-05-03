const { Router } = require("express");
const knex = require("../db/knex");

const router = Router();

// @req GET
// @access Private and public
// @desc get accounts blog
router.get("/:id", (req, res) => {
  const { id } = req.params;
  knex
    .from("blog")
    .innerJoin("accounts", "blog.accounts_id", "accounts.id")
    .where("blog.accounts_id", id)
    .then(function (userBlog) {
      res.send(
        // userBlog[0].username,
        // userBlog[0].blog_title,
        // userBlog[0].blog_content
        userBlog
      );
    });
});

module.exports = router;
