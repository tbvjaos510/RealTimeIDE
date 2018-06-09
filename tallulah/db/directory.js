var directory = {};

/**
 * @typedef directory_callback
 * @type {object}
 * @property {number} status 결과 상태 (1 : DB오류, 2 : 이미 가입됨, 3. 성공)
 * @property {boolean} success 성공 여부
 * @property {String} message 오류(성공) 설명
 */


/**
 * @param {number} dirName 디렉토리 이름
 * @param {number} pid 프로젝트 아이디
 * @param {number} did 디렉토리 아이디 
 * @param {(data:directory_callback=>void)} callback 콜백함수 
 */

directory.create = function(dirName,pid,did,callback){ //파일 생성
    connection.query("select * from t_directory where dir_name=? and project_ident = ? and dir_paraent = ?",[dirName,pid,did],function(err,results){ 
        if(err){
            console.log(err);
            return callback({status : 1, success : false, message : "DB 오류"});
        }
        if(results[0] == null){
            connection.query("insert into t_directory(dir_name,dir_paraent,project_ident) values(?,?,?);",[dirName,did,pid],function(err,results){
                if(err){
                    return callback({status : 1, success : false, message : "DB 오류"});
                }
                return callback({status : 3, success : true, message : "성공"});
            })
        }else{
            return callback({status : 2, success : false , message : "이미 생성됨."});
        }
    })
 }

/**
 * @param {(data:directory_callback=>void)} callback 콜백함수
 * @param {String} name 폴더 이름
 */

directory.delete = function(name,callback){ //파일 삭제
        connection.query("select * from t_directory where dir_name = ?",[name],function(err,results){
                    if(err){
                        return callback({status : 1, success : false, message : "DB 에러"});
                    }else if(results[0] == null){
                        return callback({status : 2, success : false , message : "폴더가 존재하지 않음."});
                    }
                   connection.query("delete from t_directory where dir_name = ?",[name],function(err,results){
                        if(err){
                            return callback({status : 1, success : false, message : "DB 에러"});
                        }  
                        return callback({status : 3, success : true, message : "삭제 성공"});
                })
        }) 
}

/**
 * @param {String} dirName 수정할 디렉토리 이름
 * @param {number} dirIdent 파일 디렉토리 이름
 * @param {(data:directory_callback=>void)} callback 콜백함수
 */

directory.update = function(dirName,dirIdent,callback){ //파일 이름 수정
        connection.query("select * from t_directory where dir_name = ?",[dirName],function(err,results){
            if(err){
                return callback({status : 1, success : false, message : "DB 에러"});
            }else if(results[0] == null){
                connection.query('update t_directory set dir_name = ? where dir_ident = ?',[dirName,dirIdent],function(err,results){
                    if(err){
                        return callback({status : 1, success : false, message : "DB 에러"});
                    }
                    if(results[0] == null){
                        return callback({status : 3, success : true, message : "수정 성공"});
                    }
                    return callback({status : 2, success : false, message : "수정 실패"});
                })
            }
            return callback({statue : 2, success : false, message : "같은 폴더 이름 존재"});
        })
} 

/**
 * @param {number} pid 프로젝트 식별자
 * @param {(data:directory_callback=>void)} callback 콜백함수
 */

directory.get = function(pid,callback){
    connection.query("select dir_ident, dir_name, dir_paraent, project_ident from t_directory where project_ident = ?",[pid],function(err,results){
        if(err){
            return callback({status : 1, success : false, message : "DB 에러"});
        }
        return callback(results);
    })
}

 module.exports = directory;