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
 * @param {(data:directory_callback=>void)} callback 콜백함수 
 */

directory.create = function(dirName,pid,callback){
    connection.query("select * from t_directory where dir_name=? and project_ident = ?",[dirName,pid],function(err,results){
        if(err){
            console.log(err);
            return callback({status : 1, success : false, message : "DB 오류"});
        }
        if(results[0] == null){
            connection.query("insert into t_directory(dir_name,project_ident) values(?,?);",[dirName,pid],function(err,results){
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
 * @param {number} pid 프로젝트 식별자
 * @param {(data:directory_callback=>void)} callback 콜백함수
 * @param {number} uid 유저 식별자
 * @param {String} name 폴더 이름
 */

directory.delete = function(pid,uid,name,callback){
    connection.query("select grade from t_user_project where grade = 2 and user_ident = ? and project_ident = ?",[uid,pid],function(err,results){
        if(err){
            return callback({status : 1, success : false, message : "DB 에러"});
        }else if(results[0] == null){
            return callback({status : 2, success : false, message : "권한 없음"});
        }
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
    })
}

 module.exports = directory;