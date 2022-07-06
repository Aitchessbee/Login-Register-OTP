const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel.js');
const nodemailer = require('nodemailer');

console.log("app.js");

const app = express();

const dbURI = "mongodb+srv://HSB:test1234@cluster0.7ztm4s7.mongodb.net/HPC?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))



app.get("/", (req, res) => {
    res.redirect('/login');
})

app.get("/login", (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
})

app.post("/mail", async function(req, res) {
    console.log(req.body)
    function generateOTP() {
                
        // Declare a digits variable 
        // which stores all digits
        var digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++ ) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        return OTP;
    }

    const otp = generateOTP()

    // NODEMAILER LOGIC
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "hsbthegreat@outlook.com",
            pass: "Aitchessbee1"
        }
    });

    let info = await transporter.sendMail({
        from: 'hsbthegreat@outlook.com', // sender address
        to: "bediharsiddak@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Your otp is " + otp, // plain text body
    });
    console.log(info.response);
    console.log(nodemailer.getTestMessageUrl(info));
    
    // res.end();
    res.json({

        message: "ok",
        otp: otp,
    })

    res.render("register", {email: req.body.email, mobile: req.body.mobile, password: req.body.password, otp: otp});
})


app.post('/register', (req, res) => {
    const user = new User(req.body);
    console.log(req.body);
    user.save()
        .then(result => {
            res.render('loggedIn');
        })
        .catch(err => {
            console.log(err);
        })
})

app.post("/login", (req, res) => {
    const user = new User(req.body);

    User.findOne({email: user.email})
        .then(result => {
            console.log(result);
            if(result.password === user.password){
                res.render('loggedIn');
            }
        })
        .catch(err => {
            console.log(err);
        })
})