const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose  = require('mongoose');

const app = express();
const port = 3000;

const users = require('./routes/users.js');
const config = require('./config/database');

mongoose.connect(config.database);

//ON Connection
mongoose.connection.on('connected',() => {
    console.log('Connected to database' + config.database);
});

//ON Error
mongoose.connection.on('error',(err) => {
    console.log('DB Error ' + err);
});


//CORS Middleware
app.use(cors());

//Set static folder - Loads up index.html
app.use(express.static(path.join(__dirname,'public')));

//Body Parser
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport') (passport);

//Users Routes
app.use('/users/',users);

//Index Route
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

//Start Server
app.listen(port,()=>{
    console.log('API server started on port ' + port);
    
});