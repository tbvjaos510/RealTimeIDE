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

 file.updateFilename = function(ident,updateFilename,callback){
     connection.query("update t_file set file_name = ? where file_ident = ?",[updateFilename,ident],function(err,results){
         if(err) {
            if(err.errno == 1062){
                return callback({status : 2, success : true , message : "중복된 파일 이름이 있습니다."});
            }
            return callback({success : false, status : 1, message : 'DB 오류'});
         }
           return callback({success:true, status : 3, message : '성공'});
     })
 }

/**
 * @param {number} ident 상위 폴더의 고유번호 
 * @param {String} name 파일의 이름
 * @param {number} pident 프로젝트의 고유번호 
 * @param {(data:file_callback)=>void} cb 콜백 함수
 */
file.create = function(pident,ident ,name, cb){
    if(ident==null){
        ident=0;
    }
    connection.query("insert into t_file (project_ident, dir_ident, file_name) values (?,?, ?)", [pident,ident, name], function (err, result){
        if (err) {
            if (err.errno === 1062){
                return cb({success:false, status : 2, message : '파일이 중복됩니다.'});
            }
            console.log(err);
            return cb({success : false, status : 1, message : 'DB 오류'});
        }
        connection.query("select * from t_file where file_name = ? and dir_ident = ?",[name,ident],function(err,result){
            if (err) {
                console.log(err);
                return cb({success : false, status : 1, message : 'DB 오류'});
            }
            return cb({success : true, status : 3, message : '성공', file : result});  
        })

    });
}
/** 
 * 
 * @param {number} ident 상위 고유번호
 * @param {number} pident 프로젝트 고유번호 
 * @param {(data:file_callback)=>void} cb 콜백 함수
 */

// file에 dirident가 다를 때 오류 발생

file.get = function(pident, ident, cb){
    connection.query('select file_ident, dir_ident, file_name, file_content,project_ident from t_file where project_ident = ?', [pident], function(err, result){
        if (err){
            console.log(err);
            return cb({success:false, status:1, message:'DB 오류'});
        }
        return cb({success:true, status:3, message:'값 불러오기 성공', data:result});
    });
};

/**
 * @param {number} ident 파일 고유번호
 * @param {(data:file_callback=>void)} callback 콜백함수
 */

file.getFile = function(ident,callback){
    connection.query("select file_ident, dir_ident, file_name, file_content,project_ident from t_file where file_ident = ?",[ident],function(err,result){
        if (err){
            console.log(err);
            return callback({success:false, status:1, message:'DB 오류'});
        }
        return callback({success:true, status:3, message:'값 불러오기 성공', data:result});
    })
}

/**
 * @param {number} dident 폴더 고유번호
 * @param {(data:file_callback=>void)} callback 콜백함수
 */

file.getOfdir = function(dident,callback){
    connection.query("select file_ident, dir_ident, file_name, file_content,project_ident from t_file where dir_ident = ?",[dident],function(err,results){
        if (err){
            console.log(err);
            return callback({success:false, status:1, message:'DB 오류'});
        }
        return callback({success:true, status:3, message:'값 불러오기 성공', data:results});
    })
}

/**
 * @param {number} ident 파일식별자
 * @param {(data:file_callback=>void)} callback 콜백함수
 */

file.delete = function(ident,callback){
    connection.query('delete from t_file where file_ident = ?',[ident],function(err,results){
        if (err){
            console.log(err);
            return callback({success:false, status:1, message:'DB 오류'});
        }
        return callback({status : 3, success : true, message : '삭제 성공'});
    })
}

module.exports = file;