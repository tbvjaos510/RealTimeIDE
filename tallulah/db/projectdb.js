var project = {};

/**
 * @typedef p_insert_callback
 * @type {object}
 * @property {number} status 결과 상태 (1 : DB오류, 2 : 이미 가입됨, 3. 성공)
 * @property {boolean} success 성공 여부
 * @property {String} message 오류(성공) 설명
 * @property {number} ident 프로젝트 생성 완료 시 해당 프로젝트의 고유 번호 ※create에서만 사용
 */

/**
 * 프로젝트에 가입합니다.
 * @param {number} user 사용자 고유 번호 
 * @param {number} project 프로젝트 고유 번호
 * @param {number} grade 프로젝트 등급
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백 함수
 */
project.insert = function (user, project, grade,callback) {
            connection.query('insert into t_user_project values (?, ?, ?)', [user, project, grade], function (err, results) {
                if (err) {
                    if(err.errno == 1062){
                        return callback({ status: 2, success: false, message: '이미 가입되어 있습니다.' });
                    }   
                    return callback({ status: 1, success: false, message: 'DB 오류' });
                }
                return callback({status : 3, success : true, message : '성공적으로 가입되었습니다.'});
            });
        }
/**
 * 프로젝트에 초대합니다.
 * @param {String} userid 사용자 아이디
 * @param {number} user 사용자 고유 번호 
 * @param {number} project 프로젝트 고유 번호
 * @param {number} grade 프로젝트 등급
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백 함수
 */

project.invite = function (userid, project, grade,callback) {
        connection.query('select user_ident from t_users where email_id = ?',[userid],function(err,results){
            if(err){
                return callback({ status: 1, success: false, message: 'DB 오류' });
            }
            if(results[0] == null){
                return callback({ status: 2, success: false, message: "그런 사용자가 존재하지 않습니다."});
            }
            user = results[0].user_ident;
            connection.query('insert into t_user_project values (?, ?, ?)', [user, project, grade], function (err, results) {
                if (err) {
                    if(err.errno == 1062){
                        return callback({ status: 2, success: false, message: '이미 가입되어 있습니다.' });
                    }
                    return callback({ status: 1, success: false, message: 'DB 오류' });
                }
                return callback({status : 3, success : true, message : '성공적으로 가입되었습니다.'});
            });
        });    
    }

/**
 * 프로젝트 나가기
 * @param {number} pid 프로젝트id
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백 함수
 */
project.leave = function(userid, pid, callback){
    connection('delete from t_user_project where user_ident = ? and project_ident = ?',[userid,pid],function(err,results){
        if(err){
            console.log(err);
            return callback({status : 1, success : false, message : 'DB 오류'});
        }
        return callback({status:3, success : true, message : "프로젝트를 성공적으로 나갔습니다."});
    })
}
        
/**
 * 
 * @param {String} name 프로젝트 이름
 * @param {number} owner 프로젝트 생성인 고유번호
 * @param {String} description 프로젝트 설명 
 * @param {number} private 프로젝트 공개 여부 (1이면 공개)
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백 함수
 */
project.create = function (name, owner, description, private,callback) {
    connection.query('insert into t_project (project_name, project_owner, project_des, private) values (?,?,?, ?)', [name, owner, description, private], function(err, result){
        if (err){
            if (err.errno == 1062)
                return callback({status : 2, success : false, message : '이미 존재하는 프로젝트 이름입니다.'});
            else{
                console.log(err);
                return callback({status : 1, success : false, message : 'DB 오류'});
            }    
        }
        else{
            connection.query('select project_ident from t_project where project_name = ?', [name], function(err, results){
                if (err) {
                    console.log(err.message);
                    return callback({status : 1, success : false, message : 'DB 오류'});
                }
                else if(results[0].project_ident == null)
                {
                    return callback({status : 2, success : false, message : '알 수 없는 오류'});
                }
                else{
                    project.insert(owner, results[0].project_ident,2, function(data){
                        if (data.success == true){
                            return callback({status : 3, success : true, message : '프로젝트 생성 성공', ident : results[0].project_ident});
                        }
                        else{
                            console.log(data);
                            return callback({status : 2, success : false, message : '알 수 없는 오류'}); 
                        }
                    });
                }
            });
        }
        
    });
};


/**
 * 
 * @param {number} id 프로젝트 고유번호 
 * @param {number} owner 사용자 고유번호
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백 함수
 */
project.delete = function (id, owner,callback) {
    connection.query('select * from t_project where project_ident = ?', [id], function(err,results){
        console.log(results[0].project_ident);
        if (err) {
            console.log(err.message);
            return callback({status : 1, success : false, message:'DB 오류'});
        }
        if (results[0] == null){
            return callback({status : 2,success : false, message:'해당 프로젝트는 존재하지 않습니다.'});
        }
        if (results[0].project_owner != owner){
            return callback({status : 3, success : false, message:'삭제할 권한이 없습니다.'});
        }
        connection.query('delete from t_project where project_ident = ? and project_owner = ?', [id, owner], function(err, results){
            if (err){    
                console.log(err.message);
                return callback({status : 1, success : false, message : 'DB 오류'});
            }
            connection.query('delete from t_user_project where project_ident = ?', [id], function(err, results){
                if (err){
                    console.log(err.message);
                    return callback({status : 1, success : false, message : 'DB 오류'});
                }
                return callback({status : 4, success:true, message : '프로젝트 삭제 성공'});
            });
        });
    });  
        
};


/**
 * 
 * @param {number} uid 사용자 고유번호 
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백 함수
 * 
 */
project.select = function(uid, callback){
    connection.query('select t_project.*, t_user_project.grade from t_project join t_user_project on t_user_project.project_ident = t_project.project_ident where t_user_project.user_ident = ? group by project_ident', [uid], function(err, results){
        if (err){
            console.log(err.message);
            return callback({status : 1, success : false, message : 'DB 오류'});
        }
        return callback({status : 2, success : true, message : '읽기 성공', count : results.length, data : results});
    });
};

/**
 * @param {number} uid 사용자 고유번호
 * @param {number} pid 프로젝트 고유번호
 * @param {(data:p_insert_callback)=>void} callback 결과 콜백함수
 * @param {String} name 수정할 프로젝트 이름
 * @param {number} private 프로젝트 공개 여부 (1이면 공개)
 * @param {String} desc 수정할 프로젝트 설명
 */

project.update = function(uid,pid,name,desc,private,callback){
    connection.query("select user_ident,project_ident from t_user_project where t_user_project.grade = 2 and t_user_project.user_ident = ? and t_user_project.project_ident = ?",[uid,pid],function(err,results){
        if(err){
            console.log(err);
            return callback({status : 1, success : false, message : "DB 오류"});
        }else if(results[0] == null){
            return callback({status : 3, success : false, message : "권한이 없음" });
        }
        if(!desc){
            connection.query("update t_project set project_name = ? where project_ident = ? and project_owner = ?",[name,pid,uid],function(err,results){
                if(err){
                    return callback({status : 1, success : false, message : "DB 오류"});
                }
                return callback({status : 3, success : true, message : "수정성공"});
            })
        }else{
            connection.query("update t_project set project_name = ?, project_des = ? where project_ident = ? and project_owner = ?",[name,desc,pid,uid],function(err,results){
                if(err){
                    return callback({status : 1, success : false, message : "DB 오류"});
                }
                return callback({status : 3, success : true, message : "수정성공"});
            })
        }
    })
}

/**
 * 
 * @param {String} name 검색할 프로젝트 이름
 * @param {(data:p_insert_callback)=>void} callback 콜백 함수
 */
project.search = function(name, callback){
    connection.query("select project_ident, project_name, project_owner, project_des from t_project where private = 1 and project_name like '%"+name+"%'", function (err, result){
        if (err)
        {
            console.log(err);
            return callback({status : 1, success : false, message : 'DB 오류'});
        }
        if(result[0] == null){
            console.log(22);
            return callback({message : "존재하지 않은 프로젝트입니다.", success : false});
        }
        return callback({status : 2, success : true, count:result.length, data : result});
    });
}





module.exports = project;