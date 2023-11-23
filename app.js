const express = require("express");
const router = require("./routers");
const users = require("./routers/users");
const artists = require("./routers/artists");
const app = express();
const port = 3005;
const path = require('path');
const session = require('express-session')
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));

// app.get('/upload', (req, res) => {
//     res.render('upload')
// })

// app.post('/upload', upload.single('images'), (req, res) => {
//     // res.send('upload image')
//     res.redirect('/')
// })


app.use(session({
    secret: 'rahasia dong',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        sameSite: true 
    }
}))
app.use("/", router);
// app.use(artists);

app.listen(port, () => {
    console.log(`Soundtown listening on port ${port}`);
});
