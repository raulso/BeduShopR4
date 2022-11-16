const express = require('express');
const mongoose  = require("mongoose");
require('./src/config/passport')

const app = express();

//codigo necesario de entrada
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGOURI);

app.use('/v1', require('./src/routes'));
app.listen(process.env.PORT, ()=> console.log('The server is alive') );
app.get('/',(req,res)=> res.send('Hello world'));
