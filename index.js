const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
//extracting style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express routers
app.use('/',require('./routes'));
//view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err) {console.log(`Error in running server: ${err}`);}
    else console.log(`server is running on : ${port}`);
});