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
        if (err) callback({status : 1, success : false, message : "알 수 없는 오류"});

        if (results[0] == null){
            callback({status : 2, success : false, message : "아이디가 틀렸습니다."});
        }
        else if (results[0].password === pw){
            callback({status : 3, success : true, message : "로그인 성공", name:results[0].name, ident:results[0].user_ident});
        }
        else{
            callback({status : 4, success : false, message : "비밀번호가 틀렸습니다."});
        }
    });
};
Ta_mysql.signup = function(id, pw, name, callback){
    Ta.mysql.login(id, pw, function(results){
        if (results.status == 2){
            connection.query("insert into t_users (email_id, password, name) values ('?', '?', '?')", [id, pw, name], function(err, results){
                if (err) callback({status : 2, success : false, message : "알 수 없는 오류"});
                else{
                    callback({status : 3, success : true, messsage:"성공"});
                }
            });
            

        }else if(results.status === 4 || results.status === 3){
            callback({status : 1, success : false, message : "해당 아이디가 존재합니다."});
        }
        else{
            callback({status : 2, success : false, message : "알 수 없는 오류"});
        }
    });
}


module.exports = Ta_mysql;