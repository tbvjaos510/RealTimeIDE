var express = require('express');
var router = express.Router();
var host = require('../db/host');

router.get('/host/:projectUrl/:directoryUrl/:fileUrl',function(req,res){
    
    var projectUrl = req.params.projectUrl;
    var directoryUrl = req.params.directoryUrl;
    var fileUrl = req.params.fileUrl;

    

})