/////////////////////////////////////////////
////////////////// REQUIRES /////////////////
/////////////////////////////////////////////


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var cookieParser = require('cookie-parser');
var i18n = require("i18n");


/////////////////////////////////////////////
////////////////// APP.USE //////////////////
/////////////////////////////////////////////

let public_dir = "/html";
app.use(express.static(__dirname + public_dir));
app.use(express.static("html"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// view engine setup
app.set('views', "html");
app.set('view engine', 'ejs');

i18n.configure({
    locales:['en', 'it'],
    cookie: 'langCookie',
    directory: __dirname + '/locales',
    updateFiles: false
});

app.use(cookieParser());
app.use(i18n.init);


/////////////////////////////////////////////
///////////////// APP.INIT //////////////////
/////////////////////////////////////////////

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/IT', function(req, res) {
    req.setLocale('it');
    res.render('index');
});

app.get('/EN', function(req, res) {
    req.setLocale('en');
    res.render('index');
});

app.get('/about/IT', function(req, res) {
    req.setLocale('it');
    res.render('pages/about');
});

app.get('/about/EN', function(req, res) {
    req.setLocale('en');
    res.render('pages/about');
});

app.get('/Services/IT', function(req, res) {
    req.setLocale('it');
    res.render('pages/Services');
});

app.get('/Services/EN', function(req, res) {
    req.setLocale('en');
    res.render('pages/Services');
});

app.get('/contact/IT', function(req, res) {
    req.setLocale('it');
    res.render('pages/contact');
});

app.get('/contact/EN', function(req, res) {
    req.setLocale('en');
    res.render('pages/contact');
});


/////////////////////////////////////////////
///////////////// APP.POST //////////////////
/////////////////////////////////////////////

app.post('/contactForm', function(req, res) {

    console.log("contact post received...");
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'clinic.pms@gmail.com',
            pass: 'megliosucochemaleaccompagnato'
        }
    };
    var transporter = nodemailer.createTransport(smtpConfig);

    var messaggio = "messaggio vuoto";

    if (req.body.msg != null && req.body.msg != "") {
        messaggio = req.body.msg;
    }

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.email, // sender address
        to: "info@saraholdingtrustinc.com", // list of receivers
        subject: "Massaggio da saraholdingtrustinc.it", // Subject line
        html: '<p><b>Nome</b>: ' + req.body.name + ' <br> <b>Email</b>: ' + req.body.email +' <br> <b>Phone</b>: ' + req.body.phone +' <br> <b>Messaggio</b>: ' + messaggio + '<p> <p>Mail generata da SaRa.it</p>'
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('ok');
});


/////////////////////////////////////////////
/////////////////// INIT ////////////////////
/////////////////////////////////////////////

// instantiate the app

let serverPort = process.env.PORT || 5000;
app.set("port", serverPort);

/* Start the server on port 3000 */
app.listen(serverPort, function() {
    console.log(`Server ready ${serverPort}`);
});
