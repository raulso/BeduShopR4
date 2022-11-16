const express = require('express');
const mongoose  = require("mongoose");
require('./src/config/passport')


/////////rso
//const routes = require("./src/routes")
///////////
const app = express();

//codigo necesario de entrada
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//require('dotenv').config();
mongoose.connect(process.env.MONGOURI);
//mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ylmtwla.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
//conectar router

app.use('/v1', require('./src/routes'));

//const PORT = 4001;
app.listen(process.env.PORT, ()=> console.log('The server is alive') );
app.get('/',()=> console.log('Hello world'));
///////////////////////////////////
