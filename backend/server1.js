const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

const app = express();
const UserRoutes = express.Router();

const mongoDB = 'mongodb://127.0.0.1/Users';
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Server connection established")
})

let User = require('./Models/Userdata.model');

app.use(cors());
app.use(bodyParser.json())


UserRoutes.route("/").get((req,res) => {
    User.find(function(err, user){
        if(err){
            console.log("Database Unavailable");
        }
        else {
            return(
                res.json(user)
            )
        }
    })
})

UserRoutes.route("/:id").get(function(req,res){
    let id = req.params.id;
    User.findById(id, function(err,user){
        if(err){
            console.log("Record Unavailable");
        }
        else{
            res.json(user);
        }
    })
})

UserRoutes.route("/add").post(function (req, res) {
    let user = new User(req.body);
    user.save()
    .then(user => {
        res.status(200);
        res.send("User added");
    })
    .catch(err => {
        res.send("User could not be added");
        console.log("Damn")
    })
})

app.use("/userdata", UserRoutes);
app.listen(PORT, () => {
    console.log('MongoDB running on PORT: ' + PORT)
});
