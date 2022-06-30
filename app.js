const express = require('express');

const app = express();

// const dbURI = "mongodb+srv://HSB:test1234@cluster0.7ztm4s7.mongodb.net/?retryWrites=true&w=majority"
// mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
//     .then((result) => app.listen(3000))
//     .catch((err) => console.log(err));

app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render('index');
})