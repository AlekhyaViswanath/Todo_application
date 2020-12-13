const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { name } = require("ejs");
const MongoClient = require('mongodb').MongoClient  
const url = "mongodb+srv://alekhya:98765@cluster0.yxwhr.mongodb.net/todocloudproject?retryWrites=true&w=majority"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
const port= 3002;

app.get('/gettodo/:id', async function (req, res) {
    var name = req.params.id;
    const client = new MongoClient(url, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("test").collection("devices");
    collection.findOne({name: name}, function(err, result) {
      if (result != null) {
        res.send(result.todo);
        } else {
          res.send("No user found")
        }
    });
    });
});

app.listen(3008,'0.0.0.0', function () {
  console.log(`Example app listening at http://localhost:3008`)
})
