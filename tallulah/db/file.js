var file = {};

/**
 * @typedef file_callback
 * @type {Object}
 * @property {boolean} success 성공 여부
 * @property {number} status 결과 상태 (1 : DB오류, 2. 권한 오류 3. 성공)
 * @property {String} message 오류(성공) 설명 
 */

/**
 * 
 * @param {number} ident 파일 고유 번호
 * @param {String} data 수정내용
 * @param {(data:file_callback)=>void} cb 
 */
file.updateContent = function(ident, data, cb){
    connection.query("update t_file set file_content = ? where file_ident = ?", [data, ident], function(err, results){
        if (err) return cb({success : false, status : 1, message : 'DB 오류'});
        return cb({success:true, status : 3, message : '성공'});
    });
};

/**
 * @param {number} ident 파일 고유번호
 * @param {String} updateFilename 업데이트할 파일 이름
 * @param {(data:file_callback=>void)} callback 콜백함수 
 */

 file.updateFilname = function(ident,data,callback){
     connection.query("")
 }

/**
 * @param {number} ident 상위 폴더의 고유번호 
 * @param {String} name 파일의 이름
 * @param {(data:file_callback)=>void} cb 콜백 함수
 */
file.create = function(ident ,name, cb){
    connection.query("insert into t_file (dir_ident, file_name) values (?, ?)", [ident, name], function (err, result){
        if (err) {
            if (err.errno === 1062){
                return cb({success:false, status : 2, message : '파일이 중복됩니다.'});
            }
            console.log(err);
            return cb({success : false, status : 1, message : 'DB 오류'});
        }
        return cb({success:true, status : 3, message : '파일 생성 성공'});
    });
}
/**
 * 
 * @param {number} ident 상위 고유번호
 * @param {(data:file_callback)=>void} cb 콜백 함수
 */
file.get = function(ident, cb){
    connection.query('select file_ident, dir_ident, file_name from t_file where dir_ident = ?', [ident], function(err, result){
        if (err){
            console.log(err);
            return cb({success:false, status:1, message:'DB 오류'});
        }
        return cb({success:true, status:3, message:'값 불러오기 성공', data:result});
    });
};

module.exports = file;