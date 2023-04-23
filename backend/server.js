const express = require("express");
const cors = require("cors");
const auth = require("./middleware/auth");

const app = express();

app.use(cors());

app.get("/api", auth, function (req, res, next) {
	res.send(`Hi ${res.locals.user.username}, your API call is authenticated!`);
});

app.get("/", (req, res) => res.json({ msg: "Hello!!!" }));

module.exports = app;
