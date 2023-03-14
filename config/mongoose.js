const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/community_development');
const db = mongoose.connection;
db.on('error',console.error.bind(console,"error:connecting to db"));
db.once('open',function(){
    console.log("connected to db successfully");
})

module.exports = db;