const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/posts';

const PORT = 5000;
const app = express();
const postRoutes = express.Router();

app.use(bodyParser.json())
app.use(cors());

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

let postData = require('./Models/Post.model');

db.once("open", ()=>{
    console.log("Database connection established")
})

postRoutes.route("/").get((req, res)=>{
    postData.find((err, post) => {
        if(err){
            console.log("Database unavailable")
        }
        else{
            return res.json(post)
        }
    })
})

postRoutes.route("/:id").get((req, res) => {
    let id = req.params.id;
    postData.findById(id, (err, post) => {
        if(err){
            console.log("Record Unavailable");
        }
        else{
            res.json(post);
        }
    })
})

postRoutes.route("/add").post((req, res)=>{
    let newPost = new postData(req.body);
    newPost.save()
    .then(post => {
        res.status(200).send("Post added")
        console.log("Post added")
    })
    .catch(err => {
        res.status(400).send("Post not added")
        console.log("Post not added")
    })
})

postRoutes.route('/edit/:id').post(function(req, res){
    let id =  req.params.id;
    postData.findById(id, function(err, post){
        if(!post){
            console.log(err);
            console.log("The record was not found");
            res.status(404).send("The record was not found");
        }
        else{
            post.title = req.body.title;
            post.body = req.body.body;

            post.save()
                .then(post => {
                    res.json("User updated");
                    res.status(200);
                })
                .catch(err => {
                    res.status(400).send("The Update was not possible")
                })
    
        }
    })
})



postRoutes.get("/delete/:id", (req, res)=>{
    let id = req.params.id;

    postData.findByIdAndDelete(id,(err, doc)=>{
        if(err){
            res.status(400).send("Could not delete")
        }
        else{
            res.status(200).send("Deleted")
            console.log("deleted")
        }
    })
    })

app.use("/posts", postRoutes)

app.listen(PORT, ()=>{
    console.log("Server running on PORT:", PORT)
})


