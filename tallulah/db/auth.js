var mysql = require('mysql');
var auth = {};

var connection = mysql.createConnection({
  host: '114.108.167.90',
  port: '3306',
  user: 'dgsw',
  password: 'dnrhddltks',
  database: 'dgsw_sms'
});
/**
 * mysql서버에 연결합니다.
 */ auth.connect = function () {
  connection.connect();
}; auth.test = function (callback) {
  connection.query('select * from city', function (err, results) {
    if (err) throw err;

    callback(results);
  });

};

/**
 * @typedef loginCallback
 * @type {object}
 * @property {number} status 결과 상태 (1 : DB오류, 2 : 아이디가 틀림, 3. 비밀번호가 틀림, 4. 성공)
 * @property {boolean} success 성공 여부
 * @property {String} message 오류(성공) 설명
 * @property {String} name (성공시) 사용자 이름
 * @property {String} ident (성공시) 사용자 고유번호 (String 값이므로 변환)
 */

/**
 * id와 password를 비교합니다.
 * @param {String} id
 * @param {String} pw
 * @param {String} name
 * @param {(data:loginCallback)=>void} callback
 * @returns {null}
 */ auth.login = function (id, pw, callback) {
  connection.query('select password, name, user_ident from t_users where email_id = ?', [id], function (err, results) {
    if (err) callback({ status: 1, success: false, message: '알 수 없는 오류' });

    if (results[0] == null) {
      callback({ status: 2, success: false, message: '아이디가 틀렸습니다.' });
    } else if (results[0].password === pw) {
      callback({ status: 4, success: true, message: '로그인 성공', name: results[0].name, ident: results[0].user_ident });
    } else {
      callback({ status: 3, success: false, message: '비밀번호가 틀렸습니다.' });
    }
  });
};

/**
 * @typedef signupCallback
 * @type {object}
 * @property {number} status 결과 상태 (1 : 아이디 중복, 2 : DB 오류, 3. 성공)
 * @property {boolean} success 성공 여부
 * @property {String} message 오류(성공) 설명
 */

/**
 * @description
 * mysql User table에 유저 정보를 추가합니다.
 * @param {String} id
 * @param {String} pw
 * @param {String} name
 * @param {(data:signupCallback)=>void} callback
 * @returns {null}
 */
auth.signup = function (id, pw, name, callback) {
  auth.login(id, pw, function (results) {
    if (results.status == 2) {
      connection.query('insert into t_users (email_id, password, name) values (?, ?, ?)', [id, pw, name], function (err, results) {
        if (err) {
          callback({ status: 2, success: false, message: '알 수 없는 오류' });
          console.log(err.message);
        } else {
          callback({ status: 3, success: true, messsage: '성공' });
        }
      });


    } else if (results.status === 4 || results.status === 3) {
      callback({ status: 1, success: false, message: '해당 아이디가 존재합니다.' });
    } else {
      callback({ status: 2, success: false, message: '알 수 없는 오류' });
    }
  }
  );
};

module.exports = auth;