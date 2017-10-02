var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'register_user'
});

connection.connect(function(err){
    if(err){
        console.log('db not connected');
    }else{
        console.log('db  connected');
    }

});

module.exports = connection;