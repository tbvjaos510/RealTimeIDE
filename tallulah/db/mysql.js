var mysql = require('mysql');
var Ta_mysql = {};
var connection = mysql.createConnection({
    host : '114.108.167.90',
    port : '3306',
    user : 'dgsw',
    password : 'dnrhddltks',
    database : 'dgsw_sms',
});
Ta_mysql.connect = function(){
    connection.connect();
};
Ta_mysql.test = function(callback){
   
    connection.query("select * from city", function(err, results){
        if (err) throw err;
        
        callback(results);
    });

};

module.exports = Ta_mysql;