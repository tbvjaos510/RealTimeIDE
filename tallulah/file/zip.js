var zip = new require('node-zip')()
var folder = require('../db/directory')
var file = require('../db/file')

function getDir(pid, cb){
    folder.get(pid, function(data){
        cb(data)
    })
}

function getFile(pid, cb){
    file.get(pid, function(data){
        cb(data.data)
    })
}
function findDir(dirs, id){
    for(var dir of dirs){
        if (dir.dir_ident === id)
            return dir
    }
    return null
}
function getDirPath(dirs, file){
    var parent = file.dir_ident
    var path = file.file_name
    var dir
    while(parent != null){
        dir = findDir(dirs, parent)
        if (dir){
            path = dir.dir_name +'/'+ path
            parent = dir.dir_parent
        } else return null
    }
    return path
}
exports.makeZip = function (pid, cb){
    var f = []
    getDir(pid, (dirs)=>{
        getFile(pid, (files)=>{
            for(var file of files){
                zip.file(getDirPath(dirs, file), file.file_content)
            }
            
            cb(zip.generate({base64:false,compression:'DEFLATE'}))
        })
    })

}