const express = require("express");
// application object using express
const app = express();
// PORT
const port = process.env.PORT || 3000;
// body parser
const bodyParser = require("body-parser");
// cors
const cors = require("cors");
// routes
const blog = require("./routes/blog");
const accounts = require("./routes/accounts");
const auth = require("./routes/auth");
const userBlogs = require("./routes/userblogs");

// Init middleware
app.use(bodyParser.json());
app.use(
  express.json({
    extended: false,
  })
);
app.use(cors());

// Routes
// CRUD
app.use("/blog", blog);
app.use("/accounts", accounts);
app.use("/auth", auth);
app.use("/blog-of-user", userBlogs);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = app;
