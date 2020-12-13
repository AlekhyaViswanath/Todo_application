const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { name } = require("ejs");
const MongoClient = require('mongodb').MongoClient  
const url = "mongodb+srv://alekhya:98765@cluster0.yxwhr.mongodb.net/todocloudproject?retryWrites=true&w=majority"
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const port= 3002;

app.post('/add-todo', function (req, res) {
    var name = req.body.name;
    var todo = req.body.todo
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(err => {
  const collection = client.db("test").collection("devices");
  collection.insertOne({
    "todo": todo,
    "name": name
  });
  });

  res.send("Added!");
});

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/gettodo/:id",(req, res) => {
  var name = req.params.id;
  const url = 'http://localhost:3008/gettodo/'+name
  console.log(url)
  request( url,

    function (error, response, body) {

        if (!error && response.statusCode == 200) {

            res.send(body);

        } else {

            res.send(body);

        }

    });

  });
app.listen(3003,'0.0.0.0', function () { 
  console.log(`Example app listening at http://localhost:3003`)
})

