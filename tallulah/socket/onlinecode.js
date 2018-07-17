
var srouter = require('./socket_nsp');
var mrouter = require('./message');
/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function (io) {
    srouter(io, '/main');
    mrouter(io, '/chat');
    io.on('error', function(err){
        console.log('err created')
    })
};