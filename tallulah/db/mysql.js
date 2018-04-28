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
Ta_mysql.login = function(id, pw, callback){
    connection.query("select password, name, user_ident from t_users where email_id = ?",[id], function(err, results){
        if (err) callback({success : false, message : "알 수 없는 오류"});

        if (results[0] == undefined){
            callback({success : false, message : "아이디가 틀렸습니다."});
        }
        if (results[0].password === pw){
            callback({success : true, message : "로그인 성공", name:results[0].name, ident:results[0].ident});
        }
        else{
            callback({success : false, message : "비밀번호가 틀렸습니다."});
        }
    });
};

module.exports = Ta_mysql;