const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
// Express Middleware
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    // next();
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n');
    console.log(log);

    next();
});

// app.use((req, res, next) => {
//   res.render('maintenance')
// });


// Register Helper
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// Helper that takes args
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

// Homepage
app.get('/', (req, res) => {

    // res.send('<h1>Hello, express.</h1>');
    // res.send({
    //     likes: ['Biking', 'Cities']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        headerTitle: 'Home Page Header',
        welcomeMessage: 'Welcome to my website.'
    });
});

// About page
app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
        // Inject data
        headerTitle: 'About Page Header',
        pageTitle: 'About Page',
    });
});


// Send back Json with errorMessage
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to connect to the server.'
    });
});

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
