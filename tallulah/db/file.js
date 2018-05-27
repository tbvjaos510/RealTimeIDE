var file = {};

file.update = function(ident, data, cb){
    connection.query("update t_file set file_content = ? where file_ident = ?", [data, ident], function(err, results){
        if (err) return cb({success : false, status : 1, message : 'DB 오류'});
        return cb({success:true, status : 2, message : '성공'});
    });
};

module.exports = file;