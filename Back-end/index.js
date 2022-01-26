const express = require("express");
const db = require("./db/db.js");
const bodyParser = require ('body-parser');
const userRouter = require("./routes/user");
var cors = require('cors');

const app = express();

var corsOptions = {
  origin: 'http://localhost:4200',
};
app.use (cors (corsOptions));

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use(express.json());


console.log("im in index")
const PORT = 5001;
db.connect(() => {
  console.log("Connected");
});

app.use("/api/users", userRouter);
/** ROUTES */

app.listen(PORT, () => {
  console.log("Server started");
});
