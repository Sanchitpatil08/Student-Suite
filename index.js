const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collections = require('./src/config');



const app = express();
// convert data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use EJS as a view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));     
path.join(__dirname, './views')

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render("priorLogin");
});

// ------------------ redirection section ----------------
// redirect to signup page
app.get('/home', (req, res) => {
    res.render("home");
});

// redirect to signup page
app.get('/ogSignup', (req, res) => {
    res.render("ogSignup");
});

// redirect to login page
app.get('/ogLogin', (req, res) => {
    res.render("ogLogin");
});

// redirect to login page
app.get('/priorLogin', (req, res) => {
    res.render("priorLogin");
});

// redirect to accomodation page
app.get('/accommodation', (req, res) => {
    res.render("accommodation");
});

// redirect to food page
app.get('/food', (req, res) => {
    res.render("food");
});

// redirect to laundry page
app.get('/laundry', (req, res) => {
    res.render("laundry");
});

// ------- info page redirection ---------
// redirect to house page
app.get('/1house', (req, res) => {
    res.render("1house");
});
app.get('/2house', (req, res) => {
    res.render("2house");
});
app.get('/3house', (req, res) => {
    res.render("3house");
});
app.get('/4house', (req, res) => {
    res.render("4house");
});
app.get('/5house', (req, res) => {
    res.render("5house");
});
app.get('/6house', (req, res) => {
    res.render("6house");
});
app.get('/7house', (req, res) => {
    res.render("7house");
});
app.get('/8house', (req, res) => {
    res.render("8house");
});
app.get('/9house', (req, res) => {
    res.render("9house");
});

// redirection to food page
app.get('/1food', (req, res) => {
    res.render("1food");
});
app.get('/2food', (req, res) => {
    res.render("2food");
});
app.get('/3food', (req, res) => {
    res.render("3food");
});
app.get('/4food', (req, res) => {
    res.render("4food");
});
app.get('/5food', (req, res) => {
    res.render("5food");
});
app.get('/6food', (req, res) => {
    res.render("6food");
});
app.get('/7food', (req, res) => {
    res.render("7food");
});
app.get('/8food', (req, res) => {
    res.render("8food");
});
app.get('/9food', (req, res) => {
    res.render("9food");
});


// ------- info page redirection ends ---------
// ------------------ redirection section ends----------------

// register users
app.post('/ogSignup', async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
        // Checking for if already existing username
    const existingUser = await collections.findOne({name: data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different name.")
    }
    else{
        // hasing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Replacing original password with hased password
        
        const userdata = await collections.insertMany(data);
        console.log(userdata);
    }
});

// login users
app.post('/ogLogin', async (req, res) => {
    try{
        const check = await collections.findOne({name: req.body.username});
        if(!check){
            res.send("User does not exist");
        }

        // compare the hash password from the database with the plain text
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(!isPasswordMatch){
            res.send("wrong password");
        }
        else{
            res.render("home");
        }
    }catch{
        res.send("Wrong Details");
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
