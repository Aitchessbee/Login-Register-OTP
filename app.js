const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel.js');


const app = express();

const dbURI = "mongodb+srv://HSB:test1234@cluster0.7ztm4s7.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))


app.get("/", (req, res) => {
    res.render('index');
})

app.get("/login", (req, res) => {
    res.render('login');
})

app.post("/login", (req, res) => {
    const user = new User(req.body);

    user.save()
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        })
})

