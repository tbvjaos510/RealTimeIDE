
var srouter = require('./socket_nsp');
/**
 * 
 * @param {SocketIO.Server} io 
 */
module.exports = function (io) {
    srouter(io, '/main');
};